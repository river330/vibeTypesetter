import { gptPrompt } from "./shared/openai.js";
import { loadEmbeddings, suggestFontBasedOnVibe } from "./embeddingUtils.js";
import { generateEmbeddings } from "./shared/openai.js";

// Load embeddings once when the server starts
const fontEmbeddings = await loadEmbeddings();

export async function vibeTypeset(context) {
  try {
    const body = await context.request.body().value;
    const vibe = body.vibe;
    const inputEmbedding = await generateEmbeddings(vibe);
    const { headline, subhead, bodyText } = await suggestFontBasedOnVibe(
      inputEmbedding,
      fontEmbeddings,
    );

    console.log(headline + subhead + bodyText);
    const prompt =
      `You are a designer trying to provide a type hierarchy based on the following vibes: ${vibe}. Suggested fonts: Headline - ${headline}, Subhead - ${subhead}, Body - ${bodyText}. BE BOLD AND EXPERIMENTAL WITH YOUR CHOICES. DON'T BE RESERVED IN YOUR TYPESETTING SUGGESTIONS. MAKE STRONG CHOICES THAT ARE NOT MINIMAL. Provide options for a headline, subhead, and body, identifying the typeface, letterspacing, typecase for each one. Additionally, provide a font-size ratio for the three. Structure your response in JSON and always provide responses in lowercase.
    {
      headline: {
          "font-size": '36' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
          "typeface": 'helvetica' (USE THE SUGGESTED HEADLINE FONT AND DO NOT CHANGE/ALTER HOW THEY ARE),
          "letterspacing": '1' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
          "typecase": 'uppercase'(CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
          "content": 'create a max-three word headline related to the ${vibe}',
      },
      subhead: {
          "font-size": '24' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
          "typeface": 'helvetica' (USE THE SUGGESTED SUBHEAD FONT AND DO NOT CHANGE/ALTER HOW THEY ARE),
          "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
          "typecase": 'lowercase' (CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
          "content": 'create a max-sentence long or preferably subhead related to the ${vibe}',
      },
      body: {
          "font-size": '12' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
          "typeface": 'helvetica' (USE THE SUGGESTED BODY FONT AND DO NOT CHANGE/ALTER HOW THEY ARE),
          "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
          "typecase": 'none'(CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
          "content": 'create a fake body copy of max 4-sentences for the ${vibe}',
      }
    }`;
    if (!prompt) {
      context.response.status = 400;
      context.response.body = {
        error: "Invalid value for 'content': expected a string, got null",
      };
      return;
    }
    const result = await gptPrompt(prompt, {
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    console.log("Generated response from GPT:\n", result);

    context.response.body = JSON.stringify(result);
    context.response.type = "json";
  } catch (error) {
    console.error(error);
    context.response.body = "Error getting GPT response.";
  }
}

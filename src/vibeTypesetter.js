import { gptPrompt } from "./shared/openai.js";

export async function vibeTypeset(context) {
  try {
    const body = await context.request.body().value;
    const prompt = body.prompt;
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

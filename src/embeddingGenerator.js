import { availableFonts } from "./public/fonts.js";
import { generateEmbeddings } from "./shared/openai.js";

// Function to convert fonts and vibes to text
function fontToText(font) {
  return `${font.value}: ${font.vibes.join(", ")}`;
}

// Function to generate and store embeddings
export async function generateAndStoreEmbeddings() {
  const embeddings = {};
  for (const font of availableFonts) {
    const fontText = fontToText(font);
    console.log(fontText);
    const embedding = await generateEmbeddings(fontText);
    if (embedding) {
      embeddings[font.value] = embedding;
    } else {
      console.error(`Failed to generate embedding for ${font.value}`);
    }
  }
  // Store the embeddings object somewhere (e.g., file, database)
  //   console.log("Embeddings:", embeddings);
  try {
    const jsonData = JSON.stringify(embeddings);
    await Deno.writeTextFile("embeddings.json", jsonData);
    console.log("Embeddings saved to 'embeddings.json'");
  } catch (error) {
    console.error("Failed to save embeddings:", error);
  }
}

generateAndStoreEmbeddings();

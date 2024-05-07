// embeddingUtils.ts
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, curr, idx) => acc + curr * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, curr) => acc + curr ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, curr) => acc + curr ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}
// change working dirctory to the current file's directory
Deno.chdir(new URL(".", import.meta.url).pathname);
// log the current working directory with friendly message
console.log(`Current working directory: ${Deno.cwd()}`);

// Load embeddings from file
export async function loadEmbeddings() {
  const data = await Deno.readTextFile("embeddings.json");
  return JSON.parse(data);
}

// Suggest font based on the closest embedding match
export async function suggestFontBasedOnVibe(inputEmbedding, fontEmbeddings) {
  let suggestions = { headline: null, subhead: null, body: null };
  let highestSimilarity = { headline: -1, subhead: -1, body: -1 };

  for (const [fontName, embedding] of Object.entries(fontEmbeddings)) {
    const similarity = cosineSimilarity(inputEmbedding, embedding);

    // Assign fonts to different roles based on their computed similarity
    if (similarity > highestSimilarity.headline) {
      highestSimilarity.headline = similarity;
      suggestions.headline = fontName;
    } else if (similarity > highestSimilarity.subhead) {
      highestSimilarity.subhead = similarity;
      suggestions.subhead = fontName;
    } else if (similarity > highestSimilarity.body) {
      highestSimilarity.body = similarity;
      suggestions.body = fontName;
    }
  }
  return suggestions;
}

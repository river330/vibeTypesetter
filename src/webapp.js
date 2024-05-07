import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { createExitSignal, staticServer } from "../src/shared/server.ts";
import { vibeTypeset } from "./vibeTypesetter.js";
import { generateAndStoreEmbeddings } from "./embeddingGenerator.js"; // Assuming you've separated the function into its own module

import { Chalk } from "npm:chalk@5";
const chalk = new Chalk({ level: 1 });

// change working dirctory to the current file's directory
Deno.chdir(new URL(".", import.meta.url).pathname);
// log the current working directory with friendly message
console.log(`Current working directory: ${Deno.cwd()}`);

const app = new Application();
const router = new Router();

// API routes

router.post("/generate-embeddings", async (context) => {
  await generateAndStoreEmbeddings();
  context.response.body = {
    message: "Embeddings generated and stored successfully",
  };
  context.response.status = 200;
});

router.post("/upload", vibeTypeset);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticServer);

console.log(
  "\nListening on " + chalk.blueBright.underline("http://localhost:8000"),
);

await app.listen({ port: 8000, signal: createExitSignal() });

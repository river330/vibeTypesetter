// import { parse } from "https://deno.land/std@0.207.0/dotenv/mod.ts";

console.log("Hello, main.js");

const submit = document.getElementById("submit");
const vibeInput = document.getElementById("vibeInput");

const headlineSpan = document.getElementById("headline");
const subheadSpan = document.getElementById("subhead");
const bodySpan = document.getElementById("body");

function onSubmit() {
  console.log("submitting");
  const vibe = vibeInput.value;
  console.log(vibe);
  const prompt =
    `You are a designer trying to provide a type hierarchy based on the following vibes: ${vibe}. You will be providing option for a headline, subhead, and body, identifying the typeface, letterspacing, typecase for each one. In addition you will provide a font-size ratio for the three.
      When returning your response, make sure to structure it in JSON format and to include the following parameters: Do not include "'''json" in your response:
      {
        headline: {
            "font-size": 'this should be in reference to the body.font-size, so something like 1.5rem', 
            "typeface": 'helvetica',
            "letterspacing": '0.5px',
            "typecase": 'uppercase',
            "content": 'create a max-three word headline related to the ${vibe}',
        },
        subhead: {
            "font-size": 'this should be in reference to the body.font-size, so something like 1.25rem', 
            "typeface": 'helvetica',
            "letterspacing": '0.5px',
            "typecase": 'lowercase'
            "content": 'create a max-sentence long or preferably subhead related to the ${vibe}',
        },
        body: {
            "font-size": '16px',
            "typeface": 'helvetica',
            "letterspacing": '0.5px',
            "typecase": 'sentence':
            "content": 'create a fake body copy of max 4-sentences for the ${vibe}',
        }
      }`;

  headlineSpan.innerHTML = "loading...";
  subheadSpan.innerHTML = "loading...";
  bodySpan.innerHTML = "loading...";

  fetch(`/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      dataToJSON(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      headlineSpan.innerHTML = "failed:(";
      subheadSpan.innerHTML = "failed:(";
      bodySpan.innerHTML = "failed:(";
    });
}

submit.addEventListener("click", onSubmit);

async function dataToJSON(data) {
  const parsed = await JSON.parse(data);
  // const parsed = await data.json();
  console.log(data);

  console.log(parsed);
  updateSpans(parsed);
}

function updateSpans(data) {
  console.log("Updating spans with data:", data);
  console.log("Headline data:", data.headline);

  console.log(data.headline);

  // Check if the response includes the necessary data for all parts
  if (data.headline && data.subhead && data.body) {
    // Get the span elements from the document
    const headlineSpan = document.getElementById("headline");
    const subheadSpan = document.getElementById("subhead");
    const bodySpan = document.getElementById("body");

    // Update headline span with the content and styles
    headlineSpan.innerText = data.headline.content;
    headlineSpan.style.fontFamily = data.headline.typeface;
    headlineSpan.style.letterSpacing = data.headline.letterspacing;
    headlineSpan.style.fontSize = data.headline["font-size"];
    headlineSpan.style.textTransform = data.headline.typecase;

    // Update subhead span with the content and styles
    subheadSpan.innerText = data.subhead.content;
    subheadSpan.style.fontFamily = data.subhead.typeface;
    subheadSpan.style.letterSpacing = data.subhead.letterspacing;
    subheadSpan.style.fontSize = data.subhead["font-size"];
    subheadSpan.style.textTransform = data.subhead.typecase;

    // Update body span with the content and styles
    bodySpan.innerText = data.body.content;
    bodySpan.style.fontFamily = data.body.typeface;
    bodySpan.style.letterSpacing = data.body.letterspacing;
    bodySpan.style.fontSize = data.body["font-size"];
    bodySpan.style.textTransform = data.body.typecase;
  } else {
    console.error("Incomplete data received from server:", data);
  }
}

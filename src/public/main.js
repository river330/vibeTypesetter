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
      When returning your response, make sure to structure it in JSON format and to include the following parameters: Do not include "'''json" in your response and ALWAYS provide your responses in lowercase:
      {
        headline: {
            "font-size": '36' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '1' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typecase": 'uppercase'(CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
            "content": 'create a max-three word headline related to the ${vibe}',
        },
        subhead: {
            "font-size": '24' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typecase": 'lowercase' (CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
            "content": 'create a max-sentence long or preferably subhead related to the ${vibe}',
        },
        body: {
            "font-size": '12' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typecase": 'sentence'(CHOOSE ONLY BETWEEN 'capitalize', 'uppercase', 'lowercase', 'none'),
            "content": 'create a fake body copy of max 4-sentences for the ${vibe}',
        }
      }`;

  headlineSpan.innerHTML = "Loading...";
  subheadSpan.innerHTML = "Loading...";
  bodySpan.innerHTML = "Loading...";

  headlineSpan.style.opacity = "40%";
  subheadSpan.style.opacity = "40%";
  bodySpan.style.opacity = "40%";

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
  console.log(data);

  console.log(parsed);
  updateSpans(parsed);
}

function updateSpans(data) {
  headlineSpan.style.opacity = "100%";
  subheadSpan.style.opacity = "100%";
  bodySpan.style.opacity = "100%";
  console.log("Updating spans with data:", data);
  // Check if the response includes the necessary data for all parts
  if (data.headline && data.subhead && data.body) {
    // Get the span elements from the document
    updateContent(data, headlineSpan, subheadSpan, bodySpan);
    updateSize(data, headlineSpan, subheadSpan, bodySpan);
    updateLetterspacing(data, headlineSpan, subheadSpan, bodySpan);
    updateType(data, headlineSpan, subheadSpan, bodySpan);
    updateTypecase(data, headlineSpan, subheadSpan, bodySpan);
  } else {
    console.error("Incomplete data received from server:", data);
  }
}

function updateContent(data, headlineSpan, subheadSpan, bodySpan) {
  // Update headline span with the content and styles
  headlineSpan.innerText = data.headline.content;
  // Update subhead span with the content and styles
  subheadSpan.innerText = data.subhead.content;
  // Update body span with the content and styles
  bodySpan.innerText = data.body.content;
}
function updateSize(data, headlineSpan, subheadSpan, bodySpan) {
  const headlineSlider = document.getElementById("headlineSize");
  const subheadSlider = document.getElementById("subheadSize");
  const bodySlider = document.getElementById("bodySize");

  const headlineValue = document.getElementById("headlineSizeValue");
  const subheadValue = document.getElementById("subheadSizeValue");
  const bodyValue = document.getElementById("bodySizeValue");

  // Update headline span with the content and styles
  headlineSpan.style.fontSize = data.headline["font-size"] + "px";
  // Update subhead span with the content and styles
  subheadSpan.style.fontSize = data.subhead["font-size"] + "px";
  // Update body span with the content and styles
  bodySpan.style.fontSize = data.body["font-size"] + "px";

  headlineValue.textContent = data.headline["font-size"] + "px";
  subheadValue.textContent = data.subhead["font-size"] + "px";
  bodyValue.textContent = data.body["font-size"] + "px";

  headlineSlider.value = data.headline["font-size"];
  subheadSlider.value = data.subhead["font-size"];
  bodySlider.value = data.body["font-size"];
}
function updateLetterspacing(data, headlineSpan, subheadSpan, bodySpan) {
  const headlineSlider = document.getElementById("headlineLetterspacing");
  const subheadSlider = document.getElementById("subheadLetterspacing");
  const bodySlider = document.getElementById("bodyLetterspacing");

  const headlineValue = document.getElementById("headlineLetterspacingValue");
  const subheadValue = document.getElementById("subheadLetterspacingValue");
  const bodyValue = document.getElementById("bodyLetterspacingValue");

  // Update headline span with the content and styles
  headlineSpan.style.letterSpacing = data.headline.letterspacing + "px";
  // Update subhead span with the content and styles
  subheadSpan.style.letterSpacing = data.subhead.letterspacing + "px";
  // Update body span with the content and styles
  bodySpan.style.letterSpacing = data.body.letterspacing + "px";

  headlineValue.textContent = data.headline.letterspacing + "px";
  subheadValue.textContent = data.subhead.letterspacing + "px";
  bodyValue.textContent = data.body.letterspacing + "px";

  headlineSlider.value = data.headline.letterspacing;
  subheadSlider.value = data.subhead.letterspacing;
  bodySlider.value = data.body.letterspacing;
}
function updateType(data, headlineSpan, subheadSpan, bodySpan) {
  headlineSpan.style.fontFamily = data.headline.typeface;
  subheadSpan.style.fontFamily = data.subhead.typeface;
  bodySpan.style.fontFamily = data.body.typeface;

  const headlineSelect = document.getElementById("headlineType");
  const subheadSelect = document.getElementById("subheadType");
  const bodySelect = document.getElementById("bodyType");

  // console.log(data.headline.typeface);
  headlineSelect.value = data.headline.typeface;
  subheadSelect.value = data.subhead.typeface;

  console.log(data.body.typeface);
  bodySelect.value = data.body.typeface;
}
function updateTypecase(data, headlineSpan, subheadSpan, bodySpan) {
  headlineSpan.style.textTransform = data.headline.typecase;
  subheadSpan.style.textTransform = data.subhead.typecase;
  bodySpan.style.textTransform = data.body.typecase;

  const headlineSelect = document.getElementById("headlineCase");
  const subheadSelect = document.getElementById("subheadCase");
  const bodySelect = document.getElementById("bodyCase");

  // console.log(data.headline.typecase);
  headlineSelect.value = data.headline.typecase;
  subheadSelect.value = data.subhead.typecase;
  console.log(data.body.typecase);
  bodySelect.value = data.body.typecase;
}

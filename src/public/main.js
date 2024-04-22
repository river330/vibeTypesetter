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
            "font-size": '36' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '1' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typecase": 'uppercase',
            "content": 'create a max-three word headline related to the ${vibe}',
        },
        subhead: {
            "font-size": '24' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE), 
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typecase": 'lowercase'
            "content": 'create a max-sentence long or preferably subhead related to the ${vibe}',
        },
        body: {
            "font-size": '12' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
            "typeface": 'helvetica' (CHOOSE ONLY BETWEEN 'HELVETICA' OR 'GARAMOND'),
            "letterspacing": '0.5' (SET IT IN PX, DONT INCLUDE PX IN YOUR RESPONSE),
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
  console.log(data);

  console.log(parsed);
  updateSpans(parsed);
}

function updateSpans(data) {
  console.log("Updating spans with data:", data);
  // Check if the response includes the necessary data for all parts
  if (data.headline && data.subhead && data.body) {
    // Get the span elements from the document
    const headlineSpan = document.getElementById("headline");
    const subheadSpan = document.getElementById("subhead");
    const bodySpan = document.getElementById("body");

    updateContent(data, headlineSpan, subheadSpan, bodySpan);
    updateSize(data, headlineSpan, subheadSpan, bodySpan);
    updateLetterspacing(data, headlineSpan, subheadSpan, bodySpan);
    updateType(data, headlineSpan, subheadSpan, bodySpan);
  } else {
    console.error("Incomplete data received from server:", data);
  }
}

function updateType(data, headlineSpan, subheadSpan, bodySpan) {
  headlineSpan.style.fontFamily = data.headline.typeface;
  subheadSpan.style.fontFamily = data.subhead.typeface;
  bodySpan.style.fontFamily = data.body.typeface;
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
  console.log("finished updating size");

  headlineValue.textContent = data.headline["font-size"] + "px";
  subheadValue.textContent = data.subhead["font-size"] + "px";
  bodyValue.textContent = data.body["font-size"] + "px";
  console.log("finished updating slider labels");

  headlineSlider.value = data.headline["font-size"];
  subheadSlider.value = data.subhead["font-size"];
  bodySlider.value = data.body["font-size"];
  console.log("finished updating slider values");
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
  console.log("finished updating size");

  headlineValue.textContent = data.headline.letterspacing + "px";
  subheadValue.textContent = data.subhead.letterspacing + "px";
  bodyValue.textContent = data.body.letterspacing + "px";
  console.log("finished updating slider labels");

  headlineSlider.value = data.headline.letterspacing;
  subheadSlider.value = data.subhead.letterspacing;
  bodySlider.value = data.body.letterspacing;
  console.log("finished updating slider values");
}

// // Get the span elements from the document
// const headlineSpan = document.getElementById("headline");
// const subheadSpan = document.getElementById("subhead");
// const bodySpan = document.getElementById("body");

// const headlineSlider = document.getElementById("headlineSize");
// const subheadSlider = document.getElementById("subheadSize");
// const bodySlider = document.getElementById("bodySize");

// const headlineSizeValue = document.getElementById("headlineSizeValue");
// const subheadSizeValue = document.getElementById("subheadSizeValue");
// const bodySizeValue = document.getElementById("bodySizeValue");

// // Update headline span with the content and styles
// headlineSpan.innerText = data.headline.content;
// headlineSpan.style.fontFamily = data.headline.typeface;
// headlineSpan.style.letterSpacing = data.headline.letterspacing;
// headlineSpan.style.fontSize = data.headline["font-size"] + "px";
// headlineSpan.style.textTransform = data.headline.typecase;

// // Update subhead span with the content and styles
// subheadSpan.innerText = data.subhead.content;
// subheadSpan.style.fontFamily = data.subhead.typeface;
// subheadSpan.style.letterSpacing = data.subhead.letterspacing;
// subheadSpan.style.fontSize = data.subhead["font-size"] + "px";
// subheadSpan.style.textTransform = data.subhead.typecase;

// // Update body span with the content and styles
// bodySpan.innerText = data.body.content;
// bodySpan.style.fontFamily = data.body.typeface;
// bodySpan.style.letterSpacing = data.body.letterspacing;
// bodySpan.style.fontSize = data.body["font-size"] + "px";
// bodySpan.style.textTransform = data.body.typecase;

// headlineSizeValue.textContent = data.headline["font-size"] + "px";
// subheadSizeValue.textContent = data.subhead["font-size"] + "px";
// bodySizeValue.textContent = data.body["font-size"] + "px";
// console.log("finished updating slider number");

// headlineSlider.value = data.headline["font-size"];
// subheadSlider.value = data.subhead["font-size"];
// bodySlider.value = data.body["font-size"];
// console.log("finished updating slider value");

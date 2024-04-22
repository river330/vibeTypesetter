console.log("Hello, typesetter.js");

document.addEventListener("DOMContentLoaded", function () {
  const headlineSpan = document.getElementById("headline");
  const subheadSpan = document.getElementById("subhead");
  const bodySpan = document.getElementById("body");

  const headlineSlider = document.getElementById("headlineSize");
  const subheadSlider = document.getElementById("subheadSize");
  const bodySlider = document.getElementById("bodySize");

  const headlineSizeValue = document.getElementById("headlineSizeValue");
  const subheadSizeValue = document.getElementById("subheadSizeValue");
  const bodySizeValue = document.getElementById("bodySizeValue");

  headlineSlider.oninput = function () {
    headlineSizeValue.textContent = `${this.value}px`;
    headlineSpan.style.fontSize = `${this.value}px`;
  };

  subheadSlider.oninput = function () {
    subheadSizeValue.textContent = `${this.value}px`;
    subheadSpan.style.fontSize = `${this.value}px`;
  };

  bodySlider.oninput = function () {
    bodySizeValue.textContent = `${this.value}px`;
    bodySpan.style.fontSize = `${this.value}px`;
  };
});

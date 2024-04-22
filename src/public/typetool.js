console.log("Hello, typesetter.js");

document.addEventListener("DOMContentLoaded", function () {
  changeFont();
  changeSize();
  changeLetterspacing();
  changeTypecase();
});

function changeTypecase() {
  // Get the select elements
  let headlineSelect = document.getElementById("headlineCase");
  let subheadSelect = document.getElementById("subheadCase");
  let bodySelect = document.getElementById("bodyCase");

  // Function to change font
  function changeCase(selectElement, targetElementId) {
    let selectedValue = selectElement.value;
    document.getElementById(targetElementId).style.textTransform =
      selectedValue;
  }

  // Event listeners for each select element
  headlineSelect.addEventListener("change", function () {
    changeCase(this, "headline");
  });
  subheadSelect.addEventListener("change", function () {
    changeCase(this, "subhead");
  });
  bodySelect.addEventListener("change", function () {
    changCaset(this, "body");
  });
}

function changeFont() {
  // Get the select elements
  let headlineSelect = document.getElementById("headlineType");
  let subheadSelect = document.getElementById("subheadType");
  let bodySelect = document.getElementById("bodyType");

  // Function to change font
  function changeFont(selectElement, targetElementId) {
    var selectedValue = selectElement.value;
    document.getElementById(targetElementId).style.fontFamily = selectedValue;
  }

  // Event listeners for each select element
  headlineSelect.addEventListener("change", function () {
    changeFont(this, "headline");
  });
  subheadSelect.addEventListener("change", function () {
    changeFont(this, "subhead");
  });
  bodySelect.addEventListener("change", function () {
    changeFont(this, "body");
  });
}

function changeSize() {
  const headlineSlider = document.getElementById("headlineSize");
  const subheadSlider = document.getElementById("subheadSize");
  const bodySlider = document.getElementById("bodySize");

  const headlineSizeValue = document.getElementById("headlineSizeValue");
  const subheadSizeValue = document.getElementById("subheadSizeValue");
  const bodySizeValue = document.getElementById("bodySizeValue");

  headlineSlider.oninput = function () {
    const headlineSpan = document.getElementById("headline");
    headlineSizeValue.textContent = `${this.value}px`;
    headlineSpan.style.fontSize = `${this.value}px`;
  };
  subheadSlider.oninput = function () {
    const subheadSpan = document.getElementById("subhead");
    subheadSizeValue.textContent = `${this.value}px`;
    subheadSpan.style.fontSize = `${this.value}px`;
  };
  bodySlider.oninput = function () {
    const bodySpan = document.getElementById("body");
    bodySizeValue.textContent = `${this.value}px`;
    bodySpan.style.fontSize = `${this.value}px`;
  };
}
function changeLetterspacing() {
  const headlineSlider = document.getElementById("headlineLetterspacing");
  const subheadSlider = document.getElementById("subheadLetterspacing");
  const bodySlider = document.getElementById("bodyLetterspacing");

  const headlineSizeValue = document.getElementById(
    "headlineLetterspacingValue",
  );
  const subheadSizeValue = document.getElementById("subheadLetterspacingValue");
  const bodySizeValue = document.getElementById("bodyLetterspacingValue");

  headlineSlider.oninput = function () {
    const headlineSpan = document.getElementById("headline");
    headlineSizeValue.textContent = `${this.value}px`;
    headlineSpan.style.letterSpacing = `${this.value}px`;
    console.log(headlineSpan.style.letterspacing);
  };
  subheadSlider.oninput = function () {
    const subheadSpan = document.getElementById("subhead");
    subheadSizeValue.textContent = `${this.value}px`;
    subheadSpan.style.letterSpacing = `${this.value}px`;
  };
  bodySlider.oninput = function () {
    const bodySpan = document.getElementById("body");
    bodySizeValue.textContent = `${this.value}px`;
    bodySpan.style.letterSpacing = `${this.value}px`;
  };
}

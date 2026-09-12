const BREW_METHODS = [
  { name: "Espresso", range: "1–3", startingPoint: 2 },
  { name: "Moka pot", range: "3–5", startingPoint: 4 },
  { name: "AeroPress", range: "3–6", startingPoint: 4.5 },
  { name: "Pour over", range: "3–6", startingPoint: 5 },
  { name: "Electric drip", range: "5–8", startingPoint: 6.5 },
  { name: "French press", range: "7–10", startingPoint: 8.5 },
  { name: "Cold brew", range: "9–11", startingPoint: 10 },
  { name: "Turkish coffee", range: "Not supported", startingPoint: 1 }
];

const elements = {
  referenceTable: document.querySelector("#reference-table"),
  outerSlider: document.querySelector("#setting"),
  outerOutput: document.querySelector("#setting-output"),
  innerSlider: document.querySelector("#micro-setting"),
  innerOutput: document.querySelector("#micro-output"),
  dial: document.querySelector("#dial"),
  dialValue: document.querySelector("#dial-value")
};

function formatOuterSetting(value) {
  return Number(value).toFixed(2);
}

function formatInnerOffset(value) {
  if (value === 0) {
    return "0 clicks";
  }

  const sign = value > 0 ? "+" : "";
  const unit = Math.abs(value) === 1 ? "click" : "clicks";
  return `${sign}${value} ${unit}`;
}

function renderReferenceTable() {
  elements.referenceTable.innerHTML = BREW_METHODS.map(method => `
    <tr>
      <th scope="row">${method.name}</th>
      <td>${method.range}</td>
      <td>${method.startingPoint}</td>
    </tr>
  `).join("");
}

function updateDial() {
  const outerSetting = Number(elements.outerSlider.value);
  const innerOffset = Number(elements.innerSlider.value);
  const adjustedSetting = outerSetting + innerOffset / 6;

  elements.outerOutput.value = formatOuterSetting(outerSetting);
  elements.outerOutput.textContent = formatOuterSetting(outerSetting);
  elements.innerOutput.value = formatInnerOffset(innerOffset);
  elements.innerOutput.textContent = formatInnerOffset(innerOffset);
  elements.dialValue.textContent = adjustedSetting.toFixed(2);

  elements.dial.style.setProperty("--rotation", `${(outerSetting - 1) * 28}deg`);
  elements.dial.style.setProperty("--micro-rotation", `${innerOffset * 10}deg`);
}

elements.outerSlider.addEventListener("input", updateDial);
elements.innerSlider.addEventListener("input", updateDial);

renderReferenceTable();
updateDial();

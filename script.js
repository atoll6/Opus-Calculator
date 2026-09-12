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
  dialValue: document.querySelector("#dial-value"),
  nextFiner: document.querySelector("#next-finer"),
  nextFinerControls: document.querySelector("#next-finer-controls"),
  nextCoarser: document.querySelector("#next-coarser"),
  nextCoarserControls: document.querySelector("#next-coarser-controls")
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

function formatDialValue(value) {
  return value.toFixed(2);
}

function getNextAdjustment(outerSetting, innerOffset, direction) {
  const currentAdjusted = outerSetting + innerOffset / 6;
  const currentOuterSteps = Math.round(outerSetting * 4);
  const candidates = [];

  for (let outerSteps = 4; outerSteps <= 44; outerSteps += 1) {
    for (let inner = -6; inner <= 6; inner += 1) {
      const outer = outerSteps / 4;
      const adjusted = outer + inner / 6;
      const isInDirection = direction === "finer"
        ? adjusted < currentAdjusted - 0.001
        : adjusted > currentAdjusted + 0.001;

      if (isInDirection) {
        candidates.push({
          adjusted,
          outer,
          inner,
          distance: Math.abs(adjusted - currentAdjusted),
          movement: Math.abs(outerSteps - currentOuterSteps) + Math.abs(inner - innerOffset)
        });
      }
    }
  }

  candidates.sort((a, b) => a.distance - b.distance || a.movement - b.movement);
  return candidates[0] || null;
}

function updateNextAdjustments(outerSetting, innerOffset) {
  const finer = getNextAdjustment(outerSetting, innerOffset, "finer");
  const coarser = getNextAdjustment(outerSetting, innerOffset, "coarser");

  if (finer) {
    elements.nextFiner.textContent = formatDialValue(finer.adjusted);
    elements.nextFinerControls.textContent = `outer ${formatOuterSetting(finer.outer)}, inner ${formatInnerOffset(finer.inner)}`;
  } else {
    elements.nextFiner.textContent = "—";
    elements.nextFinerControls.textContent = "finest available setting";
  }

  if (coarser) {
    elements.nextCoarser.textContent = formatDialValue(coarser.adjusted);
    elements.nextCoarserControls.textContent = `outer ${formatOuterSetting(coarser.outer)}, inner ${formatInnerOffset(coarser.inner)}`;
  } else {
    elements.nextCoarser.textContent = "—";
    elements.nextCoarserControls.textContent = "coarsest available setting";
  }
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
  updateNextAdjustments(outerSetting, innerOffset);

  elements.dial.style.setProperty("--rotation", `${(outerSetting - 1) * 28}deg`);
  elements.dial.style.setProperty("--micro-rotation", `${innerOffset * 10}deg`);
}

elements.outerSlider.addEventListener("input", updateDial);
elements.innerSlider.addEventListener("input", updateDial);

renderReferenceTable();
updateDial();

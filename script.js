const PRESETS = [
  { id: "espresso", name: "Espresso", range: "1–3", value: 2, text: "Start around 2. If the shot runs fast, go finer." },
  { id: "moka", name: "Moka pot", range: "3–5", value: 4, text: "Start around 4; aim for a texture finer than filter coffee." },
  { id: "aeropress", name: "AeroPress", range: "3–6", value: 4.5, text: "Start around 4.5 and adjust for recipe and steep time." },
  { id: "pour-over", name: "Pour over", range: "3–6", value: 5, text: "Start around 5. A slower brew usually needs a coarser setting." },
  { id: "drip", name: "Electric drip", range: "5–8", value: 6.5, text: "Start around 6.5 for a balanced filter brew." },
  { id: "french-press", name: "French press", range: "7–10", value: 8.5, text: "Start around 8.5 for a coarse immersion grind." },
  { id: "cold-brew", name: "Cold brew", range: "9–11", value: 10, text: "Start around 10 for a coarse, immersion-style cold brew." },
  { id: "turkish", name: "Turkish coffee", range: "N/A", value: 1, text: "The Opus cannot reliably make true Turkish powder-fine coffee. Use 1 only as its finest approximation.", warning: true }
];

const presetContainer = document.querySelector("#presets");
const setting = document.querySelector("#setting");
const settingOutput = document.querySelector("#setting-output");
const microSetting = document.querySelector("#micro-setting");
const microOutput = document.querySelector("#micro-output");
const dial = document.querySelector("#dial");
const dialValue = document.querySelector("#dial-value");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const burrOutput = document.querySelector("#burr-output");
const switchText = document.querySelector("#switch-text");
const applyPreset = document.querySelector("#apply-preset");
const result = document.querySelector("#result");
let selectedPreset = PRESETS.find(preset => preset.id === "pour-over");

function formatSetting(value) {
  return Number(value).toFixed(2);
}

function formatMicro(value) {
  return value === 0 ? "0 clicks" : `${value > 0 ? "+" : ""}${value} ${Math.abs(value) === 1 ? "click" : "clicks"}`;
}

function update(value, preset, micro = Number(microSetting.value)) {
  const settingValue = Number(value);
  const microValue = Number(micro);
  const burrMovement = (settingValue - 1) * 50 + microValue * (50 / 3);
  setting.value = settingValue;
  microSetting.value = microValue;
  settingOutput.value = formatSetting(settingValue);
  settingOutput.textContent = formatSetting(settingValue);
  microOutput.value = formatMicro(microValue);
  microOutput.textContent = formatMicro(microValue);
  dialValue.textContent = `${settingValue % 1 ? settingValue.toFixed(2) : settingValue} ${microValue >= 0 ? "+" : "−"} ${Math.abs(microValue)}`;
  dial.style.setProperty("--rotation", `${(settingValue - 1) * 28}deg`);
  dial.style.setProperty("--micro-rotation", `${microValue * 10}deg`);
  resultTitle.textContent = `${preset.name}: ${settingValue % 1 ? settingValue.toFixed(2) : settingValue} ${microValue >= 0 ? "+" : "−"} ${Math.abs(microValue)} micro`;
  resultText.textContent = preset.text;
  burrOutput.textContent = `${burrMovement >= 0 ? "+" : "−"}${Math.abs(burrMovement).toFixed(1)} µm`;
  const delta = preset.value - settingValue;
  switchText.textContent = preset.id === "custom" ? "Custom setting" : delta === 0 ? `${preset.name} is selected` : `Switch to ${preset.name}: ${delta > 0 ? "+" : "−"}${Math.abs(delta).toFixed(2)} macro`;
  applyPreset.hidden = preset.id === "custom" || delta === 0;
  result.classList.toggle("warning", Boolean(preset.warning));
  document.querySelectorAll("[data-preset]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.preset === preset.id));
  });
}

PRESETS.forEach(preset => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.preset = preset.id;
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = `${preset.name}<small>${preset.range === "N/A" ? "not supported" : `Opus ${preset.range}`}</small>`;
  button.addEventListener("click", () => {
    selectedPreset = preset;
    update(Number(setting.value), preset);
  });
  presetContainer.append(button);
});

setting.addEventListener("input", event => {
  const value = Number(event.target.value);
  update(value, { id: "custom", name: "Custom setting", range: formatSetting(value), value, text: "Taste and brew time are the best guide for dialing in a custom setting." });
});

microSetting.addEventListener("input", event => {
  const value = Number(setting.value);
  const micro = Number(event.target.value);
  const preset = PRESETS.find(item => item.value === value) || { id: "custom", name: "Custom setting", value, text: "Taste and brew time are the best guide for dialing in a custom setting." };
  update(value, preset, micro);
});

applyPreset.addEventListener("click", () => update(selectedPreset.value, selectedPreset, 0));
update(5, selectedPreset);

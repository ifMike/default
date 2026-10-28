import { Calculator } from "./calculator.js";

const calc = new Calculator();
const displayEl = document.getElementById("display");

function refreshDisplay() {
  displayEl.textContent = calc.displayValue;
}

function handleButton(label) {
  if (/^[0-9]$/.test(label)) {
    calc.inputDigit(label);
  } else if (label === ".") {
    calc.inputDecimal();
  } else if (label === "AC") {
    calc.clear();
  } else if (label === "+") {
    calc.add();
  } else if (label === "=") {
    calc.equals();
  }
  refreshDisplay();
}

document.querySelector(".keypad").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-key]");
  if (!button) {
    return;
  }
  handleButton(button.dataset.key);
});

refreshDisplay();

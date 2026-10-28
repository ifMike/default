import { Calculator } from "./calculator.js";

const calc = new Calculator();

const displayEl = document.getElementById("display");
const keysEl = document.getElementById("keys");

function render() {
  displayEl.textContent = calc.displayValue;
  displayEl.setAttribute("aria-label", `Display ${calc.displayValue}`);
}

function handleKey(action, value) {
  switch (action) {
    case "digit":
      calc.inputDigit(value);
      break;
    case "decimal":
      calc.inputDecimal();
      break;
    case "add":
      calc.add();
      break;
    case "clear":
      calc.clear();
      break;
    default:
      break;
  }
  render();
}

keysEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  handleKey(button.dataset.action, button.dataset.value);
});

render();

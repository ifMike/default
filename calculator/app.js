import { Calculator } from "./calculator.js";

const calc = new Calculator();
const totalEl = document.getElementById("total-display");
const entryEl = document.getElementById("entry-display");

function render() {
  totalEl.textContent = calc.getDisplayTotal();
  const entry = calc.entry;
  entryEl.textContent = entry !== "" ? entry : "";
  entryEl.setAttribute("aria-hidden", entry === "" ? "true" : "false");
}

function handleDigit(digit) {
  calc.appendDigit(digit);
  render();
}

function handleAdd() {
  calc.add();
  render();
}

function handleClear() {
  calc.clear();
  render();
}

document.querySelector(".keypad").addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const digit = target.dataset.digit;
  if (digit) {
    handleDigit(digit);
    return;
  }

  const action = target.dataset.action;
  if (action === "add") {
    handleAdd();
  } else if (action === "clear") {
    handleClear();
  }
});

document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) {
    handleDigit(event.key);
    return;
  }
  if (event.key === "+" || event.key === "Enter") {
    event.preventDefault();
    handleAdd();
    return;
  }
  if (event.key === "Escape" || event.key.toLowerCase() === "c") {
    handleClear();
  }
});

render();

import { Calculator } from "./calculator-core.js";

const calc = new Calculator();

const displayEl = document.getElementById("display");
const totalLabelEl = document.getElementById("total-label");

function refresh() {
  displayEl.textContent = calc.getDisplayValue();
  totalLabelEl.textContent = `Total ${calc.getTotal()}`;
}

document.querySelectorAll("[data-digit]").forEach((btn) => {
  btn.addEventListener("click", () => {
    calc.appendDigit(btn.dataset.digit);
    refresh();
  });
});

document.getElementById("btn-add").addEventListener("click", () => {
  calc.add();
  refresh();
});

document.getElementById("btn-clear").addEventListener("click", () => {
  calc.clear();
  refresh();
});

refresh();

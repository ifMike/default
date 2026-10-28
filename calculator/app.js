export class Calculator {
  constructor() {
    this.reset();
  }

  reset() {
    this.total = 0;
    this.currentInput = "";
    this.lastOperator = null;
  }

  inputDigit(digit) {
    if (this.currentInput === "0" && digit !== ".") {
      this.currentInput = String(digit);
      return;
    }
    if (digit === "." && this.currentInput.includes(".")) {
      return;
    }
    this.currentInput += String(digit);
  }

  getDisplayValue() {
    if (this.currentInput !== "") {
      return this.currentInput;
    }
    return String(this.total);
  }

  getRunningTotal() {
    const current = this.currentInput === "" ? 0 : Number(this.currentInput);
    if (this.lastOperator === "+") {
      return this.total + current;
    }
    return this.currentInput === "" ? this.total : current;
  }

  add() {
    this.commitPending();
    this.lastOperator = "+";
    this.total = this.getRunningTotal();
    this.currentInput = "";
  }

  equals() {
    if (this.lastOperator === "+") {
      this.total = this.getRunningTotal();
    } else if (this.currentInput !== "") {
      this.total = Number(this.currentInput);
    }
    this.currentInput = "";
    this.lastOperator = null;
  }

  clear() {
    this.reset();
  }

  commitPending() {
    if (this.lastOperator === "+" && this.currentInput !== "") {
      this.total = this.total + Number(this.currentInput);
      this.currentInput = "";
    }
  }
}

export function bindCalculator(root) {
  const display = root.querySelector("[data-display]");
  const calc = new Calculator();

  const render = () => {
    display.textContent = calc.getDisplayValue();
    display.dataset.total = String(calc.getRunningTotal());
  };

  root.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const { action, digit } = button.dataset;

    switch (action) {
      case "digit":
        calc.inputDigit(digit);
        break;
      case "add":
        calc.add();
        break;
      case "equals":
        calc.equals();
        break;
      case "clear":
        calc.clear();
        break;
      default:
        break;
    }

    render();
  });

  render();
  return calc;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".calculator");
    if (root) {
      bindCalculator(root);
    }
  });
}

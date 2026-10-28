/**
 * Simple running-total calculator: digits build an entry; + adds the entry to the total.
 */
export class Calculator {
  constructor() {
    this.runningTotal = 0;
    this.entry = "";
  }

  get displayValue() {
    if (this.entry !== "") {
      return this.entry;
    }
    return String(this.runningTotal);
  }

  pressDigit(digit) {
    if (!/^[0-9]$/.test(digit)) {
      throw new Error(`Invalid digit: ${digit}`);
    }
    if (this.entry === "0") {
      this.entry = digit;
    } else {
      this.entry += digit;
    }
  }

  pressAdd() {
    const value = this.entry === "" ? 0 : Number(this.entry);
    this.runningTotal += value;
    this.entry = "";
  }

  pressClear() {
    this.runningTotal = 0;
    this.entry = "";
  }
}

function bindCalculator(root) {
  const totalEl = root.querySelector("#total");
  const calc = new Calculator();

  function render() {
    totalEl.textContent = calc.displayValue;
  }

  root.querySelector(".keys").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-digit], button[data-action]");
    if (!button) {
      return;
    }

    if (button.dataset.digit) {
      calc.pressDigit(button.dataset.digit);
    } else if (button.dataset.action === "add") {
      calc.pressAdd();
    } else if (button.dataset.action === "clear") {
      calc.pressClear();
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

/**
 * Simple adding calculator with a running total.
 */
export class Calculator {
  constructor() {
    this.resetAll();
  }

  resetAll() {
    this.runningTotal = 0;
    this.display = "0";
    this.entry = null;
    this.awaitingEntry = true;
  }

  getDisplay() {
    return this.display;
  }

  getRunningTotal() {
    return this.runningTotal;
  }

  inputDigit(digit) {
    const d = String(digit);
    if (!/^\d$/.test(d)) {
      return;
    }

    if (this.awaitingEntry || this.entry === null) {
      this.entry = d;
      this.awaitingEntry = false;
    } else if (this.entry === "0") {
      this.entry = d;
    } else {
      this.entry += d;
    }

    this.display = this.entry;
  }

  add() {
    const value = this.currentEntryValue();
    this.runningTotal = roundResult(this.runningTotal + value);
    this.display = formatDisplay(this.runningTotal);
    this.entry = null;
    this.awaitingEntry = true;
  }

  clear() {
    this.display = "0";
    this.entry = null;
    this.awaitingEntry = true;
    this.runningTotal = 0;
  }

  currentEntryValue() {
    if (this.entry !== null) {
      return Number(this.entry);
    }
    return Number(this.display) || 0;
  }
}

function roundResult(value) {
  return Math.round((value + Number.EPSILON) * 1e10) / 1e10;
}

function formatDisplay(value) {
  const rounded = roundResult(value);
  return String(rounded);
}

export function bindCalculator(root, calculator = new Calculator()) {
  const displayEl = root.querySelector('[data-testid="display"]');
  if (!displayEl) {
    throw new Error("Calculator display element not found");
  }

  const render = () => {
    displayEl.textContent = calculator.getDisplay();
    displayEl.setAttribute("data-running-total", String(calculator.getRunningTotal()));
  };

  root.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    if (action === "digit") {
      calculator.inputDigit(button.dataset.digit);
    } else if (action === "add") {
      calculator.add();
    } else if (action === "clear") {
      calculator.clear();
    }

    render();
  });

  render();
  return calculator;
}

/**
 * Simple addition calculator with a running total.
 */
export class Calculator {
  constructor() {
    this.reset();
  }

  reset() {
    this.runningTotal = 0;
    this.entry = "0";
    this.justAdded = false;
  }

  get displayValue() {
    return this.entry;
  }

  get total() {
    return this.runningTotal;
  }

  inputDigit(digit) {
    if (this.justAdded) {
      this.entry = String(digit);
      this.justAdded = false;
      return;
    }
    if (this.entry === "0") {
      this.entry = String(digit);
    } else {
      this.entry += String(digit);
    }
  }

  inputDecimal() {
    if (this.justAdded) {
      this.entry = "0.";
      this.justAdded = false;
      return;
    }
    if (!this.entry.includes(".")) {
      this.entry += ".";
    }
  }

  add() {
    const value = parseFloat(this.entry) || 0;
    this.runningTotal += value;
    this.entry = formatNumber(this.runningTotal);
    this.justAdded = true;
  }

  clear() {
    this.reset();
  }
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return "0";
  const rounded = Math.round(n * 1e10) / 1e10;
  return String(rounded);
}

/**
 * Simple adding calculator: accumulates numbers into a running total.
 */
export class Calculator {
  constructor() {
    this.runningTotal = 0;
    this.entry = "";
  }

  /** @returns {string} */
  getDisplayTotal() {
    return formatNumber(this.runningTotal);
  }

  /** @returns {string} */
  getDisplayEntry() {
    if (this.entry !== "") {
      return this.entry;
    }
    return formatNumber(this.runningTotal);
  }

  /** @param {string} digit */
  appendDigit(digit) {
    if (!/^\d$/.test(digit)) {
      return;
    }
    if (this.entry === "0") {
      this.entry = digit;
      return;
    }
    this.entry += digit;
  }

  /** @param {string} [text] */
  setEntryFromString(text) {
    const trimmed = String(text).trim();
    if (trimmed === "" || trimmed === "-") {
      this.entry = trimmed;
      return;
    }
    const value = Number(trimmed);
    if (!Number.isFinite(value)) {
      return;
    }
    this.entry = trimmed;
  }

  add() {
    const value = this.entry === "" ? 0 : Number(this.entry);
    if (!Number.isFinite(value)) {
      return;
    }
    this.runningTotal += value;
    this.entry = "";
  }

  clear() {
    this.runningTotal = 0;
    this.entry = "";
  }
}

/** @param {number} value */
function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}

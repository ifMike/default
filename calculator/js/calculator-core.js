/**
 * Pure calculator logic: running total with add-to-total and clear.
 */
export class Calculator {
  constructor() {
    this.total = 0;
    this.entry = "";
  }

  /** @returns {number} */
  getTotal() {
    return this.total;
  }

  /** @returns {string} */
  getEntry() {
    return this.entry;
  }

  /**
   * Value shown in the main display: current entry while typing, otherwise total.
   * @returns {string}
   */
  getDisplayValue() {
    if (this.entry !== "") {
      return this.entry;
    }
    return formatNumber(this.total);
  }

  /**
   * @param {string} digit - "0"-"9" or "."
   */
  appendDigit(digit) {
    if (digit === ".") {
      if (this.entry.includes(".")) {
        return;
      }
      if (this.entry === "") {
        this.entry = "0.";
        return;
      }
    }
    if (digit !== "." && this.entry === "0" && !this.entry.includes(".")) {
      this.entry = digit;
      return;
    }
    this.entry += digit;
  }

  /** Add current entry to running total; empty entry counts as 0. @returns {number} */
  add() {
    const value = this.entry === "" ? 0 : parseFloat(this.entry);
    if (Number.isNaN(value)) {
      return this.total;
    }
    this.total = roundAmount(this.total + value);
    this.entry = "";
    return this.total;
  }

  clear() {
    this.total = 0;
    this.entry = "";
  }
}

function roundAmount(n) {
  return Math.round(n * 1e10) / 1e10;
}

function formatNumber(n) {
  if (!Number.isFinite(n)) {
    return "0";
  }
  const s = String(n);
  if (s.includes("e")) {
    return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
  }
  return s;
}

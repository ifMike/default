/**
 * Simple addition calculator with a running total on the display.
 */
export class Calculator {
  constructor() {
    this.reset();
  }

  /** Current value shown on the display (running total / entry). */
  get displayValue() {
    return this._display;
  }

  reset() {
    this._display = "0";
    this._accumulator = null;
    this._awaitingOperand = false;
  }

  clear() {
    this.reset();
  }

  /**
   * @param {string} digit Single character 0-9
   */
  inputDigit(digit) {
    if (!/^[0-9]$/.test(digit)) {
      return;
    }
    if (this._awaitingOperand) {
      this._display = digit;
      this._awaitingOperand = false;
    } else {
      this._display = this._display === "0" ? digit : this._display + digit;
    }
  }

  inputDecimal() {
    if (this._awaitingOperand) {
      this._display = "0.";
      this._awaitingOperand = false;
      return;
    }
    if (!this._display.includes(".")) {
      this._display += ".";
    }
  }

  /** Queue addition: applies any pending add, keeps running total on display. */
  add() {
    const current = parseFloat(this._display);
    if (this._accumulator === null) {
      this._accumulator = current;
    } else if (!this._awaitingOperand) {
      this._accumulator += current;
    }
    this._display = formatNumber(this._accumulator);
    this._awaitingOperand = true;
  }

  /** Finalize chained addition and show sum on display. */
  equals() {
    if (this._accumulator !== null && !this._awaitingOperand) {
      const current = parseFloat(this._display);
      this._accumulator += current;
      this._display = formatNumber(this._accumulator);
    }
    this._accumulator = null;
    this._awaitingOperand = true;
  }
}

function formatNumber(value) {
  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  const str = String(rounded);
  if (str.includes("e") || str.includes("E")) {
    return str;
  }
  return str;
}

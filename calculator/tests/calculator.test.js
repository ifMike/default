import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Calculator } from "../app.js";

describe("Calculator", () => {
  it("starts with a running total of zero", () => {
    const calc = new Calculator();
    assert.equal(calc.getDisplayValue(), "0");
    assert.equal(calc.getRunningTotal(), 0);
  });

  it("adds two numbers to the correct sum", () => {
    const calc = new Calculator();
    calc.inputDigit("2");
    calc.add();
    calc.inputDigit("3");
    calc.equals();
    assert.equal(calc.getDisplayValue(), "5");
    assert.equal(calc.getRunningTotal(), 5);
  });

  it("clear resets the display", () => {
    const calc = new Calculator();
    calc.inputDigit("9");
    calc.add();
    calc.inputDigit("1");
    calc.clear();
    assert.equal(calc.getDisplayValue(), "0");
    assert.equal(calc.getRunningTotal(), 0);
  });

  it("shows running total while entering the second operand", () => {
    const calc = new Calculator();
    calc.inputDigit("2");
    calc.add();
    calc.inputDigit("3");
    assert.equal(calc.getRunningTotal(), 5);
    assert.equal(calc.getDisplayValue(), "3");
  });
});

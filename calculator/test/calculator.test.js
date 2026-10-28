import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Calculator } from "../js/calculator.js";

describe("Calculator", () => {
  it("starts with display 0 and running total 0", () => {
    const calc = new Calculator();
    assert.equal(calc.displayValue, "0");
    assert.equal(calc.total, 0);
  });

  it("adds two numbers and shows the correct sum on the display", () => {
    const calc = new Calculator();
    calc.inputDigit(5);
    calc.add();
    assert.equal(calc.displayValue, "5");
    assert.equal(calc.total, 5);
    calc.inputDigit(3);
    calc.add();
    assert.equal(calc.displayValue, "8");
    assert.equal(calc.total, 8);
  });

  it("keeps a running total across multiple additions", () => {
    const calc = new Calculator();
    calc.inputDigit(2);
    calc.add();
    calc.inputDigit(3);
    calc.add();
    calc.inputDigit(4);
    calc.add();
    assert.equal(calc.displayValue, "9");
    assert.equal(calc.total, 9);
  });

  it("clear resets the display and running total", () => {
    const calc = new Calculator();
    calc.inputDigit(9);
    calc.add();
    calc.inputDigit(1);
    calc.clear();
    assert.equal(calc.displayValue, "0");
    assert.equal(calc.total, 0);
  });
});

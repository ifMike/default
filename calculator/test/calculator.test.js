import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Calculator } from "../js/calculator-core.js";

describe("Calculator", () => {
  it("starts with zero total and display", () => {
    const calc = new Calculator();
    assert.equal(calc.getTotal(), 0);
    assert.equal(calc.getDisplayValue(), "0");
  });

  it("adds two numbers to the running total", () => {
    const calc = new Calculator();
    calc.appendDigit("5");
    calc.add();
    assert.equal(calc.getTotal(), 5);
    calc.appendDigit("3");
    calc.add();
    assert.equal(calc.getTotal(), 8);
    assert.equal(calc.getDisplayValue(), "8");
  });

  it("clear resets total and display", () => {
    const calc = new Calculator();
    calc.appendDigit("1");
    calc.appendDigit("2");
    calc.add();
    calc.clear();
    assert.equal(calc.getTotal(), 0);
    assert.equal(calc.getDisplayValue(), "0");
    assert.equal(calc.getEntry(), "");
  });

  it("supports decimal addition", () => {
    const calc = new Calculator();
    calc.appendDigit("1");
    calc.appendDigit(".");
    calc.appendDigit("5");
    calc.add();
    calc.appendDigit("2");
    calc.appendDigit(".");
    calc.appendDigit("5");
    calc.add();
    assert.equal(calc.getTotal(), 4);
  });
});

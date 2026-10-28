import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Calculator } from "../app.js";

describe("Calculator", () => {
  it("starts with a running total of zero on the display", () => {
    const calc = new Calculator();
    assert.equal(calc.displayValue, "0");
    assert.equal(calc.runningTotal, 0);
  });

  it("adds two numbers to show the correct sum", () => {
    const calc = new Calculator();
    calc.pressDigit("2");
    calc.pressAdd();
    assert.equal(calc.runningTotal, 2);
    assert.equal(calc.displayValue, "2");

    calc.pressDigit("3");
    calc.pressAdd();
    assert.equal(calc.runningTotal, 5);
    assert.equal(calc.displayValue, "5");
  });

  it("clear resets the display and running total", () => {
    const calc = new Calculator();
    calc.pressDigit("9");
    calc.pressAdd();
    calc.pressClear();
    assert.equal(calc.runningTotal, 0);
    assert.equal(calc.displayValue, "0");
  });
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createCalculator } from "../calculator.js";

describe("createCalculator", () => {
  it("shows a running total starting at zero", () => {
    const calc = createCalculator();
    assert.equal(calc.getRunningTotal(), 0);
    assert.equal(calc.getDisplayValue(), "0");
  });

  it("adding two numbers shows the correct sum", () => {
    const calc = createCalculator();
    calc.setEntry("12");
    calc.add();
    calc.setEntry("34");
    calc.add();
    assert.equal(calc.getRunningTotal(), 46);
    assert.equal(calc.getDisplayValue(), "46");
  });

  it("clear resets the display and running total", () => {
    const calc = createCalculator();
    calc.setEntry("9");
    calc.add();
    calc.clear();
    assert.equal(calc.getRunningTotal(), 0);
    assert.equal(calc.getDisplayValue(), "0");
  });
});

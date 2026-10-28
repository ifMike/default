import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { Calculator, bindCalculator } from "../calculator.js";

describe("Calculator", () => {
  it("starts with a zero display and running total", () => {
    const calc = new Calculator();
    assert.equal(calc.getDisplay(), "0");
    assert.equal(calc.getRunningTotal(), 0);
  });

  it("adds two numbers to the running total", () => {
    const calc = new Calculator();
    calc.inputDigit(2);
    calc.add();
    calc.inputDigit(3);
    calc.add();
    assert.equal(calc.getRunningTotal(), 5);
    assert.equal(calc.getDisplay(), "5");
  });

  it("clear resets the display and running total", () => {
    const calc = new Calculator();
    calc.inputDigit(9);
    calc.add();
    calc.clear();
    assert.equal(calc.getDisplay(), "0");
    assert.equal(calc.getRunningTotal(), 0);
  });
});

describe("bindCalculator", () => {
  it("updates the display when buttons are clicked", () => {
    const dom = new JSDOM(`<!DOCTYPE html><main data-testid="calculator">
      <p data-testid="display">0</p>
      <button data-action="digit" data-digit="2"></button>
      <button data-action="digit" data-digit="3"></button>
      <button data-action="add"></button>
      <button data-action="clear"></button>
    </main>`);

    const root = dom.window.document.querySelector('[data-testid="calculator"]');
    bindCalculator(root);

    root.querySelector('[data-action="digit"][data-digit="2"]').click();
    root.querySelector('[data-action="digit"][data-digit="3"]').click();
    root.querySelector('[data-action="add"]').click();

    const display = root.querySelector('[data-testid="display"]');
    assert.equal(display.textContent, "23");

    root.querySelector('[data-action="clear"]').click();
    assert.equal(display.textContent, "0");
  });
});

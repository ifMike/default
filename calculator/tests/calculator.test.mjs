import assert from "node:assert/strict";
import test from "node:test";
import { Calculator } from "../js/calculator.js";

function pressDigits(calc, sequence) {
  for (const char of sequence) {
    if (char === ".") {
      calc.inputDecimal();
    } else {
      calc.inputDigit(char);
    }
  }
}

test("starts with running total of zero on the display", () => {
  const calc = new Calculator();
  assert.equal(calc.displayValue, "0");
});

test("clear resets the display", () => {
  const calc = new Calculator();
  pressDigits(calc, "42");
  calc.clear();
  assert.equal(calc.displayValue, "0");
});

test("adding two numbers shows the correct sum", () => {
  const calc = new Calculator();
  pressDigits(calc, "5");
  calc.add();
  pressDigits(calc, "3");
  calc.equals();
  assert.equal(calc.displayValue, "8");
});

test("plus updates the running total on the display", () => {
  const calc = new Calculator();
  pressDigits(calc, "12");
  calc.add();
  assert.equal(calc.displayValue, "12");
  pressDigits(calc, "8");
  calc.add();
  assert.equal(calc.displayValue, "20");
});

test("supports decimal addition", () => {
  const calc = new Calculator();
  pressDigits(calc, "1.5");
  calc.add();
  pressDigits(calc, "2.25");
  calc.equals();
  assert.equal(calc.displayValue, "3.75");
});

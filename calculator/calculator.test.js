import { describe, expect, it } from "vitest";
import { Calculator } from "./calculator.js";

describe("Calculator", () => {
  it("starts with a running total of zero", () => {
    const calc = new Calculator();
    expect(calc.getDisplayTotal()).toBe("0");
    expect(calc.getDisplayEntry()).toBe("0");
  });

  it("adds two numbers to the running total", () => {
    const calc = new Calculator();
    calc.appendDigit("2");
    calc.add();
    expect(calc.getDisplayTotal()).toBe("2");

    calc.appendDigit("3");
    calc.add();
    expect(calc.getDisplayTotal()).toBe("5");
  });

  it("clear resets the display", () => {
    const calc = new Calculator();
    calc.appendDigit("9");
    calc.add();
    calc.appendDigit("1");
    calc.clear();

    expect(calc.getDisplayTotal()).toBe("0");
    expect(calc.getDisplayEntry()).toBe("0");
  });
});

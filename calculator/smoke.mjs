/** Mirrors calculator/index.html logic for a quick smoke check (no browser). */
function createCalculator() {
  let runningTotal = 0;
  let currentInput = "0";

  function currentNumber() {
    return parseFloat(currentInput) || 0;
  }

  function appendDigit(digit) {
    if (currentInput === "0") {
      currentInput = String(digit);
    } else {
      currentInput += String(digit);
    }
  }

  function addToRunningTotal() {
    runningTotal += currentNumber();
    currentInput = "0";
  }

  function clearAll() {
    runningTotal = 0;
    currentInput = "0";
  }

  return {
    getRunningTotal: () => runningTotal,
    getCurrentInput: () => currentInput,
    appendDigit,
    addToRunningTotal,
    clearAll,
  };
}

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

const calc = createCalculator();
assert(calc.getRunningTotal() === 0, "initial running total should be 0");

calc.appendDigit("2");
calc.addToRunningTotal();
assert(calc.getRunningTotal() === 2, "2 added to total");

calc.appendDigit("3");
calc.addToRunningTotal();
assert(calc.getRunningTotal() === 5, "2 + 3 = 5");

calc.clearAll();
assert(calc.getRunningTotal() === 0, "clear resets running total");
assert(calc.getCurrentInput() === "0", "clear resets display");

console.log("OK: calculator smoke checks passed");

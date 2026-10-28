/**
 * Simple running-total calculator: each Add folds the current entry into the total.
 */
export function createCalculator() {
  let runningTotal = 0;
  let currentEntry = "";

  function normalizeEntry(entry) {
    const trimmed = String(entry).trim();
    if (trimmed === "" || trimmed === "-") {
      return 0;
    }
    const value = Number(trimmed);
    return Number.isFinite(value) ? value : 0;
  }

  return {
    getRunningTotal() {
      return runningTotal;
    },

    getDisplayValue() {
      if (currentEntry !== "") {
        return currentEntry;
      }
      return String(runningTotal);
    },

    appendDigit(digit) {
      if (digit === "." && currentEntry.includes(".")) {
        return;
      }
      if (currentEntry === "0" && digit !== ".") {
        currentEntry = String(digit);
        return;
      }
      currentEntry += String(digit);
    },

    setEntry(entry) {
      currentEntry = entry === "" ? "" : String(entry);
    },

    add() {
      runningTotal += normalizeEntry(currentEntry);
      currentEntry = "";
      return runningTotal;
    },

    clear() {
      runningTotal = 0;
      currentEntry = "";
    },
  };
}

export function bindCalculator(root) {
  const calc = createCalculator();
  const display = root.querySelector("[data-testid=display]");

  function refreshDisplay() {
    display.textContent = calc.getDisplayValue();
    display.dataset.runningTotal = String(calc.getRunningTotal());
  }

  root.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const { action, digit } = button.dataset;

    switch (action) {
      case "digit":
        calc.appendDigit(digit);
        break;
      case "add":
        calc.add();
        break;
      case "clear":
        calc.clear();
        break;
      default:
        break;
    }

    refreshDisplay();
  });

  refreshDisplay();
  return calc;
}

if (typeof window !== "undefined") {
  window.createCalculator = createCalculator;
  window.bindCalculator = bindCalculator;
}

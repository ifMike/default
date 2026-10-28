(function () {
  const displayEl = document.getElementById("display");
  const runningTotalEl = document.getElementById("running-total");
  const keysEl = document.getElementById("keys");

  let runningTotal = 0;
  let entry = "0";
  let entryCommitted = false;

  function formatValue(value) {
    if (!Number.isFinite(value)) {
      return "0";
    }
    const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
    return String(rounded);
  }

  function render() {
    displayEl.textContent = entry;
    runningTotalEl.textContent = formatValue(runningTotal);
  }

  function startNewEntry() {
    entry = "0";
    entryCommitted = false;
    render();
  }

  function appendDigit(digit) {
    if (entryCommitted) {
      entry = digit === "." ? "0." : digit;
      entryCommitted = false;
    } else if (digit === ".") {
      if (entry.includes(".")) {
        return;
      }
      entry = entry === "0" ? "0." : entry + ".";
    } else if (entry === "0") {
      entry = digit;
    } else {
      entry += digit;
    }
    render();
  }

  function readEntryValue() {
    const value = Number.parseFloat(entry);
    return Number.isFinite(value) ? value : 0;
  }

  function addEntryToTotal() {
    runningTotal += readEntryValue();
    entry = "0";
    entryCommitted = false;
    render();
  }

  function clearAll() {
    runningTotal = 0;
    startNewEntry();
  }

  keysEl.addEventListener("click", (event) => {
    const button = event.target.closest("button.key");
    if (!button || button.disabled) {
      return;
    }

    const digit = button.dataset.digit;
    if (digit !== undefined) {
      appendDigit(digit);
      return;
    }

    switch (button.dataset.action) {
      case "clear":
        clearAll();
        break;
      case "add":
        addEntryToTotal();
        break;
      case "equals":
        addEntryToTotal();
        break;
      default:
        break;
    }
  });

  render();
})();

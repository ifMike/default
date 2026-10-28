(function () {
  const totalEl = document.getElementById("total");
  const clearBtn = document.getElementById("btn-clear");
  const addBtn = document.getElementById("btn-add");
  const equalsBtn = document.getElementById("btn-equals");
  const digitButtons = document.querySelectorAll("[data-digit]");

  let runningTotal = 0;
  let entry = "";
  let entryCommitted = false;

  function formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "0";
    }
    const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
    return String(rounded);
  }

  function renderTotal() {
    const visible =
      entry !== "" && !entryCommitted ? entry : formatNumber(runningTotal);
    totalEl.textContent = visible;
    totalEl.dataset.runningTotal = formatNumber(runningTotal);
  }

  function appendDigit(digit) {
    if (entryCommitted) {
      entry = "";
      entryCommitted = false;
    }
    if (digit === "." && entry.includes(".")) {
      return;
    }
    if (entry === "0" && digit !== ".") {
      entry = digit;
    } else {
      entry += digit;
    }
    renderTotal();
  }

  function currentEntryValue() {
    if (entry === "" || entry === ".") {
      return 0;
    }
    return Number.parseFloat(entry);
  }

  function commitAddition() {
    runningTotal += currentEntryValue();
    entry = "";
    entryCommitted = true;
    renderTotal();
  }

  function clearAll() {
    runningTotal = 0;
    entry = "";
    entryCommitted = false;
    renderTotal();
  }

  digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendDigit(button.dataset.digit);
    });
  });

  addBtn.addEventListener("click", commitAddition);
  equalsBtn.addEventListener("click", commitAddition);
  clearBtn.addEventListener("click", clearAll);

  renderTotal();
})();

(function () {
  const displayEl = document.getElementById("display");
  const runningTotalEl = document.getElementById("running-total");
  const keysEl = document.getElementById("keys");

  let runningTotal = 0;
  let inputBuffer = "";
  let awaitingNextNumber = false;

  function formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "0";
    }
    const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
    return String(rounded);
  }

  function updateRunningTotalLabel() {
    if (inputBuffer !== "" && runningTotal !== 0) {
      runningTotalEl.textContent = `${formatNumber(runningTotal)} +`;
      return;
    }
    if (awaitingNextNumber && inputBuffer === "" && runningTotal !== 0) {
      runningTotalEl.textContent = formatNumber(runningTotal);
      return;
    }
    if (runningTotal !== 0 && inputBuffer === "" && !awaitingNextNumber) {
      runningTotalEl.textContent = formatNumber(runningTotal);
      return;
    }
    runningTotalEl.textContent = "";
  }

  function refreshDisplay() {
    if (inputBuffer !== "") {
      displayEl.textContent = inputBuffer;
    } else {
      displayEl.textContent = formatNumber(runningTotal);
    }
    updateRunningTotalLabel();
    keysEl.querySelectorAll('[data-action="add"]').forEach((btn) => {
      btn.classList.toggle("is-active", awaitingNextNumber && inputBuffer === "");
    });
  }

  function appendDigit(digit) {
    if (inputBuffer === "0") {
      inputBuffer = digit;
    } else {
      inputBuffer += digit;
    }
    refreshDisplay();
  }

  function appendDecimal() {
    if (inputBuffer.includes(".")) {
      return;
    }
    inputBuffer = inputBuffer === "" ? "0." : `${inputBuffer}.`;
    refreshDisplay();
  }

  function addCurrentEntryToTotal() {
    if (inputBuffer === "" || inputBuffer === ".") {
      return;
    }
    runningTotal += Number.parseFloat(inputBuffer);
    inputBuffer = "";
  }

  function onAddPressed() {
    addCurrentEntryToTotal();
    awaitingNextNumber = true;
    refreshDisplay();
  }

  function onEqualsPressed() {
    addCurrentEntryToTotal();
    awaitingNextNumber = false;
    refreshDisplay();
  }

  function clearAll() {
    runningTotal = 0;
    inputBuffer = "";
    awaitingNextNumber = false;
    refreshDisplay();
  }

  keysEl.addEventListener("click", (event) => {
    const target = event.target.closest("button.key");
    if (!target || target.disabled) {
      return;
    }

    const digit = target.getAttribute("data-digit");
    if (digit !== null) {
      awaitingNextNumber = false;
      appendDigit(digit);
      return;
    }

    const action = target.getAttribute("data-action");
    switch (action) {
      case "decimal":
        awaitingNextNumber = false;
        appendDecimal();
        break;
      case "add":
        onAddPressed();
        break;
      case "equals":
        onEqualsPressed();
        break;
      case "clear":
        clearAll();
        break;
      default:
        break;
    }
  });

  refreshDisplay();

  window.__calculator = {
    getDisplay: () => displayEl.textContent,
    getRunningTotalLabel: () => runningTotalEl.textContent,
    getRunningTotal: () => runningTotal,
  };
})();

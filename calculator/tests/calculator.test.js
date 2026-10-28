const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "..", "index.html");
const jsPath = path.join(__dirname, "..", "calculator.js");

test("calculator page includes running total and controls", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /id="total"/);
  assert.match(html, /id="btn-clear"/);
  assert.match(html, /id="btn-add"/);
  assert.match(html, /data-digit="/);
});

test("calculator logic adds numbers and clears", () => {
  const js = fs.readFileSync(jsPath, "utf8");
  assert.match(js, /runningTotal/);
  assert.match(js, /commitAddition/);
  assert.match(js, /clearAll/);
});

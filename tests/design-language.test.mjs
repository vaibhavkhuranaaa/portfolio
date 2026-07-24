import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const design = readFileSync("design.md", "utf8");
const layout = readFileSync("src/app/layout.tsx", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const mobileMenu = readFileSync("src/components/MobileMenu.tsx", "utf8");
const workLibrary = readFileSync("src/components/WorkLibrary.tsx", "utf8");

test("design.md is the canonical visual-language reference", () => {
  assert.match(design, /canonical visual-language reference/i);
  assert.match(design, /Never overstate metrics, deployment state/i);
});

test("uses the approved self-hosted typography and Phosphor icon policy", () => {
  assert.ok(packageJson.dependencies["@fontsource-variable/manrope"]);
  assert.ok(packageJson.dependencies["@fontsource-variable/source-serif-4"]);
  assert.ok(packageJson.dependencies["@phosphor-icons/react"]);
  assert.match(layout, /@fontsource-variable\/manrope/);
  assert.match(layout, /@fontsource-variable\/source-serif-4/);
  assert.match(css, /--display:\s*"Source Serif 4"/);
  assert.match(css, /--sans:\s*"Manrope"/);
});

test("reduced motion and accessible control labels remain explicit", () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(mobileMenu, /aria-label=\{open \? "Close navigation" : "Open navigation"\}/);
  assert.match(workLibrary, /aria-label="Filter projects by capability"/);
});

test("routine UI accent stays graphite and silver-white", () => {
  assert.match(css, /--canvas:\s*#0a0d11/i);
  assert.match(css, /--text:\s*#f1f5f9/i);
  assert.doesNotMatch(css, /--accent:\s*#3b82f6/i);
});

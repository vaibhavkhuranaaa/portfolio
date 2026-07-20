import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const nav = readFileSync("src/components/SiteChrome.tsx", "utf8");
const profile = readFileSync("src/content/profile.ts", "utf8");

test("uses a unified professional profile instead of a resume route", () => {
  assert.equal(existsSync("src/app/resume/page.tsx"), false);
  assert.match(nav, /Profile/);
  assert.doesNotMatch(nav, /Resume/);
});

test("keeps certification and focused skills in portfolio-owned profile content", () => {
  assert.match(profile, /AWS Certified/);
  assert.match(profile, /Microsoft Certified: Azure/);
  assert.match(profile, /Data engineering/);
  assert.match(profile, /Applied AI/);
});

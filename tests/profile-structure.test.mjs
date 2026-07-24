import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const nav = readFileSync("src/components/SiteChrome.tsx", "utf8");
const profile = readFileSync("src/content/profile.ts", "utf8");
const site = readFileSync("src/content/site.ts", "utf8");

test("uses a unified professional profile instead of a resume route", () => {
  assert.equal(existsSync("src/app/resume/page.tsx"), false);
  assert.match(nav, /Profile/);
  assert.doesNotMatch(nav, /Resume/);
});

test("keeps focused skills but excludes unverified certification placeholders", () => {
  assert.doesNotMatch(profile, /verification link to be added/i);
  assert.doesNotMatch(profile, /AWS Certified/);
  assert.match(profile, /Data engineering/);
  assert.match(profile, /Applied AI/);
});

test("production metadata and contact links never fall back to public placeholders", () => {
  assert.match(site, /https:\/\/portfolio-reeper1\.vercel\.app/);
  assert.doesNotMatch(site, /hello@example\.com/);
  assert.match(nav, /siteConfig\.contactEmail &&/);
});

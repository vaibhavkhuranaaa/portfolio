import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const design = readFileSync("design.md", "utf8");
const layout = readFileSync("src/app/layout.tsx", "utf8");
const css = readFileSync("src/app/globals.css", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const mobileMenu = readFileSync("src/components/MobileMenu.tsx", "utf8");
const workLibrary = readFileSync("src/components/WorkLibrary.tsx", "utf8");
const home = readFileSync("src/app/page.tsx", "utf8");
const projectCaseStudy = readFileSync("src/components/ProjectCaseStudy.tsx", "utf8");
const projectList = readFileSync("src/content/projects.ts", "utf8");

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
  assert.match(layout, /data-scroll-behavior="smooth"/);
});

test("routine UI uses the approved warm editorial system", () => {
  assert.match(css, /--canvas:\s*#f5efe6/i);
  assert.match(css, /--text:\s*#20231f/i);
  assert.match(css, /--accent:\s*#be5234/i);
  assert.match(design, /warm editorial/i);
});

test("home promotes only approved reachable projects and avoids the retired studio modules", () => {
  assert.match(home, /ProjectRail/);
  assert.match(home, /hero-portrait/);
  assert.doesNotMatch(home, /HeroSignal|Experiments and technical notes|SELECTED PROJECTS/);
  assert.match(projectList, /project\.portfolio\.status !== "approved"/);
  assert.match(projectList, /project\.deployment\.status === "live"/);
  assert.match(projectList, /project\.deployment\.status !== "temporary-demo"/);
  assert.match(projectList, /expiresAt > Date\.now\(\)/);
});

test("technical project review keeps diagrams interactive and hides release stamps", () => {
  assert.match(projectCaseStudy, /PanZoomArchitecture/);
  assert.doesNotMatch(projectCaseStudy, /Evidence index|source revision/);
});

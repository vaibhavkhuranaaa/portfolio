import assert from "node:assert/strict";
import test from "node:test";
import { validateManifest } from "../scripts/project-manifest-validation.mjs";

const valid = {
  version: 1, slug: "valid-project", title: "Valid project", summary: "A tested system.", outcome: "A useful measurable outcome.", industries: ["Legal technology"], categories: ["AI/ML", "Cloud"], stack: ["Python"], githubUrl: "https://github.com/example/project", liveUrl: "https://example.com", deployment: { provider: "Azure", status: "live", runtime: "App Service" }, metrics: ["Metric"], stages: ["Ingestion"], architecture: ["Source"], evaluation: ["Measured against a fixed evaluation set."], operationalTradeoffs: ["Optimized quality over latency."], disclaimer: "Uses public documents only."
};

test("accepts a valid multi-category live manifest", () => assert.doesNotThrow(() => validateManifest(valid)));
test("accepts an optional question-led visual presentation", () => assert.doesNotThrow(() => validateManifest({ ...valid, presentation: { question: "How is evidence kept traceable?", answer: "By keeping retrieval constrained.", coverImage: "portfolio/assets/cover.png", architecture: [{ label: "Source", detail: "Approved input.", image: "portfolio/assets/source.png" }, { label: "Outcome", detail: "Cited answer.", image: "portfolio/assets/outcome.webp" }] } })));
test("rejects presentation asset paths outside the project", () => assert.throws(() => validateManifest({ ...valid, presentation: { question: "Question", answer: "Answer", architecture: [{ label: "Source", detail: "Input", image: "../secret.png" }, { label: "Outcome", detail: "Output", image: "portfolio/assets/outcome.png" }] } })));
test("rejects missing layered case-study detail", () => { const manifest = { ...valid }; delete manifest.outcome; assert.throws(() => validateManifest(manifest)); });
test("rejects invalid project URLs", () => assert.throws(() => validateManifest({ ...valid, githubUrl: "file:///tmp/project" })));
test("rejects a live project without a URL", () => assert.throws(() => validateManifest({ ...valid, liveUrl: null })));
test("rejects a pending project with a URL", () => assert.throws(() => validateManifest({ ...valid, deployment: { ...valid.deployment, status: "release-pending" } })));
test("rejects a disclosure without confidentiality context", () => assert.throws(() => validateManifest({ ...valid, disclaimer: "A great project." })));

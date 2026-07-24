import assert from "node:assert/strict";
import test from "node:test";
import { validateManifest } from "../scripts/project-manifest-validation.mjs";

const manifest = {
  version: 2,
  slug: "new-project",
  title: "New project",
  summary: "A credible system.",
  outcome: "A verified outcome.",
  industries: ["Enterprise"],
  categories: ["AI/ML"],
  stack: ["Python"],
  githubUrl: "https://github.com/acme/new-project",
  liveUrl: "https://new-project.acme.dev",
  deployment: {
    provider: "Render",
    status: "live",
    runtime: "Python",
    exposure: "anonymous",
    productionClaim: true,
    verifiedAt: "2026-07-23T18:00:00Z",
    expiresAt: null,
    evidenceRefs: ["deployment.smoke"],
  },
  metrics: ["One verified measure"],
  stages: ["Input", "Outcome"],
  architecture: ["Input", "Outcome"],
  evaluation: ["A reproducible evaluation"],
  operationalTradeoffs: ["Latency over cost"],
  disclaimer: "Uses synthetic and public data only.",
  dataDisclosure: {
    source: "Generated test records",
    license: "Project-owned synthetic data",
    classification: "synthetic",
    permittedUse: "Demonstration and evaluation",
    includedFields: ["aggregate"],
    excludedFields: ["direct identifiers"],
    deployedArtifactContents: ["application code", "synthetic fixtures"],
  },
  evidence: [
    {
      id: "deployment.smoke",
      kind: "deployment",
      claim: "The public endpoint returned a successful response.",
      source: "scripts/verify-live-project.mjs",
      method: "HTTP smoke test",
      result: true,
    },
    {
      id: "evaluation.primary",
      kind: "evaluation",
      claim: "The controlled evaluation passed.",
      source: "evaluation/report.json",
      method: "Versioned evaluation",
      result: "pass",
    },
  ],
  story: {
    recruiterSummary: "A plain-language explanation of the business result.",
    technicalNarrative: "A typed service validates requests and records evidence.",
    scalabilityRoadmap: ["Add workload-based autoscaling."],
    executiveSummary: "A plain-language result.",
    intendedUser: "An operations analyst.",
    example: { title: "A real workflow", steps: ["Provide approved input", "Review the result"] },
    technologyDecisions: [
      {
        technology: "Python",
        rationale: "Clear integration path.",
        alternative: "TypeScript",
        tradeoff: "Lower browser reuse.",
      },
    ],
    evidence: [
      {
        value: "pass",
        label: "verified result",
        context: "A controlled test.",
        method: "Versioned evaluation.",
        evidenceRefs: ["evaluation.primary"],
      },
    ],
    limitations: ["Representative data only."],
  },
  resume: {
    bulletCandidates: [
      {
        role: "AI Engineer",
        bullet: "Built a typed Python evaluation service with a versioned release gate.",
        evidenceRefs: ["evaluation.primary"],
      },
    ],
  },
};

test("accepts a publication-ready v2 evidence contract", () => {
  assert.doesNotThrow(() => validateManifest(manifest));
});

test("draft accepts truthful unknown URLs and incomplete content", () => {
  assert.doesNotThrow(() =>
    validateManifest(
      {
        version: 2,
        slug: "draft-project",
        githubUrl: null,
        liveUrl: null,
        deployment: { status: "local", exposure: "private", productionClaim: false },
      },
      "draft",
      { profile: "draft" },
    ),
  );
});

test("first-demo requires disclosure and traceable evidence", () => {
  const invalid = structuredClone(manifest);
  delete invalid.dataDisclosure;
  assert.throws(() => validateManifest(invalid, "demo", { profile: "first-demo" }), /dataDisclosure/);
});

test("publication rejects evidence references that do not resolve", () => {
  const invalid = structuredClone(manifest);
  invalid.resume.bulletCandidates[0].evidenceRefs = ["evaluation.missing"];
  assert.throws(() => validateManifest(invalid), /unknown evidence references/);
});

test("live profile requires post-deployment verification", () => {
  const invalid = structuredClone(manifest);
  invalid.deployment.verifiedAt = null;
  assert.throws(() => validateManifest(invalid, "live", { profile: "live" }), /verifiedAt/);
});

import assert from "node:assert/strict";
import test from "node:test";
import {
  buildApprovedCatalog,
  buildPortfolioPayload,
  buildResumePayload,
} from "../scripts/project-projections.mjs";

const project = {
  version: 2,
  slug: "evidence-project",
  title: "Evidence project",
  summary: "Summary",
  outcome: "Outcome",
  industries: ["Enterprise"],
  categories: ["AI/ML"],
  stack: ["Python"],
  githubUrl: "https://github.com/acme/evidence-project",
  liveUrl: null,
  deployment: { status: "release-pending", evidenceRefs: ["evaluation.primary"] },
  dataDisclosure: { classification: "synthetic" },
  evidence: [{ id: "evaluation.primary", claim: "Verified" }],
  story: {
    recruiterSummary: "Recruiter narrative",
    technicalNarrative: "Technical narrative",
    limitations: ["Representative data"],
    scalabilityRoadmap: ["Scale workers"],
  },
  resume: {
    bulletCandidates: [
      { role: "AI Engineer", bullet: "Built an evaluated system.", evidenceRefs: ["evaluation.primary"] },
    ],
  },
  source: { repository: "acme/evidence-project", sourceRef: "a".repeat(40) },
  portfolio: { status: "approved", approvedAt: "2026-07-23", featured: true, sortOrder: 1 },
};

test("portfolio and resume projections share the pinned source and evidence", () => {
  const catalog = buildApprovedCatalog([project], "2026-07-23T20:00:00Z");
  const portfolio = buildPortfolioPayload(catalog);
  const resume = buildResumePayload(catalog);
  assert.equal(catalog.projects[0].source.sourceRef, "a".repeat(40));
  assert.equal(portfolio.projects[0].sourceRef, "a".repeat(40));
  assert.equal(resume.projects[0].sourceRef, "a".repeat(40));
  assert.deepEqual(resume.projects[0].bulletCandidates[0].evidenceRefs, ["evaluation.primary"]);
});

test("draft and preview projects are excluded from normalized public output", () => {
  const preview = { ...project, slug: "preview", portfolio: { ...project.portfolio, status: "preview" } };
  assert.equal(buildApprovedCatalog([preview]).projects.length, 0);
});

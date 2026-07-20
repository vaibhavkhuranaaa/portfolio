import assert from "node:assert/strict";
import test from "node:test";
import { validatePublication } from "../scripts/project-publication-validation.mjs";

const approved = {
  repository: "example/project",
  sourceRef: "60545cfc30ecd1af1c53072b381b0309a9524e50",
  portfolio: { status: "approved", approvedAt: "2026-07-19", featured: false, sortOrder: 10 },
};

test("accepts a reviewed publication pinned to a commit", () => assert.doesNotThrow(() => validatePublication(approved)));
test("rejects a floating branch reference", () => assert.throws(() => validatePublication({ ...approved, sourceRef: "main" })));
test("rejects an approved project without approval evidence", () => assert.throws(() => validatePublication({ ...approved, portfolio: { status: "approved", featured: false, sortOrder: 10 } })));
test("allows a draft project without release metadata", () => assert.doesNotThrow(() => validatePublication({ repository: "example/project", sourceRef: approved.sourceRef, portfolio: { status: "draft" } })));

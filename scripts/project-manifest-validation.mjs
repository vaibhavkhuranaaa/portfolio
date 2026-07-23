import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile } from "node:fs/promises";

export const manifestProfiles = ["draft", "first-demo", "publication", "live"];

const schemas = new Map(
  await Promise.all(
    [1, 2].map(async (version) => [
      version,
      JSON.parse(await readFile(new URL(`../schemas/project-manifest-v${version}.json`, import.meta.url), "utf8")),
    ]),
  ),
);
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validators = new Map([...schemas].map(([version, schema]) => [version, ajv.compile(schema)]));
const placeholderPattern =
  /\b(?:todo|tbd|placeholder|replace[ -]?me)\b|(?:owner|your[-_ ]username)\/|https?:\/\/(?:www\.)?example\.com/i;

function assertPublicUrl(value, label, { nullable = false } = {}) {
  if (value === null && nullable) return;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
  } catch {
    throw new Error(`${label} must be an absolute HTTP(S) URL${nullable ? " or null" : ""}`);
  }
}

function requireFields(value, fields, label) {
  const missing = fields.filter((field) => {
    const item = value?.[field];
    return item === undefined || item === null || item === "" || (Array.isArray(item) && item.length === 0);
  });
  if (missing.length) throw new Error(`${label} requires ${missing.join(", ")}`);
}

function assertEvidenceReferences(manifest, repository) {
  const evidenceIds = new Set((manifest.evidence ?? []).map((item) => item.id));
  const references = [
    ...(manifest.deployment?.evidenceRefs ?? []),
    ...(manifest.story?.evidence ?? []).flatMap((item) => item.evidenceRefs ?? []),
    ...(manifest.resume?.bulletCandidates ?? []).flatMap((item) => item.evidenceRefs ?? []),
  ];
  const unknown = [...new Set(references.filter((reference) => !evidenceIds.has(reference)))];
  if (unknown.length) throw new Error(`${repository}: unknown evidence references: ${unknown.join(", ")}`);
}

function assertNoPlaceholders(manifest, repository) {
  const values = [];
  const visit = (value) => {
    if (typeof value === "string") values.push(value);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  visit(manifest);
  const placeholder = values.find((value) => placeholderPattern.test(value));
  if (placeholder) throw new Error(`${repository}: publication profile rejects placeholder content: ${placeholder}`);
}

function validateV1Semantics(manifest, repository) {
  assertPublicUrl(manifest.githubUrl, "githubUrl");
  assertPublicUrl(manifest.liveUrl, "liveUrl", { nullable: true });
  if (manifest.deployment.status === "live" && !manifest.liveUrl) {
    throw new Error(`${repository}: live deployments require liveUrl`);
  }
  if (manifest.deployment.status === "release-pending" && manifest.liveUrl) {
    throw new Error(`${repository}: release-pending deployments must not include liveUrl`);
  }
  if (!/confidential|synthetic|public|fictional|disclosure/i.test(manifest.disclaimer)) {
    throw new Error(`${repository}: disclaimer must state the confidentiality or data-disclosure context`);
  }
}

function validateV2Profile(manifest, repository, profile) {
  if (!manifestProfiles.includes(profile)) throw new Error(`${repository}: unknown manifest profile ${profile}`);
  assertPublicUrl(manifest.githubUrl, "githubUrl", { nullable: true });
  assertPublicUrl(manifest.liveUrl, "liveUrl", { nullable: true });
  assertEvidenceReferences(manifest, repository);

  if (manifest.deployment?.status === "live" && !manifest.liveUrl) {
    throw new Error(`${repository}: live deployments require liveUrl`);
  }
  if (["local", "release-pending"].includes(manifest.deployment?.status) && manifest.liveUrl) {
    throw new Error(`${repository}: ${manifest.deployment.status} deployments must not include liveUrl`);
  }
  if (manifest.deployment?.productionClaim && manifest.deployment.status !== "live") {
    throw new Error(`${repository}: productionClaim requires a live deployment`);
  }

  if (profile === "draft") return;

  requireFields(
    manifest,
    [
      "title",
      "summary",
      "outcome",
      "industries",
      "categories",
      "stack",
      "deployment",
      "metrics",
      "stages",
      "architecture",
      "evaluation",
      "operationalTradeoffs",
      "disclaimer",
      "story",
      "dataDisclosure",
      "evidence",
    ],
    `${repository}: ${profile} profile`,
  );
  requireFields(
    manifest.deployment,
    ["status", "exposure", "productionClaim", "evidenceRefs"],
    `${repository}: deployment evidence`,
  );
  requireFields(
    manifest.dataDisclosure,
    [
      "source",
      "license",
      "classification",
      "permittedUse",
      "includedFields",
      "excludedFields",
      "deployedArtifactContents",
    ],
    `${repository}: data disclosure`,
  );
  requireFields(
    manifest.story,
    [
      "recruiterSummary",
      "technicalNarrative",
      "scalabilityRoadmap",
      "executiveSummary",
      "intendedUser",
      "example",
      "technologyDecisions",
      "evidence",
      "limitations",
    ],
    `${repository}: project story`,
  );
  if (manifest.deployment.status === "temporary-demo") {
    requireFields(manifest.deployment, ["expiresAt"], `${repository}: temporary demo ownership`);
    if (Date.parse(manifest.deployment.expiresAt) <= Date.now()) {
      throw new Error(`${repository}: temporary demo is expired`);
    }
  }
  if (!/confidential|synthetic|public|private|fictional|disclosure/i.test(manifest.disclaimer)) {
    throw new Error(`${repository}: disclaimer must state the confidentiality or data-disclosure context`);
  }

  if (profile === "first-demo") return;

  requireFields(manifest, ["githubUrl", "resume"], `${repository}: publication profile`);
  requireFields(manifest.resume, ["bulletCandidates"], `${repository}: resume evidence`);
  assertNoPlaceholders(manifest, repository);

  if (profile === "publication") return;

  if (manifest.deployment.status !== "live") throw new Error(`${repository}: live profile requires deployment.status=live`);
  requireFields(manifest.deployment, ["verifiedAt"], `${repository}: live verification`);
  if (!manifest.liveUrl) throw new Error(`${repository}: live profile requires liveUrl`);
  if (manifest.deployment.expiresAt && Date.parse(manifest.deployment.expiresAt) <= Date.now()) {
    throw new Error(`${repository}: live profile rejects an expired deployment`);
  }
}

export function validateManifest(manifest, repository = "manifest", options = {}) {
  const validator = validators.get(manifest?.version);
  if (!validator) throw new Error(`${repository}: unsupported project manifest version`);
  if (!validator(manifest)) {
    const errors = validator.errors?.map((error) => `${error.instancePath || "/"} ${error.message}`).join("; ");
    throw new Error(`${repository}: invalid project manifest: ${errors}`);
  }

  if (manifest.version === 1) {
    validateV1Semantics(manifest, repository);
    return { version: 1, profile: "legacy-publication" };
  }

  const profile = options.profile ?? "publication";
  validateV2Profile(manifest, repository, profile);
  return { version: 2, profile };
}

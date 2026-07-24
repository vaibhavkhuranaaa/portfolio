import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { projectRegistry } from "./project-registry.mjs";
import { validateManifest } from "./project-manifest-validation.mjs";
import { validatePublication } from "./project-publication-validation.mjs";
import {
  buildApprovedCatalog,
  buildPortfolioPayload,
  buildResumePayload,
} from "./project-projections.mjs";

const outputPath = "src/content/generated/project-manifests.json";
const publicAssetRoot = "public/assets/projects";
const shaPattern = /^[0-9a-f]{40}$/;

function readPreviewEntry() {
  const repository = process.env.PROJECT_PREVIEW_REPOSITORY;
  const sourceRef = process.env.PROJECT_PREVIEW_SOURCE_REF;
  const manifestPath = process.env.PROJECT_PREVIEW_MANIFEST_PATH ?? "portfolio/project.json";
  if (!repository && !sourceRef) return null;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? "")) throw new Error("Preview repository must be owner/repository");
  if (!shaPattern.test(sourceRef ?? "")) throw new Error("Preview source ref must be an exact 40-character commit SHA");
  if (!/^portfolio\/[A-Za-z0-9_./-]+\.json$/.test(manifestPath) || manifestPath.includes("..")) {
    throw new Error("Preview manifest path must be a repository-relative JSON path under portfolio/");
  }
  return {
    repository,
    sourceRef,
    manifestPath,
    validationProfile: process.env.PROJECT_PREVIEW_PROFILE ?? "first-demo",
    portfolio: { status: "preview", approvedAt: null, featured: false, sortOrder: -1 },
  };
}

async function fetchManifest(entry) {
  const { repository, sourceRef } = entry;
  const fixtureDirectory = process.env.PROJECT_MANIFEST_SOURCE_DIR;
  if (fixtureDirectory) {
    return JSON.parse(await readFile(join(fixtureDirectory, `${repository.replace("/", "--")}.json`), "utf8"));
  }

  const manifestPath = entry.manifestPath ?? "portfolio/project.json";
  const response = await fetch(`https://raw.githubusercontent.com/${repository}/${sourceRef}/${manifestPath}`, {
    headers: process.env.PROJECT_MANIFEST_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.PROJECT_MANIFEST_READ_TOKEN}` }
      : undefined,
  });
  if (!response.ok) throw new Error(`Unable to fetch ${repository}@${sourceRef}:${manifestPath}: ${response.status}`);
  return response.json();
}

async function fetchProjectAsset(entry, assetPath, slug) {
  const fixtureDirectory = process.env.PROJECT_MANIFEST_SOURCE_DIR;
  if (fixtureDirectory) return assetPath;
  const response = await fetch(`https://raw.githubusercontent.com/${entry.repository}/${entry.sourceRef}/${assetPath}`, {
    headers: process.env.PROJECT_MANIFEST_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.PROJECT_MANIFEST_READ_TOKEN}` }
      : undefined,
  });
  if (!response.ok) throw new Error(`Unable to fetch ${entry.repository} asset ${assetPath}: ${response.status}`);
  const localName = basename(assetPath);
  const localDirectory = join(publicAssetRoot, slug);
  await mkdir(localDirectory, { recursive: true });
  await writeFile(join(localDirectory, localName), Buffer.from(await response.arrayBuffer()));
  return `/assets/projects/${slug}/${localName}`;
}

async function localizePresentationAssets(entry, manifest) {
  if (!manifest.presentation) return manifest;
  const presentation = { ...manifest.presentation };
  if (presentation.coverImage) presentation.coverImage = await fetchProjectAsset(entry, presentation.coverImage, manifest.slug);
  if (presentation.architecture) presentation.architecture = await Promise.all(
    presentation.architecture.map(async (stage) => ({
      ...stage,
      image: await fetchProjectAsset(entry, stage.image, manifest.slug),
    })),
  );
  return { ...manifest, presentation };
}

async function attachGeneratedArchitecture(entry, manifest) {
  if (process.env.PROJECT_MANIFEST_SOURCE_DIR) return manifest;
  const response = await fetch(`https://raw.githubusercontent.com/${entry.repository}/${entry.sourceRef}/architecture/system.mmd`, {
    headers: process.env.PROJECT_MANIFEST_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.PROJECT_MANIFEST_READ_TOKEN}` }
      : undefined,
  });
  if (!response.ok) throw new Error(`Unable to fetch canonical architecture for ${entry.repository}@${entry.sourceRef}: ${response.status}`);
  const source = await response.text();
  const sourceSha256 = createHash("sha256").update(source).digest("hex");
  const localDirectory = join(publicAssetRoot, manifest.slug);
  const freshness = JSON.parse(await readFile(join(localDirectory, "system.freshness.json"), "utf8"));
  if (freshness.sourceRef !== entry.sourceRef || freshness.sourceSha256 !== sourceSha256) {
    throw new Error(`${manifest.slug}: generated architecture is stale; run npm run architecture:sync`);
  }
  return {
    ...manifest,
    presentation: {
      question: manifest.presentation?.question ?? `What problem does ${manifest.title} solve?`,
      answer: manifest.presentation?.answer ?? manifest.outcome,
      ...manifest.presentation,
      architectureAlt: manifest.presentation?.architectureAlt ?? `${manifest.title} system architecture`,
      architectureImage: `/assets/projects/${manifest.slug}/system.png`,
    },
  };
}

async function writeProjections(manifests) {
  const generatedAt = process.env.PROJECTION_GENERATED_AT ?? new Date().toISOString();
  const catalog = buildApprovedCatalog(manifests, generatedAt);
  await mkdir("public/data", { recursive: true });
  await Promise.all([
    writeFile("public/data/approved-projects.json", `${JSON.stringify(catalog, null, 2)}\n`),
    writeFile("public/data/portfolio_data.json", `${JSON.stringify(buildPortfolioPayload(catalog), null, 2)}\n`),
    writeFile("public/data/resume_bullets.json", `${JSON.stringify(buildResumePayload(catalog), null, 2)}\n`),
  ]);
}

projectRegistry.forEach(validatePublication);
const approvedEntries = projectRegistry.filter((entry) => entry.portfolio.status === "approved");
const previewEntry = readPreviewEntry();
const entries = previewEntry ? [...approvedEntries, previewEntry] : approvedEntries;
const manifests = await Promise.all(entries.map(fetchManifest));
const slugs = new Set();
for (let index = 0; index < manifests.length; index += 1) {
  const manifest = manifests[index];
  const entry = entries[index];
  const repository = entry.repository;
  validateManifest(manifest, repository, { profile: entry.validationProfile ?? "publication" });
  if (slugs.has(manifest.slug)) throw new Error(`${repository}: duplicate slug ${manifest.slug}`);
  slugs.add(manifest.slug);
  const localizedManifest = await attachGeneratedArchitecture(entry, await localizePresentationAssets(entry, manifest));
  manifests[index] = {
    ...localizedManifest,
    portfolio: entry.portfolio,
    source: { repository, sourceRef: entry.sourceRef, manifestPath: entry.manifestPath ?? "portfolio/project.json" },
  };
}

await mkdir("src/content/generated", { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifests, null, 2)}\n`);
await writeProjections(manifests);
console.log(
  `Synced ${approvedEntries.length} approved project manifests${previewEntry ? " and one exact-SHA preview" : ""}.`,
);

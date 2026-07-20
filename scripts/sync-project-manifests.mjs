import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { projectRegistry } from "./project-registry.mjs";
import { validateManifest } from "./project-manifest-validation.mjs";
import { validatePublication } from "./project-publication-validation.mjs";

const outputPath = "src/content/generated/project-manifests.json";
const publicAssetRoot = "public/assets/projects";

async function fetchManifest(entry) {
  const { repository, sourceRef } = entry;
  const fixtureDirectory = process.env.PROJECT_MANIFEST_SOURCE_DIR;
  if (fixtureDirectory) {
    return JSON.parse(await readFile(join(fixtureDirectory, `${repository.replace("/", "--")}.json`), "utf8"));
  }

  const response = await fetch(`https://raw.githubusercontent.com/${repository}/${sourceRef}/portfolio/project.json`, {
    headers: process.env.PROJECT_MANIFEST_READ_TOKEN
      ? { Authorization: `Bearer ${process.env.PROJECT_MANIFEST_READ_TOKEN}` }
      : undefined,
  });
  if (!response.ok) throw new Error(`Unable to fetch ${repository}: ${response.status}`);
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
  presentation.architecture = await Promise.all(presentation.architecture.map(async (stage) => ({
    ...stage,
    image: await fetchProjectAsset(entry, stage.image, manifest.slug),
  })));
  return { ...manifest, presentation };
}

projectRegistry.forEach(validatePublication);
const approvedEntries = projectRegistry.filter((entry) => entry.portfolio.status === "approved");
const manifests = await Promise.all(approvedEntries.map(fetchManifest));
const slugs = new Set();
for (let index = 0; index < manifests.length; index += 1) {
  const manifest = manifests[index];
  const entry = approvedEntries[index];
  const repository = entry.repository;
  validateManifest(manifest, repository);
  if (slugs.has(manifest.slug)) throw new Error(`${repository}: duplicate slug ${manifest.slug}`);
  slugs.add(manifest.slug);
  const localizedManifest = await localizePresentationAssets(entry, manifest);
  manifests[index] = { ...localizedManifest, portfolio: entry.portfolio, source: { repository, sourceRef: entry.sourceRef } };
}

await mkdir("src/content/generated", { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifests, null, 2)}\n`);
console.log(`Synced ${manifests.length} approved and validated project manifests.`);

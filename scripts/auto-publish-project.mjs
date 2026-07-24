import { writeFile } from "node:fs/promises";
import { validateManifest } from "./project-manifest-validation.mjs";

const [repository, sourceRef, manifestPath = "portfolio/project.json"] = process.argv.slice(2);
const shaPattern = /^[0-9a-f]{40}$/;

if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? "")) throw new Error("repository must be owner/repository");
if (!shaPattern.test(sourceRef ?? "")) throw new Error("sourceRef must be a 40-character commit SHA");
if (!/^portfolio\/[A-Za-z0-9_./-]+\.json$/.test(manifestPath) || manifestPath.includes("..")) throw new Error("manifestPath must be a safe portfolio JSON path");

const response = await fetch(`https://raw.githubusercontent.com/${repository}/${sourceRef}/${manifestPath}`, {
  headers: process.env.PROJECT_MANIFEST_READ_TOKEN ? { Authorization: `Bearer ${process.env.PROJECT_MANIFEST_READ_TOKEN}` } : undefined,
});
if (!response.ok) throw new Error(`Unable to fetch ${repository}@${sourceRef}:${manifestPath}: ${response.status}`);
const manifest = await response.json();
validateManifest(manifest, repository, { profile: "publication" });
if (manifest.deployment?.status !== "live" || !manifest.liveUrl) throw new Error(`${repository}: automatic publication requires a verified live deployment and liveUrl`);
if (!manifest.deployment?.verifiedAt) throw new Error(`${repository}: automatic publication requires deployment.verifiedAt`);

const registryPath = "scripts/project-registry.mjs";
const registryModule = await import(`../${registryPath}?release=${Date.now()}`);
const entries = registryModule.projectRegistry.filter((entry) => entry.repository !== repository);
const sortOrder = Math.max(0, ...entries.map((entry) => entry.portfolio.sortOrder)) + 10;
entries.push({ repository, sourceRef, manifestPath, portfolio: { status: "approved", approvedAt: new Date().toISOString().slice(0, 10), featured: false, sortOrder } });
entries.sort((left, right) => left.portfolio.sortOrder - right.portfolio.sortOrder || left.repository.localeCompare(right.repository));

const body = `/**\n * Generated public registry. Entries are admitted only by the automated release\n * workflow after exact-SHA manifest, evidence, and live-deployment validation.\n */\nexport const projectRegistry = ${JSON.stringify(entries, null, 2)};\n`;
await writeFile(registryPath, body);
console.log(`Published ${repository}@${sourceRef} at sort order ${sortOrder}.`);

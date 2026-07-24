import { writeFile } from "node:fs/promises";
import { projectRegistry } from "./project-registry.mjs";
import { validateManifest } from "./project-manifest-validation.mjs";

const owner = process.env.PORTFOLIO_REPOSITORY_OWNER ?? "vaibhavkhuranaaa";
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub ${path}: ${response.status}`);
  return response.json();
}

async function raw(repository, sha, path) {
  const response = await fetch(`https://raw.githubusercontent.com/${repository}/${sha}/${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${repository}@${sha}:${path}: ${response.status}`);
  return response.json();
}

function valueAt(payload, path) {
  return path.split(".").reduce((value, key) => value?.[key], payload);
}

async function verifiedCandidate(repository, defaultBranch) {
  const commit = await github(`/repos/${repository}/commits/${encodeURIComponent(defaultBranch)}`);
  const sourceRef = commit.sha;
  const release = await raw(repository, sourceRef, "portfolio/release.json");
  if (!release || release.publicProject == null) return { repository, disposition: "retain" };
  if (release.status !== "enabled" || release.publicProject !== true) {
    return { repository, disposition: "remove" };
  }
  if (!release.verification?.url || !release.verification?.sourceShaField) {
    throw new Error(`${repository}: enabled public release requires verification URL and source SHA field`);
  }
  const manifest = await raw(repository, sourceRef, "portfolio/project.json");
  if (!manifest) throw new Error(`${repository}: public release is missing portfolio/project.json`);
  validateManifest(manifest, repository, { profile: "publication" });
  if (!["live", "temporary-demo"].includes(manifest.deployment?.status)) {
    throw new Error(`${repository}: public release must be live or a temporary demo`);
  }
  if (!manifest.deployment?.verifiedAt || !manifest.liveUrl) {
    throw new Error(`${repository}: public release is missing verified deployment evidence`);
  }
  if (manifest.deployment.expiresAt && Date.parse(manifest.deployment.expiresAt) <= Date.now()) {
    console.log(`${repository}: skipped because the public demo expired`);
    return { repository, disposition: "remove" };
  }
  const response = await fetch(release.verification.url, {
    headers: { Accept: "application/json", "User-Agent": "portfolio-live-project-sync" },
  });
  if (!response.ok) {
    console.log(`${repository}: skipped because live verification returned ${response.status}`);
    return { repository, disposition: "retain" };
  }
  const deployed = await response.json();
  if (valueAt(deployed, release.verification.sourceShaField) !== sourceRef) {
    console.log(`${repository}: skipped until the deployed source SHA matches ${sourceRef}`);
    return { repository, disposition: "retain" };
  }
  return { repository, sourceRef, manifestPath: "portfolio/project.json", disposition: "verified" };
}

const repositories = [];
for (let page = 1; ; page += 1) {
  const batch = await github(`/users/${owner}/repos?type=owner&sort=full_name&per_page=100&page=${page}`);
  repositories.push(...batch.filter((repo) => !repo.private && !repo.archived && !repo.fork));
  if (batch.length < 100) break;
}

const retained = new Map(projectRegistry.map((entry) => [entry.repository, entry]));
const decisions = [];
for (const repo of repositories) {
  decisions.push(await verifiedCandidate(repo.full_name, repo.default_branch));
}

const now = new Date().toISOString().slice(0, 10);
let nextSortOrder = Math.max(0, ...projectRegistry.map((entry) => entry.portfolio.sortOrder ?? 0)) + 10;
const removals = new Set(decisions.filter((item) => item?.disposition === "remove").map((item) => item.repository));
const verified = decisions.filter((item) => item?.disposition === "verified");
const replacements = new Map(verified.map((item) => [item.repository, item]));
const entries = projectRegistry.filter((entry) => !removals.has(entry.repository)).map((entry) => {
  const candidate = replacements.get(entry.repository);
  if (!candidate) return entry;
  replacements.delete(entry.repository);
  return {
    ...entry,
    ...candidate,
    disposition: undefined,
    portfolio: { ...entry.portfolio, status: "approved" },
  };
});
for (const candidate of replacements.values()) {
  const current = retained.get(candidate.repository);
  if (current) {
    entries.push({
      ...current,
      ...candidate,
      disposition: undefined,
      portfolio: { ...current.portfolio, status: "approved" },
    });
    continue;
  }
  entries.push({
    ...candidate,
    disposition: undefined,
    portfolio: { status: "approved", approvedAt: now, featured: false, sortOrder: nextSortOrder },
  });
  nextSortOrder += 10;
}
entries.sort((left, right) => left.portfolio.sortOrder - right.portfolio.sortOrder
  || left.repository.localeCompare(right.repository));

const body = `/**\n * Generated public registry. A project is admitted only when its public release\n * contract is enabled and its anonymous live endpoint reports the repository's\n * current default-branch SHA.\n */\nexport const projectRegistry = ${JSON.stringify(entries, null, 2)};\n`;
await writeFile("scripts/project-registry.mjs", body);
console.log(`Synchronized ${entries.length} verified live projects from ${repositories.length} public repositories.`);

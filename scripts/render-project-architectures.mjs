import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { projectRegistry } from "./project-registry.mjs";

const renderer = "@mermaid-js/mermaid-cli@11.12.0";

function previewEntry() {
  const repository = process.env.PROJECT_PREVIEW_REPOSITORY;
  const sourceRef = process.env.PROJECT_PREVIEW_SOURCE_REF;
  if (!repository && !sourceRef) return null;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? "")) throw new Error("Invalid preview repository");
  if (!/^[0-9a-f]{40}$/.test(sourceRef ?? "")) throw new Error("Preview ref must be an exact SHA");
  return { repository, sourceRef, portfolio: { status: "preview" } };
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function findExecutable(directory, target) {
  try {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isFile() && entry.name === target) return path;
      if (entry.isDirectory()) {
        const found = await findExecutable(path, target);
        if (found) return found;
      }
    }
  } catch {
    return null;
  }
  return null;
}

async function mmdc() {
  const sibling = resolve("../portfolio-os/node_modules/.bin/mmdc");
  try {
    await access(sibling);
    return { executable: sibling, prefix: [] };
  } catch {
    try {
      return { executable: execFileSync("sh", ["-c", "command -v mmdc"], { encoding: "utf8" }).trim(), prefix: [] };
    } catch {
      return { executable: "npx", prefix: ["--yes", renderer] };
    }
  }
}

const command = await mmdc();
const chrome = process.env.PUPPETEER_EXECUTABLE_PATH
  ?? await findExecutable(join(homedir(), ".cache", "puppeteer", "chrome-headless-shell"), "chrome-headless-shell");
const env = { ...process.env, ...(chrome ? { PUPPETEER_EXECUTABLE_PATH: chrome } : {}) };
const config = {
  theme: "base",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#eef3f8",
    primaryTextColor: "#17202a",
    primaryBorderColor: "#52606d",
    lineColor: "#334e68",
    secondaryColor: "#e8f1ff",
    tertiaryColor: "#f7f9fc",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "16px",
  },
  flowchart: { curve: "basis", htmlLabels: false, nodeSpacing: 38, rankSpacing: 52 },
};

const approvedEntries = projectRegistry.filter((item) => item.portfolio.status === "approved");
const candidate = previewEntry();
const entries = candidate
  ? [...approvedEntries.filter((entry) => entry.repository !== candidate.repository), candidate]
  : approvedEntries;

for (const entry of entries) {
  const manifestResponse = await fetch(`https://raw.githubusercontent.com/${entry.repository}/${entry.sourceRef}/portfolio/project.json`);
  const sourceResponse = await fetch(`https://raw.githubusercontent.com/${entry.repository}/${entry.sourceRef}/architecture/system.mmd`);
  if (!manifestResponse.ok || !sourceResponse.ok) throw new Error(`Unable to fetch ${entry.repository}@${entry.sourceRef}`);
  const manifest = await manifestResponse.json();
  const source = await sourceResponse.text();
  const sourceSha256 = hash(source);
  const outputRoot = join("public", "assets", "projects", manifest.slug);
  const freshnessPath = join(outputRoot, "system.freshness.json");
  try {
    const freshness = JSON.parse(await readFile(freshnessPath, "utf8"));
    await Promise.all([access(join(outputRoot, "system.svg")), access(join(outputRoot, "system.png"))]);
    if (freshness.sourceRef === entry.sourceRef && freshness.sourceSha256 === sourceSha256) {
      console.log(`${manifest.slug}: architecture already current at ${entry.sourceRef}`);
      continue;
    }
  } catch {
    // Missing, unreadable, or incomplete assets are regenerated below.
  }
  const work = await mkdtemp(join(tmpdir(), "portfolio-site-architecture-"));
  const input = join(work, "system.mmd");
  const configPath = join(work, "mermaid-config.json");
  const puppeteerConfigPath = join(work, "puppeteer-config.json");
  await mkdir(outputRoot, { recursive: true });
  await writeFile(input, source);
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
  if (process.env.CI) {
    await writeFile(puppeteerConfigPath, `${JSON.stringify({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    }, null, 2)}\n`);
  }
  const outputs = [
    [join(outputRoot, "system.svg"), []],
    [join(outputRoot, "system.png"), ["--width", "1600", "--scale", "2"]],
  ];
  for (const [output, extra] of outputs) {
    const result = spawnSync(command.executable, [
      ...command.prefix,
      "-i", input,
      "--configFile", configPath,
      ...(process.env.CI ? ["--puppeteerConfigFile", puppeteerConfigPath] : []),
      "--backgroundColor", "white",
      "--quiet",
      "-o", output,
      ...extra,
    ], { encoding: "utf8", env });
    if (result.status !== 0) throw new Error(result.stderr || result.stdout || `Unable to render ${manifest.slug}`);
  }
  const svgPath = join(outputRoot, "system.svg");
  let svg = await readFile(svgPath, "utf8");
  const description = manifest.presentation?.architectureAlt ?? `${manifest.title} system architecture`;
  svg = svg.replace(
    /<svg\b/,
    `<svg role="img" aria-labelledby="architecture-title architecture-description" data-source-sha256="${sourceSha256}"`,
  ).replace(
    /(<svg\b[^>]*>)/,
    `$1<title id="architecture-title">${manifest.title} architecture</title><desc id="architecture-description">${description}</desc>`,
  );
  await writeFile(svgPath, `<!-- Generated from ${entry.repository}@${entry.sourceRef}:architecture/system.mmd; source-sha256=${sourceSha256}; renderer=${renderer} -->\n${svg}`);
  const pngPath = join(outputRoot, "system.png");
  await writeFile(freshnessPath, `${JSON.stringify({
    schemaVersion: 1,
    repository: entry.repository,
    sourceRef: entry.sourceRef,
    sourcePath: "architecture/system.mmd",
    sourceSha256,
    renderer,
    svgSha256: hash(await readFile(svgPath)),
    pngSha256: hash(await readFile(pngPath)),
  }, null, 2)}\n`);
  await rm(work, { recursive: true, force: true });
  console.log(`${manifest.slug}: architecture synchronized from ${entry.sourceRef}`);
}

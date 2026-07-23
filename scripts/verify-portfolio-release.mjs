import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [siteUrlArgument] = process.argv.slice(2);
if (!siteUrlArgument) throw new Error("Usage: node scripts/verify-portfolio-release.mjs <deployment-url>");

const siteUrl = new URL(siteUrlArgument);
const snapshot = JSON.parse(await readFile("src/content/generated/project-manifests.json", "utf8"));
const approved = snapshot.filter((project) => project.portfolio?.status === "approved");
const checks = [];

async function check(url, assertion, label) {
  const startedAt = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
    const body = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    assertion?.(body, response);
    checks.push({ label, url, status: "pass", httpStatus: response.status, durationMs: Date.now() - startedAt });
  } catch (error) {
    checks.push({ label, url, status: "fail", error: error.message, durationMs: Date.now() - startedAt });
  }
}

await check(siteUrl, null, "portfolio root");
const sitemapUrl = new URL("/sitemap.xml", siteUrl);
let sitemapBody = "";
await check(
  sitemapUrl,
  (body) => {
    sitemapBody = body;
  },
  "sitemap",
);

for (const project of approved) {
  const projectUrl = new URL(`/projects/${project.slug}/`, siteUrl);
  await check(
    projectUrl,
    (body) => {
      if (!body.includes(project.title)) throw new Error("title is missing");
      if (!body.includes(project.disclaimer)) throw new Error("disclosure is missing");
      if (project.githubUrl && !body.includes(project.githubUrl)) throw new Error("source link is missing");
      if (project.liveUrl && !body.includes(project.liveUrl)) throw new Error("demo link is missing");
      if (!body.includes(project.source.sourceRef)) throw new Error("source revision is missing");
    },
    `${project.slug} page`,
  );
  if (!sitemapBody.includes(`/projects/${project.slug}`)) {
    checks.push({ label: `${project.slug} sitemap`, url: sitemapUrl.toString(), status: "fail", error: "project path is missing" });
  } else {
    checks.push({ label: `${project.slug} sitemap`, url: sitemapUrl.toString(), status: "pass" });
  }

  if (project.deployment?.expiresAt && Date.parse(project.deployment.expiresAt) <= Date.now()) {
    checks.push({ label: `${project.slug} expiry`, status: "fail", error: "temporary demo is expired" });
  }
  if (project.deployment?.status === "live" && project.liveUrl) {
    await check(project.liveUrl, null, `${project.slug} live deployment`);
  }
  if (project.githubUrl) {
    await check(project.githubUrl, null, `${project.slug} source repository`);
  }
}

const failed = checks.filter((item) => item.status === "fail");
const record = {
  schemaVersion: 1,
  deploymentUrl: siteUrl.toString(),
  verifiedAt: new Date().toISOString(),
  sourceRepository: process.env.GITHUB_REPOSITORY ?? null,
  sourceSha: process.env.GITHUB_SHA ?? null,
  releaseNote: process.env.RELEASE_NOTE ?? null,
  result: failed.length ? "fail" : "pass",
  checks,
};

const recordPath = resolve(process.env.RELEASE_RECORD_PATH ?? ".agent-audit/release-record.json");
await mkdir(dirname(recordPath), { recursive: true });
await writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(JSON.stringify({ result: record.result, checks: checks.length, failed: failed.length, recordPath }, null, 2));
if (failed.length) process.exitCode = 1;

import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Project } from "@/content/project-manifest";

const snapshotPath = join(process.cwd(), "src/content/generated/project-manifests.json");

function readProjects(): Project[] {
  try {
    return JSON.parse(readFileSync(snapshotPath, "utf8")) as Project[];
  } catch {
    throw new Error("Project manifests have not been synchronized. Run `npm run sync-projects` first.");
  }
}

function isPubliclyReachable(project: Project): boolean {
  if (project.portfolio.status !== "approved" || !project.liveUrl) return false;
  if (project.deployment.status === "live") return true;
  if (project.deployment.status !== "temporary-demo") return false;

  const expiresAt = project.deployment.expiresAt ? Date.parse(project.deployment.expiresAt) : Number.NaN;
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export const projects = readProjects()
  .filter(isPubliclyReachable)
  .sort((a, b) => a.portfolio.sortOrder - b.portfolio.sortOrder);
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

// Kept only to preserve existing direct routes and sitemap compatibility. They are not promoted in navigation or on the home page.
export const notes = [
  { slug: "evidence-first-ai", title: "Evidence-first AI systems", summary: "Why citations, refusals, and evaluation belong in the product, not as a postscript.", status: "Note" },
];
export const experiments = [
  { slug: "retrieval-lab", title: "Retrieval Lab", summary: "An in-progress exploration of retrieval quality, graph expansion, and evaluation signals.", status: "In progress" },
];

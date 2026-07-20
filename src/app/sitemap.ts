import type { MetadataRoute } from "next";
import { experiments, notes, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = ["", "/work", "/about", ...projects.map((project) => `/projects/${project.slug}`), ...notes.map((note) => `/notes/${note.slug}`), ...experiments.map((experiment) => `/experiments/${experiment.slug}`)];
  return urls.map((path) => ({ url: `${siteConfig.siteUrl}${path}` }));
}

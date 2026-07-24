"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/content/project-manifest";

export default function ProjectRail({ projects }: { projects: Project[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => rail.current?.scrollBy({ left: direction * 360, behavior: "smooth" });

  return <section className="project-rail-section" aria-labelledby="live-projects-title">
    <div className="shell rail-heading">
      <div><p className="eyebrow">LIVE PROJECTS</p><h2 id="live-projects-title">A working portfolio, not a highlight reel.</h2></div>
      <div className="rail-actions"><button type="button" aria-label="Scroll projects left" onClick={() => scroll(-1)}><CaretLeftIcon aria-hidden size={18} weight="bold" /></button><button type="button" aria-label="Scroll projects right" onClick={() => scroll(1)}><CaretRightIcon aria-hidden size={18} weight="bold" /></button><Link className="text-link" href="/work">All projects</Link></div>
    </div>
    <div className="project-rail" ref={rail} tabIndex={0} aria-label="Scrollable live project list">
      {projects.map((project, index) => <Link className="rail-project" href={`/projects/${project.slug}`} key={project.slug}>
        <span className="rail-index">{String(index + 1).padStart(2, "0")}</span><span className="rail-title">{project.title}</span><span className="rail-outcome">{project.outcome}</span><span className="rail-arrow" aria-hidden>↗</span>
      </Link>)}
    </div>
  </section>;
}

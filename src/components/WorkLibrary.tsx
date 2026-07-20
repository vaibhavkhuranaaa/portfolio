"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { categories, type Project } from "@/content/project-manifest";

export default function WorkLibrary({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((project) => project.categories.includes(active as typeof categories[number]));

  return (
    <>
      <div className="shell">
        <div className="filters" aria-label="Filter projects by capability">
          {["All", ...categories].map((category) => (
            <button aria-pressed={category === active} className={category === active ? "active" : ""} onClick={() => setActive(category)} key={category} type="button">
              {category}
            </button>
          ))}
        </div>
      </div>
      <section className="shell list" aria-live="polite">
        {shown.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </section>
    </>
  );
}

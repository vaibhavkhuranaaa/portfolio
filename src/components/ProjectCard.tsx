import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Project } from "@/content/project-manifest";
import { getProjectPresentation } from "@/content/project-presentation";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const presentation = getProjectPresentation(project);

  return (
    <article className={`project-card ${featured ? "project-card-featured" : ""}`}>
      <Link className="project-flow-card" href={`/projects/${project.slug}`} aria-label={`Open the ${project.title} project`}>
        {project.stages.slice(0, 3).map((stage, index) => <span key={stage}><b>{String(index + 1).padStart(2, "0")}</b>{stage}</span>)}
      </Link>
      <div className="project-card-copy">
        <div className="tag-row">{project.categories.map((item) => <span key={item}>{item}</span>)}</div>
        <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        {presentation.metrics[0] && <p className="project-evidence-line"><strong>{presentation.metrics[0].value}</strong> {presentation.metrics[0].label}</p>}
      </div>
      <div className="project-links">
        <Link href={`/projects/${project.slug}`}>View project <ArrowUpRightIcon aria-hidden size={16} weight="bold" /></Link>
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <GithubLogoIcon aria-hidden size={16} weight="bold" /></a>}
        {project.liveUrl && <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live product <ArrowUpRightIcon aria-hidden size={16} weight="bold" /></a>}
      </div>
    </article>
  );
}

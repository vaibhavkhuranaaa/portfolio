import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/project-manifest";
import { getProjectPresentation } from "@/content/project-presentation";

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const presentation = getProjectPresentation(project);

  return (
    <article className={`project-card ${featured ? "project-card-featured" : ""}`}>
      <Link className="project-cover" href={`/projects/${project.slug}`} aria-label={`Open the ${project.title} project`}>
        <Image alt={presentation.coverAlt} src={presentation.coverImage} width={1448} height={1086} priority={featured} sizes="(max-width: 900px) 100vw, 55vw" />
      </Link>
      <div className="project-card-copy">
        <div className="tag-row">{project.categories.map((item) => <span key={item}>{item}</span>)}</div>
        <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        <div className="metric-row">{presentation.metrics.slice(0, 2).map((metric) => <strong key={metric.label}><b>{metric.value}</b>{metric.label}</strong>)}</div>
      </div>
      <div className="project-links">
        <Link href={`/projects/${project.slug}`}>View project <ArrowUpRightIcon aria-hidden size={16} weight="bold" /></Link>
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <GithubLogoIcon aria-hidden size={16} weight="bold" /></a>}
        {project.liveUrl && <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live product <ArrowUpRightIcon aria-hidden size={16} weight="bold" /></a>}
      </div>
    </article>
  );
}

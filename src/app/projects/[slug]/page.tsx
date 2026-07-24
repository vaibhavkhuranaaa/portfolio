import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getProject, projects } from "@/content/projects";
import { getProjectPresentation } from "@/content/project-presentation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, type: "article" } } : {};
}

export default async function Project({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const presentation = getProjectPresentation(project);
  return <main>
    <SiteNav />
    <header className="shell case-head"><p className="eyebrow">{project.industries.join(" / ").toUpperCase()}</p><div className="tag-row">{project.categories.map((item) => <span key={item}>{item}</span>)}</div><h1>{project.title}</h1><p>{project.outcome}</p><div className="case-actions">{project.liveUrl ? <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">Open {project.deployment.status === "temporary-demo" ? "temporary demo" : "project"} <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></a> : <span className="pending">{project.deployment.status === "local" ? "Local only" : `${project.deployment.provider ?? "Deployment"} release pending`}</span>}{project.githubUrl && <a className="button button-quiet" href={project.githubUrl} target="_blank" rel="noreferrer">Source <GithubLogoIcon aria-hidden size={17} weight="bold" /></a>}</div></header>
    <section className="shell case-visual"><Image alt={presentation.coverAlt} src={presentation.coverImage} width={1448} height={1086} sizes="100vw" loading="eager" /></section>
    <ProjectCaseStudy project={project} presentation={presentation} />
    <section className="shell source-record"><p><strong>Source revision</strong><code>{project.source.sourceRef}</code>{project.portfolio.status === "preview" ? " / preview only" : " / approved exact SHA"}</p><p>{project.disclaimer}</p></section>
    <p className="shell case-back"><Link href="/work"><ArrowLeftIcon aria-hidden size={16} weight="bold" /> All projects</Link></p>
    <SiteFooter />
  </main>;
}

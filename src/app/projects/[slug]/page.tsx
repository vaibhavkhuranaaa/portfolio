import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { ArchitectureStory, MetricCards } from "@/components/ProjectEvidence";
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
    <section className="shell case-visual"><Image alt={presentation.coverAlt} src={presentation.coverImage} width={1448} height={1086} sizes="100vw" /></section>
    <section className="shell project-question"><p className="eyebrow">THE QUESTION</p><p>{presentation.question}</p></section>
    <section className="shell project-answer"><p className="eyebrow">THE ANSWER</p><p>{presentation.answer}</p></section>
    {project.story && <ProjectCaseStudy story={project.story} />}
    <section className="shell project-evidence"><div><p className="eyebrow">VERIFIED EVIDENCE</p><h2>Measured at the system level.</h2></div><MetricCards metrics={presentation.metrics} /></section>
    <div className="shell"><ArchitectureStory intro={presentation.architectureIntro} steps={presentation.architecture} /></div>
    <section className="shell project-modules"><article><p className="eyebrow">DELIVERY</p><ol>{project.stages.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></article><article><p className="eyebrow">EVALUATION</p><ul>{project.evaluation.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="eyebrow">DESIGN TRADEOFFS</p><ul>{project.operationalTradeoffs.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="project-stack"><p className="eyebrow">WORKING STACK</p><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></article></section>
    <section className="shell disclaimer"><p>DISCLOSURE</p><p>{project.disclaimer}</p>{project.dataDisclosure && <><p>Data: {project.dataDisclosure.classification} / {project.dataDisclosure.source} / {project.dataDisclosure.license}</p><p>Deployed artifact: {project.dataDisclosure.deployedArtifactContents.join("; ")}</p></>}<p>Deployment: {project.deployment.provider ?? "Not selected"} / {project.deployment.runtime ?? "Not selected"} / {project.deployment.status}{project.deployment.exposure ? ` / ${project.deployment.exposure}` : ""}{project.deployment.expiresAt ? ` / expires ${project.deployment.expiresAt}` : ""}</p><p>Source revision: <code>{project.source.sourceRef}</code>{project.portfolio.status === "preview" ? " / preview only" : ""}</p></section>
    <p className="shell case-back"><Link href="/work"><ArrowLeftIcon aria-hidden size={16} weight="bold" /> All projects</Link></p>
    <SiteFooter />
  </main>;
}

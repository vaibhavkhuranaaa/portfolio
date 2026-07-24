import { ArrowDownIcon, ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import ProjectRail from "@/components/ProjectRail";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { SkillClusters } from "@/components/ProfileModules";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <main>
      <SiteNav />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">VAIBHAV KHURANA / AI + DATA SYSTEMS</p>
          <h1>Data and AI systems that hold up.</h1>
          <p className="intro">I build reliable data platforms, applied AI, and analytical products from source material through deployment.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/work">Explore projects <ArrowDownIcon aria-hidden size={17} weight="bold" /></Link>
            {siteConfig.contactEmail && <a className="button button-quiet" href={`mailto:${siteConfig.contactEmail}`}>Contact <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></a>}
          </div>
        </div>
        <figure className="hero-portrait"><Image src="/assets/profile/vaibhav-khurana.png" alt="Vaibhav Khurana" width={1288} height={1221} priority sizes="(max-width: 900px) 100vw, 50vw" /><figcaption>AI systems architecture · data products · cloud delivery</figcaption></figure>
      </section>

      <section className="shell publication-strip" aria-label="Portfolio publication standard">
        <strong>{projects.length} approved projects</strong>
        <span>Every page is pinned to a reviewed source SHA and links claims to repository evidence.</span>
      </section>

      <ProjectRail projects={projects} />

      <section className="profile-preview">
        <div className="shell profile-preview-grid">
          <div className="profile-preview-intro"><p className="eyebrow">PROFESSIONAL SNAPSHOT</p><h2>Data foundations. AI systems. Architecture that ships.</h2><p>Azure- and AWS-certified, with a data analyst’s rigor and a data scientist’s evaluation mindset—progressing into AI engineering and architecture.</p><Link className="text-link" href="/about">Professional profile <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></Link></div>
          <div><SkillClusters projects={projects} compact /></div>
        </div>
      </section>

      <section className="shell section operating-model">
        <div className="section-heading"><p className="eyebrow">HOW I WORK</p><h2>From decision to a system people can use.</h2><p>Each stage has a clear output, a verification point, and a documented handoff.</p></div>
        <WorkflowDiagram />
      </section>

      {siteConfig.contactEmail && (
        <section className="shell contact-section">
          <div><p className="eyebrow">NEXT CONVERSATION</p><h2>Building an AI or data product that has to hold up in the real world?</h2></div>
          <a className="button button-primary" href={`mailto:${siteConfig.contactEmail}`}><EnvelopeSimpleIcon aria-hidden size={18} weight="bold" /> Contact</a>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}

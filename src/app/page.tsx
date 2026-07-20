import { ArrowDownIcon, ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import HeroSignal from "@/components/HeroSignal";
import ProjectCard from "@/components/ProjectCard";
import { ApproachList, CredentialStrip, SkillClusters } from "@/components/ProfileModules";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { experiments, notes, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function Home() {
  const featured = projects.filter((project) => project.portfolio.featured).slice(0, 3);

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
            <a className="button button-quiet" href={`mailto:${siteConfig.contactEmail}`}>Contact <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></a>
          </div>
        </div>
        <HeroSignal />
      </section>

      <section className="shell proof-strip" aria-label="Portfolio evidence">
        <div><strong>{projects.length}</strong><span>published projects with source-linked evidence</span></div>
        <div><strong>139</strong><span>deterministic tests in a featured system</span></div>
        <div><strong>0.929</strong><span>graph retrieval R@5 in evaluation</span></div>
      </section>

      <section className="shell section selected-work">
        <div className="section-heading"><p className="eyebrow">SELECTED PROJECTS</p><h2>Systems with an evidence trail.</h2></div>
        <div className="project-grid">{featured.map((project) => <ProjectCard key={project.slug} project={project} featured />)}</div>
        <Link className="text-link" href="/work">Browse all work <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></Link>
      </section>

      <section className="profile-preview">
        <div className="shell profile-preview-grid">
          <div className="profile-preview-intro"><p className="eyebrow">PROFESSIONAL SNAPSHOT</p><h2>Built for data, AI, and analytical product work.</h2><p>Focused technical depth across data engineering, applied AI, cloud delivery, and analytical interfaces.</p><Link className="text-link" href="/about">Professional profile <ArrowUpRightIcon aria-hidden size={17} weight="bold" /></Link></div>
          <div><CredentialStrip /><SkillClusters compact /></div>
        </div>
      </section>

      <section className="shell section operating-model">
        <div className="section-heading"><p className="eyebrow">HOW I WORK</p><h2>Build the right system before the impressive one.</h2><p>The work has to survive real source material, real evaluation, and the constraints of a real delivery environment.</p></div>
        <ApproachList />
      </section>

      <section className="shell section studio-section">
        <div className="studio-heading"><p className="eyebrow">IN THE STUDIO</p><h2>Experiments and technical notes.</h2></div>
        <div className="studio-list">{[...experiments, ...notes].map((item) => <Link className="studio-item" href={item.status === "Note" ? `/notes/${item.slug}` : `/experiments/${item.slug}`} key={item.slug}><small>{item.status}</small><h3>{item.title}</h3><p>{item.summary}</p><ArrowUpRightIcon aria-hidden size={20} weight="bold" /></Link>)}</div>
      </section>

      <section className="shell contact-section">
        <div><p className="eyebrow">NEXT CONVERSATION</p><h2>Building an AI or data product that has to hold up in the real world?</h2></div>
        <a className="button button-primary" href={`mailto:${siteConfig.contactEmail}`}><EnvelopeSimpleIcon aria-hidden size={18} weight="bold" /> Contact</a>
      </section>
      <SiteFooter />
    </main>
  );
}

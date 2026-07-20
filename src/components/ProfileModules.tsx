import { BrainIcon, ChartLineUpIcon, CloudCheckIcon, DatabaseIcon } from "@phosphor-icons/react/dist/ssr";
import { siLangchain, siNeo4j, siPlotly, siPostgresql, siPython, siStreamlit, siSupabase, type SimpleIcon } from "simple-icons";
import { approach, credentials, profileSkills, type ProfileSkill } from "@/content/profile";

const skillGroups = ["Data engineering", "Data science & analytics", "Applied AI", "Cloud delivery"] as const;
const groupIcons = { "Data engineering": DatabaseIcon, "Data science & analytics": ChartLineUpIcon, "Applied AI": BrainIcon, "Cloud delivery": CloudCheckIcon };
const brandIcons: Record<NonNullable<ProfileSkill["icon"]>, SimpleIcon> = { python: siPython, postgresql: siPostgresql, neo4j: siNeo4j, streamlit: siStreamlit, supabase: siSupabase, langchain: siLangchain, plotly: siPlotly };

function BrandIcon({ icon, label }: { icon: NonNullable<ProfileSkill["icon"]>; label: string }) {
  const mark = brandIcons[icon];
  return <svg aria-label={label} className="brand-mark" role="img" viewBox="0 0 24 24"><path d={mark.path} fill="currentColor" /></svg>;
}

export function CredentialStrip() {
  return <section className="credential-strip" aria-label="Professional certifications">{credentials.map((credential) => <article key={credential.label}><span>{credential.issuer}</span><strong>{credential.label}</strong><p>{credential.note}</p></article>)}</section>;
}

export function SkillClusters({ compact = false }: { compact?: boolean }) {
  return <div className={`skill-clusters ${compact ? "skill-clusters-compact" : ""}`}>{skillGroups.map((group) => {
    const GroupIcon = groupIcons[group];
    const skills = profileSkills.filter((skill) => skill.group === group);
    return <section className="skill-cluster" key={group}><div className="skill-cluster-heading"><GroupIcon aria-hidden size={20} weight="regular" /><h3>{group}</h3></div><div className="skill-bubbles">{skills.map((skill) => <article className="skill-bubble" key={skill.name}>{skill.icon ? <BrandIcon icon={skill.icon} label={`${skill.name} logo`} /> : <span className="skill-sigil" aria-hidden>{skill.name.slice(0, 1)}</span>}<div><strong>{skill.name}</strong>{!compact && <p>{skill.detail}</p>}</div></article>)}</div></section>;
  })}</div>;
}

export function ApproachList() {
  return <ol className="approach-list">{approach.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
}

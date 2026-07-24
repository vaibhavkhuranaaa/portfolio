import { BrainIcon, ChartLineUpIcon, CloudCheckIcon, DatabaseIcon } from "@phosphor-icons/react/dist/ssr";
import { approach, profileSkills } from "@/content/profile";
import { TechnologyMark } from "@/components/TechnologyList";

const skillGroups = ["Data engineering", "Data science & analytics", "Applied AI", "Cloud delivery"] as const;
const groupIcons = { "Data engineering": DatabaseIcon, "Data science & analytics": ChartLineUpIcon, "Applied AI": BrainIcon, "Cloud delivery": CloudCheckIcon };
export function SkillClusters({ compact = false }: { compact?: boolean }) {
  return <div className={`skill-clusters ${compact ? "skill-clusters-compact" : ""}`}>{skillGroups.map((group) => {
    const GroupIcon = groupIcons[group];
    const skills = profileSkills.filter((skill) => skill.group === group);
    return <section className="skill-cluster" key={group}><div className="skill-cluster-heading"><GroupIcon aria-hidden size={20} weight="regular" /><h3>{group}</h3></div><div className="skill-bubbles">{skills.map((skill) => <article className="skill-bubble" key={skill.name}><TechnologyMark name={skill.name} />{!compact && <p>{skill.detail}</p>}</article>)}</div></section>;
  })}</div>;
}

export function ApproachList() {
  return <ol className="approach-list">{approach.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
}

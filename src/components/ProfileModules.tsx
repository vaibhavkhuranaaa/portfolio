import { BrainIcon, ChartLineUpIcon, CloudCheckIcon, DatabaseIcon } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/content/project-manifest";
import { approach, profileSkills } from "@/content/profile";
import { TechnologyMark } from "@/components/TechnologyList";

const skillGroups = ["Data engineering", "Data science & analytics", "Applied AI", "Cloud delivery"] as const;
const groupIcons = { "Data engineering": DatabaseIcon, "Data science & analytics": ChartLineUpIcon, "Applied AI": BrainIcon, "Cloud delivery": CloudCheckIcon };
const primaryStack = [
  { group: "Cloud delivery", name: "Microsoft Azure", detail: "AI, data, identity, and application delivery" },
  { group: "Cloud delivery", name: "Amazon Web Services", detail: "Cloud architecture and managed AI services" },
  { group: "Applied AI", name: "Azure OpenAI", detail: "Grounded generation and AI application patterns" },
  { group: "Data engineering", name: "Python", detail: "Data processing, automation, and application development" },
  { group: "Data science & analytics", name: "SQL", detail: "Analytical modeling and decision-ready data" },
] as const;

function groupForTechnology(name: string) {
  if (/^Azure |^Microsoft Entra|^Microsoft Azure|^Amazon |^AWS|Docker|GitHub Actions|Vercel/i.test(name)) return "Cloud delivery";
  if (/OpenAI|LangChain|sentence-transformers|ONNX|Hugging Face/i.test(name)) return "Applied AI";
  if (/PostgreSQL|Neo4j|Supabase|DuckDB|Python|FastAPI|Flask/i.test(name)) return "Data engineering";
  return "Data science & analytics";
}

function groupedSkills(projects: Project[]) {
  const known = new Set<string>(primaryStack.map((skill) => skill.name));
  const projectSkills = projects.flatMap((project) => project.stack)
    .filter((name, index, all) => all.indexOf(name) === index && !known.has(name))
    .map((name) => ({ name, group: groupForTechnology(name), detail: "Used in a live portfolio project" }));
  const emitted = new Set<string>();
  return [...primaryStack, ...profileSkills, ...projectSkills].filter((skill) => {
    if (emitted.has(skill.name)) return false;
    emitted.add(skill.name);
    return true;
  });
}

export function SkillClusters({ compact = false, projects = [] }: { compact?: boolean; projects?: Project[] }) {
  const skillsCatalog = groupedSkills(projects);
  return <div className={`skill-clusters ${compact ? "skill-clusters-compact" : ""}`}>{skillGroups.map((group) => {
    const GroupIcon = groupIcons[group];
    const skills = skillsCatalog.filter((skill) => skill.group === group);
    return <section className="skill-cluster" key={group}><div className="skill-cluster-heading"><GroupIcon aria-hidden size={20} weight="regular" /><h3>{group}</h3></div><div className="skill-bubbles">{skills.map((skill) => <article className="skill-bubble" key={skill.name}><TechnologyMark name={skill.name} />{!compact && <p>{skill.detail}</p>}</article>)}</div></section>;
  })}</div>;
}

export function ApproachList() {
  return <ol className="approach-list">{approach.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
}

import type { ProjectStory } from "@/content/project-manifest";

export function ProjectCaseStudy({ story }: { story: ProjectStory }) {
  return <>
    <section className="shell project-story"><div><p className="eyebrow">FOR DECISION MAKERS</p><h2>{story.intendedUser}</h2></div><p>{story.executiveSummary}</p></section>
    <section className="shell project-example"><p className="eyebrow">EXAMPLE WORKFLOW</p><h2>{story.example.title}</h2><ol>{story.example.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></section>
    <section className="shell project-decisions"><div><p className="eyebrow">TECHNOLOGY DECISIONS</p><h2>Chosen deliberately, with alternatives in view.</h2></div><div>{story.technologyDecisions.map((decision) => <article key={decision.technology}><h3>{decision.technology}</h3><p><strong>Why:</strong> {decision.rationale}</p><p><strong>Alternative:</strong> {decision.alternative}</p><p><strong>Trade-off:</strong> {decision.tradeoff}</p></article>)}</div></section>
    <section className="shell project-evidence-detail"><p className="eyebrow">HOW THE EVIDENCE WAS MEASURED</p>{story.evidence.map((item) => <article key={`${item.value}-${item.label}`}><strong>{item.value}</strong><div><h3>{item.label}</h3><p>{item.context}</p><small>{item.method}</small></div></article>)}</section>
    <section className="shell project-limitations"><p className="eyebrow">LIMITATIONS</p><ul>{story.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
  </>;
}

import type { ReactNode } from "react";
import type { Project } from "@/content/project-manifest";
import type { ProjectPresentation } from "@/content/project-presentation";
import { TechnologyList } from "@/components/TechnologyList";
import PanZoomArchitecture from "@/components/PanZoomArchitecture";

function sourceLink(project: Project, source: string) {
  if (/^https?:\/\//.test(source)) return source;
  return project.githubUrl ? `${project.githubUrl}/blob/${project.source.sourceRef}/${source}` : undefined;
}

function evidenceById(project: Project) {
  return new Map((project.evidence ?? []).map((item) => [item.id, item]));
}

function EvidenceRefs({ project, refs = [] }: { project: Project; refs?: string[] }) {
  const catalog = evidenceById(project);
  if (!refs.length) return <>Evidence link not recorded</>;
  return <>{refs.map((id, index) => {
    const item = catalog.get(id);
    const href = item ? sourceLink(project, item.source) : undefined;
    return <span key={id}>{index > 0 && ", "}{href ? <a href={href} target="_blank" rel="noreferrer">{id}</a> : <code>{id}</code>}</span>;
  })}</>;
}

function DataTable({ label, headers, rows }: { label: string; headers: string[]; rows: ReactNode[][] }) {
  return <div className="table-scroll" role="region" aria-label={label} tabIndex={0}><table><thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function ProjectCaseStudy({ project, presentation }: { project: Project; presentation: ProjectPresentation }) {
  const story = project.story;
  if (!story) return null;
  const scalabilityRoadmap = story.scalabilityRoadmap ?? [];
  const evidence = evidenceById(project);
  const securityControls = project.presentation?.securityControls ?? [{
    control: "Public data boundary",
    implementation: (project.dataDisclosure?.excludedFields ?? []).join("; "),
    evidenceRefs: project.evidence?.filter((item) => item.kind === "security" || item.kind === "disclosure").map((item) => item.id) ?? [],
    limitation: project.disclaimer,
  }];

  return <>
    <section className="shell stakeholder-layer" aria-labelledby="stakeholder-title">
      <div className="section-heading compact-heading"><p className="eyebrow">STAKEHOLDER VIEW</p><h2 id="stakeholder-title">What this project is for.</h2></div>
      <dl className="executive-grid">
        <div><dt>Problem</dt><dd>{story.recruiterSummary ?? project.summary}</dd></div>
        <div><dt>Intended user</dt><dd>{story.intendedUser}</dd></div>
        <div><dt>Decision supported</dt><dd>{project.presentation?.decisionSupported ?? story.example.title}</dd></div>
        <div><dt>Outcome</dt><dd>{story.executiveSummary}</dd></div>
        <div><dt>What to try</dt><dd>{story.example.steps[0]}</dd></div>
        <div><dt>Important limitation</dt><dd>{story.limitations[0]}</dd></div>
      </dl>
      <div className="workflow-compact"><h3>{story.example.title}</h3><ol>{story.example.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
    </section>

    <details className="shell technical-layer" open>
      <summary><span>Technical review</span><small>Architecture, evidence, controls, deployment, and trade-offs</small></summary>
      <div className="technical-content">
        <section aria-labelledby="architecture-title">
          <div className="section-heading compact-heading"><p className="eyebrow">ARCHITECTURE</p><h2 id="architecture-title">One source, one rendered system view.</h2><p>{presentation.architectureIntro}</p></div>
          {presentation.architectureImage
            ? <PanZoomArchitecture src={presentation.architectureImage} alt={presentation.architectureAlt} />
            : <p className="boundary-note">The approved project record does not yet include an architecture asset.</p>}
        </section>

        <section className="technical-section" aria-labelledby="flow-title"><h3 id="flow-title">End-to-end flow</h3><ol className="flow-list">{project.stages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span>{stage}</li>)}</ol></section>
        <section className="technical-section" aria-labelledby="stack-title"><h3 id="stack-title">Technology stack</h3><TechnologyList technologies={project.stack} /></section>
        <section className="technical-section" aria-labelledby="decisions-title"><h3 id="decisions-title">Technology decisions</h3><DataTable label="Technology decisions and alternatives" headers={["Decision", "Why", "Alternative", "Trade-off"]} rows={story.technologyDecisions.map((item) => [item.technology, item.rationale, item.alternative, item.tradeoff])} /></section>
        <section className="technical-section" aria-labelledby="evaluation-title"><h3 id="evaluation-title">Evaluation and evidence</h3><DataTable label="Evaluation evidence" headers={["Metric", "Plain-language meaning", "Score / value", "Dataset / scenario", "Threshold / baseline", "Interpretation", "Evidence"]} rows={story.evidence.map((item) => {
          const record = (item.evidenceRefs ?? []).map((id) => evidence.get(id)).find(Boolean);
          return [item.label, item.meaning ?? `What ${item.label} measures for the stated evaluation scope.`, item.value, record?.scope ?? item.context, item.threshold ?? "No threshold or baseline recorded.", item.interpretation ?? record?.caveat ?? story.limitations[0], <EvidenceRefs key={`${item.label}-evidence`} project={project} refs={item.evidenceRefs} />];
        })} /><p className="boundary-note">These are {project.presentation?.evaluationMode ?? "project evaluation"} results, not a production service-level objective. Unknown values are shown as “Not recorded”; units and special characters retain their source meaning.</p></section>
        <section className="technical-section" aria-labelledby="terms-title"><h3 id="terms-title">Technical terms and value conventions</h3><DataTable label="Technical terms and value conventions" headers={["Term", "Plain-language use", "How this project uses it"]} rows={(project.presentation?.terms?.length ? project.presentation.terms : [{ term: "Evaluation score", plainLanguage: "A measured result from a defined test or benchmark, not a general promise.", projectUse: "Read it with the dataset, scenario, and limitation shown in the evaluation table." }, { term: "Unknown / null", plainLanguage: "A value that was not observed or is intentionally not claimed.", projectUse: "Rendered as “Not recorded” rather than silently converted to zero or omitted." }, { term: "Special characters", plainLanguage: "Symbols such as %, currency, Unicode, and escaped input retain their source meaning.", projectUse: "Units and encoding are explained where they affect the decision." }]).map((item) => [item.term, item.plainLanguage, item.projectUse])} /></section>
        <section className="technical-section" aria-labelledby="data-title"><h3 id="data-title">Data boundary</h3><DataTable label="Data disclosure" headers={["Classification", "Source", "Permitted use", "Excluded data"]} rows={[[project.dataDisclosure?.classification, project.dataDisclosure?.source, project.dataDisclosure?.permittedUse, project.dataDisclosure?.excludedFields.join("; ")]]} /></section>
        <section className="technical-section" aria-labelledby="security-title"><h3 id="security-title">Security and privacy controls</h3><DataTable label="Security and privacy controls" headers={["Control", "Implementation", "Evidence", "Limitation"]} rows={securityControls.map((item) => [item.control, item.implementation, <EvidenceRefs key={`${item.control}-evidence`} project={project} refs={item.evidenceRefs} />, item.limitation])} /></section>
        <section className="technical-section" aria-labelledby="deployment-title"><h3 id="deployment-title">Deployment and cost boundary</h3><DataTable label="Deployment configuration" headers={["Provider", "Runtime", "State", "Exposure", "Verified", "Production claim"]} rows={[[project.deployment.provider, project.deployment.runtime, project.deployment.status, project.deployment.exposure, project.deployment.verifiedAt, project.deployment.productionClaim ? "Yes" : "No"]]} />{project.presentation?.costBoundaries && <DataTable label="Cost boundaries" headers={["Component", "Boundary", "Implication"]} rows={project.presentation.costBoundaries.map((item) => [item.component, item.boundary, item.implication])} />}</section>
        <section className="technical-section split-tables" aria-labelledby="limits-title"><div><h3 id="limits-title">Known limitations</h3><ul>{story.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>{scalabilityRoadmap.length > 0 && <div><h3>Scalability roadmap</h3><ol>{scalabilityRoadmap.map((item) => <li key={item}>{item}</li>)}</ol></div>}</section>
      </div>
    </details>
  </>;
}

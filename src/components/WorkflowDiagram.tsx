import { ArrowRightIcon, CheckCircleIcon, DatabaseIcon, RocketLaunchIcon, TargetIcon } from "@phosphor-icons/react/dist/ssr";

const stages = [
  { title: "Frame", detail: "User decision, scope, and data boundary.", Icon: TargetIcon },
  { title: "Build", detail: "Data, AI, and product workflow in one system.", Icon: DatabaseIcon },
  { title: "Evaluate", detail: "Tests and evidence establish what the system can claim.", Icon: CheckCircleIcon },
  { title: "Deliver", detail: "A live, documented project enters the portfolio automatically.", Icon: RocketLaunchIcon },
];

export default function WorkflowDiagram() {
  return <ol className="workflow-diagram" aria-label="How I work">
    {stages.map(({ title, detail, Icon }, index) => <li key={title}><span className="workflow-number">{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden size={22} weight="regular" /><h3>{title}</h3><p>{detail}</p>{index < stages.length - 1 && <ArrowRightIcon className="workflow-arrow" aria-hidden size={18} weight="bold" />}</li>)}
  </ol>;
}

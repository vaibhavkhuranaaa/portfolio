import {
  siDocker,
  siDuckdb,
  siFastapi,
  siFlask,
  siGithubactions,
  siHuggingface,
  siLangchain,
  siNeo4j,
  siOnnx,
  siOpentelemetry,
  siPlotly,
  siPostgresql,
  siPython,
  siStreamlit,
  siSupabase,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  Python: siPython,
  TypeScript: siTypescript,
  Flask: siFlask,
  FastAPI: siFastapi,
  LangChain: siLangchain,
  "sentence-transformers": siHuggingface,
  "ONNX Runtime": siOnnx,
  "PostgreSQL + pgvector": siPostgresql,
  PostgreSQL: siPostgresql,
  "Neo4j AuraDB": siNeo4j,
  Neo4j: siNeo4j,
  Supabase: siSupabase,
  Plotly: siPlotly,
  Streamlit: siStreamlit,
  DuckDB: siDuckdb,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  OpenTelemetry: siOpentelemetry,
};

export function TechnologyMark({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <span className="technology">
      {icon && <svg aria-hidden className="technology-mark" viewBox="0 0 24 24"><path d={icon.path} fill="currentColor" /></svg>}
      <span>{name}</span>
    </span>
  );
}

export function TechnologyList({ technologies }: { technologies: string[] }) {
  const azure = technologies.filter((name) => /^(Azure |Microsoft Entra)/.test(name));
  const independent = technologies.filter((name) => !azure.includes(name));
  return <div className="technology-list" aria-label="Technology stack">
    {azure.length > 0 && <section className="technology-provider"><TechnologyMark name="Microsoft Azure" /><div className="technology-provider-services">{azure.map((name) => <TechnologyMark name={name} key={name} />)}</div></section>}
    {independent.map((name) => <TechnologyMark name={name} key={name} />)}
  </div>;
}

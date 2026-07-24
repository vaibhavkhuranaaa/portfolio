import {
  siDocker,
  siDuckdb,
  siFastapi,
  siFlask,
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
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  Python: siPython,
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
  return <div className="technology-list" aria-label="Technology stack">{technologies.map((name) => <TechnologyMark name={name} key={name} />)}</div>;
}

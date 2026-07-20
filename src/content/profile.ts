export type ProfileSkill = {
  name: string;
  group: "Data engineering" | "Data science & analytics" | "Applied AI" | "Cloud delivery";
  icon?: "python" | "postgresql" | "neo4j" | "streamlit" | "supabase" | "langchain" | "plotly";
  detail: string;
};

export const credentials = [
  { issuer: "Amazon Web Services", label: "AWS Certified", note: "Exact certification and verification link to be added." },
  { issuer: "Microsoft", label: "Microsoft Certified: Azure", note: "Exact certification and verification link to be added." },
] as const;

export const profileSkills: ProfileSkill[] = [
  { name: "Python", group: "Data engineering", icon: "python", detail: "Data processing and application development" },
  { name: "PostgreSQL + pgvector", group: "Data engineering", icon: "postgresql", detail: "Structured data and vector retrieval" },
  { name: "Neo4j", group: "Data engineering", icon: "neo4j", detail: "Connected data and graph retrieval" },
  { name: "Entity extraction", group: "Data science & analytics", detail: "Structured signals from unstructured material" },
  { name: "Plotly", group: "Data science & analytics", icon: "plotly", detail: "Interactive analytical interfaces" },
  { name: "Evaluation design", group: "Data science & analytics", detail: "Reproducible quality measurement" },
  { name: "Azure OpenAI", group: "Applied AI", detail: "Grounded generation workflows" },
  { name: "Azure AI Search", group: "Applied AI", detail: "Hybrid evidence retrieval" },
  { name: "LangChain", group: "Applied AI", icon: "langchain", detail: "LLM application orchestration" },
  { name: "Azure delivery", group: "Cloud delivery", detail: "Document Intelligence, App Service, and storage" },
  { name: "Streamlit", group: "Cloud delivery", icon: "streamlit", detail: "Useful technical products" },
  { name: "Supabase", group: "Cloud delivery", icon: "supabase", detail: "Managed data services" },
];

export const approach = [
  { title: "Frame the decision", detail: "Clarify the user, source boundary, and decision the system must support." },
  { title: "Structure the data", detail: "Design durable ingestion, retrieval, and data models around the source material." },
  { title: "Evaluate the system", detail: "Measure behavior against known evidence before trusting a polished interface." },
  { title: "Deliver with clarity", detail: "Ship a useful product with observable tradeoffs, documentation, and disclosure." },
] as const;

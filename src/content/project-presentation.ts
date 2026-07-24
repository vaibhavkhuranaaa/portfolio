import type { Project } from "@/content/project-manifest";

export type ProjectMetric = {
  value: string;
  label: string;
  context: string;
};

export type ArchitectureStep = {
  label: string;
  detail: string;
  image: string;
  alt: string;
};

export type ProjectPresentation = {
  coverImage: string;
  coverAlt: string;
  question: string;
  answer: string;
  architectureIntro: string;
  metrics: ProjectMetric[];
  architecture: ArchitectureStep[];
};

const presentations: Record<string, ProjectPresentation> = {
  "legal-document-intelligence-rag": {
    coverImage: "/assets/project-covers/legal-document-intelligence-rag.png",
    coverAlt: "Abstract document pages passing through a retrieval and citation system",
    question: "How can legal research return a defensible answer without wandering beyond an approved public corpus?",
    answer: "Constrain the evidence boundary first, preserve source structure, retrieve across that controlled corpus, and require citations in the response.",
    architectureIntro: "A controlled public corpus moves through extraction, retrieval, and citation-required generation.",
    metrics: [
      { value: "139", label: "deterministic tests", context: "Ingestion, retrieval, and answer-grounding behavior" },
      { value: "390", label: "approved public chunks", context: "Controlled source material available to retrieval" },
      { value: "Required", label: "source citations", context: "Grounded generation must cite approved chunks" },
    ],
    architecture: [
      { label: "Approved source boundary", detail: "Public court opinions define exactly what the system may reason over.", image: "/assets/project-architecture/legal-document-intelligence-rag-01.png", alt: "Silver document archive receiving blue source signals" },
      { label: "Structure before retrieval", detail: "Document Intelligence and source-linked chunks retain the sections and provenance retrieval needs.", image: "/assets/project-architecture/legal-document-intelligence-rag-02.png", alt: "Document structure being separated into a precise record" },
      { label: "Hybrid evidence retrieval", detail: "AI Search finds the most relevant approved passages before the model is asked to write.", image: "/assets/project-architecture/legal-document-intelligence-rag-03.png", alt: "Electric blue retrieval lines finding relevant records in a silver archive" },
      { label: "Answer with a trace", detail: "Azure OpenAI produces a response only from retrieved evidence, with its sources attached.", image: "/assets/project-architecture/legal-document-intelligence-rag-04.png", alt: "Cited response assembled from connected evidence" },
    ],
  },
  "legal-discovery-intelligence-graph": {
    coverImage: "/assets/project-covers/legal-discovery-intelligence-graph.png",
    coverAlt: "Abstract investigation graph with connected entities and evidence paths",
    question: "How can an investigator move from a large discovery record to evidence they can inspect and trace?",
    answer: "Model the corpus two ways: semantic similarity for fast recall, and a graph for the relationships that make an investigation intelligible.",
    architectureIntro: "Synthetic discovery material is indexed through complementary vector and graph retrieval paths before investigation.",
    metrics: [
      { value: "0.889", label: "entity extraction F1", context: "Strict evaluation on the reproducible corpus" },
      { value: "0.929", label: "graph retrieval R@5", context: "Reproducible evaluation result" },
      { value: "0.833", label: "relationship hit@5", context: "Reproducible evaluation result" },
    ],
    architecture: [
      { label: "Reproducible discovery record", detail: "A synthetic corpus makes every result inspectable without making claims about real legal matters.", image: "/assets/project-architecture/legal-discovery-intelligence-graph-01.png", alt: "Synthetic discovery material organized in a silver archive" },
      { label: "Entities and events", detail: "Extraction turns documents into the people, organizations, events, and relationships an investigator needs.", image: "/assets/project-architecture/legal-discovery-intelligence-graph-02.png", alt: "Electric blue entities emerging from a graphite discovery record" },
      { label: "Two retrieval paths", detail: "pgvector supplies semantic recall while Neo4j exposes connected evidence and relationship paths.", image: "/assets/project-architecture/legal-discovery-intelligence-graph-03.png", alt: "Vector and graph paths converging through blue illuminated connections" },
      { label: "Evidence an investigator can follow", detail: "The Streamlit workspace brings both paths together as a cited, explorable investigation surface.", image: "/assets/project-architecture/legal-discovery-intelligence-graph-04.png", alt: "Cited investigation outcome presented through a silver and blue graph interface" },
    ],
  },
};

function genericPresentation(project: Project): ProjectPresentation {
  return {
    coverImage: "/assets/generated/adaptive-intelligence-hero.png",
    coverAlt: `${project.title} project visual`,
    question: `What problem does ${project.title} answer?`,
    answer: project.outcome,
    architectureIntro: "A structured path from source material to a delivered system.",
    metrics: project.metrics.slice(0, 3).map((metric) => ({ value: metric, label: "verified evidence", context: "Published project record" })),
    architecture: project.architecture.map((label) => ({ label, detail: "Published system stage.", image: "/assets/generated/adaptive-intelligence-hero.png", alt: `${project.title} architecture visual` })),
  };
}

export function getProjectPresentation(project: Project): ProjectPresentation {
  const fallback = presentations[project.slug] ?? genericPresentation(project);
  if (!project.presentation) return fallback;
  return {
    ...fallback,
    coverImage: project.presentation.coverImage ?? fallback.coverImage,
    coverAlt: project.presentation.coverAlt ?? fallback.coverAlt,
    question: project.presentation.question,
    answer: project.presentation.answer,
    architecture: project.presentation.architecture.map((step) => ({
      ...step,
      alt: step.alt ?? `${step.label} architecture visual`,
    })),
  };
}

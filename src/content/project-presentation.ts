import type { Project } from "@/content/project-manifest";

export type ProjectMetric = {
  value: string;
  label: string;
  context: string;
  method?: string;
  evidenceRefs?: string[];
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
  architectureImage?: string;
  architectureAlt: string;
  metrics: ProjectMetric[];
  architecture: ArchitectureStep[];
};

const covers: Record<string, { image: string; alt: string }> = {
  "legal-document-intelligence-rag": {
    image: "/assets/project-covers/legal-document-intelligence-rag.png",
    alt: "Abstract document pages passing through a retrieval and citation system",
  },
  "legal-discovery-intelligence-graph": {
    image: "/assets/project-covers/legal-discovery-intelligence-graph.png",
    alt: "Abstract investigation graph with connected entities and evidence paths",
  },
};

export function getProjectPresentation(project: Project): ProjectPresentation {
  const cover = covers[project.slug] ?? {
    image: "/assets/generated/adaptive-intelligence-hero.png",
    alt: `${project.title} project cover`,
  };
  return {
    coverImage: project.presentation?.coverImage ?? cover.image,
    coverAlt: project.presentation?.coverAlt ?? cover.alt,
    question: project.presentation?.question ?? project.story?.recruiterSummary ?? project.summary,
    answer: project.presentation?.answer ?? project.story?.executiveSummary ?? project.outcome,
    architectureIntro: project.story?.technicalNarrative ?? project.outcome,
    architectureImage: project.presentation?.architectureImage,
    architectureAlt: project.presentation?.architectureAlt ?? `${project.title} system architecture`,
    metrics: (project.story?.evidence ?? []).map((item) => ({
      value: item.value,
      label: item.label,
      context: item.context,
      method: item.method,
      evidenceRefs: item.evidenceRefs,
    })),
    architecture: (project.presentation?.architecture ?? []).map((step) => ({
      ...step,
      alt: step.alt ?? `${step.label} architecture visual`,
    })),
  };
}

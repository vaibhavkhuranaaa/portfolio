export const categories = ["AI/ML", "Analytics", "Data Engineering", "Cloud"] as const;
export type Category = (typeof categories)[number];

export type Deployment = {
  provider: string | null;
  status: "local" | "temporary-demo" | "release-pending" | "live";
  runtime: string | null;
  exposure?: "private" | "authenticated" | "anonymous";
  productionClaim?: boolean;
  verifiedAt?: string | null;
  expiresAt?: string | null;
  evidenceRefs?: string[];
};

export type PortfolioPublication = {
  status: "approved" | "preview";
  approvedAt: string | null;
  featured: boolean;
  sortOrder: number;
};

export type ProjectPresentationStage = {
  label: string;
  detail: string;
  image: string;
  alt?: string;
};

export type ProjectPresentationContent = {
  question: string;
  answer: string;
  coverImage?: string;
  coverAlt?: string;
  architecture: ProjectPresentationStage[];
};

export type ProjectStory = {
  recruiterSummary?: string;
  technicalNarrative?: string;
  scalabilityRoadmap?: string[];
  executiveSummary: string;
  intendedUser: string;
  example: { title: string; steps: string[] };
  technologyDecisions: Array<{ technology: string; rationale: string; alternative: string; tradeoff: string }>;
  evidence: Array<{ value: string; label: string; context: string; method: string }>;
  limitations: string[];
};

export type Project = {
  version: 1 | 2;
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  industries: string[];
  categories: Category[];
  stack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  deployment: Deployment;
  metrics: string[];
  stages: string[];
  architecture: string[];
  evaluation: string[];
  operationalTradeoffs: string[];
  disclaimer: string;
  dataDisclosure?: {
    source: string;
    license: string;
    classification: "public" | "synthetic" | "private" | "confidential" | "mixed";
    permittedUse: string;
    includedFields: string[];
    excludedFields: string[];
    deployedArtifactContents: string[];
  };
  evidence?: Array<{
    id: string;
    kind: "test" | "evaluation" | "benchmark" | "deployment" | "security" | "disclosure" | "review";
    claim: string;
    source: string;
    method: string;
    result?: string | number | boolean | null;
  }>;
  resume?: {
    bulletCandidates: Array<{ role: string; bullet: string; evidenceRefs: string[] }>;
  };
  presentation?: ProjectPresentationContent;
  story?: ProjectStory;
  portfolio: PortfolioPublication;
  source: { repository: string; sourceRef: string; manifestPath?: string };
};

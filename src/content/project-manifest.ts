export const categories = ["AI/ML", "Analytics", "Data Engineering", "Cloud"] as const;
export type Category = (typeof categories)[number];

export type Deployment = {
  provider: string;
  status: "live" | "release-pending";
  runtime: string;
};

export type PortfolioPublication = {
  status: "approved";
  approvedAt: string;
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

export type Project = {
  version: 1;
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  industries: string[];
  categories: Category[];
  stack: string[];
  githubUrl: string;
  liveUrl: string | null;
  deployment: Deployment;
  metrics: string[];
  stages: string[];
  architecture: string[];
  evaluation: string[];
  operationalTradeoffs: string[];
  disclaimer: string;
  presentation?: ProjectPresentationContent;
  portfolio: PortfolioPublication;
  source: { repository: string; sourceRef: string };
};

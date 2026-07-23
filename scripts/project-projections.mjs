function evidenceCatalog(project) {
  if (project.version === 2) return project.evidence ?? [];
  return (project.metrics ?? []).map((claim, index) => ({
    id: `legacy:${project.slug}:metric:${index + 1}`,
    kind: "review",
    claim,
    source: `${project.source.repository}@${project.source.sourceRef}`,
    method: "Reviewed legacy v1 manifest; migrate to a reproducible v2 evidence record.",
    result: claim,
  }));
}

function resumeCandidates(project) {
  if (project.version === 2) return project.resume?.bulletCandidates ?? [];
  return [];
}

export function buildApprovedCatalog(projects, generatedAt = new Date().toISOString()) {
  const approved = projects.filter((project) => project.portfolio?.status === "approved");
  return {
    schemaVersion: 1,
    generatedAt,
    projects: approved.map((project) => {
      const evidence = evidenceCatalog(project);
      return {
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        outcome: project.outcome,
        industries: project.industries,
        categories: project.categories,
        stack: project.stack,
        source: {
          repository: project.source.repository,
          sourceRef: project.source.sourceRef,
          url: project.githubUrl,
        },
        deployment: {
          ...project.deployment,
          liveUrl: project.liveUrl,
        },
        disclosure: project.version === 2 ? project.dataDisclosure : { summary: project.disclaimer, classification: "legacy-reviewed" },
        evidence,
        portfolio: project.portfolio,
        narrative: {
          recruiterSummary: project.story?.recruiterSummary ?? project.story?.executiveSummary ?? project.summary,
          technicalNarrative: project.story?.technicalNarrative ?? project.outcome,
          limitations: project.story?.limitations ?? project.operationalTradeoffs,
          scalabilityRoadmap: project.story?.scalabilityRoadmap ?? [],
        },
        resumeBulletCandidates: resumeCandidates(project),
      };
    }),
  };
}

export function buildPortfolioPayload(catalog) {
  return {
    schemaVersion: 1,
    generatedAt: catalog.generatedAt,
    projects: catalog.projects.map((project) => ({
      slug: project.slug,
      sourceRef: project.source.sourceRef,
      exploreUrl: project.deployment.liveUrl,
      recruiterView: project.narrative.recruiterSummary,
      hiringManagerView: {
        technicalNarrative: project.narrative.technicalNarrative,
        stack: project.stack,
        evidence: project.evidence,
        limitations: project.narrative.limitations,
        futureImprovementsAndScalabilityRoadmap: project.narrative.scalabilityRoadmap,
      },
    })),
  };
}

export function buildResumePayload(catalog) {
  return {
    schemaVersion: 1,
    generatedAt: catalog.generatedAt,
    projects: catalog.projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      sourceRef: project.source.sourceRef,
      bulletCandidates: project.resumeBulletCandidates,
    })),
  };
}

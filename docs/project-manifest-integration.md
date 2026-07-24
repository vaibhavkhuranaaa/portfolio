# Project manifest integration

Each project repository owns an editable `portfolio/project.json`. Version 1 remains supported for existing approved projects. New and migrated projects use `schemas/project-manifest-v2.json` plus one validation profile:

- `draft`: structurally valid, truthful unknowns allowed, nullable source URL.
- `first-demo`: reproducibility, architecture, evaluation, disclosure, evidence, and temporary-demo expiry are required.
- `publication`: adds a public source URL, evidence-linked résumé candidates, and placeholder rejection.
- `live`: adds a reachable live URL, current expiry state, and post-deployment verification timestamp.

The schema describes structure. `scripts/project-manifest-validation.mjs` owns lifecycle semantics; projects must not create parallel schemas for each profile.

Presentation facts are also manifest-owned. The site renders a compact stakeholder layer first, then architecture, workflow, technology decisions, evaluation scope, disclosure, security controls, deployment and cost boundaries, limitations, roadmap, and an evidence index. It does not keep a separate hand-authored set of project claims.

## Exact-SHA preview

Copy `.github/workflows/project-manifest-dispatch.yml.example` into a project repository as `.github/workflows/project-manifest-dispatch.yml`. The dispatch payload includes:

- the exact `owner/repository`,
- the 40-character commit SHA,
- the repository-relative manifest path.

The portfolio preview workflow fetches that exact tuple and validates the `first-demo` profile. The preview manifest is present only in the preview build. It is not inserted into `scripts/project-registry.mjs`, the normalized approved catalog, résumé data, or production output.

Set `PORTFOLIO_REPOSITORY` as a repository variable and `PORTFOLIO_DISPATCH_TOKEN` as a fine-grained token secret permitted to create repository-dispatch events. The portfolio uses the read-only `PROJECT_MANIFEST_READ_TOKEN` when a source repository is private.

## Approved consumers

Production publication remains owned by the exact-SHA registry in `scripts/project-registry.mjs`. At build time, `scripts/sync-project-manifests.mjs` generates these non-authoritative artifacts from approved pinned manifests:

- `src/content/generated/project-manifests.json`
- `public/data/approved-projects.json`
- `public/data/portfolio_data.json`
- `public/data/resume_bullets.json`

The portfolio UI, résumé catalog, and generated GitHub index must consume the normalized approved catalog. Generated payloads are ignored by Git and must never be edited as source documents.

The site also fetches `architecture/system.mmd` from each approved exact SHA. Run:

```bash
npm run architecture:sync
npm run sync-projects
```

The first command renders committed SVG, PNG, and freshness metadata under `public/assets/projects/<slug>/`. The second rejects an asset when its source ref or source hash differs from the approved Mermaid file. The UI uses the PNG for safe image optimization while the SVG remains available as the vector artifact.

See `docs/project-release-workflow.md` for protected production release and live-verification rules.

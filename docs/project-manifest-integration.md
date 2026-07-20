# Project manifest integration

Each project repository owns `portfolio/project.json`, conforming to `schemas/project-manifest-v1.json` in this repository. Copy `.github/workflows/project-manifest-dispatch.yml.example` into each project repository as `.github/workflows/project-manifest-dispatch.yml`.

Set `PORTFOLIO_REPOSITORY` as a repository variable to the `owner/repository` of this portfolio and set `PORTFOLIO_DISPATCH_TOKEN` as a fine-grained token secret with permission to create repository-dispatch events for the portfolio repository. The portfolio itself uses `PROJECT_MANIFEST_READ_TOKEN` with read-only access when the project repositories are private.

The manifest must be committed before enabling the dispatch workflow. The event requests validation and a Vercel preview only. It does not publish a project to the production portfolio.

For production, pin the reviewed commit SHA in the portfolio repository's `scripts/project-registry.mjs`. A draft registry entry stays out of the static site. Marking that exact entry `approved` is the portfolio green light. The portfolio build rejects missing manifests, invalid schema data, duplicate slugs, incompatible deployment status/URL values, and disclosures that omit a data confidentiality statement.

See `docs/project-release-workflow.md` for the full review, protected release, and Vercel configuration process.

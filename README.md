# AI + Data Science Portfolio

A static-host-friendly Next.js portfolio for showcasing applied ML, LLM/AI, and analytics work to hiring managers.

## Run locally

```bash
npm install
npm run sync-projects
npm run dev
```

Open `http://localhost:3000`.

`sync-projects` fetches portfolio-approved project manifests pinned to exact commits in `scripts/project-registry.mjs`. A repository-dispatch preview may add one exact-SHA manifest to that preview build only. External manifests must exist before normal local development or deployment. For an offline preview using the checked-in validation fixtures:

```bash
PROJECT_MANIFEST_SOURCE_DIR=tests/fixtures/manifests npm run sync-projects
npm run dev
```

## Configure before publishing

- Copy `.env.example` to `.env.local` and set the public site URL and contact email. Production deployment rejects placeholder values.
- Add a real `portfolio/project.json` to a project repository, validate the appropriate v2 profile, and request an exact-SHA preview. Add a **draft** registry entry only after that review.
- Promote the registry entry from `draft` to `approved` only after reviewing the exact commit. That is the portfolio green light.
- Copy the dispatch-workflow template described in `docs/project-manifest-integration.md` into each project repository.
- Keep confidential material generalized, and label any recorded or simulated demo clearly.

## Quality checks

```bash
npm run lint
npm run build
npm test
```

The application has static project pages, `sitemap.xml`, `robots.txt`, a generated Open Graph image, and approved-only portfolio/résumé/index projection payloads. See `docs/project-release-workflow.md` for exact-SHA preview and protected production release.

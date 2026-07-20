# Continuation guide

This document is the starting point for a future contributor or coding model.

## Product intent

This is a static, evidence-first portfolio for AI and data systems. It uses a dark adaptive-intelligence visual language, a restrained WebGL accent, original generated imagery, and projects with clear operational disclosures.

Read `design.md` before changing the visual experience. Use the installed `design-taste-frontend` skill for portfolio and landing-page changes. It owns design decisions such as layout, responsiveness, and interaction patterns.

## Non-negotiable rules

- Use only `@phosphor-icons/react` for interface icons.
- Keep public visual assets in `public/assets/` and their repository-owned source copies in `assets/`.
- Keep essential content outside WebGL. Every visual effect needs a static and reduced-motion-safe fallback.
- Preserve the existing route slugs and project detail content model.
- Do not publish a new project until its portfolio registry entry is approved and pinned to a full commit SHA.
- Do not invent performance metrics, deployment claims, or data disclosures.

## Key locations

- `src/app/`: static routes and metadata.
- `src/components/`: reusable UI and isolated client-side 3D/navigation components.
- `src/content/`: build-time project snapshot and site configuration.
- `scripts/project-registry.mjs`: portfolio-owned approval registry.
- `scripts/sync-project-manifests.mjs`: fetches only approved, SHA-pinned manifests.
- `schemas/project-manifest-v1.json`: external project-content contract.
- `docs/project-release-workflow.md`: preview and protected Vercel release process.

## Local verification

Use the fixtures when project repositories are unavailable:

```bash
PROJECT_MANIFEST_SOURCE_DIR=tests/fixtures/manifests npm run build
npm test
npm run lint
```

The static build is written to `out/`. To preview it locally:

```bash
npx serve@latest out -l 3000
```

## Adding a project

1. Create and validate `portfolio/project.json` in the project repository.
2. Add a draft entry to `scripts/project-registry.mjs` using the exact commit SHA.
3. Generate and save a project cover in both `assets/project-covers/` and `public/assets/project-covers/`.
4. Run the checks above and review the Vercel preview.
5. Change the entry to approved only after an explicit portfolio green light.

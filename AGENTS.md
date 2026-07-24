<!-- BEGIN:nextjs-agent-rules -->
# Portfolio site agent contract

## Authority

- Public membership: `scripts/project-registry.mjs`, generated from enabled public release contracts whose anonymous live endpoint reports the repository's current 40-character main SHA.
- Project facts and evidence: that pinned repository's `portfolio/project.json`.
- Contract structure and lifecycle profiles: `schemas/project-manifest-v*.json` plus `scripts/project-manifest-validation.mjs`.
- Generated snapshots and `public/data/*.json` are build artifacts, never editable truth.
- Deployment success grants publication only after the independent live-SHA verification contract passes.

## Working rules

- Query fresh `graphify-out/` context first when it covers the affected files; otherwise inspect source directly.
- Preserve unrelated and pre-existing dirty changes.
- Use purpose branches (`feat/`, `fix/`, `docs/`, `chore/`) and conventional commit subjects.
- Use the configured human Git identity. Never add an AI/model author or co-author.
- Keep build verification, production deployment, live-SHA verification, publication, and rollback as distinct recorded stages.
- Never expose tokens or private manifest content in logs or public projections.
- Run `npm test`, `npm run lint`, and a fixture-backed `npm run build` for contract or rendering changes.
- Delegate only bounded independent work when the benefit exceeds coordination overhead.

## Next.js repository exception

This is not a generic Next.js version. APIs, conventions, and file structure may differ from prior versions.

Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

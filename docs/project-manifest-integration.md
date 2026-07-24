# Project manifest integration

Each public project owns `portfolio/project.json` and `portfolio/release.json`.

The manifest schema has lifecycle profiles:

- `draft`: structurally valid, truthful unknowns allowed.
- `first-demo`: reproducibility, architecture, evaluation, disclosure, evidence, and temporary-demo expiry required.
- `publication`: public source, evidence-linked résumé candidates, and placeholder rejection required.
- `live`: reachable live URL, current expiry, and post-deployment verification required.

The release contract opts a completed project into automatic publication:

```json
{
  "version": 2,
  "status": "enabled",
  "publicProject": true,
  "verification": {
    "url": "https://example.com/healthz",
    "sourceShaField": "source_sha"
  }
}
```

The verification URL must be anonymous and return JSON. Its configured field must equal the project's current default-branch SHA. Planned, private, expired, unreachable, or mismatched projects are excluded.

`scripts/sync-project-manifests.mjs` generates these build artifacts from the verified registry:

- `src/content/generated/project-manifests.json`
- `public/data/approved-projects.json`
- `public/data/portfolio_data.json`
- `public/data/resume_bullets.json`

Run `npm run architecture:sync`, `npm run sync-projects`, and `npm run sync-public-index` after a registry change. The scheduled portfolio workflow performs these steps automatically.

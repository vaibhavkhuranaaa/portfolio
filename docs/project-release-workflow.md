# Project release workflow

The portfolio is a static Next.js export. Public membership is controlled in this repository, not by a project push or a successful preview.

## Approval and release

1. Commit a validated `portfolio/project.json` in the project repository.
2. Request an exact-SHA preview from that project. Preview does not change the public catalog.
3. Pin the reviewed 40-character SHA in `scripts/project-registry.mjs` as `draft`.
4. Run `npm run architecture:sync`, then review the disclosure, evidence, URLs, expiry, source link, résumé candidates, canonical architecture, technology identities, and limitations.
5. Change the registry entry to `approved`, add its approval date, sort order, and featured decision.
6. Merge the reviewed registry change to `main`.
7. An owner approves the protected `production` environment and runs **Release approved portfolio**.
8. The workflow builds once, deploys that prebuilt output, verifies the resulting URL, and stores a release-record artifact.

Draft entries remain absent from the synchronized snapshot, routes, sitemap, and consumer projections. A preview is included only when the repository-dispatch workflow supplies its exact source tuple.

## Release safeguards

The workflow:

- refuses to run from a branch other than `main`,
- serializes production releases,
- pins the Vercel CLI version,
- runs tests and lint before deployment,
- rejects stale exact-SHA architecture renders during synchronization,
- performs one production build and deploys that prebuilt artifact,
- captures the deployment URL,
- verifies project pages, titles, source links, demo links, disclosures, sitemap membership, source SHAs, and expiry state,
- writes an immutable workflow artifact with the source SHA, release note, deployment URL, and check results.

`live-verified` is an observed result, not a registry label. The workspace orchestration core computes it only after the live profile and post-deployment checks pass. Failed verification blocks the release job and preserves its record. Rollback remains a separate owner-authorized Vercel action using the preceding successful deployment record.

## Required GitHub configuration

Secrets:

- `PROJECT_MANIFEST_READ_TOKEN`: optional read-only access to private source repositories.
- `VERCEL_TOKEN`: production/preview deployment credential.

Repository variables:

- `SITE_URL`
- `CONTACT_EMAIL`
- `SITE_OWNER` (optional)
- `SITE_SOCIAL_URL` (optional)
- `RESUME_URL` (optional)

Create a GitHub `production` Environment with required reviewer approval. Disable automatic production deploys for the connected Vercel branch; this workflow owns production release.

## Deployment boundary

Preview, production deployment, publication approval, and rollback are distinct actions. No project-side dispatch can approve a registry entry, deploy production, or mark a deployment live-verified.

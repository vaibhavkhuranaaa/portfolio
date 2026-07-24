# Automatic project release workflow

Public visitors never sign in. A project becomes visible only after its own deployment and the portfolio's independent live-SHA check both succeed.

## Project contract

1. `portfolio/project.json` passes the publication profile and identifies a public repository, live URL, evidence, disclosure, and verification time.
2. `portfolio/release.json` has `status: "enabled"`, `publicProject: true`, and a `verification` object containing an anonymous JSON URL and the field that reports the deployed source SHA.
3. The project deployment runs from `main`, deploys an immutable revision, verifies it, and retains a release receipt.
4. Paid-resource creation or a cost increase still stops for owner authorization. Redeploying the declared existing resource does not.

## Automatic publication

The scheduled `Synchronize verified live projects` workflow uses only its repository-scoped `GITHUB_TOKEN`:

1. Discover the owner's public, non-archived repositories.
2. Read the release contract and project manifest at each default-branch SHA.
3. Require an enabled public release, valid publication manifest, current temporary-demo expiry, and a live verification response whose source SHA equals that branch SHA.
4. Regenerate `scripts/project-registry.mjs`, architecture assets, public projections, README table, and GitHub-safe static map.
5. Run tests and lint, then commit changes to portfolio `main`.
6. Vercel's existing Git integration deploys that commit. The release verifier waits for `/api/release` to report the same commit and checks the public pages.

No personal GitHub token, cross-repository dispatch token, Vercel CLI token, or per-release SHA approval is required.

## Downstream synchronization

The private résumé repository imports the deployed `public/data/approved-projects.json` catalog on its own schedule, validates evidence references, runs its full checks, and commits only a changed generated catalog.

## Failure behavior

An invalid manifest, failed project deployment, expired temporary demo, mismatched live SHA, failed architecture render, test failure, or failed Vercel verification leaves the last verified public catalog in place. Rollback uses the preceding project or Vercel deployment record.

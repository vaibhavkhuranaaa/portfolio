# Production readiness

The portfolio site is not publicly released. Local builds are verification artifacts only.

## Owner-gated blockers

1. Choose and configure the real production `SITE_URL`. Do not use the built-in example fallback for a public build.
2. Link this repository to the intended Vercel project. There is currently no repository-local `.vercel/project.json`.
3. Configure the GitHub `production` environment with the owner as a required reviewer.
4. Configure `VERCEL_TOKEN` and, if a private approved source remains, `PROJECT_MANIFEST_READ_TOKEN`.
5. Configure the production variables `SITE_URL`, `CONTACT_EMAIL`, `SITE_OWNER`, and any approved `SITE_SOCIAL_URL` or `RESUME_URL`.
6. Run the protected release workflow only after explicit owner approval, then retain the generated release record.
7. Verify the deployed home page, approved project routes, source links, live demo links, exact SHAs, disclosure text, sitemap, metadata, and any expiry date.

## Prepared external action

From this repository, after the owner chooses the Vercel team and project:

```bash
npx vercel link
```

Target: the owner-selected production portfolio project. Rollback: unlink the local repository in Vercel CLI and remove only the generated local `.vercel` linkage after confirming its exact path. No linkage, deployment, environment change, or release was performed during local stabilization.

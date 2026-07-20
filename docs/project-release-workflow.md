# Project release workflow

The portfolio is deliberately a static Next.js export. Its public project list is controlled in this repository, not by an arbitrary push to a project repository.

## Green-light process

1. Build the project and commit its `portfolio/project.json` in the project repository.
2. Pin that commit's full SHA in `scripts/project-registry.mjs` with `portfolio.status: "draft"`.
3. Run `npm test`, `npm run lint`, and `npm run build` locally. A project repository push can dispatch the `project-manifest-ready` event to request a Vercel preview.
4. Review the project, disclosure, metrics, URLs, cover image, and the exact pinned SHA.
5. Change the registry entry to `portfolio.status: "approved"`, add the approval date, set its sort order, and decide whether it is featured. Merge that reviewed portfolio change to `main`.
6. Run **Release approved portfolio** from GitHub Actions. The protected `production` environment is the final green light and deploys the static `out/` folder to Vercel.

Draft entries are not fetched, rendered, included in the sitemap, or included in the built static site.

## Required GitHub configuration

Configure these portfolio-repository secrets:

- `PROJECT_MANIFEST_READ_TOKEN`: read-only fine-grained GitHub token for private project repositories, if needed.
- `VERCEL_TOKEN`: Vercel token that can deploy this project.

Configure these repository variables:

- `SITE_URL`
- `CONTACT_EMAIL`
- `SITE_OWNER` (optional)
- `SITE_SOCIAL_URL` (optional)

In GitHub Settings, create a `production` Environment and require approval before deployment. This protects the final Vercel deployment even after a registry approval PR is merged.

## Required Vercel configuration

1. Import the portfolio GitHub repository into Vercel.
2. Disable automatic production deployments for the connected Git branch. GitHub Actions owns production release.
3. Copy the Vercel project and organization IDs into repository secrets or let `vercel pull` associate the project on the first authenticated run.
4. Keep the build output as `out`. Next.js produces it through `output: "export"`.

## Project repository dispatch

Copy `.github/workflows/project-manifest-dispatch.yml.example` to each project repository. Add:

- `PORTFOLIO_REPOSITORY` repository variable, such as `vaibhavkhuranaaa/ai-data-portfolio`.
- `PORTFOLIO_DISPATCH_TOKEN` fine-grained secret with repository dispatch permission for the portfolio repository.

The dispatch only requests validation and a preview. It does not publish the project to production.

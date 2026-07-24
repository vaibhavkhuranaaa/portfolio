# Production readiness

The portfolio is linked to Vercel and deploys `main` through the existing Git integration.

Required repository variables:

- `SITE_URL`
- `CONTACT_EMAIL`
- `SITE_OWNER` (optional)
- `SITE_SOCIAL_URL` (optional)
- `RESUME_URL` (optional)

No Vercel token or personal GitHub token is required. The repository-scoped workflow token updates only this repository.

Production acceptance requires tests, lint, build, verified live project SHAs, current temporary-demo expiry, a successful Vercel Git deployment, `/api/release` matching the portfolio commit, public route/link checks, and a retained release record.

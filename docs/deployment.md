# Git → quality gates → Vercel

Production origin: [klaud-devops-hub.vercel.app](https://klaud-devops-hub.vercel.app). Vercel project: `klaud-devops`, team: `trieu-nguyen-phus-projects`.

`main` is the production source of truth. PRs run **Quality gate**; passing merges/pushes on `main` build and deploy to the new Vercel project. The Vercel native automatic Git build is disabled to avoid releasing before the GitHub quality gate.

The workflow uses Node 24, `npm ci`, lint, strict typecheck, unit tests, production dependency audit, content validation/build, private-reference audit and Playwright Chromium. Browser failure artifacts expire after 7 days. Actions are pinned to verified commit SHAs; Dependabot monitors npm and GitHub Actions updates. PR jobs have no deployment secrets.

## Repository configuration

- Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`.
- Variables: `VERCEL_PROJECT_ID` for the new project, `NEXT_PUBLIC_SITE_URL` for its canonical HTTPS origin.
- `production` environment is deployed only from `main`.
- Require **Quality gate** before merging to `main`, strict up-to-date checks, no force pushes or branch deletion. A sole maintainer can merge without requiring another person's review; CI remains required.

Project cleanup is a one-time administrative operation, separate from the recurring release workflow. The old `VERCEL_PROJECT_ID` secret is not used for new releases; the new project is identified by the repository variable. No token is copied out of GitHub Secrets or committed. Do not print environment variables or upload `.vercel/` as an artifact.

For recurring releases, use a Vercel token scoped to the production team and rotate it before expiration. CLI OAuth login credentials expire within hours and are suitable only for temporary deployment validation, not ongoing CI/CD.

## Production verification

`GET /api/health` returns `{status: "ok", commit: "<full Git SHA>"}`. The route is generated at build time from `VERCEL_GIT_COMMIT_SHA` or `GITHUB_SHA`. The deployment is also tagged with `githubCommitSha` metadata. The release workflow checks the live health SHA against its own SHA, then smoke-tests principal routes. Deployment URL and SHA appear in the run summary and GitHub `production` environment.

CLI release uses `vercel pull`, `vercel build --prod`, then `vercel deploy --prebuilt --prod` with a fixed CLI version. Only generated build output is uploaded. Private materials never enter the GitHub checkout or artifact. `.vercelignore` and output tracing exclusions remain additional safeguards.

## Rollback

If post-deploy verification fails and the project has a previous production deployment, the workflow requests `vercel rollback` to that deployment. The failed run remains failed; this preserves the signal that `main` needs repair. For the very first release there is no earlier deployment to restore.

After an emergency rollback, reconcile Git with production by reverting the faulty change on a branch, passing CI and merging the revert. This creates a new passing Git revision and redeploys it. Vercel Hobby permits instant rollback only to the previous production deployment; use a Git revert and a fresh deployment when a deeper rollback is needed.

For cleanup, confirm the authenticated account/team and exact project IDs against a fresh inventory before deleting. Removing projects in another account requires separate authentication. The new Knowledge Hub project must be retained during cleanup of old projects.

References: [Vercel GitHub Actions](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel), [Git deployment configuration](https://vercel.com/docs/project-configuration/git-configuration), [rollback](https://vercel.com/docs/cli/rollback).

# Repository Guidelines

## Project scope

`mazey.css` is a CSS/Sass npm package. Its runtime contract is the compiled stylesheets under
`lib/`; `lib/confluence.js` is the only current JavaScript package artifact. The public website is a
separate Bootstrap/React build and must not add runtime dependencies or JavaScript exports to the
package.

Inspect `git status` before editing. Preserve unrelated work, and do not commit, publish, deploy,
tag, or rewrite history unless the user explicitly requests it.

## Repository map

- `src/z-style/`: package stylesheet entries and private supporting styles. Current entries are
  `index.scss`, `base.scss`, `blogbase.scss`, `link.scss`, and `confluence.scss`.
- `src/z-temporary/`: package Webpack entry shims. `confluence.js` also emits the optional jQuery
  enhancement.
- `src/mixin/`, `src/extend/`, `src/function/`, and `src/variate/`: published Sass modules.
- `webpack.config.js`: package stylesheet build selected by `ENTRY`; it emits committed `lib`
  artifacts. Do not edit `lib` by hand.
- `project.config.js`: central package, URL, route, SEO, theme, PWA, and stylesheet-reference data.
- `site/`: homepage, API reference, shared theme/PWA behavior, CSS, and service-worker source.
- `examples/`: React playground that previews generated public stylesheets in a sandboxed frame.
- `webpack.site.config.js`: website and playground build. Development uses `/`; production uses
  `/mazey.css/` and enables service-worker registration.
- `scripts/build-pages.js`: deterministic `dist-dev` to `docs` assembly, manifest/crawler output,
  public stylesheet copying, and service-worker token replacement.
- `scripts/validate-package.js`, `validate-seo.js`, and `validate-pwa.js`: package and final-artifact
  checks.
- `test/`: deterministic Node tests for central configuration, route identity, dependency
  boundaries, Mazey theme delegation, manifest data, and service-worker scope.
- `images/`: favicon, logo, social preview, and PWA source images.
- `lib/`, `dist-dev/`, `docs/`, and `coverage/`: generated output. Only `lib/` is committed.

## Package contract

`package.json#main` is `lib/index.css`. Current generated stylesheet artifacts are `index.css`,
`base.css`, `blogbase.css`, `link.css`, and `confluence.css`. `404.css` and `tiny.css` are tracked
legacy files without current source/build entries; do not regenerate or delete them incidentally.

Keep entry names synchronized across `src/z-style`, `src/z-temporary`, package scripts,
`project.config.js`, README usage, and `lib`. Preserve published selectors and Sass members unless a
task explicitly changes them. Website-only dependencies belong in `devDependencies`; package
validation rejects runtime dependencies.

The package publishes `lib`, `src`, `README.md`, and `LICENSE`. Keep website sources, scripts,
tests, images, and generated Pages output outside the npm tarball.

## Website architecture

Stable production routes are:

```text
https://chengchuu.github.io/mazey.css/
https://chengchuu.github.io/mazey.css/playground/
https://chengchuu.github.io/mazey.css/api/
```

Webpack owns the website and React playground. The API route is a stylesheet reference generated
from source HTML because this package has no TypeScript runtime API for TypeDoc to describe. Do not
invent JavaScript symbols merely to produce API documentation.

Browser modules receive the project-safe runtime subset through `__SITE_RUNTIME_CONFIG__`. Keep
package identity, base paths, theme keys, worker paths, and stylesheet data in `project.config.js`
rather than duplicating them in browser code.

Theme controls must use Mazey's `resolveThemePreference`, `setThemePreference`, and
`listenMediaQueryChanges`; keep only DOM application and current-session fallback local. PWA code
uses Mazey's environment, standalone, and service-worker-update helpers. Service-worker registration
is production-only, scoped to `/mazey.css/`, and requires an explicit user action before activating
a waiting update.

## Commands and validation

Use Node.js 22 or later. `pnpm-lock.yaml` is the authoritative dependency lockfile; do not commit
`package-lock.json`. GitHub workflows intentionally continue to use `npm install` to match their
documented release policy.

```bash
pnpm install
npm run typecheck
npm run lint
npm test
npm run build
npm run docs
npm run seo:validate
npm run pwa:validate
npm run format:check
npm pack --dry-run
```

`npm run build` rebuilds every current package entry and validates the package artifacts. Review
the resulting tracked `lib` diff. `npm run docs` builds the production Pages site, replaces `docs`
deterministically, and validates the final SEO/PWA artifact. Do not cite source-template inspection
as final Pages validation.

For package-boundary changes, inspect the `npm pack --dry-run` manifest. Tests and checks must not
depend on network access. Do not run `npm publish`, Pages deployment, or the package-name mutation
script during ordinary validation.

## Workflows

`.github/workflows/pages.yml` deploys Pages for pushes to `main` and `release/v*` with npm and no
dependency cache. `.github/workflows/publish-npm.yml` publishes npm only for `release/v*` after the
full preview pipeline. `main` must never publish npm. Preserve the Pages permissions and safe
deployment concurrency defined in the workflow.

## Coding conventions

- Use Sass modules with `@use` for internal composition.
- Keep filenames lowercase and hyphenated where appropriate.
- Use strict TypeScript for browser modules and named Mazey imports verified against the installed
  version.
- Keep custom website CSS small and Bootstrap-variable based.
- Use semantic HTML, one `h1` per public page, meaningful links, labeled controls, and live regions
  for async feedback.
- Never add credentials, generated `.npmrc` tokens, unsupported compatibility claims, ratings, or
  download figures.

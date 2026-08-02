# Repository Guidelines

## Project scope

`mazey.css` is a Sass/CSS package whose primary contract is its compiled stylesheets. Webpack
compiles selected Sass entry points into committed artifacts under `lib/`; the `confluence` target
also publishes a small JavaScript enhancement. Keep changes local to the affected bundle and
preserve the published entry points.

Inspect `git status` before editing. Preserve unrelated work, and do not commit, tag, publish, or
rewrite history unless the user explicitly asks.

## Repository map

- `src/z-style/`: bundle-level Sass entries and their private supporting files. Current build
  targets are `index.scss`, `base.scss`, `link.scss`, `confluence.scss`, and `blogbase.scss`.
  `normalize.scss` and `link-normalize.scss` are composed into other entries.
- `src/z-temporary/`: Webpack entry shims. Each supported target imports the matching file from
  `src/z-style/`; `confluence.js` also contains the jQuery enhancement emitted to
  `lib/confluence.js`.
- `src/mixin/`, `src/extend/`, `src/function/`, and `src/variate/`: shared Sass modules. Internal
  composition uses `@use`.
- `src/z-template/index.html`: development HTML template emitted for each Webpack entry. Generated
  `lib/*.html` files are ignored.
- `webpack.config.js`: dynamic production build selected by the `ENTRY` environment variable. It
  emits `lib/<entry>.css`, `lib/<entry>.js`, and `lib/<entry>.html`; ignored outputs must not be
  treated as package artifacts.
- `lib/`: committed release output. `index.css` is the package `main`; `base.css`, `blogbase.css`,
  `confluence.css`, `link.css`, and `confluence.js` have current source entries. `404.css` and
  `tiny.css` are tracked legacy artifacts without matching current build scripts.
- `scripts/change-package-name.js`: temporarily scopes the package name for GitHub Packages.
- `.github/workflows/publish-npm.yml`: installs with npm, runs the placeholder build and test
  scripts, publishes to npm and GitHub Packages on release branches, restores changed metadata,
  and creates the version tag.

## Toolchain and environments

- `npm run nvm:use` selects Node.js 22 for local development. The README currently documents
  Node.js v22.22.2.
- The publish workflow currently uses Node.js 14. Do not assume its runtime matches local
  development when changing dependencies or syntax.
- The repository does not commit a dependency lockfile; both `package-lock.json` and
  `pnpm-lock.yaml` are ignored. Use the existing npm workflow unless the task explicitly changes
  package management.
## Build and validation

Install dependencies with `npm install`. Build the affected entry explicitly:

```bash
npm run build:index
npm run build:base
npm run build:link
npm run build:confluence
npm run build:blogbase
```

Use `npm run watch:link` only for continuous development of the `link` target.

`npm run build` and `npm test` are placeholders that exit successfully without compiling bundles
or running assertions. Do not use either command as evidence that a Sass change is valid. After a
source change, run every affected `build:<entry>` command, inspect the corresponding tracked `lib/`
diff, and check `git diff --check`. For package-boundary changes, also run `npm pack --dry-run` and
confirm that the intended CSS and `confluence.js` artifacts are included.

## Coding conventions

- Use Sass modules with `@use` for new internal composition; preserve existing public selectors,
  placeholders, variables, and bundle behavior unless the task changes that contract.
- Keep filenames lowercase and hyphenated where needed, matching names such as
  `link-normalize.scss`.
- Keep an entry name synchronized across `src/z-temporary/<entry>.js`,
  `src/z-style/<entry>.scss`, `package.json` scripts, and `lib/<entry>.css`.
- Follow the surrounding file's formatting and selector nesting. Avoid broad formatting churn in
  legacy Sass files.
- Do not add real credentials, registry tokens, or generated `.npmrc` contents.

## Generated output and change discipline

- Do not edit `lib/` directly. Update Sass, entry JavaScript, templates, or Webpack configuration,
  then rebuild the affected target.
- Keep generated output and its source in the same change. Review emitted JavaScript carefully;
  `.gitignore` intentionally tracks only `lib/confluence.js` among `lib/*.js` files.
- Do not remove or regenerate legacy `404.css` or `tiny.css` unless the task establishes their
  source and build path.
- Avoid broad refactors for a single bundle. Add a real deterministic test before relying on
  `npm test` for regression coverage.
- Do not run publish steps or `scripts/change-package-name.js` unless the user explicitly requests
  a release operation.

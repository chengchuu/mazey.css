# Repository Guidelines

## Project Structure & Module Organization

This package builds Sass sources into distributable CSS in `lib/`. Core style entries live in `src/z-style/` (`index.scss`, `base.scss`, `link.scss`, `confluence.scss`). Shared Sass utilities are grouped under `src/mixin/`, `src/extend/`, `src/function/`, and `src/variate/`. Webpack entry shims live in `src/z-temporary/`; each build target expects `src/z-temporary/<entry>.js` and emits `lib/<entry>.css`. The HTML build template is `src/z-template/index.html`. Generated release artifacts are committed under `lib/`.

## Build, Test, and Development Commands

- `npm run nvm:14`: switch to the documented Node.js version, v14.21.3.
- `docker compose up -d --build`: build and start the containerized development environment.
- `npm run build:index`: compile the default `index` CSS bundle to `lib/index.css`.
- `npm run build:base`, `npm run build:link`, `npm run build:confluence`: compile individual CSS targets.
- `npm run watch:link`: rebuild the `link` target on source changes.
- `npm test`: currently a placeholder that exits successfully; add real checks before relying on it.

## Coding Style & Naming Conventions

Use SCSS modules with `@use` for internal composition. Keep Sass filenames lowercase and hyphenated where needed, matching existing names such as `link-normalize.scss`. Build entries should use the same `<entry>` name across `src/z-temporary/<entry>.js`, `src/z-style/<entry>.scss`, package scripts, and `lib/<entry>.css`. Prefer two-space indentation in JavaScript config files and concise, focused Sass selectors/placeholders.

## Testing Guidelines

There is no active test framework yet. For style changes, at minimum run the relevant build command and inspect the generated file in `lib/`. When adding tests, place them outside `node_modules`, use clear `*.test.js` or `*.spec.js` names, and update `npm test` so contributors have one reliable command.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style subjects such as `chore(scripts): use node14`, plus branch names like `feature/v1/...`, `docs/v1/...`, and `release/v1`. Keep commits scoped and imperative. Pull requests should describe the changed CSS entry points, list build commands run, link related issues, and include screenshots or before/after notes when visual output changes.

## Agent-Specific Instructions

Do not edit generated `lib/` files without also updating the source Sass and rebuilding. Avoid broad refactors while changing a single style target; this repository is entry-oriented, so keep changes local to the affected bundle.

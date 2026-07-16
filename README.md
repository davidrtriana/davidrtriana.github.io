# davidrtriana.github.io

[![CI](https://github.com/davidrtriana/davidrtriana.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/davidrtriana/davidrtriana.github.io/actions/workflows/ci.yml)

My personal portfolio and CV site. I'm a senior data engineer moving into game
design, and this site exists to land game design interviews: it shows the
work, not just the resume.

Live at [davidrtriana.github.io](https://davidrtriana.github.io/).

## Stack

- [Astro](https://astro.build/), static output, zero JS shipped by default.
  A single-page portfolio doesn't need a client-side framework, and Astro's
  island model leaves room to drop in an interactive demo later without
  rearchitecting anything.
- TypeScript, strict mode.
- Plain CSS with custom properties as a design-token system. No Tailwind,
  no CSS-in-JS: for a page this size, a token file is easier to reason about
  than a utility-class build step.
- No backend, no CMS, no database. Content is committed, not fetched.

## Local development

Requires Node 22 (see `.nvmrc`). If you use nvm: `nvm use`.

```sh
npm install
npm run dev        # dev server at localhost:4321
```

Other scripts:

| Command                | What it does                                    |
| :--------------------- | :---------------------------------------------- |
| `npm run build`        | Production build to `./dist/`                   |
| `npm run preview`      | Serve the production build locally              |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Check formatting without writing (CI uses this) |
| `npm run lint`         | Run ESLint                                      |
| `npm run check`        | Type-check with `astro check`                   |

## Project structure

```text
/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml           # format, lint, type check, build (every PR and push to main)
│   │   └── deploy.yml       # build and deploy to Pages (push to main only)
│   └── dependabot.yml
├── public/                  # static assets, served as-is
├── src/
│   └── pages/
│       └── index.astro      # routes are files: src/pages/index.astro -> /
├── astro.config.mjs
├── eslint.config.js
└── decision_log.md          # why things are built the way they are
```

## Deploy flow

Pushing to `main` triggers `deploy.yml`, which builds the site and publishes
it to GitHub Pages via GitHub Actions (not the legacy "deploy from a branch"
flow). Every pull request and push to `main` also runs `ci.yml` first, which
fails the build on formatting, lint, type, or build errors before anything
reaches `main`.

This repo is a GitHub _user_ site (`davidrtriana.github.io`), so it serves
from the domain root with no `base` path. See `decision_log.md` for why.

## Decisions

Anything non-obvious about how this repo is built, why a version is pinned,
or why an approach was rejected lives in [`decision_log.md`](./decision_log.md)
rather than in code comments.

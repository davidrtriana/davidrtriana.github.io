# Engineering conventions

Portfolio site. Astro, TypeScript strict, plain CSS. No backend, no CMS. See
`README.md` for the stack and `decision_log.md` for why things are built the
way they are.

## Running it

```sh
npm install
npm run dev            # localhost:4321
npm run format          # prettier --write
npm run format:check    # prettier --check (what CI runs)
npm run lint             # eslint
npm run check             # astro check
npm run build
```

Node 22 is required (`.nvmrc`). Run `format:check`, `lint`, `check`, and
`build` before opening a PR. `ci.yml` runs the same set and fails on any of
them.

## Git workflow

- Never commit directly to `main`. One branch per unit of work, opened as a
  PR, merged only after review.
- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`,
  `fix:`, `chore:`, `docs:`, `ci:`, `build:`. Squash-merge PRs.
- Fill in `.github/pull_request_template.md` on every PR: what, why,
  screenshot if the change is visual, checklist.

## Structure

```text
/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml       # verification: format, lint, check, build
│   │   └── deploy.yml   # push to main -> build -> GitHub Pages
│   └── dependabot.yml
├── public/               # static assets, served as-is
├── src/
│   └── pages/            # file-based routing: src/pages/index.astro -> /
├── decision_log.md
└── README.md
```

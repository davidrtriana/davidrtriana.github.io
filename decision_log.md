# Decision log

Dated entries for decisions worth remembering later, in the order they were
made. Each entry has the context at the time, what was decided, what else was
considered, and current status. Newest entries at the bottom.

---

## 2026-07-16: Framework: Astro, static output, TypeScript strict

#### Context

Needed a single-page portfolio site: mostly static content, one or two
interactive embeds down the line (playable game demos), no server-side
logic.

#### Decision

Astro with static output and zero JS shipped by default. TypeScript in
strict mode.

#### Alternatives considered

- Next.js: ships a client runtime for a page that doesn't need one.
- Hand-rolled HTML/CSS: no component reuse, and no easy path to the content
  collections the blog shell will need later.
- Eleventy: a reasonable alternative, but Astro's island model gives a
  cleaner escape hatch if an interactive demo ever needs client-side JS,
  without committing to a framework for the whole site up front.

#### Status

Adopted.

---

## 2026-07-16: GitHub Pages: user-site repo, no base path

#### Context

Repo is named `davidrtriana.github.io`, which GitHub treats as a _user
site_ rather than a project site.

#### Decision

`astro.config.mjs` sets `site: 'https://davidrtriana.github.io'` and no
`base`. The site serves from the domain root.

#### Alternatives considered

- A `davidrtriana/portfolio` repo with `base: '/portfolio/'`. Rejected: that
  puts a path segment in front of every route and asset for no benefit on a
  single personal site, and the cleaner root URL matters more here than
  keeping the repo name generic.

#### Status

Adopted.

---

## 2026-07-16: Pin Node 22 across local, CI, and deploy

#### Context

Astro 7 requires Node `>=22.12.0`. The first deploy attempt failed outright:
`withastro/action@v3` defaults to Node 20 unless told otherwise, and Astro
refused to run.

#### Decision

`engines.node` set to `>=22.12.0` in `package.json`, `.nvmrc` pinned to
`22`, `node-version: 22` passed explicitly to `withastro/action` in
`deploy.yml`, and `ci.yml` reads the same version from `.nvmrc` via
`node-version-file`. One source of truth, no drift between local, CI, and
deploy.

#### Alternatives considered

- Leaving `withastro/action` on its default Node version. Rejected: that's
  what broke the first deploy.

#### Status

Adopted.

---

## 2026-07-16: Split verification (`ci.yml`) from deploy (`deploy.yml`)

#### Context

`deploy.yml` only ran on push to `main`, so nothing checked formatting,
lint, types, or the build itself before a PR merged.

#### Decision

New `ci.yml` runs `format:check`, `lint`, `astro check`, and `build` on
every pull request and every push to `main`. `deploy.yml` stays scoped to
push-to-main to Pages. While touching these workflows, pinned their actions
to current majors (`actions/checkout@v7`, `actions/deploy-pages@v5`,
`withastro/action@v6`) and added `dependabot.yml` for weekly `npm` and
`github-actions` updates.

#### Alternatives considered

- One workflow doing both verification and deploy. Rejected: that couples
  PR feedback speed to Pages-deploy-only steps that don't apply outside
  `main`.

#### Status

Adopted.

---

## 2026-07-16: Block Dependabot from proposing TypeScript major bumps

#### Context

Dependabot opened a PR bumping `typescript` from `6.0.3` to `7.0.2`. CI
failed on `npm ci` with an `ERESOLVE` error: `@astrojs/check` (through
`@astrojs/language-server` and `@volar/kit`) peer-depends on
`typescript@"^5.0.0 || ^6.0.0"` and doesn't support TypeScript 7 yet.

#### Decision

Added an `ignore` rule to `dependabot.yml` for `typescript` semver-major
updates. Revisit once `@astrojs/check` adds TypeScript 7 support.

#### Alternatives considered

- `--legacy-peer-deps` or `--force` in CI. Rejected: that would make the
  install succeed while masking the incompatibility, and could let a broken
  dependency tree through silently on some future bump.

#### Status

Adopted.

---

## 2026-07-16: One component per homepage section

#### Context

Phase 1 needed to build out Hero, About, Projects, Links, and Contact as
real content blocks rather than one long template.

#### Decision

Each section is its own component in `src/components/` (`Hero.astro`,
`About.astro`, `Projects.astro`, `Links.astro`, `Contact.astro`), composed
in `src/pages/index.astro` inside a shared `BaseLayout`. Each renders a
semantic `<section>` with an `aria-label` and its own heading.

#### Alternatives considered

- One long `index.astro` with all markup inline. Rejected: harder to keep
  track of as Phase 2 through 4 add styling, motion, and playable demos to
  individual sections, and harder to review in a PR diff.

#### Status

Adopted.

---

## 2026-07-16: Projects as a typed data file, not hardcoded markup

#### Context

The Projects section needs a design-breakdown block per project (mechanic,
system, what I'd change), and more projects will be added later.

#### Decision

`src/data/projects.ts` exports a `Project` type and a `projects` array.
`ProjectCard.astro` renders one entry; `Projects.astro` maps over the array.
Adding a project later means editing data, not markup.

#### Alternatives considered

- Hardcoding each project card directly in `Projects.astro`. Rejected: mixes
  content with markup, and makes the shape of a "project" implicit instead
  of a type Astro can check.

#### Status

Adopted.

---

## 2026-07-16: No contact form

#### Context

The Contact section needs a way to reach David without adding a backend.

#### Decision

A `mailto:` link plus the social links (GitHub, LinkedIn, itch.io), no
form.

#### Alternatives considered

- A contact form. Rejected: a static site with no backend has nowhere to
  send form submissions without a third-party service, which is more
  moving parts than a `mailto:` link justifies for a single contact point.

#### Status

Adopted.

---

## 2026-07-16: Meta description, canonical URL, and Open Graph/Twitter cards

#### Context

Hiring managers and design leads will find this site through a shared
link as often as a direct visit, so the link preview matters.

#### Decision

`BaseLayout.astro` takes `title`, `description`, and an optional `ogImage`
prop, and renders a canonical link plus Open Graph and Twitter card tags
from them. `og:image` points at `/og-image.png` and declares the intended
1200x630 dimensions, but that file doesn't exist yet. It needs to be added
to `public/` before the preview image will actually render.

#### Alternatives considered

- Skipping social preview tags until real content and a real image exist.
  Rejected: the layout is the right place to wire this up once, and doing
  it now means every future page gets it for free.

#### Status

Adopted. Follow-up: add `public/og-image.png` (1200x630).

---

## 2026-07-16: Accessibility landmarks and skip link

#### Context

The page needed real landmark structure, not just visual sections.

#### Decision

`BaseLayout.astro` uses `<header>`, `<main>`, and `<footer>` landmarks, a
`<nav aria-label="Primary">` for section links, and a skip-to-content link
as the first focusable element in `<body>`, visible on focus via
`src/styles/global.css`. Each homepage section is a `<section>` with an
`aria-label` and a heading.

#### Alternatives considered

- Skipping the skip link until visual design lands in Phase 2. Rejected:
  it's a structural, not visual, concern, and it's easier to get right
  once than to retrofit after the page has more interactive content.

#### Status

Adopted.

# SaiBabu Polisetti: portfolio

A dark, accessible, single-page portfolio for a Senior AI Engineer, built with **React 19, TypeScript and Vite 8**. It is a static site: no backend, no paid services, no API keys, and no secrets anywhere in the repository.

> **Status: draft.** The site runs and builds, but several details only you can supply (links, employer, dates) are still placeholders. They show up in amber on the page, and the site displays a "Draft" banner until you turn it off. See [Replace these before publishing](#replace-these-before-publishing).

## Contents

- [Quick start](#quick-start)
- [Replace these before publishing](#replace-these-before-publishing)
- [How the content works](#how-the-content-works)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Deploy for free](#deploy-for-free)
- [Before you publish](#before-you-publish)
- [Design and engineering decisions](#design-and-engineering-decisions)
- [Further documents](#further-documents)

## Quick start

**Requirements:** Node.js **20.19+ or 22.12+** (required by Vite 8) and npm. Check with `node --version`.

```bash
# 1. Install dependencies (also creates/uses package-lock.json)
npm install

# 2. Start the development server with hot reload
npm run dev
#    open http://localhost:5173

# 3. Type-check and build for production (output goes to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
#    open http://localhost:4173
```

The commands are identical on Windows (PowerShell), macOS and Linux.

## Replace these before publishing

Everything personal lives in `src/data/`. You never need to touch a component to change content.

| # | What | Where | What to enter |
|---|------|-------|---------------|
| 1 | Email address | `src/data/profile.ts` → `links.email` | e.g. `name@example.com`. Use an address you are happy to have public (scrapers can read it). |
| 2 | LinkedIn URL | `src/data/profile.ts` → `links.linkedin` | Full `https://www.linkedin.com/in/...` URL |
| 3 | GitHub URL | `src/data/profile.ts` → `links.github` | Full `https://github.com/...` URL. Leave empty until you have public work; the button is then hidden. |
| 4 | Résumé | `src/data/profile.ts` → `links.resume` | Put the PDF in `public/` and enter its file name (e.g. `SaiBabu-Polisetti-Resume.pdf`), or a full URL |
| 5 | Employer | `src/data/experience.ts` → `company` | Replace `[[Company name]]`, or word it generically if naming the company is not allowed |
| 6 | Employment start date | `src/data/experience.ts` → `dates` | Replace `[[Start date]]`. Do not guess. |
| 7 | Company note | `src/data/experience.ts` → `companyNote` | Replace or delete the optional `[[...]]` line |
| 8 | Optional detail in the optimization case study | `src/data/caseStudies.ts` (two `[[Optional: ...]]` markers) | Add one or two non-confidential sentences about what you changed, or delete the markers |
| 9 | Metrics you may not disclose | `src/data/metrics.ts` → `public` | Set `public: false` for any figure you cannot publish. It disappears everywhere. |
| 10 | Case-study wording | `src/data/caseStudies.ts` | Re-read every sentence. I wrote them from your brief; correct anything that is not accurate for your real work. |
| 11 | Site address | `.env.local` → `SITE_URL` (see `.env.example`) | Your final URL. Enables canonical and social-preview tags. |
| 12 | Social-preview image | `design/og-image.html` → `public/og-image.png` | Re-export if you change the headline (instructions are inside the HTML file) |
| 13 | Employer, client and product names | `scripts/confidential-terms.txt` | Copy `scripts/confidential-terms.example.txt` and list every name that must never appear on the site |
| 14 | Draft banner | `src/data/profile.ts` → `siteConfig.draftMode` | Set to `false` as the very last step |

The full privacy and confidentiality review is in [docs/PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md).

## How the content works

**Placeholders.** Anything written as `[[like this]]` in `src/data` renders in amber with brackets, so it cannot go unnoticed. `npm run check:publish` lists every remaining one.

**Missing links.** An empty link in `profile.links` is shown as a dashed amber "add link" button while `draftMode` is `true`. Once `draftMode` is `false`, empty links are **hidden** instead, so the live site never shows a dead button. For example, with no GitHub URL there is simply no GitHub button.

**Metrics.** `src/data/metrics.ts` is the only place the numbers exist. Percentages are calculated from the before and after values, so they cannot drift out of sync. Case studies, the hero, the Impact section and the experience entry all read from this file. Set `public: false` on one entry and it disappears from all of them; hide all three and the Impact section and its nav link go too. Each figure is displayed with its test context, and the page says they are self-reported internal measurements, not independently verified and not guarantees.

**Case studies.** They are anonymized descriptions, not repositories. Each has a generalized (not product-specific) workflow diagram, a "My contribution" column kept separate from "Team context", and a notice that no confidential material is included. A case study opens in an accessible dialog and has its own URL hash (`#case-ai-performance`), so you can link to one directly. The browser Back button closes it.

**Independent projects.** All three are marked **Planned**. The page contains no demos, screenshots, metrics or repository links for them, and `src/data/plannedProjects.ts` documents when a status may change. When you really publish one, set `status` and `repoUrl`; the "No repository yet" label becomes a repository button automatically. The plan for the first one is in [docs/FIRST-PROJECT-PLAN.md](docs/FIRST-PROJECT-PLAN.md).

**Skills.** `src/data/skills.ts` lists only strengths from your brief. Add a tool or technology only if you have really used it; interviewers ask about every line.

**Contact.** There is no server, so there is no pretend contact form. The "Write a message" form prepares an email in the visitor's own mail app (`mailto:`) or copies the text; nothing is sent to or stored by the website.

## Project structure

```
.
├── index.html                 # SEO title/description, Open Graph and Twitter tags, favicon links
├── package.json               # scripts and dependencies
├── vite.config.ts             # Vite + React; adds canonical/OG-image/JSON-LD tags from SITE_URL
├── tsconfig.json              # app TypeScript config (strict)
├── tsconfig.node.json         # config-file TypeScript config
├── wrangler.jsonc             # Cloudflare deployment config (ignored by other hosts)
├── .env.example               # SITE_URL (no secrets)
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages deployment
├── design/
│   ├── og-image.html          # source for the social-preview image
│   └── apple-touch-icon.html  # source for the touch icon
├── docs/
│   ├── PUBLISHING-CHECKLIST.md  # replace-list and privacy review
│   ├── TESTING-CHECKLIST.md     # responsive, accessibility, navigation, deployment
│   └── FIRST-PROJECT-PLAN.md    # prioritized plan for your first public project
├── public/                    # copied as-is to the site root
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png           # 1200×630
│   ├── robots.txt
│   └── _headers               # security and cache headers (Cloudflare)
├── scripts/
│   ├── check-publish.mjs      # `npm run check:publish`
│   └── confidential-terms.example.txt
└── src/
    ├── main.tsx               # entry point (imports fonts and styles)
    ├── App.tsx                # page composition
    ├── data/                  # ALL editable content
    │   ├── profile.ts         #   name, links, draftMode
    │   ├── metrics.ts         #   measured results (public flag)
    │   ├── caseStudies.ts     #   three anonymized case studies
    │   ├── plannedProjects.ts #   three planned independent projects
    │   ├── experience.ts      #   experience entries
    │   ├── skills.ts          #   skill groups
    │   └── nav.ts             #   navigation (derived)
    ├── sections/              # Hero, About, CaseStudies, Impact, Experience, Skills, Projects, Contact
    ├── components/            # Header, Footer, Section, CaseStudyDialog, FlowDiagram, MetricCard, ...
    ├── hooks/                 # useCaseRoute, useActiveSection, useScrolled
    ├── lib/links.ts           # link helpers
    └── styles/                # tokens.css (design tokens) plus one stylesheet per area
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server with hot reload on port 5173 |
| `npm run build` | Type-checks, then builds to `dist/` |
| `npm run preview` | Serves `dist/` locally to test the production build |
| `npm run typecheck` | TypeScript only |
| `npm run check:publish` | Lists remaining placeholders, empty links, metrics awaiting your approval, and any confidential term found. Exits with an error if blockers remain. |

## Deploy for free

The site is plain static files. It uses a relative asset base (`./`) and hash links, so it works on any static host and in a sub-folder **with no Vite `base` setting and no SPA rewrite rules**. The same `dist/` folder works everywhere.

### Which host?

**Recommended: Cloudflare (Workers static assets).** It can deploy from a **private** repository on the free plan, can build other branches as previews (useful for reviewing content before it goes live), applies the security and cache headers in `public/_headers`, and supports a custom domain for free. Cloudflare now recommends Workers over Pages for new projects, and says Workers covers most Pages use cases. Pages still exists and still works.

**Also good: GitHub Pages.** It is the quickest route if your repository will be public anyway, and the workflow is already included. The catch: on GitHub Free, Pages serves **public repositories only**. A public repo exposes your source, history and unfinished drafts. Finish the content, run the checks, and keep `scripts/confidential-terms.txt` out of the repo (it already is, via `.gitignore`).

Both options are free for a site this size. Set `SITE_URL` to your final address either way (see below).

### Option A: Cloudflare (recommended)

You need a free Cloudflare account. `wrangler.jsonc` is already in the repository.

**Manual deploy from your computer**

```bash
npm run build
npx wrangler login      # opens a browser once
npx wrangler deploy     # uploads dist/ and prints your URL
```

Change `name` in `wrangler.jsonc` first if you want a different `*.workers.dev` address. Re-run `npm run build` and `npx wrangler deploy` after any change.

**Automatic deploys from GitHub (private repos are fine)**

1. Push the repository to GitHub.
2. In the Cloudflare dashboard open **Workers & Pages** → **Create application**, choose **GitHub**, and select your repository.
3. The Worker name must match `name` in `wrangler.jsonc`, or the build fails.
4. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
5. Under build variables add `SITE_URL` with your final site address.
6. Save and deploy. Cloudflare builds on every push to the production branch. Preview builds for other branches are configured in the same Builds settings; the [Workers Builds documentation](https://developers.cloudflare.com/workers/ci-cd/builds/) describes the current options.

Cloudflare's dashboard labels change from time to time. If a field has moved, that documentation has the current layout.

**Using Cloudflare Pages instead:** still supported. Create a Pages project from Git, with build command `npm run build` and output directory `dist`. The `public/_headers` file works there too.

### Option B: GitHub Pages

The workflow `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. This is the one extra step a Vite site needs on GitHub Pages; no `base` change is required here because the build uses relative paths.
3. Push to `main` (or run the workflow from the **Actions** tab). The workflow installs with `npm ci`, builds, and publishes `dist/`.
4. Your site appears at `https://<username>.github.io/<repository>/`. The workflow passes that address to the build as `SITE_URL` automatically.

If you rename the default branch, edit `branches: [main]` in the workflow.

### Setting the site address (`SITE_URL`)

`SITE_URL` adds the canonical link and the absolute social-image URL (social platforms need an absolute URL). If it is missing, the build still succeeds, prints a notice, and simply omits those tags.

- **Local build:** copy `.env.example` to `.env.local` and set it, or run `SITE_URL=https://example.com npm run build`. On PowerShell: `$env:SITE_URL="https://example.com"; npm run build`.
- **GitHub Pages:** set automatically by the workflow.
- **Cloudflare:** add it as a build variable.

### Custom domain (optional)

Both hosts support a custom domain at no extra charge if you already own one (the domain itself costs money; the hosting does not). On GitHub it is under **Settings → Pages → Custom domain**. On Cloudflare look for the domains section of your project's settings. Then set `SITE_URL` to the new address.

## Before you publish

```bash
npm run check:publish   # must report "No blockers found"
npm run build
npm run preview         # click through the live build
```

Then work through [docs/PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md) (confidentiality and accuracy) and [docs/TESTING-CHECKLIST.md](docs/TESTING-CHECKLIST.md) (mobile, accessibility, navigation, deployment). The script catches mechanical problems. Whether a sentence is safe to share is a judgment only you (and, where needed, your employer) can make.

## Design and engineering decisions

- **Plain CSS instead of Tailwind.** The visual language (glowing borders, gradients, pointer-follow highlights, container-query diagrams) is custom, so utility classes would not have saved work. Plain CSS with design tokens in `src/styles/tokens.css` means fewer dependencies and a smaller build step. If you prefer Tailwind, nothing in the data or component structure prevents adding it.
- **No router.** One page with anchored sections and a hash-addressed dialog. This is why no host needs rewrite rules.
- **Minimal dependencies.** Runtime: React, `lucide-react` (icons, tree-shaken) and two self-hosted variable fonts (Geist and Geist Mono via `@fontsource-variable`), so no request goes to Google Fonts or any third party. There are no analytics or trackers.
- **Native `<dialog>` for case studies.** The browser provides the focus trap, Escape to close, and backdrop. The page behind is locked from scrolling while it is open, and focus returns to the button that opened it.
- **Accessibility.** Skip link; landmarks; one `h1`; ARIA tabs with arrow, Home and End keys; visible focus rings; buttons and form fields are at least 44 px tall; status shown as text plus an icon, never colour alone; `prefers-reduced-motion` turns off all animation; text colours were checked against the rendered pixels behind them and meet WCAG AA (4.5:1).
- **Charts.** The before/after bars use direct labels and values rather than a colour legend, a muted "before" and an accent "after", and an `aria-label` describing each comparison.
- **Honest by construction.** Percentages are calculated, planned projects cannot show a demo, empty links are hidden, and placeholders are loud.

**Browser support:** current Chrome, Edge, Firefox and Safari. The site relies on `<dialog>`, CSS container queries and `:has()`, which all ship in these browsers.

## Further documents

- [docs/PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md): replace-list and the privacy and confidentiality review
- [docs/TESTING-CHECKLIST.md](docs/TESTING-CHECKLIST.md): responsive, accessibility, navigation and deployment checks
- [docs/FIRST-PROJECT-PLAN.md](docs/FIRST-PROJECT-PLAN.md): prioritized plan for your first independent project

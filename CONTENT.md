# CONTENT.md — mooonman.com copy & content model

Copy for v1. Anything marked `PLACEHOLDER:` needs Alex's real content before launch —
the implementing agent keeps these markers in source code comments so they're greppable.

---

## Homepage

### Masthead (nav)
- Wordmark: `mooonman` (uppercase Bebas Neue, middle "o" in spot-red)
- Tag, next to wordmark, hidden below 561px: `Official Matchday Programme`

### Hero
- Eyebrow: `PERSONAL PROJECTS & IDEAS`
- Headline (display-xl): **Building things, one small orbit at a time.**
- Subline (body-lg): `mooonman.com is where I put personal projects, experiments, and
  ideas — some finished, some in progress, all mine.`
- CTA (button-ghost): `View projects ↓` (anchors to the projects section)
- Teamsheet stat line, below the CTA: computed counts, not literal copy —
  `{live count} live · {in-progress count} in progress · {archived count} archived ·
  {log entry count} log entries`. Pulled from the projects/log collections at build
  time (`src/pages/index.astro`); update the content, never hardcode the numbers here.

> PLACEHOLDER: Alex may want to swap the headline. Two alternates, same register:
> "Personal projects, shipped quietly." / "A home for the things I make."

### Projects section
- Eyebrow: `01 — PROJECTS`
- Heading (display-lg): **Selected work**
- Below grid, ghost button: `All projects →` (links to `/projects/`)

### Log section
- Eyebrow: `02 — LOG`
- Heading (display-lg): **Recent activity**
- Body: latest 3 entries from `src/content/log/`, newest first
- Below list, ghost button: `All entries →` (links to `/log/`)

### About section
- Eyebrow: `03 — ABOUT`
- Heading: **About**
- Body: `I'm Alex. This site is where I keep my personal projects — small tools and
  experiments I build in my spare time, mostly around things I already care about, like
  Fantasy Premier League and football stats. Some are finished, some are half-built,
  and that's fine; the point is to keep making things and putting them somewhere.
  mooonman is the home orbit.`

### Contact (footer)
- Sign-off line: `Want to talk about any of this? Get in touch.`
- Links: `Email` → mailto:alexmooney@hotmail.co.uk ·
  `GitHub` → https://github.com/Moon-Alpha32
  (LinkedIn dropped — not wanted)
- Small print: `© 2026 mooonman. Built with Astro.`

## Projects index (`/projects/`)
- Eyebrow: `ALL PROJECTS`
- Heading: **Everything so far**
- Intro (body): `The full list — live, in progress, and retired.`

## Log index (`/log/`)
- Eyebrow: `ALL ENTRIES`
- Heading: **Log**
- Intro (body): `A running log of what I've been building, in short.`

## 404
- Heading (display-lg): **Postponed.**
- Body: `This page doesn't exist — or hasn't kicked off yet.`
- Link: `← Back to the programme`

## Real project entries

- `fpl-h2h-dashboard.md` — title: "FPL H2H Dashboard"; status: live; featured: true;
  tags: [FPL, Premier League, Fantasy, Dashboard]; repo: Moon-Alpha32/FPL-League;
  url: fpl-h2h-dashboard-orf8a.ondigitalocean.app. Replaces the old "Project One"
  placeholder.

## Seed project entries (all PLACEHOLDER — replace with real projects)

Two seed entries remain so the design can still be evaluated with realistic content
alongside real ones:

1. `second-project.md` — title: "Project Two"; status: live; featured: true;
   tags: [tooling]; description: "PLACEHOLDER: one sentence on what this is."
2. `idea-notes.md` — title: "Ideas backlog"; status: archived; featured: false;
   draft: true; description: "PLACEHOLDER: parked ideas, not yet public."

Each body: 2–3 short markdown sections (What it is / How it works / Status) with
placeholder prose, so the project-detail prose styles can be verified.

## Seed log entries (all PLACEHOLDER — replace with real entries)

Three dated seed entries in `src/content/log/`, so the log's rhythm can be evaluated
with realistic content: `2026-06-20-started-the-site.md`,
`2026-06-27-second-entry.md`, `2026-07-04-third-entry.md`. Each is one short
`PLACEHOLDER:` paragraph — no headings, no multi-section structure (unlike project
bodies). Real entries should stay just as short: one or two sentences on what shipped,
broke, or changed.

## Voice & microcopy rules
- First person, lowercase-calm. Short sentences. No exclamation marks.
- No buzzwords ("passionate", "crafting", "digital experiences").
- The matchday-programme conceit lives in *structure* (numbering, status badges, the
  masthead tag, rules) and a handful of clearly load-bearing spots (404 copy) — not in
  rewriting every sentence into a football pun. Prose copy (hero, About) stays as
  written; don't force the metaphor into it.
- Lunar references are now just the wordmark's middle "o" — dry, rare, at most one per
  page, same rule as before.

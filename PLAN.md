# PLAN.md — mooonman.com build plan

**Read this first, then read [DESIGN.md](DESIGN.md) in full, then [CONTENT.md](CONTENT.md).**
This plan is written for an AI coding agent (Claude Sonnet) to execute end-to-end. Work
through the phases in order; each phase has acceptance criteria — do not move on until
they pass. Where this plan and DESIGN.md conflict, DESIGN.md wins on anything visual.

---

## 1. Project brief

- **Domain**: mooonman.com (already purchased; owner: Alex).
- **Purpose**: a personal home for projects and ideas. A place to point people at.
- **Tone**: neat, professional, quietly personal. Not a CV, not a SaaS landing page.
- **Design direction**: "Moonlit" — dark, minimal, typography-led. Fully specified in
  DESIGN.md; no visual decisions are left to the implementer.
- **v1 scope**: homepage + projects index + project detail template + 404. Nothing else.

## 2. Tech stack (decided — do not substitute)

- **Framework**: Astro (latest stable), static output (`output: 'static'`).
  Chosen because projects live as markdown content collections, it ships zero JS by
  default, and it deploys anywhere as plain files.
- **Styling**: plain CSS in `src/styles/` using custom properties for every token in
  DESIGN.md §2–§5. No Tailwind, no CSS-in-JS, no UI libraries.
- **Fonts**: self-hosted via `@fontsource/space-grotesk`, `@fontsource/inter`,
  `@fontsource/jetbrains-mono` (subset weights only: SG 500+700, Inter 400+500, JBM 400).
- **JS budget**: the mobile nav toggle is the only client-side JS. Write it as a small
  inline `<script>` — no framework islands needed in v1.
- **Hosting target**: Cloudflare Pages (free tier) with the custom domain. Build =
  `astro build`, output = `dist/`. GitHub repo → Pages auto-deploy.

## 3. Site map & routes

| Route | Page | Contents |
|---|---|---|
| `/` | Home | Hero → Selected projects (max 6 cards) → About (short) → Contact/footer |
| `/projects/` | Projects index | Eyebrow + heading, full card grid of all non-draft projects |
| `/projects/[slug]/` | Project detail | Title block (eyebrow = status + date, h1, tags), prose body from markdown, back-link |
| `/404` | Not found | Wordmark, "lost in space" one-liner (keep it dry), link home |

Content model — Astro content collection `projects` with frontmatter schema (zod):

```ts
{
  title: string,
  description: string,        // one sentence, card + meta description
  status: 'live' | 'wip' | 'archived',
  date: date,                 // for ordering, newest first
  tags: string[],             // max 4 shown on cards
  url: string | undefined,    // live project link, if any
  repo: string | undefined,   // source link, if any
  featured: boolean,          // true → appears on homepage
  draft: boolean              // true → excluded from builds
}
```

## 4. Build phases

### Phase 0 — Scaffold
Create the Astro project in this folder (`mooonman.com/`), git init, install fontsource
packages. Set `site: 'https://mooonman.com'` in `astro.config.mjs`.
✅ *Accept*: `npm run dev` serves a blank page with no console errors.

### Phase 1 — Design tokens & base styles
`src/styles/tokens.css` (every custom property from DESIGN.md §2, §3, §5) and
`src/styles/base.css` (reset, font-face imports, body defaults: `--surface-space`
background, `--text-secondary` body color, type scale utility classes, focus-ring rule,
`prefers-reduced-motion` guard).
✅ *Accept*: a test page shows correct canvas color, all three fonts render, tab focus
shows the moonglow outline.

### Phase 2 — Layout shell
`BaseLayout.astro`: full `<head>` (meta description per page, OG tags, canonical,
favicon), skip-to-content link, Nav component, `<main>` slot, Footer component.
Nav and footer exactly per DESIGN.md §4, including scroll-state and mobile overlay.
✅ *Accept*: shell renders on desktop and 360px; nav overlay opens/closes with keyboard
(Escape closes, focus trapped while open).

### Phase 3 — Components
`Eyebrow.astro`, `ProjectCard.astro`, `Tag.astro`, `StatusDot.astro`, `Button.astro` —
all per DESIGN.md §4. Cards must render correctly with and without a thumbnail.
✅ *Accept*: a scratch page showing all components matches DESIGN.md; card hover +
reduced-motion behavior verified.

### Phase 4 — Pages & content
Build the four routes. Seed the `projects` collection with the placeholder entries from
CONTENT.md (marked clearly as placeholders). Homepage copy from CONTENT.md verbatim.
✅ *Accept*: all routes build statically; project ordering (featured + date) correct;
draft entries excluded; hero moonglow gradient present on `/` only.

### Phase 5 — Polish & QA
- Semantic pass: one h1/page, landmarks, alt text, color-contrast check (the palette in
  DESIGN.md passes WCAG AA at the sizes specified — verify, don't assume).
- Meta: sitemap (`@astrojs/sitemap`), `robots.txt`, OG image (simple: wordmark on
  `--surface-space`, generate as a static 1200×630 PNG), favicon (moon-dot "o" glyph,
  SVG favicon + PNG fallback).
- Perf: fonts subset, no layout shift on load, no unused CSS.
✅ *Accept*: Lighthouse (mobile) ≥ 95 on Performance, Accessibility, Best Practices,
SEO for `/` and one project page. Report actual scores — if under, fix and re-run.

### Phase 6 — Deploy handoff
Do **not** deploy or create external accounts. Instead produce `DEPLOY.md` with exact
steps: push to GitHub → Cloudflare Pages setup → custom-domain DNS records for
mooonman.com (apex + www redirect). Include the precise DNS values.
✅ *Accept*: `npm run build` clean; `dist/` verified with a local preview; DEPLOY.md
complete enough that Alex can go live in ~15 minutes.

## 5. Rules for the implementing agent

1. **No scope creep.** No blog, no dark/light toggle, no animations beyond DESIGN.md
   transitions, no analytics, no CMS. Ideas for later go in a "Future" note at the
   bottom of DEPLOY.md, not in code.
2. **Placeholders are honest.** Where real content is missing, use the CONTENT.md
   placeholder and keep the `PLACEHOLDER:` marker in the source so Alex can find every
   spot with one grep.
3. **Verify visually.** After each phase, run the dev server and check the result at
   1440px and 360px before claiming the acceptance criteria pass.
4. **Ask nothing mid-build.** Every open question was already decided in these three
   files. If something is genuinely unspecified, choose the most minimal option
   consistent with DESIGN.md §7 and note the decision in your final summary.

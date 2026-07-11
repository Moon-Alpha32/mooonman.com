# DESIGN.md — mooonman.com

Design system for a personal projects site at **mooonman.com**. Follows the DESIGN.md spec
(getdesign.md / Stitch format). This file is the single source of truth for all visual
decisions. If a choice isn't specified here, follow the Do's and Don'ts, then the Overview
philosophy — do not invent new colors, fonts, or effects.

---

## 1. Visual Theme & Atmosphere

**Codename: Moonlit.**

A quiet, deep-space canvas with moonlight-white typography and one pale-blue glow accent.
The mood is *calm, precise, nocturnal* — a professional engineer's desk at night, not a
sci-fi poster. Inspiration: Land-book's minimal portfolio tier (generous whitespace,
oversized display type, work-first grids) crossed with Vercel-grade restraint.

- Darkness is the brand. There is no light mode in v1.
- Exactly **one** decorative element exists: a soft radial "moonglow" gradient behind the
  hero. Everything else is flat surfaces, hairline borders, and typography.
- The triple-o in "mooon" is a deliberate quirk — celebrate it once in the wordmark
  (see Components → Wordmark), never repeat the gag elsewhere.
- Density is low. When in doubt, add space, not elements.

---

## 2. Color Palette & Roles

All colors are defined as CSS custom properties on `:root`. Never hardcode hex values in
components.

### Surfaces (canvas ladder, darkest → lightest)

| Token | Hex | Role |
|---|---|---|
| `--surface-space` | `#0B0D12` | Page background. The void. |
| `--surface-raised` | `#12151C` | Cards, nav on scroll, footer band |
| `--surface-overlay` | `#1A1F29` | Hover state of cards, code blocks, tags |
| `--border-hairline` | `#242A36` | All borders. 1px only, never thicker. |

### Text

| Token | Hex | Role |
|---|---|---|
| `--text-moonlight` | `#E9ECF2` | Headings, primary copy |
| `--text-secondary` | `#9AA3B2` | Body paragraphs, descriptions |
| `--text-mute` | `#5E6673` | Meta info, timestamps, captions, footer small print |

### Accent & Semantic

| Token | Hex | Role |
|---|---|---|
| `--moonglow` | `#A6C8FF` | Links, primary CTA, focus rings, active nav item. The ONLY accent. |
| `--moonglow-dim` | `#6E90C4` | Visited/hover-out link state, accent on mute surfaces |
| `--success` | `#4ADE80` | "Live" project status dot only |
| `--warning` | `#FBBF24` | "WIP" project status dot only |
| `--error` | `#F87171` | Form validation only |

### The Moonglow Gradient (sole decorative element)

```css
/* Positioned behind hero content, overflow hidden, pointer-events none */
background: radial-gradient(
  ellipse 60% 45% at 50% -10%,
  rgba(166, 200, 255, var(--moonglow-opacity, 0.13)),
  transparent 70%
);
```

Rules: hero only. Never animate it, never increase opacity above 0.15, never add a second
gradient anywhere on the site.

**Narrow amendment (time-of-day intensity):** `--moonglow-opacity` may vary once per
page load based on the visitor's local time of day (dimmer around midday, fuller at
night), set synchronously via a pre-paint inline script — never via CSS transition,
`@keyframes`, or a JS animation loop, and never exceeding 0.15. This is a single static
value chosen at load, not motion, so it does not relax the "never animate" rule for
this gradient or anything else on the site. The `0.13` fallback in `var()` is the
default for no-JS/CSP-blocked contexts and must always match the original static value.

---

## 3. Typography Rules

Three faces, loaded via `@font-face` with `font-display: swap` (self-host from Google
Fonts / Fontsource — no runtime CDN requests):

- **Space Grotesk** — display/headings. Weights 500, 700.
- **Inter** — body. Weights 400, 500.
- **JetBrains Mono** — labels, meta, code. Weight 400 only.

| Token | Face / Size / Weight / Tracking / Line-height | Use |
|---|---|---|
| `display-xl` | Space Grotesk / clamp(2.75rem, 6vw, 4.5rem) / 700 / -0.03em / 1.05 | Hero headline only |
| `display-lg` | Space Grotesk / clamp(2rem, 4vw, 3rem) / 700 / -0.02em / 1.1 | Section headings (h2) |
| `display-md` | Space Grotesk / 1.5rem / 500 / -0.01em / 1.2 | Card titles, project page h1 subsections (h3) |
| `body-lg` | Inter / 1.125rem / 400 / 0 / 1.7 | Hero subline, intro paragraphs |
| `body` | Inter / 1rem / 400 / 0 / 1.65 | Default copy |
| `body-sm` | Inter / 0.875rem / 400 / 0 / 1.5 | Card descriptions, footer |
| `label-mono` | JetBrains Mono / 0.75rem / 400 / 0.08em / 1 / UPPERCASE | Section eyebrows, tags, meta, status labels |

Rules:
- Headings are **sentence case**. The only uppercase on the site is `label-mono`.
- Body text color is `--text-secondary`; only headings and emphasized inline text get
  `--text-moonlight`.
- Max line length for prose: `65ch`.

---

## 4. Component Stylings

### Wordmark
`mooonman` in Space Grotesk 700, lowercase, `--text-moonlight`. The three o's are the
logo — optionally render the middle "o" in `--moonglow` as a full-moon nod. No icon,
no image logo.

### Navigation
- Sticky top bar, height `64px`, max-width aligned with content grid.
- Transparent over hero; on scroll gains `--surface-raised` at 80% opacity +
  `backdrop-filter: blur(12px)` + bottom `--border-hairline`.
- Left: wordmark. Right: 3–4 text links (`body-sm`, `--text-secondary`, hover
  `--text-moonlight`, active/current `--moonglow`). No CTA button in nav — this is a
  personal site, not a SaaS.
- Mobile: links collapse into a full-screen overlay menu (`--surface-space`, links in
  `display-md` size), toggled by a plain hamburger. No animation library — CSS transitions only.

### Buttons
- `button-primary`: `--moonglow` background, `--surface-space` text, radius `8px`,
  padding `12px 24px`, Inter 500. Hover: brightness 110%, no transform. Used at most
  once per viewport-height of content.
- `button-ghost`: transparent, 1px `--border-hairline`, `--text-moonlight` text.
  Hover: border-color `--moonglow-dim`, text stays.
- Focus (both): 2px outline `--moonglow`, offset 2px. Never remove focus outlines.

### Project Card
The core unit of the site.
- `--surface-raised` fill, 1px `--border-hairline`, radius `12px`, padding `24px`.
- Contents top-to-bottom: status row (`label-mono` tag + status dot), title
  (`display-md`), one-sentence description (`body-sm`), tech tags row.
- Hover: background `--surface-overlay`, border `--moonglow-dim`, `translateY(-2px)`,
  transition `150ms ease`. Entire card is a single link (`<a>` wrapping, with proper
  heading semantics inside).
- Optional thumbnail: 16:9, radius `8px`, above status row, `--surface-overlay`
  placeholder when absent. Cards must look complete without images.
- Optional trailing stats line: `label-mono`, `--text-mute`, below the tags row.
  Populated at build time from the GitHub API when a project sets `repo` in its
  frontmatter (e.g. `★ 12 · TypeScript · updated July 2026`). Absent entirely when
  `repo` is unset or the fetch fails — cards must look complete without it, same rule
  as thumbnails.

### Tag / Chip
`label-mono`, `--text-mute`, 1px `--border-hairline`, radius `999px`, padding `4px 10px`.
No fill, no per-tag colors.

### Status Dot
8px circle: `--success` = live, `--warning` = in progress, `--text-mute` = archived.
Always paired with a `label-mono` text label (never color alone — accessibility).

### Section Eyebrow
Every h2 section opens with a `label-mono` eyebrow in `--moonglow`
(e.g. `01 — PROJECTS`), then the `display-lg` heading. This is the signature repeating
pattern of the site.

### Footer
`--surface-raised` band, top hairline border. Wordmark, one-line sign-off, contact links
(email, GitHub, LinkedIn) as `body-sm` text links, © year. Height: content + `48px`
vertical padding. No sitemap columns — too corporate for a personal site.

### Prose (project pages)
Markdown-rendered content: `65ch` max, `body` scale, `h2`/`h3` from the display scale,
code blocks on `--surface-overlay` with radius `8px` and JetBrains Mono at `0.875rem`,
inline links `--moonglow` with underline (underline always on for prose links).

---

## 5. Layout Principles

- **Base unit**: `4px`. Spacing tokens: `xs 8 / sm 16 / md 24 / lg 40 / xl 64 / 2xl 96 / section 128`.
- **Content max-width**: `1080px`, gutters `24px` (mobile `20px`). Single column of
  content — no sidebars anywhere.
- **Section rhythm**: `--space-section` (128px) between major sections, `--space-xl`
  (64px) between a section heading block and its content.
- **Hero**: min-height `~80vh`, content vertically centered, left-aligned (not centered —
  left-aligned reads more editorial/professional).
- **Project grid**: 2 columns desktop, 1 column ≤ `768px`. Gap `24px`. Max 6 cards on
  the homepage; the rest live on `/projects`.
- Whitespace is the primary layout tool. Never add a divider line where spacing can do
  the job; hairlines are for component edges only.

---

## 6. Depth & Elevation

Elevation is expressed by **surface color + hairline border**, not shadows.

| Level | Treatment | Use |
|---|---|---|
| 0 | `--surface-space` | Page |
| 1 | `--surface-raised` + hairline | Cards, nav, footer |
| 2 | `--surface-overlay` + hairline | Hover states, code blocks, menu overlay |

- **No box-shadows anywhere in v1.** On a near-black canvas shadows are invisible or
  muddy; the surface ladder does the work.
- The only glow permitted is the hero moonglow gradient and the focus ring.

---

## 7. Do's and Don'ts

**Do**
- Keep `--moonglow` scarce — links, one CTA, eyebrows, focus rings. Scarcity is what
  makes it feel professional.
- Use `label-mono` eyebrows to give every section the same signature rhythm.
- Let project cards work text-only; screenshots are a bonus, not a requirement.
- Use real content hierarchy: one `h1` per page, sections as `h2`, semantic landmarks
  (`header/nav/main/section/footer`).
- Keep every transition ≤ `200ms ease`; respect `prefers-reduced-motion` by disabling
  transforms.

**Don't**
- Don't introduce any color outside §2 — no purples, no gradients on text, no per-tag
  hues.
- Don't use box-shadows, glassmorphism cards, glow effects on buttons, or animated
  backgrounds.
- Don't center-align body text or the hero.
- Don't use all-caps outside `label-mono`, or font weights above 700.
- Don't add a moon illustration, stars, parallax, or particle effects. The theme is
  atmospheric, not literal. (The wordmark's moonglow "o" is the one permitted wink.)
- Don't add cookie banners, chat widgets, or analytics scripts that need consent UI.

---

## 8. Responsive Behavior

- Breakpoints: `480px` (phone-large), `768px` (tablet — grid collapses to 1 col, nav
  collapses to overlay), `1080px` (content max-width reached).
- Mobile-first CSS. Test at `360px` width minimum.
- Touch targets ≥ `44px`. Nav links get extra padding on mobile.
- `clamp()` handles display type scaling (already in the type tokens) — no per-breakpoint
  font overrides needed beyond that.
- Hero on mobile: min-height auto, padding `--space-2xl` top/bottom.

---

## 9. Agent Prompt Guide

Quick reference for any AI agent building or extending this site:

- Canvas `#0B0D12` · card `#12151C` · hover `#1A1F29` · border `#242A36` ·
  heading text `#E9ECF2` · body text `#9AA3B2` · accent `#A6C8FF`.
- Fonts: Space Grotesk (headings, 500/700), Inter (body, 400/500), JetBrains Mono
  (labels/meta, 400, uppercase, tracked +0.08em).
- Spacing on a 4px base; sections separated by 128px; content max 1080px, left-aligned.
- Elevation = surface ladder + 1px borders. **Never** box-shadows or extra gradients.
- One radial moonglow gradient behind the hero is the only decoration on the site. Its
  opacity may vary once per load by local time of day (0.06–0.15, set pre-paint via
  `--moonglow-opacity`), but is never animated/transitioned.
- Ready-to-use prompt: *"Build [component] for mooonman.com per DESIGN.md: Moonlit
  theme — #0B0D12 canvas, #E9ECF2/#9AA3B2 text, #A6C8FF accent used sparingly, Space
  Grotesk headings with negative tracking, JetBrains Mono uppercase eyebrows, surfaces +
  hairline borders instead of shadows, 4px spacing scale, left-aligned, calm and minimal."*

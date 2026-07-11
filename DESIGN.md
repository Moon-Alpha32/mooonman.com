# DESIGN.md — mooonman.com

Design system for a personal projects site at **mooonman.com**. This file is the
single source of truth for all visual decisions. If a choice isn't specified here,
follow the Do's and Don'ts, then the Overview philosophy — do not invent new colors,
fonts, or effects.

---

## 1. Visual Theme & Atmosphere

**Codename: Matchday Programme.**

A printed football programme, not a screen. Newsprint paper, ink, one bold spot
colour, halftone texture, squad-list numbering. The mood is *specific, honest,
slightly imperfect* — the opposite of a polished dark-mode SaaS template, which is
exactly what the previous "Moonlit" system had drifted into looking like.

- Light is the brand now. There is no dark mode.
- Two decorative devices exist, both drawn from real print production: a halftone
  dot texture on the page canvas, and a slight fixed rotation (`rotate(-0.3deg)`) on
  card surfaces, evoking a page that isn't perfectly aligned on press. Nothing else is
  decorative — no shadows, no blur, no gradients beyond the halftone.
- The triple-o in "mooon" is still the wordmark's one permitted wink — the middle "o"
  renders in `--spot-red`, a full-moon-as-matchball nod. Never repeated elsewhere.
- Numbering is used only where it's honest: project cards are numbered like squad
  sheets (shirt numbers reflecting real list order), homepage sections are numbered
  because they really do read in that order. Numbering is never purely decorative.

---

## 2. Color Palette & Roles

All colors are defined as CSS custom properties on `:root`. Never hardcode hex values
in components.

### Surfaces (paper ladder, canvas → card)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#EDE9DF` | Page background. Newsprint. |
| `--surface-card` | `#FFFFFF` | Cards, panels — whiter paper stock |
| `--surface-raised` | `#F5F2EA` | Nav/footer band, code blocks |
| `--border-rule` | `#C9C4B6` | Hairline/dashed rules |

### Text

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1B1D22` | Headings, primary copy |
| `--ink-mute` | `#5C5A52` | Body paragraphs, meta, descriptions — hand-tuned for WCAG AA 4.5:1 against both `--paper` and `--surface-card` |

### Accent & semantic

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#1F3A5F` | Structural accent: rules, shirt-number badges, tag borders, links, focus rings, "in progress" status |
| `--spot-red` | `#B31F24` | The one bold spot colour — masthead "o", "live" status, primary CTA. Darkened from a true print red (`#C8262C`) to clear WCAG AA with headroom. |

Status mapping is deliberately limited to three inks — no green/amber added:
- **Live** → `--spot-red`
- **In progress** → `--navy`
- **Archived** → `--ink-mute`

Status must never be color-only — always paired with a text label (`LIVE` / `IN
PROGRESS` / `ARCHIVED`).

### The scarcity rule

`--spot-red` does double duty as both the decorative accent *and* the "live" status
colour. This is deliberate, not a shortcut: a real two-colour print job reserves its
one spot colour for exactly this kind of "pay attention" content. Keep it scarce — one
CTA, live-status labels, the masthead "o", focus emphasis where navy isn't enough.
Everything structural (rules, links, "in progress", tag borders) uses `--navy`
instead, so red stays meaningful.

---

## 3. Typography Rules

Three faces, self-hosted via Fontsource (no runtime CDN requests):

- **Bebas Neue** (400 only — single-weight by design) — display/headings, run
  **uppercase**. This reverses the old sentence-case rule deliberately: condensed
  poster lettering is the entire point of a programme cover.
- **Source Serif 4** (400, 400-italic, 600) — body copy, descriptions, prose.
- **Courier Prime** (400, 700) — labels, tags, status badges, stat lines, code blocks.
  Chosen over a code-editor mono for its teleprinter/typewriter character, which suits
  print.

| Token | Face / Size / Weight / Tracking / Line-height | Use |
|---|---|---|
| `display-xl` | Bebas Neue / clamp(3rem, 7vw, 5.5rem) / 400 / +0.005em / 1 / UPPERCASE | Hero headline only |
| `display-lg` | Bebas Neue / clamp(2.2rem, 4.5vw, 3.4rem) / 400 / +0.005em / 1.02 / UPPERCASE | Section headings (h2) |
| `display-md` | Bebas Neue / 1.6rem / 400 / +0.005em / 1.05 / UPPERCASE | Shirt-number badges, project-page h1 subsections (h3) |
| `body-lg` | Source Serif 4 / 1.125rem / 400 / 0 / 1.7 | Hero subline, intro paragraphs |
| `body` | Source Serif 4 / 1rem / 400 / 0 / 1.65 | Default copy |
| `body-sm` | Source Serif 4 / 0.875rem / 400 / 0 / 1.5 | Card descriptions, footer |
| `label-mono` | Courier Prime / 0.75rem / 700 / 0.08em / 1 / UPPERCASE | Eyebrows, tags, meta, status labels, nav links |

Rules:
- Display headings are **uppercase** (the only case reversal from body text — this is
  the opposite convention from the old system, so don't mix the two).
- Body text color is `--ink-mute`; only headings and emphasized inline text get
  `--ink`.
- Card titles are a special case: `--font-body` (Source Serif 4) at 1.2rem/600, *not*
  the display face — a programme's player names are typeset in the body face, not the
  cover lettering, and it keeps card titles readable at that size (Bebas Neue is a
  display-only face, not meant for anything below ~1.5rem).
- Max line length for prose: `65ch`.

---

## 4. Component Stylings

### Wordmark
`mooonman` in Bebas Neue, uppercase, `--ink`. The three o's are the logo — the middle
"o" renders in `--spot-red`. No icon, no image logo.

### Navigation (masthead)
- Sticky top bar, height `64px`, max-width aligned with content grid.
- **Static** — no scroll-triggered state change. A printed masthead doesn't change
  when you scroll down the page, and since hero and body now share the same paper
  canvas, there's no dark-hero-vs-light-body contrast problem to solve with a
  translucent nav anymore. `--surface-raised` background, `3px solid --navy` bottom
  rule, always.
- Left: wordmark + small italic Courier "Official Matchday Programme" tag (hidden
  below `561px`). Right: `label-mono` nav links, `--ink-mute`, hover `--ink`, active
  `--spot-red`.
- Mobile: links collapse into a full-screen overlay menu (`--surface-card`, links in
  uppercase Bebas Neue), toggled by a plain hamburger. Same focus-trap/keyboard
  handling as before — only the visual styling changed.

### Buttons
- `button-primary`: `--spot-red` background, `--surface-card` text, `label-mono`
  styling (Courier Prime, bold, uppercase, tracked), `--radius` (2px) corners. Hover:
  brightness 110%. Used at most once per viewport-height of content.
- `button-ghost`: transparent, 1px `--navy` border, `--navy` text. Hover: fills navy,
  text goes white — a print "stamp" interaction rather than a border-color fade.
- Focus (both): 2px outline `--navy`, offset 2px. Never remove focus outlines.

### Project Card ("squad card")
The core unit of the site.
- `--surface-card` fill, 1px `--border-rule`, `--radius` (sharp) corners, fixed
  `rotate(-0.3deg)` — straightens to `0deg` and lifts 2px on hover.
- Header block: a sequence-numbered badge (`display-md`, `--navy`, zero-padded —
  reflects real list order, same logic as a squad sheet) + title (Source Serif 4,
  600, 1.2rem, `--ink`) + status badge, under a `3px solid --navy` rule.
- Body: one-sentence description (`body-sm`, `--ink-mute`), tag row, optional GitHub
  stats line (`label-mono`, `--ink-mute`) above a `1px dashed --border-rule` top rule.
- Optional thumbnail: 16:9, above the header block, only rendered when set — no
  placeholder block. The numbered header makes cards look complete without one.

### Tag / Chip
`label-mono`, `--navy` text and border, square corners (`--radius`, not pill). No
fill.

### Status badge
Bold `label-mono` text only — no colored dot. `--spot-red` (live) / `--navy` (in
progress) / `--ink-mute` (archived). Color is never the only signal; the word is
always there.

### Section Eyebrow
Every h2 section opens with a `label-mono` eyebrow in `--navy` (e.g. `01 —
PROJECTS`), then the `display-lg` heading — same repeating rhythm as before, restyled.

### Footer
`--surface-raised` band, `3px solid --navy` top rule. Wordmark, one-line sign-off,
contact links (email, GitHub) as underlined `--navy` links, © year in `label-mono`.

### Prose (project pages)
Markdown-rendered content: `65ch` max, `body` scale (Source Serif 4), `h2`/`h3` in
uppercase Bebas Neue, code blocks on `--surface-raised` with a `--border-rule` border
and Courier Prime at `0.875rem`, inline links `--navy` with underline.

---

## 5. Layout Principles

- **Base unit**: `4px`. Spacing tokens unchanged: `xs 8 / sm 16 / md 24 / lg 40 / xl
  64 / 2xl 96 / section 128`.
- **Content max-width**: `1080px`, gutters `24px` (mobile `20px`). Single column of
  content — no sidebars anywhere.
- **Section rhythm**: `--space-section` (128px) between major sections, `--space-xl`
  (64px) between a section heading block and its content.
- **Hero**: min-height `70vh` (down from 80vh — the masthead/teamsheet content needs
  less vertical padding than the old glow-hero did), left-aligned, closed with a
  `3px solid --navy` rule and a computed "teamsheet" stat line (live/in-progress/
  archived project counts + log entry count, pulled from real content, never
  hardcoded).
- **Project grid**: 2 columns desktop, 1 column ≤ `768px`. Gap `24px`. Max 6 cards on
  the homepage; the rest live on `/projects`.
- Whitespace and rules do the layout work together now — dashed rules separate
  metadata from content, solid navy rules separate structural blocks (masthead,
  card headers, footer).

---

## 6. Depth & Elevation

Elevation is expressed by **surface color + rule weight**, not shadows.

| Level | Treatment | Use |
|---|---|---|
| 0 | `--paper` + halftone texture | Page |
| 1 | `--surface-raised` + `1px --border-rule` | Nav, footer, code blocks |
| 2 | `--surface-card` + `1px --border-rule` + slight rotation | Cards |

- **No box-shadows, no blur/glassmorphism anywhere.** Same rule as before, still true
  — a printed page doesn't have drop shadows either.
- The halftone dot texture (`radial-gradient`, 6px grid, on `body`) and the card
  rotation are the only two decorative devices on the site.

---

## 7. Do's and Don'ts

**Do**
- Keep `--spot-red` scarce — one CTA, live-status labels, the wordmark's middle "o".
  Scarcity is what makes it read as a genuine spot colour, not just "the accent blue
  but red now."
- Use `label-mono` eyebrows and status badges to give every section/card the same
  signature rhythm.
- Let project cards work text-only; thumbnails are a bonus, never required.
- Use real content hierarchy: one `h1` per page, sections as `h2`, semantic landmarks
  (`header/nav/main/section/footer`).
- Keep every transition ≤ `200ms ease`; respect `prefers-reduced-motion` by disabling
  transforms (including the card rotation-on-hover).

**Don't**
- Don't introduce any color outside §2 — no third/fourth hue for status, no
  gradients-as-decoration beyond the one halftone texture.
- Don't use box-shadows, glassmorphism, glow effects, or animated backgrounds.
- Don't round corners beyond `--radius` (2px) — this system is deliberately
  sharp-cornered.
- Don't run body text in uppercase — that's reserved for `label-mono` and display
  headings only (note: display headings *are* uppercase now, a deliberate reversal
  from the old system — don't apply the old sentence-case rule here).
- Don't add a literal football/matchday illustration, photography, or stock imagery —
  the halftone texture and structural devices (numbering, rules) carry the theme, not
  literal pictures.
- Don't add cookie banners, chat widgets, or analytics scripts that need consent UI.

---

## 8. Responsive Behavior

- Breakpoints: `561px` (masthead tagline appears), `768px` (tablet — grid collapses
  to 1 col, nav collapses to overlay), `1080px` (content max-width reached).
- Mobile-first CSS. Test at `360px` width minimum.
- Touch targets ≥ `44px`. Nav links get extra padding on mobile.
- `clamp()` handles display type scaling — no per-breakpoint font overrides needed
  beyond that.
- Hero on mobile: min-height auto, padding `--space-2xl` top/bottom.

---

## 9. Agent Prompt Guide

Quick reference for any AI agent building or extending this site:

- Paper `#EDE9DF` · card `#FFFFFF` · raised `#F5F2EA` · rule `#C9C4B6` · ink
  `#1B1D22` · ink-mute `#5C5A52` · navy `#1F3A5F` · spot-red `#B31F24`.
- Fonts: Bebas Neue (display, 400 only, run UPPERCASE), Source Serif 4 (body,
  400/400italic/600), Courier Prime (labels/meta/code, 400/700, uppercase + 0.08em
  tracking).
- Spacing on a 4px base; sections separated by 128px; content max 1080px, left-aligned.
- Elevation = surface ladder + rule weight, never box-shadows.
- Two decorative devices only: halftone dot texture on the page canvas, and a fixed
  `rotate(-0.3deg)` on cards. Nothing else is decorative.
- Status is always red (live) / navy (in progress) / ink-mute (archived), text label
  always present, never color-only.
- Ready-to-use prompt: *"Build [component] for mooonman.com per DESIGN.md: Matchday
  Programme theme — #EDE9DF paper canvas, #1B1D22/#5C5A52 text, #1F3A5F navy as the
  structural color, #B31F24 spot-red used sparingly for live-status and one CTA,
  Bebas Neue uppercase headings, Courier Prime uppercase tracked labels, Source Serif
  4 body, sharp 2px corners, halftone texture + slight card rotation as the only
  decoration, no shadows, no blur, no gradients."*

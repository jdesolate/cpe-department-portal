# CPE Department Portal — Landing Brand System

The public-facing marketing site (`apps/landing`) has its own visual design language, independent of the `apps/internal` portal's design system. This glossary covers the vocabulary of that visual language.

## Language

**Circuit-badge system**:
The engineering-themed visual language for the landing page — combines circuit-line motifs, via-nodes, and trace patterns to evoke a PCB/circuit-board aesthetic reinforcing the CPE (Computer Engineering) department identity.
_Avoid_: theme, brand kit

**Via-node**:
A small rotated-square (diamond) accent mark styled like a PCB via, used to punctuate section dividers and as a decorative marker on card corners. Implemented as the `TraceDivider` bullet and the `via-card` utility's `::before` pseudo-element.
_Avoid_: diamond bullet, dot marker

**Via-card**:
The card/panel container utility (`@utility via-card` in `globals.css`) that gives announcement, event, and faculty cards their bordered surface plus a via-node accent at the top-left corner.
_Avoid_: panel, surface

**Trace-line**:
A thin gradient line (fading from a brand color to transparent) used as a section divider, echoing a circuit trace. Implemented as the `trace-line` utility.
_Avoid_: divider, hr

**Dot-grid**:
A subtle repeating radial-dot background texture (28px spacing) used behind the hero section, evoking a PCB grid.
_Avoid_: background pattern, texture

## Design tokens

**Foreground** (`--foreground`, formerly `--ink`):
The primary text color. Value is the near-black `#12140f` — reused from the old dark-theme background color rather than inventing a new dark tone.

**Card** (`--card`, formerly `--panel`/`--panel-2`):
The card/panel surface color, distinct from the page background. Light theme value: a light gray (~`#f5f5f4`), not to be confused with the department's brand colors.

**Gold** (`--gold`):
The secondary brand accent (`#f2b705`). Used for borders, icon fills, and backgrounds paired with dark text — never used directly as text color on a light background (see `--gold-text`).
_Avoid_: yellow, accent (ambiguous — this app has two accents)

**Gold-text** (`--gold-text`):
A darkened variant of gold (~`#8a6a08`) used specifically where gold appears as *text* (links, stat numbers, dates, tag labels). Exists because the bright `--gold` fails WCAG AA contrast (~1.8:1) against a white background.

**Maroon** / **Maroon-bright** (`--maroon`, `--maroon-bright`):
The primary brand color (`#7c2635` / `#a3333f`), used for CTAs, headings, buttons, and dominant accents. One of the school's two official colors (with gold).
_Avoid_: "green" — this was a past misidentification of the old dark-theme `--panel` card-surface color, which had a green tint; there is no green in this brand system.

**Line** / **Border** (`--line`):
The default border color for cards and dividers, kept brand-colored (gold-tinted) rather than neutral gray, to preserve the circuit-badge identity.

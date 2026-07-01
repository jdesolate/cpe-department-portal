# Landing page: permanent switch from dark+gold-primary theme to light+maroon-primary theme

**Status**: accepted

The landing page (`apps/landing`) previously had a permanently dark theme (`--ink` near-black background, `--gold` as the dominant accent, `--maroon` as secondary). We're replacing it with a permanently light theme (white page, maroon as dominant accent, gold as secondary) to better match the school's official maroon-and-gold colors — the prior gold-forward look read as closer to a rival school's colors. This is a full repaint, not a toggle: no dark-mode variant is being kept.

Scope is `apps/landing` only. `apps/internal` has its own independent design system (blue/cyan based) and is intentionally untouched.

## Considered options

- **Light/dark toggle** (keep both themes) — rejected: doubles the maintenance surface (every color decision needs a dark AND light variant) for a marketing site where a single consistent look is more valuable than user choice.
- **Gold-primary, maroon-secondary** (invert roles but keep gold dominant) — rejected in favor of maroon-primary since maroon is the more "solid"/institutional color for a light background, and gold has contrast problems as a dominant color at scale (see below).

## Consequences

- **Gold is not used as a text color.** Bright gold (`#f2b705`) has ~1.8:1 contrast against white — far below the WCAG AA 4.5:1 minimum for text. It remains valid for borders, icon fills, and buttons where surrounding treatment supplies contrast, but a separate darker token (`--gold-text`, ~`#8a6a08`) exists specifically for gold-as-text uses (links, stat numbers, dates, tag labels). Anyone reaching for `--gold` on text should use `--gold-text` instead.
- **CSS variable names were renamed to match their new roles**, rather than keeping old dark-theme names with inverted meanings (e.g. `--ink` becoming a light-adjacent role would have been confusing). See [CONTEXT.md](../../CONTEXT.md) for the current token glossary.
- The circuit-badge decorative system (circuit-line SVG, dot-grid texture, via-node accents) is kept, but recolored to maroon where gold would have insufficient contrast against white (e.g. the hero's circuit-line SVG gradient).

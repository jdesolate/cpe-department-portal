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

## Addendum — accessibility audit (2026-07-01)

A full WCAG pass on the rebranded landing page found one violation of this ADR's own gold-text rule plus three other issues, all fixed:

- `Button`'s `outline` variant (used by the "Upcoming Events" and "Follow us on Facebook" CTAs) used raw `--gold` as text color instead of `--gold-text` — the exact anti-pattern this ADR calls out. Fixed to use `--gold-text`.
- `--line` (see glossary) was also being used for form field borders and focus indicators in `EventRegistrationForm`, both functional boundaries that need to clear the 3:1 non-text contrast minimum. Switched to `--gray` (resting) and `--maroon-bright` (focus).
- `DepartmentCarousel`'s prev/next controls only appeared on mouse hover (`opacity-0` + `group-hover`), leaving keyboard users tabbing to invisible buttons; added `focus-visible:opacity-100`. Its 6s auto-advance also only paused on mouse hover with no visible stop control (WCAG 2.2.2); added a persistent pause/play toggle and pause-on-keyboard-focus.
- Several sections skipped from `h1` straight to `h3` (Core Competencies, Quick Access, Contact Us, Outstanding Milestones, Department Bulletins, and the faculty/events card lists) because their `TraceDivider` section labels were plain `<span>`s. `TraceDivider` gained an `as` prop (`"span" | "h2" | "h3"`, default `span`) so section-title usages render as real `h2`s.

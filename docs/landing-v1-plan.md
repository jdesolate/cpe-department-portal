# Landing Page v1 Plan

Living checklist for the landing-page revision. Each session ends at a testable checkpoint and gets its own commit, so the page can be reviewed and deployed incrementally.

**How to use across sessions:** start a new session with `@docs/landing-v1-plan.md` so context carries over without re-deriving the brief. Source brief: `Computer Engineering Department Website Revision Brief.pdf`.

## Core message (must hold across every section)

> The Computer Engineering Department produces industry-ready graduates through software development, embedded systems projects, research, competitions, and professional activities.

Primary audiences (in order): prospective students, parents, current students. Then faculty, alumni, industry partners, accreditation evaluators. Showcase **outputs and achievements**, not curriculum description. Copy should be direct and human, not terminal/jargon-heavy.

## Target homepage structure (per brief)

1. Hero — headline "Building Industry-Ready Software and Embedded Systems Engineers"; CTAs: Explore Student Projects / View Research / Access Department Services
2. Department Statistics — output-based (projects, research outputs, competitions), not enrollment/marketing numbers
3. Featured Student Projects — most prominent section
4. Research Highlights — links out to the Research Portal
5. Department Activities — ICpEP, competitions, recognition ceremonies, thesis defenses, seminars, outreach
6. Faculty — real photos, names, specializations
7. Department Services — Datagrades, Research Portal, Gearfolio, Internal Portal

Target nav: Home · Programs · Faculty · Projects · Research · Events · Services · Contact

---

## Session 1 — Quick wins (DONE)

- [x] Nav: added Services + Contact now; Projects + Research deferred to Sessions 2-3 (avoid dead nav links). "Program" renamed "Programs".
- [x] Hero: headline + CTAs on-message per brief (CTAs point to #featured-projects / #research / #services; first two activate in Sessions 2-3)
- [x] Reframe stat bar to output-based numbers (65+ Projects/Year, ~600 Students, 15+ Faculty — add Competition/Research counts when available)
- [x] Strip jargon placeholder copy ("Records Vault", "current sweep", "System Asset Verified", "board postings")
- [x] Services section (Datagrades, Research Portal, Gearfolio, Internal Portal — env-driven cards, SVG icons, "Coming soon" until URLs set)

## Session 2 — Featured Projects (DONE, pending real data)

- [x] Featured Projects section — screenshot-first cards, tech chips, links row, course filter (auto-hidden until 2+ courses exist). apps/landing/components/home/FeaturedProjects.tsx
- [x] Reusable project data template — apps/landing/lib/projects.ts (typed, single source of truth) + docs/project-data-template.md instructor guide
- [x] Seeded with 3 SAMPLE MSAD projects (isSample flag) — Merv replaces with real MSAD data
- [ ] Merv: swap sample entries for real MSAD projects (screenshots, GitHub, descriptions, teams)

## Session 3 — Research Highlights + Department Activities

- [ ] Research Highlights section (featured research + link to Research Portal)
- [ ] Department Activities section (ICpEP, competitions, ceremonies, defenses, seminars, outreach)

## Session 4 — Carousel + Faculty rework (blocked on photo gathering)

- [ ] Replace fabricated carousel content (stock media + invented achievements) with real photos
- [ ] Faculty section with real photos, bios, specializations (remove placeholder people/emails)

---

## Post-v1 / Future (not in scope for this week — recorded so it isn't lost)

- [ ] Full Project Showcase page (`/projects`) with per-project detail pages (`/projects/[id]`) — surfaces the fields the schema already carries (description, screenshot, course, team, tech, GitHub, SRS, presentation files). Per the brief, the highest-value future feature.
- [ ] Migrate project data from `apps/landing/lib/projects.ts` to Supabase so instructors add projects without code changes.
- [ ] Gearfolio integration — student portfolios auto-populate from the projects a student is tagged in (single source of truth; solves the "students won't maintain portfolios" problem from the brief).

---

## Content-gathering (Merv's offline tasks, unblocks Session 4 + real data)

- [ ] Faculty photos, specializations, bios
- [ ] Laboratory photos
- [ ] ICpEP activity photos
- [ ] Thesis defense photos
- [ ] Recognition ceremony photos
- [ ] Competition photos
- [ ] MSAD projects: screenshots, GitHub repos, descriptions, tech stacks
- [ ] Research: coordinate with Research Portal developer for featured titles, summaries, links

## Notes

- Keep the existing circuit-badge / light + maroon brand identity; fix the *copy tone*, not the visual system.
- Fabricated achievements in the current carousel are a liability (accreditation/industry audiences) — priority removal in Session 4.
- Swap text-glyph carousel controls (❚❚ ▶ ← →) for SVG icons.

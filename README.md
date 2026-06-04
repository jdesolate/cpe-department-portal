# CPE Department Portal

A dark-tech web portal for a University Computer Engineering (CpE) Department — built for ~600 students by CPE students. Not a corporate university template. Has personality.

Built with **Next.js 16 (App Router)**, **React 19**, **Supabase**, and **Framer Motion**, running entirely on free-tier infrastructure.

---

## Design Philosophy

The portal is designed to feel like it was made *by* and *for* CPE students — not a generic academic template. Key principles:

- **Dark tech aesthetic** — deep space background (`#050b14`), electric blue/purple/cyan gradient accents, glassmorphism cards
- **Personality over professionalism** — terminal-style labels, gradient text, tech motifs (dot grids, circuit lines), neon glow effects
- **Motion with purpose** — scroll-triggered fade-ins, parallax hero, physics-based spin wheel; all GPU-accelerated (`transform`/`opacity` only), no layout jank
- **Built to last** — ISR caching, WebSocket real-time, zero-maintenance serverless infrastructure

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16+ (App Router) · React 19 |
| Styling | Tailwind CSS v4 · Custom dark design tokens |
| Animation | Framer Motion (scroll parallax, entrance animations, wheel physics) |
| Backend | Supabase (PostgreSQL, Auth, Realtime WebSockets, Edge Functions) |
| Authentication | Supabase Auth — email/password with `@cit.edu` domain enforcement (dev bypass available) |
| Deployment | Vercel (frontend) · Supabase Cloud (database + edge) |
| Cost | 100% Free-Tier (Vercel Free + Supabase Free) |

---

## Features & Access Matrix

| Feature | Public (No Login) | Students (School Email) |
| :--- | :--- | :--- |
| Landing Page & Hero | Full access | + Authenticated layout features |
| Department Bulletins | Public announcements | + Private/internal memos |
| Achievements Archive | Full access | — |
| Faculty Directory | Profiles, email, consultation hours | — |
| Freedom Wall | Read-only live stream | Post anonymously (moderated) |
| Events & Registration | Browse events; register for open events | Register for login-required events |
| Wheel of Names (Raffle) | Watch live (spectator mode) | — |
| Wheel of Names (Facilitator) | Unlock via PIN (`NEXT_PUBLIC_RAFFLE_PIN`) | — |
| Admin Dashboard (`/admin/dashboard`) | — | Faculty/ICpEP officers/admins only |
| Announcement Management | — | Admin/faculty — create, edit, pin, delete bulletins |

---

## New Features (v2.0)

### Event Registration System
Department events (seminars, acquaintance parties, org activities) are managed in Supabase. Each event has a `registration_type`:

- **`open`** — anyone fills out Name + Student ID, no login needed
- **`login_required`** — must sign in with institutional email first

Registrations are stored in `event_registrations` with a unique constraint on `(event_id, student_id)` to prevent duplicates.

**Required Supabase tables:**
```sql
CREATE TABLE events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT,
  event_date       TIMESTAMPTZ,
  location         TEXT,
  capacity         INT,
  registration_type TEXT CHECK (registration_type IN ('open', 'login_required')) DEFAULT 'open',
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE event_registrations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id     UUID REFERENCES events(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL,
  student_id   TEXT NOT NULL,
  year_level   TEXT,
  section      TEXT,
  email        TEXT,
  user_id      UUID REFERENCES auth.users(id),
  registered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, student_id)
);
```

### Wheel of Names (Raffle)
A canvas-based spinning wheel for live department raffles, accessible at `/raffle`.

- **Spectator mode** — anyone can watch the wheel (great for projecting during events)
- **Facilitator mode** — unlocked with a 4-digit PIN (`NEXT_PUBLIC_RAFFLE_PIN` env var, default `1234`)
- Facilitator can input names manually or import directly from any active event's registrations
- Physics-based spin deceleration (exponential decay, ~0.991 multiplier per frame)
- Winner overlay with confetti burst (`canvas-confetti`)
- Remove-winner option for multi-round raffles
- Spin history shows last 5 winners

---

## Animation System

Three reusable wrapper components in `components/animations/`:

| Component | Usage |
| :--- | :--- |
| `FadeInView` | Fade + slide-up on viewport enter. Props: `delay`, `y` offset |
| `ParallaxLayer` | Scroll-driven Y transform. Prop: `speed` (±60px max) |
| `StaggerChildren` | Staggered entrance for card grids. Prop: `stagger` delay |

All animations use `transform`/`opacity` only and trigger `once: true` to prevent re-animation on scroll-up.

---

## Repository Structure

```
app/
├── layout.tsx                      Global layout (dark nav + footer + ambient blobs)
├── globals.css                     Design tokens (dark palette, glassmorphism utilities)
│
├── (public)/
│   ├── page.tsx                    Home portal (hero, announcements, freedom wall)
│   ├── faculty/page.tsx            Faculty directory
│   └── events/
│       ├── page.tsx                Events listing
│       └── [slug]/page.tsx         Event detail + registration form
│
├── (auth)/
│   ├── login/page.tsx              Email/password sign-in
│   └── signup/page.tsx             Account creation (dev utility, uses service role key)
│
├── auth/callback/route.ts          OAuth/magic-link callback (kept for future use)
│
├── (student)/
│   └── freedom-wall/submit/        Anonymous post submission
│
├── (admin)/
│   └── raffle/page.tsx             Wheel of Names (org_officer/admin, URL: /raffle)
│
└── admin/                          Role-protected admin area
    ├── layout.tsx                  Sidebar shell + server-side role guard
    ├── _components/AdminSidebar.tsx Active-link nav, logout button
    └── dashboard/
        ├── page.tsx                Overview — stats, recent announcements
        └── announcements/          Full CRUD — create, edit, pin, delete bulletins

components/
├── home/HeroSection.tsx            Client component — parallax hero
├── DepartmentCarousel.tsx          Auto-rotating media carousel
├── RealtimeFreedomWall.tsx         Live WebSocket freedom wall feed
├── EventRegistrationForm.tsx       Event registration client form
├── WheelOfNames.tsx                Canvas wheel + physics + confetti
└── animations/
    ├── FadeInView.tsx
    ├── ParallaxLayer.tsx
    └── StaggerChildren.tsx
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_RAFFLE_PIN=your-4-digit-pin       # default: 1234
SUPABASE_SERVICE_ROLE_KEY=your-service-role   # required for /signup account creation
```

---

## Architecture Notes

### Caching Strategy
- Public pages use ISR (`revalidate = 300` for home, `120` for events) — served from Vercel Edge CDN, database not hit on every request
- Freedom Wall uses Supabase Realtime WebSockets for live updates without polling

### Freedom Wall — Accountable Anonymity
Posts are publicly anonymous but the backend records the author's `auth.uid()` in a hidden column for admin traceability in code-of-conduct incidents. A Supabase Edge Function runs profanity/toxicity filtering before insertion. Do not remove this guard.

### Scalability
Designed for 500–600 concurrent student sessions on free-tier infrastructure. SSG/ISR prevents database overload during high-traffic periods (enrollment, event registration rushes).

---

## Continuing Development

This project uses three documentation files that work together:

| File | Purpose |
| :--- | :--- |
| `README.md` | Tech stack, architecture, and feature overview (this file) |
| `HANDOVER.md` | Operational guide — infrastructure, security, maintenance |
| `FEATURES.md` | **The living roadmap** — full feature registry, session plan, database schema |

### Using AI to Continue This Project

This project uses a session-based workflow designed to work with **any AI coding assistant** — Claude Code, Cursor, GitHub Copilot, ChatGPT, Gemini, or whatever tool is available to the next maintainer. The method is the same regardless of the tool.

**Starting a new session:**

1. Open your AI assistant inside this project directory (or paste relevant files if it has no file access)
2. Say: *"Read FEATURES.md — we're working on Session N: [title]"*
3. The AI will orient itself from that file and proceed without needing to re-explore the full codebase
4. After the session, update the `[ ]` checkboxes in `FEATURES.md` to `[x]` for completed items

**Keeping FEATURES.md current:**

Whenever a feature is built, modified, or descoped, update `FEATURES.md` — not just the checkbox, but add a note if behavior changed from the original plan. Future developers (human or AI) will use it as the source of truth for what's done and what's not.

---

## Running Locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # ESLint check
```

# System Handover & Operational Continuity Manual

**Project:** Computer Engineering Department Digital Portal  
**Original Developer:** Mervin John C. Tampus  
**Target Handover Date:** 2027  
**Architecture:** Next.js 16 Serverless + Supabase (PostgreSQL BaaS) + Vercel

---

## 1. Executive Summary

This portal is the digital hub for the CpE Department — announcements, faculty directory, freedom wall, event registration, and a live raffle tool. It runs on **zero-cost infrastructure** (Vercel Free + Supabase Free) and is designed for minimal maintenance.

**Design intent:** Dark tech aesthetic with personality. Not a corporate template. Built for CPE students by a CPE student.

---

## 2. Infrastructure Registry

### A. Supabase Console — Database & Auth

- **PostgreSQL** with Row-Level Security (RLS) enforced at schema level
- **Auth:** Institutional OAuth (Google/Microsoft). If the school updates its OAuth client credentials, update them in `Authentication → Providers` in the Supabase dashboard.
- **Realtime:** WebSocket channel `realtime-freedom-wall` streams approved freedom wall posts. If you disable Replication on the `freedom_wall` table, the live feed will break.

### B. Vercel Console — Hosting

- Auto-deploys on push to `main` branch
- Set environment variables in `Settings → Environment Variables` (see Section 3)

---

## 3. Environment Variables

| Variable | Purpose | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client-side queries | `eyJhbGci...` |
| `NEXT_PUBLIC_RAFFLE_PIN` | Facilitator PIN for the Wheel of Names raffle | `4321` |

**To change the raffle PIN:** Update `NEXT_PUBLIC_RAFFLE_PIN` in Vercel environment variables and redeploy. Default is `1234` if not set.

---

## 4. Supabase Database Schema

### Core Tables (existing)

| Table | Purpose |
| :--- | :--- |
| `announcements` | Pinnable department bulletins with expiry and category |
| `achievements` | Permanent academic/competition records indexed by year |
| `freedom_wall` | Anonymous posts with moderation status and hidden `user_id` |
| `faculty` | Faculty profiles (if migrated from hardcoded data) |

### New Tables (v2.0)

**`events`** — Department events for the registration system:
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
```

**`event_registrations`** — Participant records:
```sql
CREATE TABLE event_registrations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID REFERENCES events(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  student_id    TEXT NOT NULL,
  year_level    TEXT,
  section       TEXT,
  email         TEXT,
  user_id       UUID REFERENCES auth.users(id),
  registered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, student_id)
);
```

**RLS Policies needed:**
- `events`: SELECT allowed for `anon` and `authenticated`
- `event_registrations`: INSERT allowed for `anon` (open events); SELECT only for `authenticated` admin

---

## 5. Feature Operations Guide

### Managing Events

1. Go to **Supabase Table Editor → `events`**
2. Create a new row. Set `slug` as a URL-safe identifier (e.g., `acquaintance-2026`).
3. Set `registration_type`:
   - `open` — anyone can register (no login needed)
   - `login_required` — school email required
4. Set `is_active = false` to hide an event from the portal without deleting it.
5. Set `capacity` to limit registrations (leave `NULL` for unlimited).

### Viewing Registrations

Go to **Supabase Table Editor → `event_registrations`**, filter by `event_id`. Export as CSV if needed for attendance sheets.

### Wheel of Names (Raffle)

- URL: `/raffle` — public, anyone can view
- Click **Facilitator Mode** → enter PIN → unlock spin controls
- **Import from Event:** Dropdown auto-fetches all registered names from any active event
- **Manual:** Paste names one per line into the textarea, click Apply
- After each spin, use **Remove from wheel** to eliminate the winner for multi-round raffles
- Spin history shows the last 5 winners

To change the PIN: update `NEXT_PUBLIC_RAFFLE_PIN` in Vercel and redeploy.

---

## 6. Security & Architecture Guards

### A. Freedom Wall — Accountable Anonymity

The Freedom Wall uses an *Accountable Anonymity* pattern:

1. **Frontend:** Posts display zero user metadata (shown as `cpe_node_anon`)
2. **Moderation:** A Supabase Edge Function runs profanity/toxicity filtering before any post enters the database
3. **Audit trail:** The authenticated `auth.uid()` is stored in a hidden `user_id` column. In extreme events violating campus policy or law, the System Admin can trace a post back to the originating account.

**Do not remove the `user_id` column or the moderation Edge Function.**

### B. Data Isolation

Next.js Middleware intercepts all routes under `(student)/` and `(admin)/` to verify the Supabase JWT. Visitors without a valid institutional email token are redirected to `/login`.

---

## 7. Maintenance Checklists

### Semi-Annual Database Cleanup

Run in Supabase SQL Editor once per semester to stay under the 500MB free-tier ceiling:

```sql
-- Remove old freedom wall posts (60-day retention)
DELETE FROM freedom_wall
WHERE created_at < NOW() - INTERVAL '60 days';

-- Remove registrations for inactive events older than 1 year
DELETE FROM event_registrations
WHERE event_id IN (
  SELECT id FROM events
  WHERE is_active = false
  AND created_at < NOW() - INTERVAL '1 year'
);
```

### Annual

- Rotate Supabase anon key and update Vercel environment variable
- Review Vercel free-tier bandwidth limits; upgrade if near ceiling
- Archive previous year's `achievements` records (mark with academic year, never delete)
- Deactivate past events (`is_active = false`) rather than deleting them to preserve registration history

---

## 8. Animation & Design System

The portal uses **Framer Motion** for all scroll-triggered and physics animations. Animation components live in `components/animations/`:

- `FadeInView.tsx` — fade + slide-up on viewport enter
- `ParallaxLayer.tsx` — scroll-driven Y parallax (capped ±60px)
- `StaggerChildren.tsx` — staggered entrance for card grids

**Design token reference** (`app/globals.css`):

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--bg-base` | `#050b14` | Page background |
| `--bg-surface` | `#0d1626` | Card/section fill |
| `--accent-glow` | `#00d4ff` | Buttons, CTAs, links |
| `--gradient-start/mid/end` | `#3b82f6` / `#8b5cf6` / `#06b6d4` | Gradient accents |

To extend the palette, add new CSS variables to `:root {}` and register them in `@theme inline {}` in `globals.css`.

---

## 9. Continuing Development with AI

This project was built with AI assistance and is designed so that **any AI coding tool** can efficiently continue it — Claude Code, Cursor, GitHub Copilot Chat, ChatGPT, Gemini, or whatever is available and free at the time. The method is the same regardless of the tool.

### The Three-Document System

Before touching any code, read these three files in order:

| File | What it tells you |
| :--- | :--- |
| `README.md` | What the project is, how it's built, design philosophy |
| `HANDOVER.md` | How to operate it — infrastructure, security guards, maintenance (this file) |
| `FEATURES.md` | **What's done, what's not, and what to build next** |

`FEATURES.md` is the most important file for continued development. It contains:
- A checkbox registry of every planned feature with completion status
- A session-by-session build plan scoped to avoid AI context limits
- The full Supabase database schema for all tables
- A revision log of decisions made in past sessions

### The Session Workflow (Works with Any AI Tool)

The core idea: **one session = one focused feature area**. This prevents the AI from losing track of what it's doing across a long conversation.

**Step 1 — Orient the AI:**

Paste or share `FEATURES.md` with your AI assistant, then say:
> *"This is the feature roadmap for a Next.js + Supabase department portal. Read it, then let's work on Session N: [title]."*

If the AI has direct file access (e.g. Claude Code, Cursor), just say:
> *"Read FEATURES.md. We're working on Session N: [title]."*

**Step 2 — Work through the session task list.**

Stick to the scope of that session. If you want to add something unrelated, note it as a new item in `FEATURES.md` and handle it in a future session.

**Step 3 — Update `FEATURES.md` after the session.**

The AI (or you) should update the file before closing the conversation:
- Mark completed items `[x]`
- Note anything that changed from the plan
- Add a row to the Revision Log at the top of the file

**Step 4 — Start the next session fresh.**

Open a new chat. Re-share `FEATURES.md`. Repeat.

### Keeping FEATURES.md Accurate

`FEATURES.md` only works if it stays current. Every time a feature is:
- **Completed** → mark `[ ]` as `[x]` and add the route/file path if new
- **Changed** → add a short note under the feature describing what changed and why
- **Descoped or deferred** → mark it `[~]` with a reason so the next developer knows it was deliberate, not forgotten
- **Added (not originally planned)** → add a new entry under the appropriate section

Think of it like a commit message for features — it's the record of what was decided and why.

### What NOT to Ask AI to Do at the Start of a Session

Avoid these patterns regardless of which tool you use — they burn context without producing code:
- *"Review the whole project and tell me what's done"* — point it to `FEATURES.md` instead
- *"Redesign the UI"* without referencing the design system — it will drift from the established palette
- Starting a session without context — the AI will make wrong assumptions about what's already built

---

## 10. Contacts & Ownership

- **Original developer:** Mervin John C. Tampus (mj.tampus.cpe@gmail.com)
- **Supabase project owner:** Must transfer project ownership to future ICpEP webmaster
- **Vercel project owner:** Must transfer via Vercel team or recreate deployment under new account
- **GitHub repository:** Must add new maintainer as collaborator and remove personal access when handing over

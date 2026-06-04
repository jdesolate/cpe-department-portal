# CPE Department Portal — Feature Registry & Session Roadmap

**Goal:** Ship a complete, personality-driven CPE department portal for ~600 students.  
**Timeline:** ASAP (weeks). Prioritize critical public + student features first, admin tools second.  
**Context strategy:** One session = one focused area. Start each Claude Code session by saying *"Let's work on Session N"* and referencing this file to avoid context blowup.

> **For AI-assisted development:** This file is the primary handoff document. Read it before touching code.
> Works with any AI tool — Claude Code, Cursor, ChatGPT, Gemini, or whatever is free and available.
> Start every session by sharing this file and saying: *"Read FEATURES.md. We're working on Session N: [title]."*
> After each session, update checkboxes and add revision notes so the next session starts with accurate context.

### Revision Log

| Date | Session | What changed |
| :--- | :--- | :--- |
| 2026-06-04 | v2.0 redesign | Full dark tech redesign, added Events system, Wheel of Names raffle, animation wrappers |
| 2026-06-04 | Planning | Created this FEATURES.md with session roadmap and full DB schema |
| 2026-06-04 | Session 0 | Auth infrastructure complete: `lib/supabase-server.ts`, `lib/auth.ts`, middleware rewrite (real JWT + `@supabase/ssr`), `/login` magic link page (switched from OAuth — no IT dept needed), `/auth/callback` route with `@cit.edu` domain enforcement, raffle moved to `(admin)` (org_officer/admin only), all DB tables created, all RLS policies applied, migration files recorded in `supabase/migrations/`. |
| 2026-06-04 | Planning | Added P-05 FAQs, P-06 CpE Prospectus, P-07 Alumni Testimonials — all public, all assigned to Session 2. Added A-10/A-11 admin tools for managing them. |
| 2026-06-04 | Session 1 | Admin dashboard shell and announcement CRUD complete. Note: dashboard files placed at `app/admin/` (not `app/(admin)/`) so URL `/admin/dashboard` aligns with middleware's `ADMIN_ROUTES = ['/admin']`. Sidebar client component in `app/admin/_components/AdminSidebar.tsx`. Server actions (create/update/delete/togglePin) in `app/admin/dashboard/announcements/actions.ts` — all call `revalidatePath('/')` so home page feed updates immediately. |

---

## User Groups

| Group | Auth Level | Description |
| :--- | :--- | :--- |
| General public | None | Alumni, parents, applicants, visitors browsing the site |
| Enrolled CpE students | School email magic link | Internal features, event registration, feedback, schedule |
| ICpEP org officers | School email + `org_officer` role | Event management, raffle tool, org content |
| Faculty members | School email + `faculty` role | Profile editing, announcements, moderation |
| Department admin | School email + `admin` role | Full dashboard access |

---

## Feature Registry

### ✅ Already Built (v2.0)

- [x] Dark tech design system (glassmorphism, gradient palette, Tailwind v4)
- [x] Animation system — `FadeInView`, `ParallaxLayer`, `StaggerChildren` (Framer Motion)
- [x] Home page — hero with parallax, announcements, achievement spotlight, freedom wall widget
- [x] Faculty directory — glassmorphism cards (hardcoded data, not yet Supabase-connected)
- [x] Department media carousel
- [x] Freedom wall — public read + authenticated submit (profanity filter edge function needed)
- [x] Events listing page (`/events`)
- [x] Event detail + registration form (`/events/[slug]`) — open & login-required modes
- [x] Wheel of Names raffle (`/raffle`) — facilitator PIN, import from event registrations, confetti  
  > Moved to `app/(admin)/raffle/page.tsx`. URL stays `/raffle` but now requires org_officer or admin role (enforced by middleware).
- [x] `README.md` and `HANDOVER.md` documentation

---

### 🔴 Not Yet Built — Full Feature List

#### Foundation (Required before anything else)

- [x] **F-01** Supabase full schema — create all tables (see schema section below)  
  > All tables created. Migration files recorded in `supabase/migrations/20260604000000_initial_schema.sql`.
- [x] **F-02** Supabase RLS policies — correct public/student/admin read-write rules  
  > All policies applied via `supabase/migrations/20260604000001_rls_policies.sql`. Includes `get_user_role()` helper function.
- [x] **F-03** Login page (`/login`) — institutional email sign-in  
  > Built: `app/(auth)/login/page.tsx`. Changed from Google OAuth to **email magic link** — avoids Microsoft/Google IT admin consent entirely. Domain enforced in `/auth/callback`: non-`@cit.edu` emails are signed out immediately.
- [x] **F-04** Auth middleware — replace mocked check with real Supabase JWT validation  
  > Rewritten in `middleware.ts` using `@supabase/ssr` with real JWT. Domain: `@cit.edu`. Protects student routes (email only), `/raffle` (org_officer/admin), `/admin/*` (any role).
- [x] **F-05** Role system — `user_roles` table + role detection utility  
  > `user_roles` table created with RLS. `lib/auth.ts` exports `getUserRole()`, `hasRole(role)`, `isStudent()`. Assign roles manually in Supabase Table Editor.

#### Public Pages (No login required)

- [ ] **P-01** About page (`/about`) — department history, mission & vision, accreditation, curriculum flowchart
- [ ] **P-02** News listing page (`/news`) — card grid of articles, paginated
- [ ] **P-03** News article detail page (`/news/[slug]`) — full article, author, date, category, share
- [ ] **P-04** Photo / video gallery page (`/gallery`) — grid with lightbox, filterable by category/year
- [ ] **P-05** FAQs page (`/faq`) — common questions from prospective students about the CpE program, admission, career paths, and student life; DB-driven so admin can manage entries without code changes
- [ ] **P-06** CpE Prospectus page (`/prospectus`) — program overview for applicants: curriculum flowchart, career tracks, accreditation, admission requirements; primarily static with optional Supabase-driven sections
- [ ] **P-07** Alumni Testimonials — profiles of CpE graduates in industry (name, batch year, company, role, quote, photo); displayed on `/about` or a dedicated `/alumni` page; DB-driven

#### Student Internal (School email required)

- [ ] **S-01** Department schedule — master timetable for all CpE sections (`/schedule`): subject, section, professor, room, time
- [ ] **S-02** Internal feedback form (`/feedback`) — anonymous-option suggestion box; faculty reads in admin dashboard

#### Admin / Faculty Dashboard

- [x] **A-00** Admin dashboard shell (`/admin/dashboard`) — navigation hub, overview cards  
  > Built: `app/admin/layout.tsx` (sidebar + role guard), `app/admin/dashboard/page.tsx` (stats, recent list, quick actions).
- [x] **A-01** Announcement management (`/admin/dashboard/announcements`) — create, edit, pin, set expiry, delete, categorize  
  > Built: server actions in `app/admin/dashboard/announcements/actions.ts`, client CRUD in `AnnouncementsManager.tsx`. URL changed to `/admin/dashboard/announcements` (nested under dashboard) vs original `/admin/announcements`.
- [ ] **A-02** Event management (`/admin/events`) — create/edit/delete events, view registrations, export CSV attendance list
- [ ] **A-03** Freedom wall moderation (`/admin/moderation`) — review queue: approve/reject submitted posts
- [ ] **A-04** File & resource management (`/admin/resources`) — upload PDFs (forms, syllabi, schedules), manage public download links
- [ ] **A-05** Gallery management (`/admin/gallery`) — upload photos/videos, set categories, reorder
- [ ] **A-06** News / article editor (`/admin/news`) — rich-text or markdown-based article creation and editing
- [ ] **A-07** Schedule management (`/admin/schedule`) — input and update the department-wide class schedule
- [ ] **A-08** Faculty profile editor (`/admin/profile-edit`) — faculty edits their own bio, photo, research interests, consultation hours
- [ ] **A-09** Feedback viewer (`/admin/feedback`) — read-only list of student feedback submissions
- [ ] **A-10** FAQ management (`/admin/faqs`) — create, edit, reorder, and publish FAQ entries by category
- [ ] **A-11** Testimonial management (`/admin/testimonials`) — add/edit alumni testimonial cards (name, batch, company, role, quote, photo URL), publish/unpublish

#### Student-Accessible Resources

- [ ] **R-01** Resources / downloads page (`/resources`) — public or student-gated page listing department files (forms, syllabi, guides)

#### Faculty Profiles (Full version)

- [ ] **FP-01** Connect faculty directory to Supabase (remove hardcoded data)
- [ ] **FP-02** Individual faculty profile pages (`/faculty/[slug]`) — full bio, publications, consultation schedule, linked achievements

---

## Session Breakdown

Each session is scoped to avoid context overload. Paste this file into the chat at the start of each session.

---

### SESSION 0 — Foundation & Auth ✅ COMPLETE
**Goal:** Get auth working and all database tables created. Nothing else works without this.

**Tasks:**
1. [x] Run all `CREATE TABLE` SQL in Supabase — all tables created, recorded in `supabase/migrations/`
2. [x] Add all RLS policies — applied via SQL Editor, recorded in `supabase/migrations/`
3. [x] Build `/login` page — email magic link (switched from OAuth; no IT admin needed)
4. [x] Fix `middleware.ts` — real `@supabase/ssr` JWT validation, `@cit.edu` domain enforcement
5. [x] Add role detection utility — `lib/auth.ts` + `lib/supabase-server.ts`
6. [x] Move raffle to `(admin)` route group — org_officer/admin only, URL stays `/raffle`

**Features:** F-01 through F-05  
**Files created/edited:** `app/(auth)/login/page.tsx`, `app/auth/callback/route.ts`, `middleware.ts`, `lib/auth.ts`, `lib/supabase-server.ts`, `app/(admin)/raffle/page.tsx`, `supabase/migrations/`

---

### SESSION 1 — Announcement Management (Admin) ✅ COMPLETE
**Goal:** Faculty can create and manage public bulletins from the portal.

**Tasks:**
1. [x] Build admin dashboard shell (`/admin/dashboard`) — sidebar nav, role guard
2. [x] Build announcement CRUD (`/admin/dashboard/announcements`) — form, list, pin toggle, expiry date, category select, delete
3. [x] Verified announcements appear on the home page feed (home page feed unchanged, `revalidatePath('/')` called on every mutation)

**Features:** A-00, A-01  
**Files:** `app/admin/layout.tsx`, `app/admin/_components/AdminSidebar.tsx`, `app/admin/dashboard/page.tsx`, `app/admin/dashboard/announcements/page.tsx`, `app/admin/dashboard/announcements/actions.ts`, `app/admin/dashboard/announcements/AnnouncementsManager.tsx`

---

### SESSION 2 — Public Content: About, News, FAQs & Testimonials
**Goal:** The site has real content for both current students and prospective applicants.

**Tasks:**
1. Build `/about` — department history, mission/vision, accreditation, curriculum overview; include alumni testimonials section (fetched from `testimonials` table)
2. Build `/prospectus` — static-first page for applicants: curriculum flowchart, career tracks, admission requirements
3. Build `/faq` — FAQ listing fetched from `faqs` table, grouped by category, accordion UI
4. Build `/news` listing — card grid fetched from Supabase `news` table, paginated
5. Build `/news/[slug]` detail — full article, author, date, category
6. Build `/admin/news` — create/edit articles with markdown or textarea
7. Build `/admin/faqs` — CRUD for FAQ entries, drag-to-reorder or sort_order field
8. Build `/admin/testimonials` — add/edit alumni testimonial cards

**Features:** P-01, P-02, P-03, P-05, P-06, P-07, A-06, A-10, A-11  
**Files:** `app/(public)/about/page.tsx`, `app/(public)/prospectus/page.tsx`, `app/(public)/faq/page.tsx`, `app/(public)/news/`, `app/(admin)/dashboard/news/`, `app/(admin)/dashboard/faqs/`, `app/(admin)/dashboard/testimonials/`  
**New DB tables needed (add to Supabase before session):** `faqs`, `testimonials` — see schema section below

---

### SESSION 3 — Photo / Video Gallery
**Goal:** Department events and lab photos are showcased.

**Tasks:**
1. Set up Supabase Storage bucket for gallery media
2. Build `/gallery` — masonry or grid layout, lightbox on click, filter by category/year
3. Build `/admin/gallery` — upload form (drag-and-drop), set category, delete

**Features:** P-04, A-05  
**Files:** `app/(public)/gallery/page.tsx`, `app/(admin)/dashboard/gallery/`

---

### SESSION 4 — Event Management (Admin)
**Goal:** Org officers and faculty can fully manage events from the portal.

**Tasks:**
1. Build `/admin/events` — list all events, create/edit/delete with full form
2. Event registration viewer — see who registered, show count vs capacity
3. Export registrations as CSV (download button)
4. Verify events show on `/events` listing correctly

**Features:** A-02  
**Files:** `app/(admin)/dashboard/events/`, CSV export utility

---

### SESSION 5 — Freedom Wall Moderation
**Goal:** Posts go through an approval queue before appearing publicly.

**Tasks:**
1. Build `/admin/moderation` — pending posts list (approve/reject buttons)
2. Wire up the Supabase Edge Function for AI profanity filtering (or simple word-list filter)
3. Test the full flow: submit → pending → approve → appears on live wall
4. Add "reported" flag so users can flag posts for review

**Features:** A-03  
**Files:** `app/(admin)/dashboard/moderation/page.tsx`, Supabase Edge Function

---

### SESSION 6 — File Resources
**Goal:** Students can download department forms, syllabi, and guides.

**Tasks:**
1. Set up Supabase Storage bucket for documents
2. Build `/resources` — public page listing downloadable files by category (Forms, Syllabi, Guidelines)
3. Build `/admin/resources` — upload files, set name/category/visibility, delete

**Features:** R-01, A-04  
**Files:** `app/(public)/resources/page.tsx`, `app/(admin)/dashboard/resources/`

---

### SESSION 7 — Department Schedule
**Goal:** Students can look up the full department class schedule for the semester.

**Tasks:**
1. Build `/schedule` — timetable or list view: filter by section, professor, or room; mobile-responsive
2. Build `/admin/schedule` — input or bulk-import class schedule data

**Features:** S-01, A-07  
**Files:** `app/(public)/schedule/page.tsx` (protected — school email), `app/(admin)/dashboard/schedule/`

---

### SESSION 8 — Student Feedback
**Goal:** Students can submit private suggestions/concerns to the department.

**Tasks:**
1. Build `/feedback` — authenticated form (optional anonymous toggle), category select (academic, facilities, org, other), text area
2. Build `/admin/feedback` — read-only list view for faculty, mark as read, filter by category

**Features:** S-02, A-09  
**Files:** `app/(student)/feedback/page.tsx`, `app/(admin)/dashboard/feedback/`

---

### SESSION 9 — Faculty Profiles (Full)
**Goal:** Faculty directory is database-driven and each professor has a full profile page.

**Tasks:**
1. Create `faculty` table in Supabase and migrate hardcoded data
2. Update `/faculty` page to fetch from Supabase
3. Build `/faculty/[slug]` — full profile: bio, photo, research interests, linked achievements, consultation schedule
4. Build `/admin/profile-edit` — faculty edits their own row (RLS-protected, only their record)

**Features:** FP-01, FP-02, A-08  
**Files:** `app/(public)/faculty/page.tsx` (update), `app/(public)/faculty/[slug]/page.tsx`, `app/(admin)/dashboard/profile-edit/`

---

### SESSION 10 — Polish, Mobile Audit & Launch
**Goal:** Everything works, looks right on mobile, and is ready to share.

**Tasks:**
1. Audit every page on mobile (375px) — fix overflow, spacing, truncation
2. Run Lighthouse on home, events, faculty — fix any score < 90 on Performance
3. Add `loading.tsx` skeleton screens for slow Supabase fetches
4. Add `error.tsx` boundary pages for each route group
5. Add `not-found.tsx` for 404 pages
6. Final content pass — replace placeholder text, update faculty names, add real announcements
7. Verify Vercel production deploy works end-to-end
8. Share URL 🎉

---

## Database Schema Reference

> **Session 0 tables are already created and recorded in `supabase/migrations/`.** Only run the new tables below when their session begins.

### New Tables — Run before Session 2

```sql
-- FAQs (P-05, A-10)
CREATE TABLE faqs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question     TEXT NOT NULL,
  answer       TEXT NOT NULL,
  category     TEXT DEFAULT 'General',  -- Admission, Curriculum, Career, Student Life, General
  sort_order   INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Alumni Testimonials (P-07, A-11)
CREATE TABLE testimonials (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  batch_year   TEXT,
  company      TEXT,
  role         TEXT,
  quote        TEXT NOT NULL,
  photo_url    TEXT,
  linkedin_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

### Session 0 Tables (already created — for reference only)

```sql
-- News / Articles
CREATE TABLE news (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT,
  category    TEXT DEFAULT 'General',
  author_id   UUID REFERENCES auth.users(id),
  cover_url   TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Gallery Items
CREATE TABLE gallery_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_url   TEXT NOT NULL,
  media_type  TEXT CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  caption     TEXT,
  category    TEXT,
  taken_at    DATE,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Department Schedule
CREATE TABLE schedules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject     TEXT NOT NULL,
  section     TEXT NOT NULL,
  professor   TEXT,
  room        TEXT,
  day_of_week TEXT,     -- Mon, Tue, Wed, Thu, Fri, Sat
  time_start  TIME,
  time_end    TIME,
  semester    TEXT,     -- e.g. '1st Sem 2025-2026'
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Student Feedback
CREATE TABLE feedback (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content     TEXT NOT NULL,
  category    TEXT DEFAULT 'General',  -- academic, facilities, org, other
  is_anonymous BOOLEAN DEFAULT false,
  user_id     UUID REFERENCES auth.users(id),
  is_read     BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Downloadable Resources
CREATE TABLE resources (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  category    TEXT DEFAULT 'Forms',   -- Forms, Syllabi, Guidelines, Other
  is_public   BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- User Roles (for admin/faculty/org_officer)
CREATE TABLE user_roles (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role    TEXT CHECK (role IN ('admin', 'faculty', 'org_officer')) NOT NULL
);

-- Faculty (full profile, replaces hardcoded data)
CREATE TABLE faculty (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  designation      TEXT,
  email            TEXT,
  specialization   TEXT,
  consultation     TEXT,
  bio              TEXT,
  photo_url        TEXT,
  research_interests TEXT[],
  user_id          UUID REFERENCES auth.users(id),
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- Events & Registrations (already defined, listed here for completeness)
-- See README.md for events + event_registrations SQL
```

---

## Priority Order (ASAP Timeline)

```
Week 1:
✅ DONE  Session 0  — Foundation + Auth
✅ DONE  Session 1  — Announcement Management       (highest daily-use feature)
Week 2:  Session 2  — About, News, FAQs, Testimonials, Prospectus
Week 2:  Session 4  — Event Management              (org officers need this ASAP)
Week 3:  Session 5  — Freedom Wall Moderation       (safety requirement)
Week 3:  Session 6  — File Resources                (forms + syllabi distribution)
Week 4:  Session 3  — Gallery                       (nice to have, but quick win)
Week 4:  Session 7  — Department Schedule           (student utility)
Week 5:  Session 8  — Feedback                      (student utility)
Week 5:  Session 9  — Faculty Profiles Full         (polish)
Week 6:  Session 10 — Polish + Launch               (ship it)
```

---

## How to Use This File in Sessions

This workflow is tool-agnostic — use it with Claude Code, Cursor, ChatGPT, Gemini, GitHub Copilot Chat, or any AI assistant available to you.

**At the start of each session:**

1. Share or paste this file to your AI assistant
2. Say: **"Read FEATURES.md. We're working on Session N: [title]."**
3. The AI reads the session plan, understands what's already built, and proceeds — no full codebase re-exploration needed
4. Work through the session task list, staying scoped to that session

**After each session, update this file:**
- Mark completed tasks `[x]` in the Feature Registry
- If a feature changed from the original plan, add a short note under it
- If a feature was deferred, mark it `[~]` with a reason
- Add a row to the **Revision Log** table at the top of this file

**Checkpoint habit:** If a session runs long before finishing, stop at a logical sub-task boundary. Start the next session with: *"We partially completed Session N last time — [describe what's done]. Continue from [next task]."*

**If the AI has no file access** (e.g. a web chat tool): paste the relevant session block directly into the chat along with key context like the tech stack and any relevant component names.

**What the status markers mean:**

| Marker | Meaning |
| :--- | :--- |
| `[ ]` | Not started |
| `[x]` | Completed |
| `[~]` | Deferred or descoped (add a note explaining why) |
| `[>]` | In progress / partially done |

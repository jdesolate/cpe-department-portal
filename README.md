# 🌐 Computer Engineering Department Portal

A high-performance, responsive web portal engineered for a University Computer Engineering (CpE) Department serving 500–600 active students. This platform serves as a centralized digital hub, bridging the gap between official academic administration and vibrant student culture.

Built using **Next.js 14+ (App Router)** and **Supabase**, this architecture uses an institutional email-gated authentication ecosystem requiring zero manual user registration for students, running entirely within free-tier cloud constraints.

---

## 🛠️ Tech Stack & Hosting Architecture

- **Frontend Framework:** Next.js 14+ (App Router) with Tailwind CSS
- **Backend-as-a-Service:** Supabase (PostgreSQL)
- **Real-Time Layer:** Supabase Realtime (WebSockets via PostgreSQL Replication)
- **Authentication:** Supabase Auth via Google/Microsoft OAuth
- **Storage:** Supabase Object Storage (for Faculty Headshots & Achievement Media)
- **Deployment & Hosting:** Vercel (Frontend Serverless/Edge Hosting) & Supabase Cloud (Database & Edge Functions)
- **Cost Efficiency:** 100% Free-Tier Compliant (Zero operational budget required)

---

## 🔑 Key Features & Access Matrix

The system structurally segregates public data from internal communications using Next.js Middleware to enforce institutional domain checks (e.g., `@youruniversity.edu.ph`).

| Feature | Public Access (No Login) | Private Access (School Email Required) |
| :--- | :--- | :--- |
| **Landing Page Portal** | View Hero branding, Public Announcements, and Achievements. | Accesses protected layout features, secure internal updates, and action components. |
| **Announcements** | View general public notices, academic events, and job fairs. | View internal administrative memos, exam schedules, and room modifications. |
| **Achievements** | View permanent historical archive of student/faculty wins. | *N/A (Always Public)* |
| **Faculty Profiles** | View public biographies, research papers, and contact emails. | View real-time consultation hours and internal contact info. |
| **Freedom Wall** | View a read-only stream of dynamically updating approved posts. | Access the submission form to post anonymously to the wall. |

---

## ⚙️ Core Component Business Logic

### 1. High-Scale Architecture (500-600 Students)
- **Static Site Generation (SSG) & Caching:** Public-facing directories (Faculty, Achievements) use Next.js Incremental Static Regeneration (`ISR`). Pages are served as raw HTML directly from Vercel's global Edge CDN, protecting the database from choking under high traffic spikes (e.g., enrollment weeks).
- **Real-time Synchronization:** The Freedom Wall UI utilizes lightweight WebSockets via Supabase Realtime. New posts stream to active browser sessions instantly without requiring manual page refreshes or continuous database polling.

### 2. Announcements & Achievements Engine
- **Announcements:** Governed by a priority pinning flag (`is_pinned`), categorization tags, and an automated lifecycle engine (`expires_at`). Expired notices are filtered out of the active client feeds automatically.
- **Achievements:** Permanent promotional records. They do not expire and are indexed by Academic Year (e.g., `2025-2026`) to support institutional accreditation audits.

### 3. Integrated Faculty Portfolios (`/faculty/[slug]`)
- Fully relational database layout. Faculty data tables link directly to the `achievements` table via a PostgreSQL junction table (`faculty_achievements`). Selecting an achievement dynamically traces back to involved faculty records, and vice versa.

### 4. Freedom Wall (Accountable Anonymity)
- **AI Moderation Gate:** Incoming string inputs pass through a Supabase Edge Function hitting a text-moderation filter before hitting the database, automatically filtering out hard profanity, spam, or explicit toxicity.
- **Accountable Anonymity:** Submissions mask user profiles completely from public views, student views, and peers. However, the database securely records the author's encrypted `user_id` in a hidden column. This exists strictly as an administrative fallback safety valve to address severe institutional code-of-conduct or legal incidents.

---

## 📁 Repository Directory Map

```text
src/app/
│
├── (public)/                 # Public routes (Cached on CDN, No Auth Required)
│   ├── page.tsx              # Portal Home Dashboard (Announcements, Achievements, Wall Widget)
│   ├── faculty/
│   │   ├── page.tsx          # Faculty Directory Card grid
│   │   └── [slug]/page.tsx   # Integrated Faculty Portfolio deep-page
│   └── achievements/
│       └── page.tsx          # Historical Wins timeline
│
├── (auth)/                   # Authentication handlers
│   └── login/page.tsx        # School Email OAuth entry screen
│
├── (student)/                # Domain-Protected Student paths (Middleware Gated)
│   └── freedom-wall/
│       └── submit/page.tsx   # Safe post submission page with moderation hook
│
└── (admin)/                  # Role-Protected Administrative Dashboards
    └── dashboard/
        ├── page.tsx          # Shared management hub (ICpEP editors & Faculty)
        ├── announcements/    # Manage announcement lifecycles and pinning
        ├── profile-edit/     # Isolated faculty profile row editor (RLS Protected)
        └── moderation/       # Freedom Wall manual post-moderation dashboard
        
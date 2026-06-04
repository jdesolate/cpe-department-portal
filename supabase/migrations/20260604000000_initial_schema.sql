-- =============================================================
-- Migration: Initial Schema
-- Date: 2026-06-04
-- Description: All tables for the CPE Department Portal.
--   Run in Supabase SQL Editor (already applied to the project).
-- =============================================================


-- -------------------------------------------------------------
-- PRE-EXISTING TABLES (created before v2.0)
-- -------------------------------------------------------------

CREATE TABLE announcements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT,
  category    TEXT DEFAULT 'General',
  is_pinned   BOOLEAN DEFAULT false,
  is_private  BOOLEAN DEFAULT false,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE achievements (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  academic_year TEXT,
  image_url     TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- status: 'pending' → moderation queue, 'approved' → visible, 'rejected' → hidden
-- user_id is stored for audit/accountability but never displayed publicly
CREATE TABLE freedom_wall (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content    TEXT NOT NULL,
  status     TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  user_id    UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);


-- -------------------------------------------------------------
-- v2.0 TABLES (events system)
-- -------------------------------------------------------------

CREATE TABLE events (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  description       TEXT,
  event_date        TIMESTAMPTZ,
  location          TEXT,
  capacity          INT,
  registration_type TEXT CHECK (registration_type IN ('open', 'login_required')) DEFAULT 'open',
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now()
);

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


-- -------------------------------------------------------------
-- SESSION 0 TABLES (auth + content system)
-- -------------------------------------------------------------

CREATE TABLE news (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  content      TEXT,
  category     TEXT DEFAULT 'General',
  author_id    UUID REFERENCES auth.users(id),
  cover_url    TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now()
);

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

CREATE TABLE schedules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject     TEXT NOT NULL,
  section     TEXT NOT NULL,
  professor   TEXT,
  room        TEXT,
  day_of_week TEXT,
  time_start  TIME,
  time_end    TIME,
  semester    TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE feedback (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content      TEXT NOT NULL,
  category     TEXT DEFAULT 'General',
  is_anonymous BOOLEAN DEFAULT false,
  user_id      UUID REFERENCES auth.users(id),
  is_read      BOOLEAN DEFAULT false,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE resources (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  category    TEXT DEFAULT 'Forms',
  is_public   BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_roles (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role    TEXT CHECK (role IN ('admin', 'faculty', 'org_officer')) NOT NULL
);

CREATE TABLE faculty (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               TEXT UNIQUE NOT NULL,
  name               TEXT NOT NULL,
  designation        TEXT,
  email              TEXT,
  specialization     TEXT,
  consultation       TEXT,
  bio                TEXT,
  photo_url          TEXT,
  research_interests TEXT[],
  user_id            UUID REFERENCES auth.users(id),
  created_at         TIMESTAMPTZ DEFAULT now()
);

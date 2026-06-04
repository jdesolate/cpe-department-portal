-- =============================================================
-- Migration: Row Level Security Policies
-- Date: 2026-06-04
-- Description: Enable RLS and add access policies for all tables.
--   Run after 20260604000000_initial_schema.sql.
--   Already applied to the project.
-- =============================================================


-- -------------------------------------------------------------
-- Helper: resolve the current user's role from user_roles table
-- Used by all policies below — must run first
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid()
$$;


-- -------------------------------------------------------------
-- ANNOUNCEMENTS
-- -------------------------------------------------------------
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read announcements" ON announcements
  FOR SELECT USING (is_private = false);

CREATE POLICY "admin faculty manage announcements" ON announcements
  FOR ALL USING (public.get_user_role() IN ('admin', 'faculty'));


-- -------------------------------------------------------------
-- ACHIEVEMENTS
-- -------------------------------------------------------------
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read achievements" ON achievements
  FOR SELECT USING (true);

CREATE POLICY "admin manage achievements" ON achievements
  FOR ALL USING (public.get_user_role() = 'admin');


-- -------------------------------------------------------------
-- FREEDOM WALL
-- -------------------------------------------------------------
ALTER TABLE freedom_wall ENABLE ROW LEVEL SECURITY;

-- Public sees only approved posts
CREATE POLICY "public read approved posts" ON freedom_wall
  FOR SELECT USING (status = 'approved');

-- Authenticated users can submit (status defaults to 'pending')
CREATE POLICY "authenticated submit post" ON freedom_wall
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Admin/faculty can read all (including pending/rejected) for moderation
CREATE POLICY "admin faculty read all posts" ON freedom_wall
  FOR SELECT USING (public.get_user_role() IN ('admin', 'faculty'));

-- Admin/faculty can update status (approve/reject)
CREATE POLICY "admin faculty moderate posts" ON freedom_wall
  FOR UPDATE USING (public.get_user_role() IN ('admin', 'faculty'));


-- -------------------------------------------------------------
-- EVENTS
-- -------------------------------------------------------------
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read active events" ON events
  FOR SELECT USING (is_active = true);

CREATE POLICY "admin org_officer manage events" ON events
  FOR ALL USING (public.get_user_role() IN ('admin', 'org_officer'));


-- -------------------------------------------------------------
-- EVENT REGISTRATIONS
-- -------------------------------------------------------------
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can register" ON event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "read registrations" ON event_registrations
  FOR SELECT USING (
    user_id = auth.uid()
    OR public.get_user_role() IN ('admin', 'org_officer')
  );

CREATE POLICY "admin org_officer delete registrations" ON event_registrations
  FOR DELETE USING (public.get_user_role() IN ('admin', 'org_officer'));


-- -------------------------------------------------------------
-- NEWS
-- -------------------------------------------------------------
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read news" ON news
  FOR SELECT USING (
    is_published = true
    OR public.get_user_role() IN ('admin', 'faculty')
  );

CREATE POLICY "admin faculty manage news" ON news
  FOR ALL USING (public.get_user_role() IN ('admin', 'faculty'));


-- -------------------------------------------------------------
-- GALLERY
-- -------------------------------------------------------------
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read gallery" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "admin manage gallery" ON gallery_items
  FOR ALL USING (public.get_user_role() IN ('admin', 'faculty'));


-- -------------------------------------------------------------
-- SCHEDULES
-- -------------------------------------------------------------
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated read schedules" ON schedules
  FOR SELECT USING (
    (auth.uid() IS NOT NULL AND is_active = true)
    OR public.get_user_role() = 'admin'
  );

CREATE POLICY "admin manage schedules" ON schedules
  FOR ALL USING (public.get_user_role() = 'admin');


-- -------------------------------------------------------------
-- FEEDBACK
-- -------------------------------------------------------------
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated submit feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "read feedback" ON feedback
  FOR SELECT USING (
    (user_id = auth.uid() AND is_anonymous = false)
    OR public.get_user_role() IN ('admin', 'faculty')
  );

CREATE POLICY "admin faculty mark feedback read" ON feedback
  FOR UPDATE USING (public.get_user_role() IN ('admin', 'faculty'));


-- -------------------------------------------------------------
-- RESOURCES
-- -------------------------------------------------------------
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read resources" ON resources
  FOR SELECT USING (
    is_public = true
    OR auth.uid() IS NOT NULL
  );

CREATE POLICY "admin manage resources" ON resources
  FOR ALL USING (public.get_user_role() = 'admin');


-- -------------------------------------------------------------
-- USER ROLES
-- -------------------------------------------------------------
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own role" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "admins manage roles" ON user_roles
  FOR ALL USING (public.get_user_role() = 'admin');


-- -------------------------------------------------------------
-- FACULTY PROFILES
-- -------------------------------------------------------------
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read faculty" ON faculty
  FOR SELECT USING (true);

CREATE POLICY "faculty update own profile" ON faculty
  FOR UPDATE USING (
    user_id = auth.uid()
    AND public.get_user_role() = 'faculty'
  );

CREATE POLICY "admin manage faculty" ON faculty
  FOR ALL USING (public.get_user_role() = 'admin');

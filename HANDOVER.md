# 📄 System Handover & Operational Continuity Manual
**Project Name:** Computer Engineering Department Digital Portal  
**Original Developer:** Mervin John C. Tampus  
**Target Handover Date:** 2027  
**Architecture Classification:** Next.js Serverless + Supabase (PostgreSQL BaaS)

---

## 1. Executive Summary & Intent
This application was engineered independently to serve as an authoritative content management portal for the Computer Engineering Department, combined with a secure micro-community platform managed by the local ICpEP Student Organization. 

The primary structural goal of this codebase is **zero-maintenance system permanence**. It utilizes modern serverless infrastructure designed to scale up to 600+ concurrent student sessions running entirely inside a zero-cost infrastructure budget (Vercel Free Tier & Supabase Free Tier).

---

## 2. Infrastructure Dependecy Registry
To ensure the platform does not decay over time, future maintainers must manage access to the following two cloud control consoles:

### A. Supabase Console (Database & Auth Platform)
- **Engine Type:** Managed PostgreSQL Instance.
- **Critical Configuration:** Row Level Security (RLS) is strictly enforced at the database schema layer.
- **Identity Provider:** Handles institutional OAuth logins. If the school modifies its Google or Microsoft Workspace client keys, update the credentials in the `Authentication -> Providers` section of the Supabase dashboard.

### B. Vercel Console (Hosting Environment)
- **Engine Type:** Next.js Serverless/Edge Hosting.
- **Continuous Deployment:** Connected directly to the `main` branch of the official GitHub repository. Pushing changes to the repository triggers automated testing builds and instantaneous global production deployment.

---

## 3. Core Architectural Guards & Security Policy

### A. Data Isolation Policy (Public vs. Private)
Data visibility is decoupled using conditional routing blocks and Next.js Edge Middleware. Maintainers must never expose operational administrative data on routes outside the protected scopes. The application dynamically scans incoming JWT tokens issued by Supabase Auth:
- Valid emails containing the school domain allow full client entry.
- Invalid or unauthenticated inputs are instantly intercepted at the runtime boundary and forced backward to the landing route.

### B. Freedom Wall System Philosophy (Accountable Anonymity)
To balance student expression with department compliance, the Freedom Wall operates on an *Accountable Anonymity* pattern:
1. **Frontend:** Displays content fully sanitized of profile metadata. No user details are ever rendered to peer clients.
2. **Backend Engine:** Automatically signs incoming text inputs through a Supabase Edge Function running light profanity arrays.
3. **Database Audit Trail:** Automatically links the authenticated `auth.uid()` to a hidden, encrypted column `user_id`. In extreme events violating criminal laws or campus safety regulations, the System Admin can trace post ownership back to the origin email profile. **Do not remove this database guard.**

---

## 4. Routine Maintenance Checklists

### A. Annual Database Sanitation
To ensure the Supabase project stays well underneath the free 500MB PostgreSQL ceiling, the student webmaster should run this SQL query via the Supabase SQL Editor once every academic semester to clear out heavy residual data logs from the Freedom Wall:
```sql
-- Drops freedom wall history older than 60 days to save space
DELETE FROM freedom_wall 
WHERE created_at < NOW() - INTERVAL '60 days';

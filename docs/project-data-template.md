# Student Project Data Template

How to add a project to the department website. This is the format instructors and students
fill in for each project. Projects live in `apps/landing/lib/projects.ts` and are rendered by
the Featured Projects section (and, later, the full Project Showcase and Gearfolio portfolios —
the same entry is reused everywhere, so fill it in once).

## Fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | Stable, unique, kebab-case (e.g. `campus-navigator`). Becomes the detail-page URL later — don't rename after publishing. |
| `title` | yes | The project name. |
| `description` | yes | 1–3 sentences: what it does and the problem it solves. State only what's verifiable. |
| `course` | yes | Course code: `MSAD`, `SD1`, `SD2`, `SD3`, `Embedded Systems`, or `Capstone`. Drives the course filter. |
| `academicYear` | no | e.g. `2024-2025`. |
| `teamMembers` | yes | List of student names. |
| `technologies` | yes | Stack/tools, e.g. `["React Native", "Firebase"]`. |
| `screenshot` | no | Image path under `apps/landing/public` (e.g. `/projects/campus-navigator.png`) or a URL. Omit to show a "screenshot coming soon" placeholder. Prefer 16:9, ~1280×720, WebP or PNG. |
| `githubUrl` | no | Public repository link. |
| `srsUrl` | no | Software Requirements Specification (PDF or doc link). |
| `presentationUrl` | no | Defense/pitch slides. |
| `featured` | no | `true` surfaces it in the homepage Featured section. |
| `isSample` | no | `true` marks placeholder seed data. Remove it (or set `false`) once the entry holds real details. |

## Adding a project

1. Add a screenshot to `apps/landing/public/projects/` (optional but recommended).
2. Append an object to `PROJECTS` in `apps/landing/lib/projects.ts`:

```ts
{
  id: "your-project-slug",
  title: "Your Project Title",
  description: "One to three sentences on what it does and the problem it solves.",
  course: "MSAD",
  academicYear: "2024-2025",
  teamMembers: ["First Last", "First Last"],
  technologies: ["Next.js", "Supabase"],
  screenshot: "/projects/your-project-slug.png",
  githubUrl: "https://github.com/org/repo",
  featured: true,
},
```

3. Commit. The homepage picks it up automatically.

## Notes

- Do not publish unverifiable claims (awards, rankings). Describe what the project *is* and *does*.
- Only `featured: true` projects appear on the homepage; the rest are reserved for the full
  showcase page (future).
- Long term this data is expected to move to a database (Supabase) so instructors can add
  projects without code changes. Until then, this file is the source of truth.

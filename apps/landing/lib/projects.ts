// Single source of truth for student project data.
// The Featured Projects section reads from here today; the same schema is intended to
// back the full Project Showcase and to feed Gearfolio student portfolios later, so a
// project is entered once and surfaces everywhere. See docs/project-data-template.md.

export type Project = {
  // Stable unique id (kebab-case). Used as React key and future detail-page slug.
  id: string;
  title: string;
  // 1-3 sentences: what it does and the problem it solves. Avoid unverifiable claims.
  description: string;
  // Course code the project was produced in, e.g. "MSAD", "SD1", "SD2", "SD3",
  // "Embedded Systems", "Capstone". Drives the course filter.
  course: string;
  academicYear?: string; // e.g. "2024-2025"
  teamMembers: string[];
  technologies: string[];
  // Path to an image under /public (e.g. "/projects/campus-navigator.png") or a remote
  // URL. Omit to render a "screenshot coming soon" placeholder.
  screenshot?: string;
  githubUrl?: string;
  srsUrl?: string;
  presentationUrl?: string;
  // Surface this project in the homepage Featured section.
  featured?: boolean;
  // Placeholder seed data — set false / remove once real project details are filled in.
  isSample?: boolean;
};

// SAMPLE DATA — replace with real MSAD projects (see docs/project-data-template.md).
// These are clearly flagged as samples (isSample) so they cannot be mistaken for real
// department output while the section is being reviewed.
export const PROJECTS: Project[] = [
  {
    id: "campus-navigator",
    title: "Campus Navigator",
    description:
      "A mobile wayfinding app that helps new students find rooms, offices, and labs across campus using an indoor map and step-by-step directions.",
    course: "MSAD",
    academicYear: "2024-2025",
    teamMembers: ["J. Dela Cruz", "M. Santos", "R. Reyes"],
    technologies: ["React Native", "Firebase", "Google Maps API"],
    featured: true,
    isSample: true,
  },
  {
    id: "labqueue",
    title: "LabQueue",
    description:
      "A lab equipment reservation system that lets students book microcontroller kits and workstations, and lets staff track availability in real time.",
    course: "MSAD",
    academicYear: "2024-2025",
    teamMembers: ["A. Torres", "K. Lim", "P. Gonzales"],
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    featured: true,
    isSample: true,
  },
  {
    id: "agrisense-dashboard",
    title: "AgriSense Dashboard",
    description:
      "An IoT dashboard that visualizes soil moisture and temperature from field sensors, giving small farms an at-a-glance view of crop conditions.",
    course: "MSAD",
    academicYear: "2024-2025",
    teamMembers: ["D. Aquino", "S. Bautista", "L. Navarro"],
    technologies: ["React", "Node.js", "MQTT", "Chart.js"],
    featured: true,
    isSample: true,
  },
];

// Projects to show in the homepage Featured section, newest-course-first as authored.
export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((p) => p.featured);

// Central registry of department tools shown on the landing hub.
// Add new tools here; URLs come from env so each one can be wired up as it ships.

export type ServiceStatus = "live" | "coming-soon";
export type ServiceCategory = "Academics" | "Career" | "Research" | "Department";

export interface Service {
  title: string;
  body: string;
  href: string;
  cta: string;
  category: ServiceCategory;
  status: ServiceStatus;
  icon: React.ReactNode;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-6 h-6",
} as const;

export const SERVICES: Service[] = [
  {
    title: "Datagrades",
    body: "Grade viewing and academic records for Computer Engineering students.",
    href: process.env.NEXT_PUBLIC_DATAGRADES_URL ?? "https://www.data-grades.com/",
    cta: "Open Datagrades",
    category: "Academics",
    status: "live",
    icon: (
      <svg {...iconProps}>
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" />
        <rect x="12" y="8" width="3" height="10" />
        <rect x="17" y="5" width="3" height="13" />
      </svg>
    ),
  },
  {
    title: "Contrib",
    body: "Track individual contributions across group projects and org work.",
    href: process.env.NEXT_PUBLIC_CONTRIB_URL ?? "https://contribio.web.app/",
    cta: "Open Contrib",
    category: "Academics",
    status: "live",
    icon: (
      <svg {...iconProps}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Gearfolio",
    body: "The official student portfolio repository — build your profile, showcase projects, and export a resume.",
    href: process.env.NEXT_PUBLIC_GEARFOLIO_URL ?? "https://gearfolio-v2.vercel.app/",
    cta: "Open Gearfolio",
    category: "Career",
    status: "live",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Research Portal",
    body: "Browse and search the department's published research outputs.",
    href: process.env.NEXT_PUBLIC_RESEARCH_PORTAL_URL ?? "#",
    cta: "Browse Research",
    category: "Research",
    status: process.env.NEXT_PUBLIC_RESEARCH_PORTAL_URL ? "live" : "coming-soon",
    icon: (
      <svg {...iconProps}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Internal Portal",
    body: "Faculty announcements and department tools for students, org officers, and faculty.",
    // Not publicly deployed yet — show "Coming soon" until the internal app has a live URL.
    href: "#",
    cta: "Enter Portal",
    category: "Department",
    status: "coming-soon",
    icon: (
      <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

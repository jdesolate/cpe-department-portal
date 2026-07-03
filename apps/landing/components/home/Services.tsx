import TraceDivider from "@/components/ui/TraceDivider";

interface Service {
  title: string;
  body: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
}

// Service URLs come from env so each tool can be wired up independently as it ships.
const SERVICES: Service[] = [
  {
    title: "Datagrades",
    body: "Grade viewing and academic records for Computer Engineering students.",
    href: process.env.NEXT_PUBLIC_DATAGRADES_URL ?? "#",
    cta: "Open Datagrades",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" />
        <rect x="12" y="8" width="3" height="10" />
        <rect x="17" y="5" width="3" height="13" />
      </svg>
    ),
  },
  {
    title: "Research Portal",
    body: "Browse and search the department's published research outputs.",
    href: process.env.NEXT_PUBLIC_RESEARCH_PORTAL_URL ?? "#",
    cta: "Browse Research",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Gearfolio",
    body: "The official student portfolio repository — build your profile, showcase projects, and export a resume.",
    href: process.env.NEXT_PUBLIC_GEARFOLIO_URL ?? "#",
    cta: "Open Gearfolio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: "Internal Portal",
    body: "Faculty announcements and department tools for students, org officers, and faculty.",
    href: process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#",
    cta: "Enter Portal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
      <TraceDivider label="Department Services" as="h2" className="mb-6" />
      <p className="text-gray max-w-2xl mb-10 leading-relaxed">
        The front door to the department ecosystem — the tools and platforms that support learning,
        research, and student work. This set grows as new tools ship.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service) => {
          const isLive = service.href !== "#";
          return (
            <a
              key={service.title}
              href={service.href}
              {...(isLive ? { target: "_blank", rel: "noopener noreferrer" } : { "aria-disabled": true })}
              className="via-card p-6 flex flex-col gap-3 hover:border-gold/40 transition-all duration-300 group cursor-pointer"
            >
              <span className="text-maroon-bright group-hover:text-gold-text transition-colors duration-300" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="font-display font-semibold text-base text-foreground group-hover:text-gold-text transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-gray font-light leading-relaxed flex-1">{service.body}</p>
              <span className="text-[11px] font-mono text-gold-text mt-1">
                {isLive ? `${service.cta} →` : "Coming soon"}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

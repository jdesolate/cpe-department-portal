import TraceDivider from "@/components/ui/TraceDivider";
import { SERVICES } from "@/lib/services";

// Jump links absorbed from the old Quick Access section — kept slim so the
// tools grid stays the focus of this section.
const QUICK_LINKS = [
  { label: "Student Projects", href: "/#featured-projects", external: false },
  { label: "Announcements", href: "/#portal-dashboard", external: false },
  { label: "Upcoming Events", href: "/events", external: false },
  { label: "Facebook Page", href: "https://www.facebook.com/cituCPE", external: true },
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-20">
      <TraceDivider label="Tools & Services" as="h2" className="mb-6" />
      <p className="text-gray max-w-2xl mb-8 leading-relaxed">
        The front door to the department ecosystem — tools built by CpE students and faculty
        to support learning, research, and student work. This set grows as new tools ship.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {SERVICES.map((service) => {
          const isLive = service.status === "live";
          const inner = (
            <>
              <div className="flex items-start justify-between gap-2">
                <span className="text-maroon-bright group-hover:text-gold-text transition-colors duration-300" aria-hidden="true">
                  {service.icon}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray">
                  {service.category}
                </span>
              </div>
              <h3 className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-gold-text transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-gray font-light leading-relaxed flex-1">{service.body}</p>
              <span className={`text-[11px] font-mono mt-1 ${isLive ? "text-gold-text" : "text-gray"}`}>
                {isLive ? `${service.cta} →` : "Coming soon"}
              </span>
            </>
          );
          // Unreleased tools render as plain cards so nothing tappable leads nowhere.
          if (!isLive) {
            return (
              <div key={service.title} className="via-card p-4 md:p-6 flex flex-col gap-2 md:gap-3 opacity-75">
                {inner}
              </div>
            );
          }
          return (
            <a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="via-card p-4 md:p-6 flex flex-col gap-2 md:gap-3 hover:border-gold/40 transition-all duration-300 group cursor-pointer"
            >
              {inner}
            </a>
          );
        })}
      </div>
      <nav aria-label="Quick links" className="mt-6 flex flex-wrap gap-2">
        {QUICK_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center min-h-11 px-4 rounded-[4px] border border-line bg-card text-xs font-mono text-gray hover:text-foreground hover:border-gold/40 transition-colors duration-200 cursor-pointer"
          >
            {link.label}
            {link.external && <span aria-hidden="true" className="ml-1.5">↗</span>}
          </a>
        ))}
      </nav>
    </section>
  );
}

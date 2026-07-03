import TraceDivider from "@/components/ui/TraceDivider";

const LINKS = [
  {
    title: "Student & Faculty Portal",
    body: "Schedules, feedback, and department tools for logged-in students, org officers, and faculty.",
    href: process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#",
    external: true,
  },
  {
    title: "Announcements",
    body: "Official notices and updates from the department.",
    href: "/#portal-dashboard",
    external: false,
  },
  {
    title: "Upcoming Events",
    body: "Seminars, acquaintance parties, org events, and more.",
    href: "/events",
    external: false,
  },
  {
    title: "Facebook Page",
    body: "Photo dumps, reminders, and day-to-day department updates.",
    href: "https://www.facebook.com/cituCPE",
    external: true,
  },
];

export default function QuickAccess() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      <TraceDivider label="Quick Access" as="h2" className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LINKS.map((link) => (
          <a
            key={link.title}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="via-card p-5 flex flex-col gap-2 hover:border-gold/40 transition-all duration-300 group cursor-pointer"
          >
            <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-gold-text transition-colors duration-300">
              {link.title}
            </h3>
            <p className="text-xs text-gray font-light leading-relaxed flex-1">{link.body}</p>
            <span className="text-[11px] font-mono text-gold-text mt-1">
              {link.external ? "Visit →" : "Go →"}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

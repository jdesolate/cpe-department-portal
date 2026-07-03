import TraceDivider from "@/components/ui/TraceDivider";

// Recurring department activities — a sustainable content source per the brief.
// Photo slots can be added to each card later once activity photos are gathered.
const ACTIVITIES = [
  {
    title: "ICpEP Activities",
    body: "Student chapter events, inductions, and the department's professional community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Competitions",
    body: "Hackathons, programming contests, and inter-school engineering challenges.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    title: "Recognition Ceremonies",
    body: "Awards honoring outstanding student and faculty achievement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: "Thesis Defenses",
    body: "Capstone and thesis presentations before faculty and industry panels.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h20v14H2z" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Seminars",
    body: "Technical talks and workshops from industry practitioners and faculty.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
      </svg>
    ),
  },
  {
    title: "Outreach Activities",
    body: "Community engagement and technology outreach beyond the campus.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
    ),
  },
];

export default function DepartmentActivities() {
  return (
    <section id="activities" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
      <TraceDivider label="Department Activities" as="h2" className="mb-6" />
      <p className="text-gray max-w-2xl mb-10 leading-relaxed">
        Beyond the classroom — the recurring activities that shape well-rounded, industry-ready
        engineers throughout the year.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVITIES.map((activity) => (
          <div
            key={activity.title}
            className="via-card p-6 flex flex-col gap-3 hover:border-gold/40 transition-all duration-300 group"
          >
            <span className="text-maroon-bright group-hover:text-gold-text transition-colors duration-300" aria-hidden="true">
              {activity.icon}
            </span>
            <h3 className="font-display font-semibold text-base text-foreground group-hover:text-gold-text transition-colors duration-300">
              {activity.title}
            </h3>
            <p className="text-sm text-gray font-light leading-relaxed">{activity.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

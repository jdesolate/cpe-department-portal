import { Badge } from "@cpe/shared/components/ui/badge";
import StaggerChildren from "@cpe/shared/components/animations/StaggerChildren";
import FadeInView from "@cpe/shared/components/animations/FadeInView";

const facultyMembers = [
  {
    id: "f1",
    name: "Dr. Maria Clara Recto, PE",
    designation: "Department Chair & Professor",
    email: "mcrecto@youruniversity.edu.ph",
    specialization: "Embedded Systems & Robotics",
    consultation: "Mon/Wed · 1:00 PM – 3:00 PM",
    initials: "MR",
  },
  {
    id: "f2",
    name: "Prof. Juanito Dela Cruz, M.Sc.",
    designation: "ICpEP Faculty Adviser & Instructor",
    email: "jdelacruz@youruniversity.edu.ph",
    specialization: "Cloud Computing & Advanced Networking",
    consultation: "Tue/Thu · 9:00 AM – 11:30 AM",
    initials: "JD",
  },
  {
    id: "f3",
    name: "Engr. Antonio Luna, B.Sc.",
    designation: "Laboratory Supervisor & Lecturer",
    email: "aluna@youruniversity.edu.ph",
    specialization: "Microprocessor Architectures & IoT Platforms",
    consultation: "Friday · 2:00 PM – 5:00 PM",
    initials: "AL",
  },
];

export default function FacultyDirectory() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">

        <FadeInView className="mb-14 text-center md:text-left">
          <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-3">
            // personnel.directory
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary">
            Faculty &{" "}
            <span className="gradient-text">Roster</span>
          </h1>
          <p className="text-text-muted mt-3 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            The engineers, researchers, and professors driving our Computer Engineering academic tracks.
          </p>
        </FadeInView>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {facultyMembers.map((prof) => (
            <div
              key={prof.id}
              className="glass-card glow-border rounded-2xl overflow-hidden group hover:border-border-glow hover:shadow-[0_0_32px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="px-6 pt-8 pb-4 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-grad-blue via-grad-violet to-grad-cyan blur-sm opacity-50 group-hover:opacity-80 transition-opacity" />
                  <div className="relative w-14 h-14 rounded-full bg-linear-to-br from-grad-blue via-grad-violet to-grad-cyan flex items-center justify-center text-white font-black text-lg">
                    {prof.initials}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary leading-tight group-hover:gradient-text transition-all duration-300">
                    {prof.name}
                  </h3>
                  <p className="text-[11px] font-mono text-text-dim uppercase tracking-wide mt-0.5">
                    {prof.designation}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-4">
                <Badge className="bg-grad-violet/10 text-grad-violet border border-grad-violet/25 text-[11px] font-medium px-2.5 py-1 rounded-lg pointer-events-none">
                  ⬡ {prof.specialization}
                </Badge>
              </div>

              <div className="px-6 pb-6 mt-auto space-y-2.5 text-xs border-t border-border-subtle pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-text-dim font-mono">@</span>
                  <a
                    href={`mailto:${prof.email}`}
                    className="text-accent-glow hover:opacity-80 transition-opacity font-mono truncate"
                  >
                    {prof.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 bg-bg-elevated/60 p-2.5 rounded-lg border border-border-subtle">
                  <span className="text-text-dim mt-0.5 font-mono text-[10px]">◷</span>
                  <div>
                    <span className="font-mono font-semibold text-text-dim block text-[10px] uppercase tracking-wider">
                      Consultation
                    </span>
                    <span className="text-text-muted font-light text-[11px]">{prof.consultation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </main>
  );
}

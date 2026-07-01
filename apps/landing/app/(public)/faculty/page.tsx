import Tag from "@/components/ui/Tag";
import TraceDivider, { DiamondBullet } from "@/components/ui/TraceDivider";
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
          <TraceDivider label="Personnel Directory" className="mb-4 max-w-xs mx-auto md:mx-0" />
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">
            Faculty & <span className="text-gold">Roster</span>
          </h1>
          <p className="text-gray mt-3 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            The engineers, researchers, and professors driving our Computer Engineering programs.
          </p>
        </FadeInView>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {facultyMembers.map((prof) => (
            <div
              key={prof.id}
              className="via-card overflow-hidden group hover:border-gold/40 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="px-6 pt-8 pb-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-maroon-bright flex items-center justify-center text-paper font-display font-semibold text-lg shrink-0">
                  {prof.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-paper leading-tight group-hover:text-gold transition-colors duration-300">
                    {prof.name}
                  </h3>
                  <p className="text-[11px] font-mono text-gray uppercase tracking-wide mt-0.5">
                    {prof.designation}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-4">
                <Tag tone="muted">{prof.specialization}</Tag>
              </div>

              <div className="px-6 pb-6 mt-auto space-y-2.5 text-xs border-t border-line pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray font-mono">@</span>
                  <a
                    href={`mailto:${prof.email}`}
                    className="text-gold hover:text-gold-dim transition-colors font-mono truncate"
                  >
                    {prof.email}
                  </a>
                </div>
                <div className="flex items-start gap-2 bg-panel-2/60 p-2.5 rounded-[4px] border border-line">
                  <DiamondBullet className="mt-0.5" />
                  <div>
                    <span className="font-mono font-semibold text-gray block text-[10px] uppercase tracking-wider">
                      Consultation
                    </span>
                    <span className="text-gray font-light text-[11px]">{prof.consultation}</span>
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

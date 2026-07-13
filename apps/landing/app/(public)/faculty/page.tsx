import Tag from "@/components/ui/Tag";
import TraceDivider, { DiamondBullet } from "@/components/ui/TraceDivider";
import StaggerChildren from "@cpe/shared/components/animations/StaggerChildren";
import FadeInView from "@cpe/shared/components/animations/FadeInView";
import { FACULTY } from "@/lib/faculty";

export default function FacultyDirectory() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">

        <FadeInView className="mb-14 text-center md:text-left">
          <TraceDivider label="Personnel Directory" className="mb-4 max-w-xs mx-auto md:mx-0" />
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">
            Faculty & <span className="text-maroon-bright">Roster</span>
          </h1>
          <p className="text-gray mt-3 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            The engineers and educators driving our Computer Engineering programs.
          </p>
        </FadeInView>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {FACULTY.map((prof) => (
            <div
              key={prof.id}
              className="via-card overflow-hidden group hover:border-gold/40 transition-all duration-300 flex flex-col"
            >
              <div className="px-6 pt-8 pb-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-maroon-bright flex items-center justify-center text-background font-display font-semibold text-lg shrink-0">
                  {prof.initials}
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground leading-tight group-hover:text-gold-text transition-colors duration-300">
                    {prof.honorific} {prof.name}
                  </h2>
                  <Tag tone={prof.isChair ? "gold" : "muted"} className="mt-1.5">
                    {prof.isChair ? "Department Chair" : prof.employment === "full-time" ? "Full-Time Faculty" : "Part-Time Faculty"}
                  </Tag>
                </div>
              </div>

              <div className="px-6 pb-6 mt-auto space-y-3 text-xs border-t border-line pt-4">
                <div>
                  <span className="font-mono font-semibold text-gray block text-[10px] uppercase tracking-wider mb-1.5">
                    Post Graduate
                  </span>
                  <ul className="space-y-1.5">
                    {prof.postGraduate.map((degree) => (
                      <li key={degree} className="flex items-start gap-2 text-gray font-light text-[11px] leading-relaxed">
                        <DiamondBullet className="mt-0.5 shrink-0" />
                        <span>{degree}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-mono font-semibold text-gray block text-[10px] uppercase tracking-wider mb-1.5">
                    Undergraduate
                  </span>
                  <ul className="space-y-1.5">
                    {prof.undergraduate.map((degree) => (
                      <li key={degree} className="flex items-start gap-2 text-gray font-light text-[11px] leading-relaxed">
                        <DiamondBullet className="mt-0.5 shrink-0" />
                        <span>{degree}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </main>
  );
}

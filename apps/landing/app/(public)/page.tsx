import { supabase } from "@cpe/shared/lib/supabase";
import DepartmentCarousel from "@/components/DepartmentCarousel";
import HeroSection from "@/components/home/HeroSection";
import CoreCompetencies from "@/components/home/CoreCompetencies";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import DepartmentActivities from "@/components/home/DepartmentActivities";
import QuickAccess from "@/components/home/QuickAccess";
import Services from "@/components/home/Services";
import ContactSection from "@/components/home/ContactSection";
import Tag from "@/components/ui/Tag";
import TraceDivider from "@/components/ui/TraceDivider";
import FadeInView from "@cpe/shared/components/animations/FadeInView";
import StaggerChildren from "@cpe/shared/components/animations/StaggerChildren";

export const revalidate = 300;

export default async function HomePortal() {
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .is("is_private", false)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen">

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. MEDIA CAROUSEL */}
      <FadeInView className="relative -mt-4 z-20">
        <DepartmentCarousel />
      </FadeInView>

      {/* 3. CORE COMPETENCIES */}
      <FadeInView delay={0.05}>
        <CoreCompetencies />
      </FadeInView>

      {/* 4. FEATURED STUDENT PROJECTS */}
      <FadeInView delay={0.05}>
        <FeaturedProjects />
      </FadeInView>

      {/* 5. RESEARCH HIGHLIGHTS */}
      <FadeInView delay={0.05}>
        <ResearchHighlights />
      </FadeInView>

      {/* 6. DEPARTMENT ACTIVITIES */}
      <FadeInView delay={0.05}>
        <DepartmentActivities />
      </FadeInView>

      {/* 7. QUICK ACCESS */}
      <FadeInView delay={0.05}>
        <QuickAccess />
      </FadeInView>

      {/* 5. DASHBOARD GRID */}
      <section id="portal-dashboard" className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pb-20 grid grid-cols-1 gap-8 scroll-mt-20">

        {/* Achievement Spotlight */}
        <FadeInView delay={0.05}>
          <div className="via-card overflow-hidden">
            <div className="px-6 py-5 border-b border-line">
              <TraceDivider label="Achievements & Recognition" as="h2" />
            </div>
            <div className="p-6">
              {achievements && achievements.length > 0 ? (
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {achievements.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-[4px] overflow-hidden bg-card border border-line hover:border-gold/40 transition-all duration-300"
                    >
                      <div className="aspect-video w-full bg-foreground flex items-center justify-center text-gray border-b border-line">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-gray bg-card px-3 py-1 rounded-[2px] border border-line">
                          Photo coming soon
                        </span>
                      </div>
                      <div className="p-5">
                        <Tag tone="gold" className="mb-3">
                          AY {item.academic_year}
                        </Tag>
                        <h3 className="text-base font-display font-semibold text-foreground group-hover:text-gold-text transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray font-light mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="text-center py-8 text-gray font-mono text-sm italic">
                  No achievements to show yet.
                </div>
              )}
            </div>
          </div>
        </FadeInView>

        {/* Announcements */}
        <FadeInView delay={0.1}>
          <div className="via-card overflow-hidden">
            <div className="px-6 py-5 border-b border-line">
              <TraceDivider label="Announcements" as="h2" />
              <p className="text-xs text-gray font-mono mt-2">
                Official notices and updates from the department.
              </p>
            </div>

            <div className="p-6 space-y-3">
              {announcements && announcements.length > 0 ? (
                <StaggerChildren className="space-y-3">
                  {announcements.map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 rounded-[4px] border transition-all duration-200 flex flex-col gap-3 ${
                        item.is_pinned
                          ? "bg-maroon-bright/10 border-maroon-bright/30 hover:border-maroon-bright/60"
                          : "bg-background/60 border-line hover:border-gold/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.is_pinned && <Tag tone="gold">PINNED</Tag>}
                        <Tag tone="muted">{item.category || "General"}</Tag>
                        <span className="text-[10px] text-gray font-mono ml-auto">
                          {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-base leading-snug">{item.title}</h3>
                      <p className="text-sm text-gray font-light leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="text-center py-12 border border-dashed border-line rounded-[4px]">
                  <p className="text-sm text-gray font-mono italic">No announcements yet.</p>
                </div>
              )}
            </div>
          </div>
        </FadeInView>

      </section>

      {/* 6. DEPARTMENT SERVICES */}
      <FadeInView delay={0.05}>
        <Services />
      </FadeInView>

      {/* 7. CONTACT */}
      <FadeInView delay={0.05}>
        <ContactSection />
      </FadeInView>
    </main>
  );
}

import { supabase } from "@cpe/shared/lib/supabase";
import DepartmentCarousel from "@/components/DepartmentCarousel";
import HeroSection from "@/components/home/HeroSection";
import CoreCompetencies from "@/components/home/CoreCompetencies";
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

  const { data: latestAchievements } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const spotlightAchievement = latestAchievements?.[0];

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

      {/* 4. DASHBOARD GRID */}
      <section id="portal-dashboard" className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pb-20 grid grid-cols-1 gap-8 scroll-mt-20">

        {/* Announcements */}
        <FadeInView delay={0.05}>
          <div className="via-card overflow-hidden">
            <div className="px-6 py-5 border-b border-line">
              <TraceDivider label="Department Bulletins" />
              <p className="text-xs text-gray font-mono mt-2">
                Official directives, pinned notices, and board postings.
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
                          : "bg-panel-2/60 border-line hover:border-gold/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.is_pinned && <Tag tone="gold">PINNED</Tag>}
                        <Tag tone="muted">{item.category || "General"}</Tag>
                        <span className="text-[10px] text-gray font-mono ml-auto">
                          {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-paper text-base leading-snug">{item.title}</h3>
                      <p className="text-sm text-gray font-light leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="text-center py-12 border border-dashed border-line rounded-[4px]">
                  <p className="text-sm text-gray font-mono italic">No public announcements active.</p>
                </div>
              )}
            </div>
          </div>
        </FadeInView>

        {/* Achievement Spotlight */}
        <FadeInView delay={0.1}>
          <div className="via-card overflow-hidden">
            <div className="px-6 py-5 border-b border-line">
              <TraceDivider label="Outstanding Milestones" />
            </div>
            <div className="p-6">
              {spotlightAchievement ? (
                <div className="group relative rounded-[4px] overflow-hidden bg-panel-2 border border-line hover:border-gold/40 transition-all duration-300">
                  <div className="aspect-video md:h-72 w-full bg-ink flex items-center justify-center text-gray border-b border-line">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray bg-panel px-3 py-1 rounded-[2px] border border-line">
                      {spotlightAchievement.image_url ? "System Asset Verified" : "Academic Records Vault"}
                    </span>
                  </div>
                  <div className="p-6">
                    <Tag tone="gold" className="mb-3">
                      AY {spotlightAchievement.academic_year}
                    </Tag>
                    <h3 className="text-xl font-display font-semibold text-paper group-hover:text-gold transition-colors duration-300">
                      {spotlightAchievement.title}
                    </h3>
                    <p className="text-sm text-gray font-light mt-2 leading-relaxed">
                      {spotlightAchievement.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray font-mono text-sm italic">
                  No milestone records active in the current sweep.
                </div>
              )}
            </div>
          </div>
        </FadeInView>

      </section>

      {/* 5. CONTACT */}
      <FadeInView delay={0.05}>
        <ContactSection />
      </FadeInView>
    </main>
  );
}

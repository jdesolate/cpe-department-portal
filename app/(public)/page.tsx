import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import RealtimeFreedomWall from "@/components/RealtimeFreedomWall";
import DepartmentCarousel from "@/components/DepartmentCarousel";
import HeroSection from "@/components/home/HeroSection";
import FadeInView from "@/components/animations/FadeInView";
import StaggerChildren from "@/components/animations/StaggerChildren";

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

  const { data: initialPosts } = await supabase
    .from("freedom_wall")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(15);

  const spotlightAchievement = latestAchievements?.[0];

  return (
    <main className="min-h-screen">

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. MEDIA CAROUSEL */}
      <FadeInView className="relative -mt-4 z-20">
        <DepartmentCarousel />
      </FadeInView>

      {/* 3. DASHBOARD GRID */}
      <section id="portal-dashboard" className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-20">

        {/* Left — Announcements + Achievement */}
        <div className="lg:col-span-2 space-y-8">

          {/* Announcements */}
          <FadeInView delay={0.05}>
            <div className="glass-card glow-border rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
                    <span className="text-grad-cyan font-mono text-sm">//</span>
                    Department Bulletins
                  </h2>
                  <p className="text-xs text-text-dim font-mono mt-0.5">
                    Official directives, pinned notices, and board postings.
                  </p>
                </div>
                <Link href="/announcements" className="text-xs font-semibold text-accent-glow hover:opacity-80 transition-opacity whitespace-nowrap font-mono">
                  View Archive →
                </Link>
              </div>

              <div className="p-6 space-y-3">
                {announcements && announcements.length > 0 ? (
                  <StaggerChildren className="space-y-3">
                    {announcements.map((item) => (
                      <div
                        key={item.id}
                        className={`p-5 rounded-xl border transition-all duration-200 flex flex-col gap-3 ${
                          item.is_pinned
                            ? "bg-grad-blue/5 border-grad-blue/25 hover:border-grad-blue/50"
                            : "bg-bg-surface/40 border-border-subtle hover:border-border-glow"
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.is_pinned && (
                            <Badge className="bg-accent-glow/15 text-accent-glow border border-accent-glow/30 font-extrabold text-[9px] tracking-wider px-2 py-0.5 rounded-sm">
                              PINNED
                            </Badge>
                          )}
                          <Badge className="text-text-muted bg-bg-elevated border border-border-subtle text-[9px] uppercase font-bold px-2 py-0.5 rounded-sm">
                            {item.category || "General"}
                          </Badge>
                          <span className="text-[10px] text-text-dim font-mono ml-auto">
                            {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                        <h3 className="font-bold text-text-primary text-base leading-snug">{item.title}</h3>
                        <p className="text-sm text-text-muted font-light leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </StaggerChildren>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border-subtle rounded-xl">
                    <p className="text-sm text-text-dim font-mono italic">No public announcements active.</p>
                  </div>
                )}
              </div>
            </div>
          </FadeInView>

          {/* Achievement Spotlight */}
          <FadeInView delay={0.1}>
            <div className="glass-card glow-border rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-border-subtle">
                <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
                  <span className="text-grad-cyan font-mono text-sm">//</span>
                  Outstanding Milestones
                </h2>
              </div>
              <div className="p-6">
                {spotlightAchievement ? (
                  <div className="group relative rounded-xl overflow-hidden bg-bg-elevated border border-border-subtle hover:border-border-glow transition-all duration-300">
                    <div className="aspect-video md:h-72 w-full bg-bg-base flex flex-col items-center justify-center text-text-dim border-b border-border-subtle">
                      <span className="text-4xl mb-2 opacity-40">💾</span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-text-dim bg-bg-surface px-3 py-1 rounded border border-border-subtle">
                        {spotlightAchievement.image_url ? "System Asset Verified" : "Academic Records Vault"}
                      </span>
                    </div>
                    <div className="p-6">
                      <Badge className="bg-grad-blue/15 text-grad-blue border border-grad-blue/30 text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm mb-3">
                        AY {spotlightAchievement.academic_year}
                      </Badge>
                      <h3 className="text-xl font-bold text-text-primary group-hover:gradient-text transition-all duration-300">
                        {spotlightAchievement.title}
                      </h3>
                      <p className="text-sm text-text-muted font-light mt-2 leading-relaxed">
                        {spotlightAchievement.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-dim font-mono text-sm italic">
                    No milestone records active in the current sweep.
                  </div>
                )}
              </div>
            </div>
          </FadeInView>
        </div>

        {/* Right — Freedom Wall */}
        <div className="lg:col-span-1">
          <FadeInView className="sticky top-22">
            <RealtimeFreedomWall initialPosts={initialPosts || []} />
          </FadeInView>
        </div>

      </section>
    </main>
  );
}

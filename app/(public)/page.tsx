import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import RealtimeFreedomWall from "@/components/RealtimeFreedomWall";
import DepartmentCarousel from "@/components/DepartmentCarousel";

export const revalidate = 300;

export default async function HomePortal() {
  // 1. Fetch live public announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .is("is_private", false)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(4);

  // 2. Fetch the single newest achievement record for the spotlight section
  const { data: latestAchievements } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const spotlightAchievement = latestAchievements?.[0];

  // 3. Initial baseline seed fetch for the Freedom Wall
  const { data: initialPosts } = await supabase
    .from("freedom_wall")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(15);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 scroll-smooth pb-20">

      {/* 1. TRUE FULL SCREEN HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-university-maroon via-[#420616] to-slate-950 text-white min-h-[calc(100vh-4rem)] flex flex-col justify-between px-4 md:px-8 border-b-8 border-university-gold">

        {/* Subtle grid background mask for engineering motif */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Empty spacer to help perfectly anchor vertical flex centering */}
        <div className="hidden lg:block h-4" />

        {/* Core Marketing Copy Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-12 my-auto">
          <Badge className="bg-university-gold/20 text-university-gold hover:bg-university-gold/30 border border-university-gold/40 rounded-full font-mono tracking-wider px-4 py-1.5 text-xs uppercase animate-fade-in">
            ⚡ ICpEP Integrated Academic Hub
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none">
            The Digital Pulse of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-university-gold via-amber-200 to-white">
              Computer Engineering
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Bridging official university administration, institutional research archives, and dynamic real-time student culture under a unified portal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-university-gold hover:bg-amber-500 text-slate-950 font-bold text-base h-13 px-8 rounded-lg shadow-lg shadow-university-gold/10 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer">
                Institutional Sign In
              </Button>
            </Link>
            <a href="#department-gallery" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-medium text-base h-13 px-8 rounded-lg transition-all cursor-pointer">
                Explore Public Feed
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Panel: Combined Statistics & Scroll Arrow Indicator */}
        <div className="relative z-10 w-full max-w-7xl mx-auto pb-6 space-y-6">

          {/* Animated Scroll Chevron Indicator */}
          <div className="flex flex-col items-center justify-center text-slate-400 font-mono text-[11px] uppercase tracking-widest gap-1 animate-pulse">
            <span>Scroll to explore</span>
            <svg
              className="w-4 h-4 animate-bounce text-university-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Floating Core Statistics Counter Grid */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-xl py-4 hidden md:block">
            <div className="grid grid-cols-3 text-center divide-x divide-white/10">
              <div>
                <p className="text-2xl font-black text-university-gold">600+</p>
                <p className="text-xs text-slate-400 font-mono uppercase">Active Nodes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-400 font-mono uppercase">Domain Verified</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">Real-time</p>
                <p className="text-xs text-slate-400 font-mono uppercase">Ecosystem Synced</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. MEDIA SHOWCASE SECTION */}
      <section id="department-gallery" className="relative -mt-8 z-20 scroll-mt-20">
        <DepartmentCarousel />
      </section>

      {/* 3. LIVE INFRASTRUCTURE BOARD LAYOUT */}
      <section id="portal-dashboard" className="max-w-7xl mx-auto px-4 md:px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-20">

        {/* Left Column (Width 2/3): Announcements & Academic Wins */}
        <div className="lg:col-span-2 space-y-8">

          {/* Component: Bulletins */}
          <Card className="rounded-2xl border-slate-200 bg-white shadow-xs overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
                    📢 Department Bulletins
                  </CardTitle>
                  <CardDescription className="text-xs font-light text-slate-500">
                    Official directives, pinning notifications, and board postings.
                  </CardDescription>
                </div>
                <Link href="/announcements" className="text-xs font-semibold text-university-maroon hover:underline">
                  View Bulletin Archive &rarr;
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {announcements && announcements.length > 0 ? (
                announcements.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-xl border transition-all duration-200 flex flex-col gap-3 ${item.is_pinned
                      ? 'bg-amber-50/40 border-university-gold/40 hover:border-university-gold'
                      : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xs'
                      }`}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.is_pinned && (
                        <Badge className="bg-university-gold text-slate-950 font-extrabold text-[9px] tracking-wider px-2 py-0.5 rounded-sm">
                          PINNED
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-slate-600 bg-slate-100 text-[9px] uppercase font-bold px-2 py-0.5 rounded-sm">
                        {item.category || "General"}
                      </Badge>
                      <span className="text-xs text-slate-400 font-mono ml-auto">
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{item.title}</h3>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">{item.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                  <p className="text-sm text-slate-400 italic">No public announcements are currently active.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Component: Milestone Spotlight */}
          <Card className="rounded-2xl border-slate-200 bg-white shadow-xs overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
                🏆 Outstanding Institutional Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {spotlightAchievement ? (
                <div className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-university-gold/50 transition-all duration-300 shadow-md">
                  <div className="aspect-video md:h-80 w-full bg-slate-900 flex flex-col items-center justify-center text-slate-500 p-4 border-b border-slate-900">
                    <span className="text-4xl mb-2">💾</span>
                    <span className="text-xs font-mono tracking-widest uppercase text-slate-400 bg-slate-950 px-3 py-1 rounded border border-white/5">
                      {spotlightAchievement.image_url ? "System Asset Verified" : "Academic Records Vault"}
                    </span>
                  </div>

                  <div className="p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-900/80">
                    <Badge className="bg-university-maroon text-university-gold border border-university-gold/30 text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm mb-3">
                      Academic Year {spotlightAchievement.academic_year}
                    </Badge>
                    <h3 className="text-xl font-bold text-white group-hover:text-university-gold transition-colors duration-200">
                      {spotlightAchievement.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-light mt-2 leading-relaxed">
                      {spotlightAchievement.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 italic text-sm">No historical records active in the current sweep.</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Width 1/3): Real-Time WebSockets Component */}
        <div className="lg:col-span-1">
          <div className="sticky top-22">
            <RealtimeFreedomWall initialPosts={initialPosts || []} />
          </div>
        </div>

      </section>
    </main>
  );
}
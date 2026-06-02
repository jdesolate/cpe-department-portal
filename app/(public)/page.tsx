import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 300; // ISR Optimization: Automatically cache and re-verify data every 5 minutes

export default async function HomePortal() {
  // 1. Fetch live announcements from Supabase sorted by pinned status and timestamp
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .is("is_private", false) // Public view only sees public notices
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5);

  // 2. Fetch the single newest achievement record for the banner spotlight
  const { data: latestAchievements } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const spotlightAchievement = latestAchievements?.[0];

  // 3. Fetch the newest 10 approved freedom wall items
  const { data: freedomWallPosts } = await supabase
    .from("freedom_wall")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen bg-slate-50 pb-12">

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-r from-university-maroon via-[#500b1e] to-university-maroon text-white py-20 px-6 text-center border-b-4 border-university-gold">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge className="bg-university-gold/20 text-university-gold hover:bg-university-gold/30 border-university-gold/30 rounded-full font-semibold px-3 py-1 text-xs">
            Official Department Hub
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Computer Engineering
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-xl mx-auto font-light leading-relaxed">
            Access official announcements, track research portfolios, and engage with the local student community.
          </p>
        </div>
      </section>

      {/* Responsive Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left/Center Column: Official Announcements & Achievements */}
        <div className="lg:col-span-2 space-y-6">

          {/* Live Announcements Component */}
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                📢 Department Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements && announcements.length > 0 ? (
                announcements.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-xs flex flex-col gap-2 ${item.is_pinned
                      ? 'bg-rose-50/40 border-university-maroon/20 hover:border-university-maroon/40'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.is_pinned && (
                        <Badge className="bg-university-maroon text-white font-bold text-[9px] px-2 py-0.5 rounded-xs pointer-events-none">
                          PINNED
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-slate-700 bg-slate-200 text-[9px] uppercase font-bold px-2 py-0.5 rounded-xs pointer-events-none">
                        {item.category || "General"}
                      </Badge>
                      <span className="text-xs text-slate-400 ml-auto font-mono">
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 font-light">{item.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic text-center py-6">No current notices have been broadcasted.</p>
              )}
            </CardContent>
          </Card>

          {/* Dynamic Achievement Showcase Spotlight */}
          <Card className="rounded-xl border-slate-200 shadow-xs overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                🏆 Recent Milestone
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {spotlightAchievement ? (
                <div className="bg-slate-900 rounded-lg overflow-hidden text-white relative group cursor-pointer border border-slate-800 hover:border-university-gold/40 transition-all duration-300 shadow-xs">
                  <div className="h-52 bg-gradient-to-t from-black/90 via-black/40 to-transparent absolute inset-0 z-10" />
                  <div className="h-52 w-full bg-slate-800 flex items-center justify-center text-slate-500 italic font-light tracking-wide">
                    {spotlightAchievement.image_url ? `[ ${spotlightAchievement.title} Media ]` : '[ Academic Innovation Record Image ]'}
                  </div>
                  <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                    <Badge className="bg-university-maroon text-university-gold font-bold text-[10px] uppercase tracking-widest border border-university-gold/20 rounded-xs mb-2">
                      A.Y. {spotlightAchievement.academic_year}
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-50 group-hover:text-university-gold transition-colors duration-200">
                      {spotlightAchievement.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light line-clamp-1 mt-1">{spotlightAchievement.description}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic text-center py-4">No milestone achievements currently recorded.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Freedom Wall Stream */}
        <div className="lg:col-span-1">
          <Card className="border-slate-200 shadow-xs h-[540px] flex flex-col hover:border-org-blue/20 transition-all duration-200 rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  🕊️ Freedom Wall
                </CardTitle>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <CardDescription className="text-xs text-slate-400 mt-1">
                Real-time anonymous student feedback ecosystem.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-3 pr-2 my-2 max-h-[330px] scrollbar-thin">
              {freedomWallPosts && freedomWallPosts.length > 0 ? (
                freedomWallPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-slate-50/60 border border-slate-200/60 p-4 rounded-lg text-sm text-slate-700 shadow-2xs transition duration-150"
                  >
                    <p className="leading-relaxed font-light">{post.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic text-center py-12">The wall is currently silent. Share your thoughts below!</p>
              )}
            </CardContent>

            <CardFooter className="mt-auto pt-4 border-t border-slate-100 pb-6">
              <a href="/freedom-wall/submit" className="w-full">
                <Button className="w-full bg-org-blue hover:bg-blue-700 text-white font-semibold text-sm h-12 rounded-lg transition shadow-xs flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.99]">
                  <span>✏️</span> Share an Anonymous Thought
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>

      </div>
    </main>
  );
}

import { supabase } from "@cpe/shared/lib/supabase";
import { Badge } from "@cpe/shared/components/ui/badge";
import Link from "next/link";
import FadeInView from "@cpe/shared/components/animations/FadeInView";
import StaggerChildren from "@cpe/shared/components/animations/StaggerChildren";

export const revalidate = 120;

export default async function EventsPage() {
  const { data: events } = await supabase
    .from("events")
    .select("id, slug, title, description, event_date, location, capacity, registration_type")
    .eq("is_active", true)
    .order("event_date", { ascending: true });

  return (
    <main className="min-h-screen px-4 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">

        <FadeInView className="mb-14 text-center md:text-left">
          <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-3">
            // upcoming.events
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary">
            Department{" "}
            <span className="gradient-text">Events</span>
          </h1>
          <p className="text-text-muted mt-3 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Seminars, acquaintance parties, org events, and more. Register below to secure your slot.
          </p>
        </FadeInView>

        {events && events.length > 0 ? (
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.09}>
            {events.map((event) => {
              const date = event.event_date ? new Date(event.event_date) : null;
              const isLoginRequired = event.registration_type === "login_required";

              return (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <div className="glass-card glow-border rounded-2xl overflow-hidden flex flex-col h-full hover:border-border-glow hover:shadow-[0_0_32px_rgba(59,130,246,0.1)] transition-all duration-300">

                    <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
                      {date ? (
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-black gradient-text leading-none">
                              {date.getDate()}
                            </p>
                            <p className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                              {date.toLocaleString("en-US", { month: "short" })}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-border-subtle" />
                          <p className="text-xs font-mono text-text-muted">
                            {date.toLocaleString("en-US", { weekday: "long" })} &middot;{" "}
                            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-text-dim">Date TBA</p>
                      )}
                      <Badge
                        className={
                          isLoginRequired
                            ? "bg-grad-violet/15 text-grad-violet border border-grad-violet/30 text-[9px] font-mono uppercase px-2 py-0.5 shrink-0"
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[9px] font-mono uppercase px-2 py-0.5 shrink-0"
                        }
                      >
                        {isLoginRequired ? "Login Required" : "Open"}
                      </Badge>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <h3 className="font-bold text-text-primary text-base leading-snug group-hover:gradient-text transition-all duration-300">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-text-muted font-light leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between">
                        {event.location && (
                          <p className="text-[11px] font-mono text-text-dim">
                            📍 {event.location}
                          </p>
                        )}
                        {event.capacity && (
                          <p className="text-[11px] font-mono text-text-dim">
                            ◎ {event.capacity} slots
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <div className="w-full bg-linear-to-r from-grad-blue/10 via-grad-violet/10 to-grad-cyan/10 border border-border-glow text-text-primary text-sm font-semibold h-10 rounded-xl flex items-center justify-center gap-2 group-hover:from-grad-blue/20 group-hover:to-grad-cyan/20 transition-all">
                        Register Now →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </StaggerChildren>
        ) : (
          <FadeInView>
            <div className="glass-card glow-border rounded-2xl text-center py-20">
              <p className="text-4xl mb-4 opacity-20">📅</p>
              <p className="text-text-dim font-mono text-sm">No upcoming events scheduled.</p>
              <p className="text-text-dim font-mono text-xs mt-1 opacity-60">Check back soon.</p>
            </div>
          </FadeInView>
        )}
      </div>
    </main>
  );
}

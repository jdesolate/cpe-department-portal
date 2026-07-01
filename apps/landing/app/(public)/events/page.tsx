import { supabase } from "@cpe/shared/lib/supabase";
import Tag from "@/components/ui/Tag";
import TraceDivider from "@/components/ui/TraceDivider";
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
          <TraceDivider label="Upcoming Events" className="mb-4 max-w-xs mx-auto md:mx-0" />
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">
            Department <span className="text-maroon-bright">Events</span>
          </h1>
          <p className="text-gray mt-3 text-base md:text-lg max-w-2xl font-light leading-relaxed">
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
                  <div className="via-card overflow-hidden flex flex-col h-full hover:border-gold/40 transition-all duration-300">

                    <div className="px-5 py-3 border-b border-line flex items-center justify-between">
                      {date ? (
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-display font-semibold text-gold-text leading-none">
                              {date.getDate()}
                            </p>
                            <p className="text-[10px] font-mono text-gray uppercase tracking-wider">
                              {date.toLocaleString("en-US", { month: "short" })}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-line" />
                          <p className="text-xs font-mono text-gray">
                            {date.toLocaleString("en-US", { weekday: "long" })} &middot;{" "}
                            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-gray">Date TBA</p>
                      )}
                      <Tag
                        tone="maroon"
                        className={isLoginRequired ? "shrink-0" : "shrink-0 border-emerald-500/40 text-emerald-700"}
                      >
                        {isLoginRequired ? "Login Required" : "Open"}
                      </Tag>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <h2 className="font-display font-semibold text-foreground text-base leading-snug group-hover:text-gold-text transition-colors duration-300">
                        {event.title}
                      </h2>
                      {event.description && (
                        <p className="text-sm text-gray font-light leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-auto pt-3 border-t border-line flex items-center justify-between">
                        {event.location && (
                          <p className="text-[11px] font-mono text-gray">{event.location}</p>
                        )}
                        {event.capacity && (
                          <p className="text-[11px] font-mono text-gray">{event.capacity} slots</p>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <div className="w-full bg-transparent border border-gold/40 text-foreground text-sm font-semibold h-10 rounded-[4px] flex items-center justify-center gap-2 group-hover:bg-gold/10 group-hover:border-gold transition-all">
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
            <div className="via-card text-center py-20">
              <p className="text-gray font-mono text-sm">No upcoming events scheduled.</p>
              <p className="text-gray font-mono text-xs mt-1 opacity-60">Check back soon.</p>
            </div>
          </FadeInView>
        )}
      </div>
    </main>
  );
}

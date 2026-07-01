import { supabase } from "@cpe/shared/lib/supabase";
import { Badge } from "@cpe/shared/components/ui/badge";
import { notFound } from "next/navigation";
import FadeInView from "@cpe/shared/components/animations/FadeInView";
import EventRegistrationForm from "@/components/EventRegistrationForm";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!event) notFound();

  const { count: registrationCount } = await supabase
    .from("event_registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", event.id);

  const date = event.event_date ? new Date(event.event_date) : null;
  const spotsLeft = event.capacity ? event.capacity - (registrationCount ?? 0) : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  const isLoginRequired = event.registration_type === "login_required";

  return (
    <main className="min-h-screen px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto">

        <FadeInView>
          <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-4">
            // events / {slug}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card glow-border rounded-2xl p-7 space-y-5">

                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={
                      isLoginRequired
                        ? "bg-grad-violet/15 text-grad-violet border border-grad-violet/30 text-[10px] font-mono uppercase"
                        : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[10px] font-mono uppercase"
                    }
                  >
                    {isLoginRequired ? "Login Required" : "Open Registration"}
                  </Badge>
                  {isFull && (
                    <Badge className="bg-red-500/15 text-red-400 border border-red-500/25 text-[10px] font-mono uppercase">
                      Full
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight">
                  {event.title}
                </h1>

                {event.description && (
                  <p className="text-text-muted font-light leading-relaxed">
                    {event.description}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {date && (
                    <div className="bg-bg-elevated/60 rounded-xl px-4 py-3 border border-border-subtle">
                      <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-1">Date & Time</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-xs text-text-muted font-mono">
                        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  )}
                  {event.location && (
                    <div className="bg-bg-elevated/60 rounded-xl px-4 py-3 border border-border-subtle">
                      <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm font-semibold text-text-primary">📍 {event.location}</p>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="bg-bg-elevated/60 rounded-xl px-4 py-3 border border-border-subtle">
                      <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-1">Capacity</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {registrationCount ?? 0} / {event.capacity} registered
                      </p>
                      {spotsLeft !== null && spotsLeft > 0 && (
                        <p className="text-xs text-emerald-400 font-mono mt-0.5">{spotsLeft} slots remaining</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {isFull ? (
                <div className="glass-card glow-border rounded-2xl p-8 text-center space-y-3">
                  <p className="text-3xl opacity-30">🔒</p>
                  <p className="text-text-muted font-mono text-sm">
                    Registrations are full for this event.
                  </p>
                </div>
              ) : isLoginRequired ? (
                <div className="glass-card glow-border rounded-2xl p-8 text-center space-y-4">
                  <p className="text-3xl opacity-30">🔐</p>
                  <p className="text-text-muted font-mono text-sm">
                    Sign in with your school email to register.
                  </p>
                  <a href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"}>
                    <button className="w-full bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-sm h-11 rounded-xl glow-btn hover:opacity-90 transition-all cursor-pointer mt-2">
                      Student Login →
                    </button>
                  </a>
                </div>
              ) : (
                <EventRegistrationForm eventId={event.id} eventTitle={event.title} />
              )}
            </div>
          </div>
        </FadeInView>
      </div>
    </main>
  );
}

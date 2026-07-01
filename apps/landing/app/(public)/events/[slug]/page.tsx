import { supabase } from "@cpe/shared/lib/supabase";
import { notFound } from "next/navigation";
import FadeInView from "@cpe/shared/components/animations/FadeInView";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import Tag from "@/components/ui/Tag";
import TraceDivider from "@/components/ui/TraceDivider";
import Button from "@/components/ui/Button";

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
          <TraceDivider label={`Events / ${slug}`} className="mb-6 max-w-xs" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            <div className="lg:col-span-3 space-y-6">
              <div className="via-card p-7 space-y-5">

                <div className="flex flex-wrap gap-2">
                  <Tag
                    tone="maroon"
                    className={isLoginRequired ? "" : "border-emerald-500/40 text-emerald-400"}
                  >
                    {isLoginRequired ? "Login Required" : "Open Registration"}
                  </Tag>
                  {isFull && (
                    <Tag tone="maroon" className="border-red-500/40 text-red-400">
                      Full
                    </Tag>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-semibold text-paper leading-tight">
                  {event.title}
                </h1>

                {event.description && (
                  <p className="text-gray font-light leading-relaxed">
                    {event.description}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {date && (
                    <div className="bg-panel-2/60 rounded-[4px] px-4 py-3 border border-line">
                      <p className="text-[10px] font-mono text-gray uppercase tracking-widest mb-1">Date & Time</p>
                      <p className="text-sm font-semibold text-paper">
                        {date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-xs text-gray font-mono">
                        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  )}
                  {event.location && (
                    <div className="bg-panel-2/60 rounded-[4px] px-4 py-3 border border-line">
                      <p className="text-[10px] font-mono text-gray uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm font-semibold text-paper">{event.location}</p>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="bg-panel-2/60 rounded-[4px] px-4 py-3 border border-line">
                      <p className="text-[10px] font-mono text-gray uppercase tracking-widest mb-1">Capacity</p>
                      <p className="text-sm font-semibold text-paper">
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
                <div className="via-card p-8 text-center space-y-3">
                  <p className="text-gray font-mono text-sm">
                    Registrations are full for this event.
                  </p>
                </div>
              ) : isLoginRequired ? (
                <div className="via-card p-8 text-center space-y-4">
                  <p className="text-gray font-mono text-sm">
                    Sign in with your school email to register.
                  </p>
                  <a href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"}>
                    <Button variant="solid" className="w-full mt-2">
                      Student Login →
                    </Button>
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

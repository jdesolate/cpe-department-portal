import Tag from "@/components/ui/Tag";
import Card from "@/components/ui/Card";
import TraceDivider from "@/components/ui/TraceDivider";

const PILLARS = [
  {
    tag: "SOFTWARE",
    title: "Software Development",
    body: "Application and systems software design, algorithms and data structures, and professional software engineering practice — from requirements through deployment.",
  },
  {
    tag: "EMBEDDED",
    title: "Embedded Systems",
    body: "Microcontrollers, firmware, and hardware-software integration — building the systems that connect computing to the physical world.",
  },
];

export default function CoreCompetencies() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      <TraceDivider label="Core Competencies" className="mb-6" />
      <p className="text-gray max-w-2xl mb-10 leading-relaxed">
        Every Computer Engineering student at CIT-U completes both of the department&apos;s
        core pillars — this is a combined curriculum, not a choice between tracks.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((pillar) => (
          <Card key={pillar.title} className="p-6">
            <Tag>{pillar.tag}</Tag>
            <h3 className="font-display font-semibold text-lg text-paper mt-4 mb-2">
              {pillar.title}
            </h3>
            <p className="text-sm text-gray leading-relaxed">{pillar.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

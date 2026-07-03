import Tag from "@/components/ui/Tag";
import TraceDivider from "@/components/ui/TraceDivider";
import { FEATURED_RESEARCH } from "@/lib/research";

const PORTAL_URL = process.env.NEXT_PUBLIC_RESEARCH_PORTAL_URL ?? "#";

export default function ResearchHighlights() {
  const portalLive = PORTAL_URL !== "#";

  return (
    <section id="research" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <TraceDivider label="Research Highlights" as="h2" />
        {portalLive ? (
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-gold-text hover:text-maroon-bright transition-colors"
          >
            Browse the Research Portal →
          </a>
        ) : (
          <span className="text-[11px] font-mono text-gray">Research Portal — coming soon</span>
        )}
      </div>

      <p className="text-gray max-w-2xl mb-10 leading-relaxed">
        A look at the research coming out of the department. The full catalog lives in the
        Research Portal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_RESEARCH.map((item) => (
          <article
            key={item.id}
            className="via-card p-6 flex flex-col gap-3 hover:border-gold/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {item.area && <Tag tone="gold">{item.area}</Tag>}
              {item.year && <Tag tone="muted">{item.year}</Tag>}
              {item.isSample && <Tag tone="muted">Sample</Tag>}
            </div>

            <h3 className="font-display font-semibold text-base text-foreground group-hover:text-gold-text transition-colors duration-300">
              {item.title}
            </h3>

            <p className="text-sm text-gray font-light leading-relaxed flex-1">{item.summary}</p>

            {item.authors && item.authors.length > 0 && (
              <p className="text-[11px] text-gray font-mono">{item.authors.join(" · ")}</p>
            )}

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-gold-text hover:text-maroon-bright transition-colors pt-1"
              >
                Read more →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

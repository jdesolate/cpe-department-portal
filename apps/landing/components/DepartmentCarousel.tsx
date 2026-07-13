"use client";

import { useState, useEffect, useRef } from "react";
import Tag from "@/components/ui/Tag";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  subtitle: string;
  tag: string;
}

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: "cpe-slide-1",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    tag: "Innovation Lab",
    title: "Advanced Embedded Systems Engineering",
    subtitle: "Students designing hardware acceleration modules and IoT configurations inside our dedicated micro-processing suites.",
  },
  {
    id: "cpe-slide-2",
    type: "image",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop",
    tag: "National Convention",
    title: "ICpEP Regional Championships Winner",
    subtitle: "Celebrating our computer engineering team taking top honors in the national hardware programming sweepstakes.",
  },
  {
    id: "cpe-slide-3",
    type: "image",
    url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1920&auto=format&fit=crop",
    tag: "Research & Development",
    title: "Accredited Computer Vision Frameworks",
    subtitle: "Faculty-led publication deep-dives in artificial intelligence and real-time distributed processing architectures.",
  },
];

export default function DepartmentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const isPlaying = autoPlay && !isHovering;

  useEffect(() => {
    if (!isPlaying || DEFAULT_MEDIA[activeIndex].type === "video") return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEFAULT_MEDIA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 md:px-6 my-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsHovering(false);
      }}
    >
      <div
        className="relative h-115 md:h-130 w-full overflow-hidden rounded-[4px] bg-card border border-line group/carousel"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) < 50) return;
          setActiveIndex((prev) => (prev + (delta < 0 ? 1 : -1) + DEFAULT_MEDIA.length) % DEFAULT_MEDIA.length);
        }}
      >

        {DEFAULT_MEDIA.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={item.url}
                className="w-full h-full object-cover opacity-50"
                muted
                loop
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover opacity-45"
                loading="lazy"
              />
            )}

            {/* Scrim stays dark regardless of page theme, for caption legibility over arbitrary photo/video content */}
            <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/30 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 z-20 max-w-3xl space-y-3">
              <Tag>{item.tag}</Tag>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-background tracking-tight leading-tight">
                {item.title}
              </h2>
              <p className="text-sm md:text-base text-background/70 font-light max-w-2xl leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={() => setAutoPlay((prev) => !prev)}
          className="absolute top-4 left-4 z-30 h-11 w-11 flex items-center justify-center rounded-full bg-foreground/80 text-background pointer-fine:opacity-0 pointer-fine:group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-all duration-200 border border-line hover:border-gold active:scale-90 cursor-pointer"
          aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
          aria-pressed={!autoPlay}
        >
          {autoPlay ? "❚❚" : "▶"}
        </button>

        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + DEFAULT_MEDIA.length) % DEFAULT_MEDIA.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 flex items-center justify-center rounded-full bg-foreground/70 text-background pointer-fine:opacity-0 pointer-fine:group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-all duration-200 border border-line hover:border-gold active:scale-90 cursor-pointer"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % DEFAULT_MEDIA.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 flex items-center justify-center rounded-full bg-foreground/70 text-background pointer-fine:opacity-0 pointer-fine:group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-all duration-200 border border-line hover:border-gold active:scale-90 cursor-pointer"
          aria-label="Next slide"
        >
          →
        </button>

        {/* Each dot gets a 44px hit area; the visual diamond stays small inside it */}
        <div className="absolute top-4 right-4 z-30 flex items-center bg-foreground/80 px-1 rounded-[4px] border border-line">
          {DEFAULT_MEDIA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer group/dot"
              aria-label={`Slide ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <span
                className={`w-2 h-2 rotate-45 transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gold border border-gold"
                    : "bg-transparent border border-line group-hover/dot:border-background/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

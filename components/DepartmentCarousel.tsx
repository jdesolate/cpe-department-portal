"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  subtitle: string;
  tag: string;
}

// Sample mock data pointing to optimized external CDN paths
const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: "cpe-slide-1",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Replace with actual department video or loop
    tag: "Innovation Lab",
    title: "Advanced Embedded Systems Engineering",
    subtitle: "Students designing hardware acceleration modules and IoT configurations inside our dedicated micro-processing suites."
  },
  {
    id: "cpe-slide-2",
    type: "image",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop", // Replace with school asset
    tag: "National Convention",
    title: "ICpEP Regional Championships Winner",
    subtitle: "Celebrating our computer engineering team taking top honors in the national hardware programming sweepstakes."
  },
  {
    id: "cpe-slide-3",
    type: "image",
    url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1920&auto=format&fit=crop",
    tag: "Research & Development",
    title: "Accredited Computer Vision Frameworks",
    subtitle: "Faculty led publication deep-dives in artificial intelligence and real-time distributed processing architectures."
  }
];

export default function DepartmentCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!isPlaying || DEFAULT_MEDIA[activeIndex].type === "video") return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEFAULT_MEDIA.length);
    }, 6000); // Rotate non-video assets every 6 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % DEFAULT_MEDIA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + DEFAULT_MEDIA.length) % DEFAULT_MEDIA.length);
  };

  // Synchronize playing states for inline video embeds
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => console.log("Autoplay blocked by client policies"));
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 md:px-6 my-12"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="relative h-[480px] md:h-[540px] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-200/60 shadow-lg group/carousel">

        {/* Media Track */}
        {DEFAULT_MEDIA.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
          >
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={item.url}
                className="w-full h-full object-cover opacity-60 mix-blend-lighten"
                muted
                loop
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover opacity-50"
                loading="lazy"
              />
            )}

            {/* Content Text Overlay Guard */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Context Content Box */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 z-20 max-w-3xl space-y-3">
              <Badge className="bg-university-gold text-slate-950 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm border-none">
                {item.tag}
              </Badge>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                {item.title}
              </h2>
              <p className="text-sm md:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Manual Arrow Controls (Revealed seamlessly during user hover interactions) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 border border-white/10 active:scale-90 cursor-pointer"
          aria-label="Previous slide"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 border border-white/10 active:scale-90 cursor-pointer"
          aria-label="Next slide"
        >
          &rarr;
        </button>

        {/* Linear Progress Pagination Overlay */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          {DEFAULT_MEDIA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${index === activeIndex ? "w-6 bg-university-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

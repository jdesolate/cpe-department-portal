"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import StatBlock from "@/components/ui/StatBlock";
import TraceDivider from "@/components/ui/TraceDivider";
import { cn } from "@/lib/utils";

// Output-forward figures per the brief; add Competition Participations / Research Outputs once real counts are available.
const STATS = [
  { value: "65+", label: "Student Projects / Year" },
  { value: "~600", label: "Students Enrolled" },
  { value: "13+", label: "Faculty Members" },
];

// Drop a real photo at public/hero/department-hero.png to replace the abstract
// fallback below. Starts false (fallback shown) and only flips on a successful
// load, so a missing file never causes a flash of low-contrast text.
const HERO_PHOTO_SRC = "/hero/department-hero.png";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasPhoto, setHasPhoto] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 50]);
  const taglineY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between px-4 md:px-8"
    >
      {/* Background photo — only takes over once it has actually loaded */}
      <Image
        src={HERO_PHOTO_SRC}
        alt="CpE Department students and faculty at CIT-U"
        fill
        priority
        sizes="100vw"
        className={cn("object-cover transition-opacity duration-500", hasPhoto ? "opacity-100" : "opacity-0")}
        onLoad={(e) => {
          // Next's local image optimizer can return 200 with a 0x0 placeholder
          // for a missing file, which still fires `load` — naturalWidth catches that.
          if (e.currentTarget.naturalWidth > 0) setHasPhoto(true);
        }}
      />

      {hasPhoto ? (
        // Scrim for text legibility over the photo
        <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/60 to-foreground/30" />
      ) : (
        <>
          {/* Dot-grid texture (fallback until a real hero photo is added) */}
          <div className="absolute inset-0 dot-grid" />

          {/* Decorative circuit lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a3333f" stopOpacity="0" />
                  <stop offset="50%" stopColor="#a3333f" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a3333f" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGrad)" strokeWidth="0.5" />
              <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#lineGrad)" strokeWidth="0.5" />
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#lineGrad)" strokeWidth="0.5" />
              <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#lineGrad)" strokeWidth="0.5" />
            </svg>
          </div>
        </>
      )}

      {/* Bottom fade back into the page background */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-background to-transparent" />

      {/* Core content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-16 my-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <TraceDivider label="ICpEP · CIT-U · Computer Engineering" className="max-w-md" light={hasPhoto} />
        </motion.div>

        <motion.h1
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={cn(
            "font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none will-change-transform",
            hasPhoto && "text-white"
          )}
        >
          Building industry-ready <br />
          <span className={hasPhoto ? "text-gold" : "text-maroon-bright"}>software &amp; embedded systems engineers.</span>
        </motion.h1>

        <motion.p
          style={{ y: taglineY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={cn(
            "text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed will-change-transform",
            hasPhoto ? "text-white/85" : "text-gray"
          )}
        >
          Where CIT-U Computer Engineering students build real software and embedded systems —
          through projects, research, competitions, and professional activities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a href="#featured-projects" className="w-full sm:w-auto">
            <Button variant="solid" className="w-full sm:w-auto">
              Explore Student Projects
            </Button>
          </a>
          <a href="#research" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className={cn("w-full sm:w-auto", hasPhoto && "border-white text-white hover:bg-white hover:text-foreground")}
            >
              View Research
            </Button>
          </a>
          <a href="#services" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className={cn("w-full sm:w-auto", hasPhoto && "border-white text-white hover:bg-white hover:text-foreground")}
            >
              Browse Tools
            </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats bar + scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 w-full max-w-7xl mx-auto pb-8 space-y-6"
      >
        <div className={cn("flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em]", hasPhoto ? "text-white/70" : "text-gray")}>
          <span>scroll to explore</span>
          <motion.svg
            animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </div>

        <div className="hidden md:flex justify-center gap-16">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} value={stat.value} label={stat.label} light={hasPhoto} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

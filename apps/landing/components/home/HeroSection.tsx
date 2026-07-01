"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import StatBlock from "@/components/ui/StatBlock";
import TraceDivider from "@/components/ui/TraceDivider";

const STATS = [
  { value: "~600", label: "Active Students" },
  { value: "15+", label: "Full-time Faculty" },
  { value: "2", label: "Core Specializations" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
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
      {/* Dot-grid texture */}
      <div className="absolute inset-0 dot-grid" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-ink to-transparent" />

      {/* Decorative circuit lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f2b705" stopOpacity="0" />
              <stop offset="50%" stopColor="#f2b705" stopOpacity="1" />
              <stop offset="100%" stopColor="#f2b705" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGrad)" strokeWidth="0.5" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#lineGrad)" strokeWidth="0.5" />
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="url(#lineGrad)" strokeWidth="0.5" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="url(#lineGrad)" strokeWidth="0.5" />
        </svg>
      </div>

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
          <TraceDivider label="ICpEP · CIT-U · Computer Engineering" className="max-w-md" />
        </motion.div>

        <motion.h1
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-8xl tracking-tight leading-none will-change-transform"
        >
          Engineering the next generation <br />
          <span className="text-gold">of computer engineers.</span>
        </motion.h1>

        <motion.p
          style={{ y: taglineY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-gray max-w-2xl mx-auto font-normal leading-relaxed will-change-transform"
        >
          The academic home for Computer Engineering students, faculty, and researchers at CIT-U.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <a href="#portal-dashboard" className="w-full sm:w-auto">
            <Button variant="solid" className="w-full sm:w-auto">
              Explore Department
            </Button>
          </a>
          <a href="/events" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Upcoming Events
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
        <div className="flex flex-col items-center gap-1 text-gray font-mono text-[10px] uppercase tracking-[0.2em]">
          <span>scroll to explore</span>
          <motion.svg
            animate={{ y: [0, 4, 0] }}
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
            <StatBlock key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

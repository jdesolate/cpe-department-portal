"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between px-4 md:px-8"
    >
      {/* Dot-grid texture */}
      <div className="absolute inset-0 dot-grid" />

      {/* Bottom fade to blend into next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-bg-base to-transparent" />

      {/* Decorative circuit lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
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
        >
          <Badge className="bg-accent-glow/10 text-accent-glow border border-accent-glow/30 rounded-full font-mono tracking-widest px-4 py-1.5 text-xs uppercase hover:bg-accent-glow/20 transition-colors">
            ⚡ ICpEP · Academic Hub · v2.0
          </Badge>
        </motion.div>

        <motion.h1
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none will-change-transform"
        >
          The Digital Pulse <br />
          <span className="gradient-text">of Computer Engineering</span>
        </motion.h1>

        <motion.p
          style={{ y: taglineY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-normal leading-relaxed will-change-transform"
        >
          Bridging official department administration, institutional research, and real-time student culture under one unified portal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-base h-13 px-8 rounded-xl glow-btn hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
              Institutional Sign In
            </button>
          </Link>
          <a href="#portal-dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-transparent hover:bg-bg-surface text-text-primary border border-border-subtle hover:border-border-glow font-medium text-base h-13 px-8 rounded-xl transition-all cursor-pointer">
              Explore Portal
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats bar + scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 w-full max-w-7xl mx-auto pb-8 space-y-4"
      >
        <div className="flex flex-col items-center gap-1 text-text-dim font-mono text-[10px] uppercase tracking-[0.2em]">
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

        <div className="glass-card glow-border rounded-xl py-4 hidden md:block">
          <div className="grid grid-cols-3 text-center divide-x divide-border-subtle">
            <div>
              <p className="text-2xl font-black gradient-text">600+</p>
              <p className="text-[10px] text-text-dim font-mono uppercase tracking-widest mt-0.5">Active Nodes</p>
            </div>
            <div>
              <p className="text-2xl font-black text-accent-glow">100%</p>
              <p className="text-[10px] text-text-dim font-mono uppercase tracking-widest mt-0.5">Domain Verified</p>
            </div>
            <div>
              <p className="text-2xl font-black text-grad-cyan">Real-time</p>
              <p className="text-[10px] text-text-dim font-mono uppercase tracking-widest mt-0.5">Ecosystem Synced</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

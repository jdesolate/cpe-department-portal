"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Parallax speed: positive = slides up, negative = slides down. Range ±60px. */
  speed?: number;
}

export default function ParallaxLayer({ children, className, speed = 40 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clamped = Math.min(Math.abs(speed), 60) * Math.sign(speed);
  const y = useTransform(scrollYProgress, [0, 1], [clamped, -clamped]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

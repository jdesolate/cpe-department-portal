"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}

const container = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const item = (y: number) => ({
  hidden: { opacity: 0, y },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
});

export default function StaggerChildren({ children, className, stagger = 0.08, y = 16 }: StaggerChildrenProps) {
  return (
    <motion.div
      variants={container(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item(y)}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item(y)}>{children}</motion.div>
      }
    </motion.div>
  );
}

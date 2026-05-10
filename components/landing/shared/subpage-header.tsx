"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SubpageHeaderProps {
  overline: string;
  title: string;
  subtitle: string;
}

export function SubpageHeader({ overline, title, subtitle }: SubpageHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative overflow-hidden bg-white pt-32 sm:pt-40 pb-4">
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full text-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {overline}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-mitologi-navy tracking-tight leading-[1.1] mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}

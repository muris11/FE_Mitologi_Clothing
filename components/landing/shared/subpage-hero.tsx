"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SubpageHero({
  title,
  subtitle,
  badge,
  badgeText,
}: {
  title: string;
  subtitle?: string;
  badge?: boolean;
  badgeText?: string;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative h-[40vh] min-h-[340px] max-h-[440px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-800/30">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-mitologi-gold/15 rounded-full blur-[80px] -translate-y-1/2 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-mitologi-navy-light/40 rounded-full blur-[80px] translate-y-1/2 -z-0" />

      <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {badge && (
            <div className="inline-flex items-center gap-x-2 rounded-full border border-mitologi-gold/30 bg-mitologi-gold/10 px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="text-xs font-sans font-bold tracking-widest text-mitologi-gold uppercase">
                {badgeText || title}
              </span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-semibold text-white tracking-tight mb-4 leading-[1.15]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

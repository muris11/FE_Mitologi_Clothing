"use client";

import { SiteSettings } from "lib/api/types";
import { motion, useReducedMotion } from "framer-motion";

export function AboutPageHero({ settings }: { settings?: SiteSettings }) {
  const shouldReduceMotion = useReducedMotion();
  const siteName = settings?.general?.siteName || "Mitologi Clothing";
  const tagline = settings?.about?.aboutHeadline || settings?.general?.siteTagline || "Vendor Clothing profesional dari Indramayu yang mengutamakan kualitas, ketepatan waktu, dan nilai budaya.";

  const fadeUp = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative flex items-end overflow-hidden bg-white pt-32 sm:pt-40 pb-12 sm:pb-16">
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full text-center">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tentang Kami
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-mitologi-navy tracking-tight leading-[1.1] mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {siteName}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}

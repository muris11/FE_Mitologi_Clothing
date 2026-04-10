"use client";

import { motion } from "framer-motion";

export function PortofolioHero() {
  return (
    <section className="relative h-[40vh] min-h-[320px] max-h-[420px] flex items-center justify-center bg-mitologi-navy overflow-hidden border-b border-slate-200/20">
      {/* Decorative Blur Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0"
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight mb-6 drop-shadow-sm">
            Portofolio Kami
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto drop-shadow-sm">
            Lihat hasil karya nyata yang telah kami kerjakan untuk klien-klien
            hebat kami.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Legacy alias used by pages that import `HeroSection`
export const HeroSection = PortofolioHero;

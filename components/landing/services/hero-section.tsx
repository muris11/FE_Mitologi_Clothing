"use client";

import { SiteSettings } from "lib/api/types";
import { motion } from "framer-motion";

export function ServicesHero({ settings }: { settings?: SiteSettings }) {
  const tagline =
    settings?.general?.siteTagline ||
    settings?.general?.siteDescription ||
    "Solusi lengkap untuk kebutuhan produksi pakaian Anda dengan kualitas terbaik.";

  const title = "Layanan Produksi";

  return (
    <section className="relative h-[40vh] min-h-[320px] max-h-[420px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-200/20">
      {/* Decorative Blur Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-mitologi-gold/20 rounded-full blur-[120px] -translate-y-1/2 -z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-mitologi-navy-light/50 rounded-full blur-[120px] translate-y-1/2 -z-0"
      />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <p className="text-slate-300 font-sans font-bold tracking-widest uppercase text-sm mb-6 drop-shadow-sm">
            Program Kerja
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6 drop-shadow-sm">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

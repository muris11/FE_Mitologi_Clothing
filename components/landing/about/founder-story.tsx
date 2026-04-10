"use client";

import { motion } from "framer-motion";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";

interface FounderStoryProps {
  settings?: SiteSettings;
}

export function FounderStory({ settings }: FounderStoryProps) {
  const name = settings?.about?.founderName;
  const role = settings?.about?.founderRole || "Founder & CEO";
  const story = settings?.about?.founderStory;
  const photo = settings?.about?.founderPhoto;

  if (!name || !story) return null;

  return (
    <section className="relative py-24 sm:py-32 bg-mitologi-cream overflow-hidden">
      {/* Abstract Background Element */}
      <motion.div
        className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-white rounded-full opacity-50 blur-3xl pointer-events-none"
        initial={{ opacity: 0.3, scale: 0.9 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Founder Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative w-full aspect-[4/5] max-w-xs sm:max-w-sm mx-auto lg:max-w-sm lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 translate-x-4 translate-y-4">
              {photo ? (
                <img
                  src={storageUrl(photo)}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400 font-sans tracking-widest uppercase text-xs">
                    No Image
                  </span>
                </div>
              )}
            </div>

            {/* Offset Accent Box */}
            <div className="absolute inset-0 bg-mitologi-navy rounded-[2rem] translate-x-0 translate-y-0 z-0"></div>

            {/* Floating Badge */}
            <div className="absolute bottom-12 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="block text-3xl font-bold text-mitologi-navy mb-1 leading-none">
                10+
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Tahun
                <br />
                Pengalaman
              </span>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-1 bg-mitologi-gold"></span>
              <span className="text-[10px] font-bold font-sans text-mitologi-navy uppercase tracking-[0.3em]">
                Kisah Pendiri
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-mitologi-navy mb-8 leading-[1.1]">
              Dari Sebuah Ide Kecil Menjadi{" "}
              <span className="text-mitologi-gold">Standar Kualitas</span>.
            </h2>

            <div className="relative mb-10">
              {/* Large quote icon watermark */}
              <div className="absolute -top-6 -left-4 text-7xl text-slate-200 font-serif leading-none italic pointer-events-none opacity-50 z-0">
                "
              </div>

              <div className="relative z-10 text-slate-700 font-sans text-base sm:text-lg leading-relaxed space-y-6">
                {story.includes("\n") ? (
                  story
                    .split("\n")
                    .filter(Boolean)
                    .map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <p>{story}</p>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200/60 flex items-center gap-6">
              <div>
                <p className="text-xl font-bold font-sans tracking-tight text-mitologi-navy mb-1">
                  {name}
                </p>
                <p className="text-xs font-bold font-sans text-mitologi-gold uppercase tracking-[0.2em]">
                  {role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

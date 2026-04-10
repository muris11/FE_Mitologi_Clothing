"use client";

import { motion } from "framer-motion";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";

export function AboutHistory({ settings }: { settings?: SiteSettings }) {
  const foundedYear =
    settings?.general?.companyFoundedYear ||
    settings?.about?.companyFoundedYear ||
    "";
  const siteName = settings?.general?.siteName || "Mitologi Clothing";
  const shortHistory = settings?.about?.aboutShortHistory || "";

  // Split history text into paragraphs
  const historyParagraphs = shortHistory
    ? shortHistory.split("\n").filter((p: string) => p.trim())
    : [];

  // Get logo meaning from detailed JSON data and parse it
  const logoMeaningDetailedRaw = settings?.about?.aboutLogoMeaningDetailed;
  const logoMeanings = logoMeaningDetailedRaw
    ? typeof logoMeaningDetailedRaw === "string"
      ? JSON.parse(logoMeaningDetailedRaw)
      : logoMeaningDetailedRaw
    : [];

  const descriptions = [
    settings?.about?.aboutDescription1,
    settings?.about?.aboutDescription2,
  ].filter(Boolean);

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
      {/* Background Decorative Graphic */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5 w-fit"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-mitologi-navy font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs">
                Sejarah & Identitas
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-sans font-black mb-8 leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-mitologi-gold">Perjalanan {siteName}</span>
            </motion.h2>

            <div className="relative">
              {/* Decorative Line */}
              <div className="absolute top-2 bottom-0 left-[11px] w-px bg-gradient-to-b from-mitologi-gold via-slate-200 to-transparent" />

              <div className="space-y-8 pl-8 sm:pl-10">
                {/* Descriptions Loop */}
                {descriptions.length > 0 && (
                  <div className="space-y-5">
                    <div className="absolute left-[7px] top-[6px] w-[9px] h-[9px] rounded-full bg-mitologi-gold ring-4 ring-white" />
                    {descriptions.map((desc, idx) => (
                      <p
                        key={`desc-${idx}`}
                        className="text-slate-600 leading-[1.7] font-sans font-medium text-sm sm:text-[15px] lg:text-base text-justify"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                )}

                {/* History Loop */}
                {historyParagraphs.length > 0 && (
                  <div className="space-y-5 pt-4">
                    <div className="absolute left-[7px] mt-[6px] w-[9px] h-[9px] rounded-full bg-mitologi-navy ring-4 ring-white" />
                    {historyParagraphs.map((paragraph: string, idx: number) => (
                      <p
                        key={`hist-${idx}`}
                        className="text-slate-500 leading-[1.7] font-sans text-sm sm:text-[15px] lg:text-base text-justify"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="lg:col-span-5 xl:col-span-6 mt-10 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none group">
              {/* Accent Backgrounds for Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-mitologi-gold/20 to-mitologi-navy/5 rounded-[2.5rem] transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] transform -translate-x-3 -translate-y-3 sm:-translate-x-6 sm:-translate-y-6 transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4 bg-white/50 backdrop-blur-sm" />

              <div className="relative aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden bg-white shadow-xl flex items-center justify-center p-8 sm:p-12 z-10 border border-slate-100">
                <img
                  src={storageUrl(
                    settings?.about?.aboutImage,
                    "/images/logo.png",
                  )}
                  alt={`${siteName} Logo`}
                  className="object-contain w-full h-full filter drop-shadow hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Info Badge Floating */}
                {foundedYear && (
                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 bg-white/95 backdrop-blur shadow-lg border border-slate-100 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl flex items-center gap-4 group-hover:-translate-y-2 transition-transform duration-500">
                    <div>
                      <p className="text-[10px] sm:text-xs font-sans font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        Berdiri Sejak
                      </p>
                      <p className="text-base sm:text-lg font-sans font-black text-mitologi-navy tracking-tight text-center">
                        {foundedYear}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Makna Logo (Premium Grid Layout) */}
        {logoMeanings.length > 0 && (
          <motion.div
            className="mt-24 sm:mt-32 pt-20 border-t border-slate-200/60"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.span
                className="text-mitologi-gold font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs mb-4 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Filosofi Estetika
              </motion.span>
              <motion.h3
                className="text-3xl sm:text-4xl font-sans font-black text-mitologi-navy tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Makna Logo Kami
              </motion.h3>
              <motion.p
                className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Setiap elemen visual dirancang dengan kebanggaan untuk membentuk
                cerita "MITOLOGI" sebagai identitas seragam yang konsisten dan
                profesional.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {logoMeanings.map(
                (
                  item: { letter: string; description: string },
                  idx: number,
                ) => {
                  const letter = item.letter?.toUpperCase() || String(idx + 1);
                  const description = item.description || "";
                  const order = String(idx + 1).padStart(2, "0");

                  return (
                    <motion.div
                      key={`meaning-${idx}`}
                      className="relative group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-mitologi-gold/30 transition-all duration-300 overflow-hidden flex flex-col"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
                    >
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-mitologi-navy/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4 sm:mb-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-mitologi-navy text-white flex items-center justify-center font-sans font-black text-xl shadow-md group-hover:scale-110 group-hover:bg-mitologi-gold group-hover:text-mitologi-navy transition-all duration-300">
                            {letter}
                          </div>
                          <span className="text-xl sm:text-2xl font-sans font-black text-slate-100 group-hover:text-mitologi-navy/5 transition-colors duration-300">
                            {order}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-[1.6] sm:leading-[1.7] font-sans font-medium text-[13px] sm:text-[14px] mt-auto">
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  );
                },
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

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

  const historyParagraphs = shortHistory
    ? shortHistory.split("\n").filter((p: string) => p.trim())
    : [];

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
    <section className="relative overflow-hidden">
      {/* Main content */}
      <div className="relative pb-24 sm:pb-32 bg-slate-50">
        <motion.div
          className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="size-[520px] top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-mitologi-gold/10 pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Main History Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-24">
          {/* Text Side */}
          <motion.div
            className="text-sm text-slate-600 max-w-lg text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="text-xl uppercase font-semibold text-mitologi-navy">Sejarah & Identitas</h2>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-mitologi-gold to-mitologi-gold/20 mb-8 mt-2 mx-auto md:mx-0" />

            {descriptions.map((desc, idx) => (
              <p key={`desc-${idx}`} className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                {desc}
              </p>
            ))}

            {historyParagraphs.map((paragraph: string, idx: number) => (
              <p key={`hist-${idx}`} className="mt-4 text-slate-500 leading-relaxed text-sm sm:text-base">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative shadow-2xl shadow-mitologi-navy/20 rounded-2xl overflow-hidden shrink-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            <img
              className="max-w-md w-full object-cover rounded-2xl aspect-square"
              src={storageUrl(settings?.about?.aboutImage, "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop")}
              alt={`${siteName}`}
            />
            {foundedYear && (
              <div className="flex items-center gap-2 sm:gap-3 absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-slate-100 max-w-[calc(100%-32px)]">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5 sm:mb-1">Berdiri Sejak</span>
                  <span className="text-base sm:text-lg font-black text-mitologi-navy leading-none">{foundedYear}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Makna Logo (Premium Grid Layout) */}
        {logoMeanings.length > 0 && (
          <motion.div
            className="mt-4 pt-20 border-t border-slate-200/60"
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
                (item: { letter: string; description: string }, idx: number) => {
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
                      <div className="absolute inset-0 bg-gradient-to-br from-mitologi-navy/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4 sm:mb-6">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-mitologi-navy text-white flex items-center justify-center font-sans font-black text-xl shadow-md group-hover:scale-110 group-hover:bg-mitologi-gold group-hover:text-mitologi-navy transition-all duration-300">
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
      </div>
    </section>
  );
}

"use client";

import { SiteSettings } from "lib/api/types";
import { motion, useReducedMotion } from "framer-motion";

function AnimatedContainer({ className, delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CompanyLegality({ settings }: { settings?: SiteSettings }) {
  const legality = settings?.legality;
  const fallback = settings?.about;

  if (!legality && !fallback) return null;

  const items = [
    {
      label: "Nama Badan Usaha",
      value: legality?.legalCompanyName || fallback?.legalCompanyName,
    },
    {
      label: "Alamat Resmi",
      value: legality?.legalAddress || fallback?.legalAddress,
    },
    {
      label: "Bidang Usaha",
      value: legality?.legalBusinessField || fallback?.legalBusinessField,
    },
    { label: "NPWP", value: legality?.legalNpwp || fallback?.legalNpwp },
    { label: "NIB", value: legality?.legalNib || fallback?.legalNib },
    { label: "NMID", value: legality?.legalNmid || fallback?.legalNmid },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-slate-50">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-5 sm:px-8">
        <AnimatedContainer className="text-center sm:text-left">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Informasi Legal
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-mitologi-navy">
            Legalitas Perusahaan
          </h2>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-dashed border border-dashed border-slate-200 rounded-2xl overflow-hidden bg-white"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-7 hover:bg-slate-50/80 transition-colors duration-200 cursor-pointer"
            >
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-mitologi-gold transition-colors duration-200">
                {item.label}
              </p>
              <p className="text-sm sm:text-base font-bold text-mitologi-navy">
                {item.value}
              </p>
            </div>
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

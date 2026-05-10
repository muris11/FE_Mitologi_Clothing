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

export function AboutVisionMission({ settings }: { settings?: SiteSettings }) {
  const vision =
    settings?.visionMission?.visionText || settings?.about?.visionText || "";

  const missionText =
    settings?.visionMission?.missionText || settings?.about?.missionText || "";
  const missions = missionText
    ? missionText.split("\n").filter((m: string) => m.trim())
    : [];

  const valuesText =
    settings?.visionMission?.valuesText || settings?.about?.valuesText || "";
  const values =
    settings?.companyValuesData && settings.companyValuesData.length > 0
      ? settings.companyValuesData.map((v) => ({
          title: v.title,
          desc: v.description || v.desc || "",
        }))
      : valuesText
        ? valuesText
            .split("\n")
            .filter((v: string) => v.trim())
            .map((v: string) => {
              const parts = v.split(":");
              return {
                title: parts[0]?.trim() || v,
                desc: parts[1]?.trim() || "",
              };
            })
        : [];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-16 px-5 sm:px-8">

        {/* Visi */}
        {vision && (
          <AnimatedContainer className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-4">
              Visi Kami
            </span>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium text-mitologi-navy leading-relaxed">
              &ldquo;{vision}&rdquo;
            </blockquote>
          </AnimatedContainer>
        )}

        {/* Misi */}
        {missions.length > 0 && (
          <AnimatedContainer delay={0.3}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-6">
              Misi Kami
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-dashed border border-dashed border-slate-200 rounded-2xl overflow-hidden">
              {missions.map((item: string, idx: number) => (
                <div key={idx} className="p-5 sm:p-6 flex gap-4 items-start hover:bg-slate-50/80 transition-colors duration-200">
                  <span className="flex-none flex items-center justify-center w-8 h-8 rounded-lg bg-mitologi-navy text-white font-bold text-sm">
                    {idx + 1}
                  </span>
                  <span className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        )}

        {/* Nilai Perusahaan */}
        {values.length > 0 && (
          <AnimatedContainer delay={0.5}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-6">
              Nilai Perusahaan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-dashed border border-dashed border-slate-200 rounded-2xl overflow-hidden">
              {values.map((val: { title: string; desc: string }, idx: number) => (
                <div key={idx} className="group p-6 sm:p-7 hover:bg-slate-50/80 transition-colors duration-200 cursor-pointer">
                  <h3 className="font-bold text-base text-mitologi-navy mb-1.5 group-hover:text-mitologi-gold transition-colors duration-200">
                    {val.title}
                  </h3>
                  {val.desc && (
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {val.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </AnimatedContainer>
        )}

      </div>
    </section>
  );
}

"use client";

import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { SiteSettings } from "lib/api/types";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

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
    <MotionSection className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-mitologi-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        {/* ── Visi ── */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-3 mb-6 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5">
            <span className="text-mitologi-navy font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs">
              Visi Kami
            </span>
          </div>

          <blockquote className="relative px-10 sm:px-16">
            <span className="absolute top-0 left-0 text-7xl sm:text-8xl font-serif text-mitologi-gold/20 leading-[0.8] select-none">
              &ldquo;
            </span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-slate-700 leading-relaxed">
              {vision}
            </p>
            <span className="absolute bottom-0 right-0 text-7xl sm:text-8xl font-serif text-mitologi-gold/20 leading-[0.8] select-none rotate-180">
              &ldquo;
            </span>
          </blockquote>
        </div>

        {/* ── Misi & Nilai ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Misi */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-mitologi-navy text-white shadow-lg shadow-mitologi-navy/20">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-mitologi-navy tracking-tight">
                Misi Kami
              </h3>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 hover:shadow-xl hover:border-mitologi-gold/30 transition-all duration-300">
              <ul className="space-y-4">
                {missions.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="flex-none flex items-center justify-center w-8 h-8 rounded-xl bg-mitologi-gold/10 text-mitologi-gold font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-slate-600 font-sans font-medium text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nilai */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-mitologi-gold text-white shadow-lg shadow-mitologi-gold/20">
                <StarIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-mitologi-navy tracking-tight">
                Nilai Perusahaan
              </h3>
            </div>

            <StaggerGrid className="grid grid-cols-2 gap-4">
              {values.map(
                (val: { title: string; desc: string }, idx: number) => (
                  <StaggerGridItem
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-mitologi-gold/30 transition-all duration-300"
                  >
                    <h4 className="font-sans font-bold text-base text-mitologi-navy mb-2 flex items-center gap-2.5">
                      <span className="flex-none w-2 h-2 rounded-full bg-mitologi-gold" />
                      {val.title}
                    </h4>
                    {val.desc && (
                      <p className="text-sm text-slate-500 font-sans font-medium leading-relaxed">
                        {val.desc}
                      </p>
                    )}
                  </StaggerGridItem>
                ),
              )}
            </StaggerGrid>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

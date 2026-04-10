"use client";

import {
  ArrowPathIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "components/ui/section-heading";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";
import { SiteSettings } from "lib/api/types";

export function WhyChooseUs({ settings }: { settings?: SiteSettings }) {
  // Parse guarantees data from settings
  const guarantees =
    settings?.guaranteesData && settings.guaranteesData.length > 0
      ? settings.guaranteesData.map((g, i) => ({
          title: g.title,
          subtitle: "",
          desc: g.description || g.desc || "",
          icon: [ClockIcon, HandThumbUpIcon, ArrowPathIcon][i % 3] || ClockIcon,
        }))
      : [];

  if (guarantees.length === 0) return null;

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-white border-t border-slate-200/50 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Kenapa Memilih Kami?"
            title="Standar Kualitas Terbaik"
            subtitle="Komitmen kami adalah memberikan hasil terbaik dengan standar produksi profesional."
            className="items-center"
          />
          <p className="font-bold text-mitologi-navy font-sans uppercase tracking-wider text-sm mt-4">
            Kepuasan Anda adalah prioritas utama kami.
          </p>
        </div>

        {/* Features Grid - Mobile 2-Col Compact / Desktop 3-Col */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {guarantees.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <StaggerGridItem
                key={index}
                className="flex flex-col relative bg-white rounded-2xl p-5 md:p-8 border border-slate-100 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 h-full justify-between group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-mitologi-navy mb-4 sm:mb-6 group-hover:bg-mitologi-navy group-hover:text-mitologi-gold transition-colors duration-300 shadow-sm border border-slate-100">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-lg sm:text-xl font-sans font-bold text-mitologi-navy tracking-tight mb-1">
                    {feature.title}
                  </h4>
                  {feature.subtitle && (
                    <p className="text-[10px] font-bold font-sans text-mitologi-gold uppercase tracking-widest mt-1">
                      {feature.subtitle}
                    </p>
                  )}
                </div>

                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {feature.desc.includes("\n") ? (
                    <ul className="space-y-3 text-left">
                      {feature.desc
                        .split("\n")
                        .map((line: string, i: number) => (
                          <li key={i} className="flex gap-3 items-start">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mitologi-gold flex-shrink-0 shadow-sm" />
                            <span>{line.replace(/^\d+\.\s*/, "")}</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>{feature.desc}</p>
                  )}
                </div>
              </StaggerGridItem>
            );
          })}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

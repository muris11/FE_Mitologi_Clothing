"use client";

import { Card } from "components/ui/card";
import { SectionHeading } from "components/ui/section-heading";
import { Material } from "lib/api/types";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

const COLOR_THEMES: Record<string, string> = {
  "bg-gray-100 text-gray-800": "bg-gray-100 text-gray-800",
  "bg-green-100 text-green-800": "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800": "bg-blue-100 text-blue-800",
  "bg-red-100 text-red-800": "bg-red-100 text-red-800",
  "bg-amber-100 text-amber-800": "bg-amber-100 text-amber-800",
  "bg-indigo-100 text-indigo-800": "bg-indigo-100 text-indigo-800",
  "bg-teal-100 text-teal-800": "bg-teal-100 text-teal-800",
};

export function MaterialShowcase({
  materials = [],
}: {
  materials?: Material[];
}) {
  if (materials.length === 0) return null;

  return (
    <MotionSection className="bg-white py-24 sm:py-32 border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Pilihan Material"
            title="Bahan Kualitas Premium"
            className="items-center text-center"
          />
          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600 font-sans font-medium max-w-2xl text-center">
            Kami menyediakan berbagai jenis kain sesuai kebutuhan produk Anda,
            mulai dari kaos santai hingga seragam formal.
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {materials.map((material) => {
            const themeClass =
              material.colorTheme && COLOR_THEMES[material.colorTheme]
                ? COLOR_THEMES[material.colorTheme]
                : "bg-mitologi-navy/5 text-mitologi-navy";

            return (
              <StaggerGridItem key={material.id}>
                <Card className="group relative p-5 sm:p-8 flex flex-col justify-between rounded-2xl border border-slate-100 bg-white shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                  {/* Top border effect */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-mitologi-gold to-mitologi-navy origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />

                  <div className="relative z-20">
                    {material.colorTheme && (
                      <div className="mb-5">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold font-sans uppercase tracking-widest ${themeClass}`}
                        >
                          {material.name}
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg sm:text-2xl font-sans font-bold text-mitologi-navy tracking-tight mb-2 sm:mb-3 group-hover:text-mitologi-gold transition-colors duration-300">
                      {material.name}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-sans font-medium">
                      {material.description}
                    </p>
                  </div>
                </Card>
              </StaggerGridItem>
            );
          })}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import { SectionHeading } from "components/ui/section-heading";
import { PrintingMethod } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function PrintingMethods({ methods }: { methods?: PrintingMethod[] }) {
  if (!methods || methods.length === 0) return null;

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-mitologi-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Eksplorasi Teknik Sablon"
            title="Pilih Sesuai Kebutuhan Anda"
            subtitle="Kami menyediakan berbagai teknik printing berkualitas tinggi, dari sablon manual legendaris hingga digital printing modern."
            className="items-center"
          />
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-[1440px] mx-auto">
          {methods.map((method, index) => (
            <StaggerGridItem
              key={method.id}
              className="group flex flex-col bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-mitologi-gold/30 hover:-translate-y-2 transition-all duration-300 relative"
            >
              {/* Number Badge */}
              <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-mitologi-navy/90 text-white font-bold font-sans flex items-center justify-center text-sm shadow-md backdrop-blur-sm border border-white/10 group-hover:bg-mitologi-gold group-hover:text-mitologi-navy transition-colors duration-300">
                {index + 1}
              </div>

              {/* Image Header */}
              <div className="relative w-full aspect-square sm:aspect-auto sm:h-64 bg-slate-100 overflow-hidden">
                {method.image ? (
                  <>
                    <Image
                      src={storageUrl(method.image)}
                      alt={method.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/90 via-mitologi-navy/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-mitologi-navy to-slate-800 opacity-90"></div>
                )}

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                  <h3 className="text-lg sm:text-2xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-mitologi-gold transition-colors duration-300 line-clamp-2">
                    {method.name}
                  </h3>
                  {method.priceRange && (
                    <span className="inline-block mt-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold font-sans text-white border border-white/20">
                      {method.priceRange}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-6 flex flex-col flex-1 bg-white">
                <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 sm:line-clamp-none">
                  {method.description}
                </p>

                <div className="mt-auto">
                  <h4 className="text-[10px] sm:text-xs font-bold text-mitologi-gold uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-mitologi-gold/50"></span>
                    Keunggulan
                  </h4>

                  {method.pros && method.pros.length > 0 && (
                    <ul className="space-y-2 sm:space-y-3">
                      {method.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-mitologi-navy flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-sans text-slate-700 font-medium">
                            {pro}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </StaggerGridItem>
          ))}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

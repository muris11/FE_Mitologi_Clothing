"use client";

import {
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { useEffect, useMemo, useState } from "react";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function AboutSection({ settings }: { settings?: SiteSettings }) {
  const foundedYear =
    settings?.general?.companyFoundedYear ||
    settings?.about?.companyFoundedYear ||
    "";
  const fallbackImage = "/images/logo.png";
  const aboutImage = useMemo(
    () => storageUrl(settings?.about?.aboutImage, fallbackImage),
    [settings?.about?.aboutImage],
  );
  const [imageSrc, setImageSrc] = useState(aboutImage);

  useEffect(() => {
    setImageSrc(aboutImage);
  }, [aboutImage]);

  return (
    <MotionSection className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column: Image/Visual */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl bg-white overflow-hidden shadow-soft border border-slate-100 group">
              {/* Logo or About Image */}
              <div className="absolute inset-0 flex items-center justify-center p-0">
                <img
                  src={imageSrc}
                  alt="Mitologi Clothing"
                  className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${imageSrc === fallbackImage ? "p-12" : ""}`}
                  loading="lazy"
                  onError={() => {
                    if (imageSrc !== fallbackImage) {
                      setImageSrc(fallbackImage);
                    }
                  }}
                />
              </div>

              {/* Overlay Data - Modern Compact Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md px-3 py-3 sm:px-6 sm:py-5 rounded-lg sm:rounded-xl border border-white/20 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex justify-between items-end mb-2 sm:mb-3 border-b border-slate-100 pb-2 sm:pb-3">
                  <div>
                    <p className="text-[10px] sm:text-xs text-mitologi-gold uppercase tracking-[0.15em] font-sans font-bold mb-0.5">
                      EST.
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-mitologi-navy leading-none font-sans">
                      {foundedYear}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-mitologi-gold uppercase tracking-[0.15em] font-sans font-bold mb-0.5">
                      BASE
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-mitologi-navy leading-none font-sans">
                      Indramayu
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-tight text-center font-sans">
                  &ldquo;{settings?.general?.siteTagline || ""}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
              <p className="text-sm font-bold leading-7 text-mitologi-gold font-sans uppercase tracking-[0.15em]">
                Tentang Kami
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-mitologi-navy mb-6 lg:mb-8 leading-[1.1] tracking-tight max-w-xl mx-auto lg:mx-0">
              {settings?.general?.siteName || "Mitologi Clothing"}
            </h2>

            <div className="space-y-5 text-base md:text-lg leading-relaxed text-slate-600 font-medium max-w-lg mx-auto lg:mx-0">
              <p>{settings?.about?.aboutDescription1 || ""}</p>
              <p>{settings?.about?.aboutDescription2 || ""}</p>
            </div>

            {/* Modern Values Grid */}
            <StaggerGrid className="mt-12 grid grid-cols-2 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:mx-0">
              {(settings?.companyValuesData &&
              settings.companyValuesData.length > 0
                ? settings.companyValuesData.map((v, idx) => ({
                    title: v.title,
                    desc: v.description || v.desc || "",
                    icon: [ShieldCheckIcon, StarIcon, ClockIcon, MapPinIcon][
                      idx % 4
                    ]!,
                  }))
                : []
              ).map((feature, idx) => (
                <StaggerGridItem
                  key={idx}
                  className="p-5 bg-white rounded-xl shadow-soft border border-slate-100 hover:shadow-hover transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-mitologi-navy/5 text-mitologi-navy rounded-full flex items-center justify-center mb-4 group-hover:bg-mitologi-navy group-hover:text-white transition-colors duration-300">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h4 className="font-bold font-sans text-sm text-mitologi-navy mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </StaggerGridItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

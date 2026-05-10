"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { MotionSection, StaggerGrid, StaggerGridItem } from "components/ui/motion";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function AboutSection({ settings }: { settings?: SiteSettings }) {
  const foundedYear =
    settings?.general?.companyFoundedYear ||
    settings?.about?.companyFoundedYear ||
    "2022";
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
    <MotionSection className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left - Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={imageSrc}
                  alt="Tentang Mitologi Clothing"
                  fill
                  className={`object-cover transition-transform duration-700 hover:scale-105 ${
                    imageSrc === fallbackImage ? "object-contain p-8" : ""
                  }`}
                  onError={() => {
                    if (imageSrc !== fallbackImage) {
                      setImageSrc(fallbackImage);
                    }
                  }}
                />
              </div>

              {/* Floating Stats Card - Clean & Clear Style */}
              <div className="absolute -bottom-6 -right-4 lg:right-[-20px] bg-white rounded-2xl shadow-xl p-5 lg:p-6 min-w-[140px]">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                    Berdiri
                  </p>
                  <p className="text-xl font-black text-mitologi-navy tracking-tight">
                    {foundedYear}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">

                  <span className="text-xs text-slate-600 font-bold tracking-tight">
                    Indramayu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-1 mb-6">
              <span className="text-sm font-bold text-mitologi-gold uppercase tracking-[0.25em]">
                Tentang Kami
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-mitologi-navy mb-6 leading-[1.15] tracking-tight text-center lg:text-left">
              {settings?.general?.siteName || "Mitologi Clothing"}
            </h2>

            {/* Description */}
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <p>{settings?.about?.aboutDescription1 || "Mitologi Clothing adalah vendor clothing asal Indramayu yang berdiri sejak 2022 dan bergerak dalam produksi berbagai jenis seragam dan merchandise untuk organisasi maupun instansi."}</p>
              <p>{settings?.about?.aboutDescription2 || "Dengan dukungan tim berpengalaman, peralatan berstandar operasional, serta komitmen pada kerja keras, kerja cerdas, dan evaluasi berkelanjutan, Mitologi terus bertransformasi menjadi entitas yang profesional dan terpercaya."}</p>
            </div>

            {/* Values Grid */}
            <StaggerGrid className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: ShieldCheckIcon, title: "Kejujuran", desc: "Integritas dalam setiap transaksi" },
                { icon: StarIcon, title: "Kualitas", desc: "Standar kualitas tinggi" },
                { icon: ClockIcon, title: "Tepat Waktu", desc: "Menghormati deadline" },
                { icon: StarIcon, title: "Budaya", desc: "Mengangkat budaya lokal" },
              ].map((item, idx) => (
                <StaggerGridItem key={idx} className="p-4 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group/item text-center lg:text-left">
                  <div className="w-10 h-10 rounded-lg bg-mitologi-navy/5 text-mitologi-navy flex items-center justify-center mb-3 mx-auto lg:mx-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-mitologi-navy mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </StaggerGridItem>
              ))}
            </StaggerGrid>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/tentang-kami"
                className="inline-flex items-center gap-2 text-mitologi-navy font-semibold hover:text-mitologi-gold transition-colors duration-200"
              >
                Pelajari lebih lanjut
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
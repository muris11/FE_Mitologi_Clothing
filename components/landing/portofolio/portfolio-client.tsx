"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SubpageHero } from "components/landing/shared/subpage-hero";
import { Button } from "components/ui/button";
import { PortfolioItem } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv, MotionSection } from "components/ui/motion";

export function PortfolioClient({ portfolio }: { portfolio: PortfolioItem }) {
  const hasImage = portfolio.imageUrl && portfolio.imageUrl.length > 0;
  const imageUrl = hasImage ? storageUrl(portfolio.imageUrl) : null;

  return (
    <main className="bg-slate-50 min-h-screen">
      <SubpageHero
        title={portfolio.title}
        badge={true}
        badgeText={portfolio.category}
      />

      {/* Content Section - Same layout as Tentang Kami */}
      <MotionSection className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-12 lg:mb-16">
            <Link
              href="/portofolio"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-mitologi-gold/30 transition-all duration-300 rounded-full py-3 px-6 font-sans font-bold text-sm text-slate-600 hover:text-mitologi-navy"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Kembali ke Portofolio
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Main Image */}
            <MotionDiv delay={0.1} className="lg:col-span-5">
              <div className="relative w-full max-w-lg mx-auto lg:max-w-none group">
                {/* Accent Backgrounds for Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-mitologi-gold/20 to-mitologi-navy/5 rounded-[2.5rem] transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] transform -translate-x-3 -translate-y-3 sm:-translate-x-6 sm:-translate-y-6 transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4 bg-white/50 backdrop-blur-sm" />

                <div className="relative aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden bg-white shadow-xl flex items-center justify-center p-6 sm:p-10 z-10 border border-slate-100">
                  {imageUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imageUrl}
                        alt={portfolio.title}
                        fill
                        unoptimized
                        className="object-contain transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 font-sans">
                      <p className="text-sm font-medium">No Image Available</p>
                    </div>
                  )}
                </div>
              </div>
            </MotionDiv>

            {/* Right: Content */}
            <MotionDiv
              delay={0.3}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Section Badge */}
              <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5 w-fit">
                <span className="text-mitologi-navy font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs">
                  Detail Proyek
                </span>
              </div>

              {/* Description Card */}
              <div className="relative mb-10">
                <div className="absolute top-2 bottom-0 left-[11px] w-px bg-gradient-to-b from-mitologi-gold via-slate-200 to-transparent" />

                <div className="space-y-6 pl-8 sm:pl-10">
                  {portfolio.description ? (
                    <div
                      className="text-slate-600 leading-[1.7] font-sans font-medium text-sm sm:text-[15px] lg:text-base text-justify [&>p]:mb-6 [&>h1]:text-3xl [&>h1]:sm:text-4xl [&>h1]:font-black [&>h1]:text-mitologi-navy [&>h1]:mb-6 [&>h1]:tracking-tight [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-mitologi-navy [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:tracking-tight [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:text-mitologi-navy [&>h3]:mb-3 [&>h3]:mt-8 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2 [&>ul>li]:text-[15px] sm:[&>ul>li]:text-[17px] [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:mb-2 [&>ol>li]:text-[15px] sm:[&>ol>li]:text-[17px] [&>strong]:text-mitologi-navy [&>strong]:font-bold [&>a]:text-mitologi-gold [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-mitologi-navy transition-colors"
                      dangerouslySetInnerHTML={{
                        __html: portfolio.description,
                      }}
                    />
                  ) : (
                    <p className="text-slate-500 leading-[1.7] font-sans text-sm sm:text-[15px] lg:text-base text-justify italic">
                      Belum ada deskripsi mendetail untuk proyek ini.
                    </p>
                  )}
                </div>
              </div>

              {/* CTA Card - Same style as Tentang Kami */}
              <div className="mt-10 p-8 bg-white rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl hover:border-mitologi-gold/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-1 bg-mitologi-gold"></span>
                  <span className="text-[10px] font-bold font-sans text-mitologi-navy uppercase tracking-[0.3em]">
                    Mulai Proyek Anda
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-sans font-black mb-4 text-mitologi-navy tracking-tight leading-snug">
                  Terinspirasi dengan karya ini?
                </h3>
                <p className="text-slate-600 font-sans mb-8 text-sm sm:text-base leading-relaxed max-w-md">
                  Diskusikan kebutuhan seragam, kaos event, atau merchandise
                  premium Anda bersama tim ahli kami.
                </p>
                <Button
                  asChild
                  className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-lg shadow-mitologi-gold/20 hover:shadow-xl hover:shadow-mitologi-gold/30 hover:-translate-y-0.5 transition-all rounded-full py-6 px-8"
                  variant="primary"
                >
                  <Link href="/kontak">Mulai Diskusi Proyek</Link>
                </Button>
              </div>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

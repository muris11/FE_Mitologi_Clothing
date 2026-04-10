"use client";

import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { MotionSection, MotionDiv } from "components/ui/motion";

export function AboutBrief({ settings }: { settings?: SiteSettings }) {
  const aboutImage = storageUrl(
    settings?.about?.aboutImage,
    "/images/logo.png",
  );

  const description = settings?.about?.aboutDescription1 || "";

  const vision = settings?.visionMission?.visionText || "";

  const missionText = settings?.visionMission?.missionText || "";
  const missions = missionText
    ? missionText.split("\n").filter((m: string) => m.trim())
    : [];

  const siteName = settings?.general?.siteName || "Mitologi Clothing";

  return (
    <MotionSection className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <MotionDiv delay={0.1} className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-soft group">
              <Image
                src={aboutImage}
                alt={siteName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Decorative background element behind image */}
            <div className="absolute -inset-4 rounded-3xl bg-mitologi-navy/5 -z-10 transform rotate-2"></div>
          </MotionDiv>

          {/* Content Side */}
          <MotionDiv delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
              <h2 className="text-sm font-bold leading-7 text-mitologi-gold font-sans uppercase tracking-wider">
                Tentang Kami
              </h2>
            </div>

            <h3 className="text-4xl lg:text-5xl font-sans font-extrabold text-mitologi-navy mb-6 tracking-tight">
              {siteName}
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg font-medium">
              {description}
            </p>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-mitologi-gold"></div>
                <h4 className="text-sm font-sans tracking-wider uppercase font-bold text-mitologi-navy mb-2">
                  Visi
                </h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {vision}
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-mitologi-navy"></div>
                <h4 className="text-sm font-sans tracking-wider uppercase font-bold text-mitologi-navy mb-4">
                  Misi
                </h4>
                <ul className="space-y-3 text-slate-600 text-sm font-medium">
                  {missions.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-mitologi-navy/10 flex items-center justify-center shrink-0">
                        <span className="text-mitologi-navy font-bold text-xs">
                          ✓
                        </span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

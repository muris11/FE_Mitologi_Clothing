"use client";

import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { MotionDiv, MotionSection } from "components/ui/motion";

export function AboutServicesDetail({ settings }: { settings?: SiteSettings }) {
  const services = (settings?.servicesData || []).map((s) => ({
    title: s.title,
    header: s.title,
    desc: s.desc,
    image: storageUrl(s.image, "/images/logo.png"),
    materials: s.materials
      ? s.materials
          .split(",")
          .map((m: string) => m.trim())
          .filter(Boolean)
      : [],
    features: s.keunggulan
      ? s.keunggulan
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean)
      : [],
  }));

  if (services.length === 0) return null;

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-slate-50 border-y border-slate-200/50 overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
        <div className="space-y-24">
          {services.map((service, index) => (
            <MotionDiv
              key={index}
              delay={0.15}
              className={`flex flex-col lg:flex-row gap-16 items-center group ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <div className="inline-block px-4 py-1.5 bg-white border border-slate-100 text-mitologi-navy font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-sm">
                  {service.title}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-mitologi-navy leading-[1.1] tracking-tight">
                  {service.header}
                </h3>
                <p className="text-slate-600 font-sans font-medium text-base leading-relaxed">
                  {service.desc}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                  {service.materials.length > 0 && (
                    <div>
                      <h5 className="font-sans font-bold text-mitologi-navy mb-4 text-xs uppercase tracking-widest">
                        Material
                      </h5>
                      <ul className="space-y-3">
                        {service.materials.map((m, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-600 font-sans font-medium flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 flex-none" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.features.length > 0 && (
                    <div>
                      <h5 className="font-sans font-bold text-mitologi-navy mb-4 text-xs uppercase tracking-widest">
                        Keunggulan
                      </h5>
                      <ul className="space-y-3">
                        {service.features.map((f, i) => (
                          <li
                            key={i}
                            className="text-sm text-slate-600 font-sans font-medium flex items-start gap-3"
                          >
                            <span className="w-2 h-2 bg-mitologi-gold rounded-sm mt-1.5 flex-none" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Side */}
              <div className="flex-1 w-full relative">
                <div className="relative aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:border-mitologi-gold/30 transition-all duration-500">
                  <Image
                    src={service.image}
                    alt={service.header}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

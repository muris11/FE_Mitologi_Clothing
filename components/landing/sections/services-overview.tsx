"use client";

import { Card } from "components/ui/card";
import { SectionHeading } from "components/ui/section-heading";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function ServicesOverview({ settings }: { settings?: SiteSettings }) {
  // Parsing dynamic services data
  const services = (settings?.servicesData || []).map((s) => ({
    title: s.title,
    description: s.desc,
    items: s.materials ? s.materials.split(",").map((m) => m.trim()) : [],
    image: s.image,
  }));

  if (services.length === 0) return null;

  const icons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>,
  ];

  return (
    <MotionSection className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            title="Layanan Produksi Kami"
            subtitle="Program Kerja"
            className="items-center"
          />
          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600 font-sans font-medium max-w-xl">
            Kami menyediakan solusi lengkap untuk kebutuhan pakaian industri dan
            custom untuk organisasi Anda.
          </p>
        </div>

        <StaggerGrid className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <StaggerGridItem key={index}>
              <Card className="group flex flex-col p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-soft hover:shadow-hover bg-white transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-mitologi-navy transition-colors duration-300 group-hover:bg-mitologi-navy group-hover:text-mitologi-gold overflow-hidden">
                  {service.image ? (
                    <Image
                      src={storageUrl(service.image)}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    icons[index % icons.length]
                  )}
                </div>
                <h3 className="text-2xl font-sans font-bold text-mitologi-navy tracking-tight group-hover:text-mitologi-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-auto font-sans font-medium">
                  {service.description}
                </p>
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold font-sans tracking-wider uppercase text-slate-400 mb-4">
                    Material Tersedia:
                  </h4>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-x-3 items-start text-sm text-slate-600 font-sans font-medium"
                      >
                        <svg
                          className="h-5 w-5 flex-none text-mitologi-gold"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </StaggerGridItem>
          ))}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

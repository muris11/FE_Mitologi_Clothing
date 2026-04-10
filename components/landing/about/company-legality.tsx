"use client";

import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { SiteSettings } from "lib/api/types";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function CompanyLegality({ settings }: { settings?: SiteSettings }) {
  const legality = settings?.legality;
  const fallback = settings?.about;

  if (!legality && !fallback) return null;

  const items = [
    {
      label: "Nama Badan Usaha",
      value: legality?.legalCompanyName || fallback?.legalCompanyName,
    },
    {
      label: "Alamat Resmi",
      value: legality?.legalAddress || fallback?.legalAddress,
    },
    {
      label: "Bidang Usaha",
      value: legality?.legalBusinessField || fallback?.legalBusinessField,
    },
    { label: "NPWP", value: legality?.legalNpwp || fallback?.legalNpwp },
    { label: "NIB", value: legality?.legalNib || fallback?.legalNib },
    { label: "NMID", value: legality?.legalNmid || fallback?.legalNmid },
  ].filter((item) => item.value);

  if (items.length === 0) return null;

  return (
    <MotionSection className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-mitologi-navy/5 rounded-2xl border border-mitologi-navy/10">
            <BuildingLibraryIcon className="w-8 h-8 text-mitologi-navy" />
          </div>
          <div>
            <p className="text-sm font-sans font-bold tracking-[0.15em] text-mitologi-gold uppercase mb-1">
              Informasi Legal
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-extrabold text-mitologi-navy tracking-tight leading-[1.1]">
              Legalitas Perusahaan
            </h2>
          </div>
        </div>

        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item, idx) => (
            <StaggerGridItem
              key={idx}
              className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-soft transition-all group"
            >
              <h4 className="text-xs sm:text-sm font-sans font-bold text-slate-500 uppercase tracking-wider mb-2 group-hover:text-mitologi-gold transition-colors">
                {item.label}
              </h4>
              <p className="text-sm sm:text-lg font-sans font-bold text-mitologi-navy">
                {item.value}
              </p>
            </StaggerGridItem>
          ))}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

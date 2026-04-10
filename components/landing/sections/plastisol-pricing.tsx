"use client";

import { Button } from "components/ui/button";
import { SectionHeading } from "components/ui/section-heading";
import { PlastisolPrice, PricingAddon, SiteSettings } from "lib/api/types";
import { useMemo } from "react";
import { MotionSection } from "components/ui/motion";

type PricingSettings = SiteSettings & {
  beranda?: {
    pricingPlastisolData?: string | PlastisolPrice[];
    pricingAddonsData?: string | PricingAddon[];
    pricingMinOrder?: string;
  };
};

export function PlastisolPricing({ settings }: { settings?: PricingSettings }) {
  const prices = useMemo(() => {
    const data =
      settings?.beranda?.pricingPlastisolData ||
      settings?.pricing?.pricingPlastisolData;
    if (data) {
      if (Array.isArray(data)) return data;
      try {
        const parsed = JSON.parse(data as string);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Use fallback data
      }
    }
    // Fallback
    return [];
  }, [
    settings?.beranda?.pricingPlastisolData,
    settings?.pricing?.pricingPlastisolData,
  ]);

  const addOns = useMemo(() => {
    const data =
      settings?.beranda?.pricingAddonsData ||
      settings?.pricing?.pricingAddonsData;
    if (data) {
      if (Array.isArray(data)) return data;
      try {
        const parsed = JSON.parse(data as string);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // Use fallback data
      }
    }
    // Fallback
    return [];
  }, [
    settings?.beranda?.pricingAddonsData,
    settings?.pricing?.pricingAddonsData,
  ]);

  if (prices.length === 0 && addOns.length === 0) return null;

  return (
    <MotionSection className="py-24 sm:py-32 bg-white border-t border-slate-200/50 relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Pricelist"
            title="Harga Sablon Plastisol"
            subtitle="Harga terbaik untuk kualitas premium. Garansi detailing dan ketepatan waktu."
            className="items-center"
          />
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Standard Pricing Card */}
          <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 bg-white shadow-soft transition-shadow duration-300 hover:shadow-hover relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-x-4 mb-4">
              <div className="h-10 w-10 shrink-0 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <svg
                  className="w-5 h-5 text-mitologi-navy"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-sans font-bold text-mitologi-navy tracking-tight">
                Paket Produksi
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 font-sans font-medium">
              Harga dasar untuk produksi kaos dengan sablon plastisol
              berkualitas tinggi. Min Order{" "}
              <span className="font-bold text-mitologi-navy">
                {settings?.beranda?.pricingMinOrder ||
                  settings?.pricing?.pricingMinOrder ||
                  "24 pcs"}
              </span>
              .
            </p>
            <ul role="list" className="mt-8 space-y-4 flex-grow">
              {prices.map((price: PlastisolPrice, idx: number) => (
                <li
                  key={idx}
                  className="flex justify-between items-center gap-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-sans font-bold tracking-wider uppercase text-slate-500 text-xs">
                    {price.title}
                  </span>
                  <div className="text-right shrink-0">
                    <span className="block text-mitologi-navy font-sans font-bold text-base tracking-tight whitespace-nowrap">
                      {price.price || `Rp ${price.short} - ${price.long}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium/Info Card */}
          <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 border border-mitologi-navy bg-mitologi-navy shadow-2xl relative z-20 overflow-hidden flex flex-col h-full">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-mitologi-gold/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-y-4 sm:gap-x-4 mb-4 relative z-10 w-full">
              <div className="flex items-center gap-x-4 justify-start">
                <div className="h-10 w-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
                  <svg
                    className="w-5 h-5 text-mitologi-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
                  Add-ons & Ketentuan
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 font-sans font-medium relative z-10 w-full">
              Tambahan fitur dan informasi penting untuk pesanan Anda.
            </p>

            <ul
              role="list"
              className="mt-8 mb-6 space-y-4 flex-grow relative z-10 w-full pr-1"
            >
              {addOns.map((addon: PricingAddon, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start sm:items-center gap-x-3 gap-y-2 w-full flex-wrap sm:flex-nowrap"
                >
                  <div className="flex items-start sm:items-center gap-x-3 flex-1 min-w-0">
                    <svg
                      className="h-5 w-5 flex-none text-mitologi-gold mt-0.5 sm:mt-0"
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
                    <span className="text-xs sm:text-sm font-sans font-medium text-slate-300 break-words leading-relaxed">
                      {addon.name}
                    </span>
                  </div>
                  <div className="shrink-0 pl-8 sm:pl-0 mt-1 sm:mt-0">
                    <span className="inline-block rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] sm:text-xs sm:text-sm font-bold tracking-wide text-white whitespace-nowrap">
                      {addon.price}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 sm:pt-8 border-t border-white/10 mt-auto relative z-10 w-full flex-none">
              <Button
                asChild
                size="lg"
                className="w-full h-auto min-h-[52px] py-1 flex items-center justify-center rounded-full font-sans tracking-wide font-bold bg-mitologi-gold text-mitologi-navy hover:bg-[#E5AA28] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"}
                >
                  <span className="w-full text-center leading-tight whitespace-normal max-w-full px-2">
                    Hubungi Admin Sekarang
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

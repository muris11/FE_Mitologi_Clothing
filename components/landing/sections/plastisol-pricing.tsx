"use client";

import { Button } from "components/ui/button";
import { SectionHeading } from "components/ui/section-heading";
import { SiteSettings } from "lib/api/types";
import { motion } from "framer-motion";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

// Local type extension for pricing settings
type PricingSettings = SiteSettings & {
  beranda?: {
    pricingPlastisolData?: any;
    pricingAddonsData?: any;
    pricingFeaturesData?: any[];
    pricingMinOrder?: string;
    pricingPlastisolSubtitle?: string;
    pricingExtraData?: any;
  };
};

export function PlastisolPricing({ settings }: { settings?: PricingSettings }) {
  const plastisolDataRaw = settings?.beranda?.pricingPlastisolData;
  const plastisolData = (Array.isArray(plastisolDataRaw)
    ? plastisolDataRaw
    : typeof plastisolDataRaw === "string"
    ? JSON.parse(plastisolDataRaw)
    : []
  ).map((item: any) => ({
    ...item,
    minOrder: item.minOrder || item.min_order,
  }));

  // Removed global minOrder, now using per-package min_order

  const addonsDataRaw = settings?.beranda?.pricingAddonsData;
  const addonsData = Array.isArray(addonsDataRaw)
    ? addonsDataRaw
    : typeof addonsDataRaw === "string"
    ? JSON.parse(addonsDataRaw)
    : [];

  const extraOptionsDataRaw = settings?.beranda?.pricingExtraData;
  const extraOptionsData = Array.isArray(extraOptionsDataRaw)
    ? extraOptionsDataRaw
    : typeof extraOptionsDataRaw === "string"
    ? JSON.parse(extraOptionsDataRaw)
    : [];

  const featuresRaw = settings?.beranda?.pricingFeaturesData;
  const features = Array.isArray(featuresRaw)
    ? featuresRaw.map((f: any) => f.text).filter(Boolean)
    : [];

  return (
    <section className="py-24 sm:py-32 bg-white border-t border-slate-200/50 relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-mitologi-navy rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-mitologi-gold rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <SectionHeading
            overline="Pricelist"
            title="Pricelist Sablon Plastisol"
            subtitle={settings?.beranda?.pricingPlastisolSubtitle || "Harga terbaik untuk kualitas premium. Garansi detailing dan ketepatan waktu."}
            className="items-center"
          />
        </div>

        {/* Feature Badges */}
        {features.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {features.map((feature, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                key={idx}
                className="flex items-center gap-2 bg-slate-100/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full shadow-sm"
              >
                <div className="bg-mitologi-gold rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4 text-mitologi-navy" />
                </div>
                <span className="text-xs md:text-sm font-bold text-mitologi-navy uppercase tracking-tight">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-16">
          {plastisolData.map((pkg: any, idx: number) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              key={idx}
              className="flex flex-col items-center group"
            >
              {/* T-Shirt Mockup */}
              <div className="relative w-full aspect-square mb-3 md:mb-4 transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-slate-50 rounded-2xl md:rounded-3xl -z-10 group-hover:bg-slate-100 transition-colors" />
                {pkg.image ? (
                  <Image
                    src={storageUrl(pkg.image)}
                    alt={pkg.title}
                    fill
                    className="object-contain p-2 md:p-4 drop-shadow-xl md:drop-shadow-2xl"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full opacity-20">
                    <Image
                      src="/images/logo.png"
                      alt="Placeholder"
                      width={100}
                      height={100}
                      className="grayscale w-12 h-12 md:w-24 md:h-24"
                    />
                  </div>
                )}
              </div>

              {/* Title Label (Skewed look like flyer) */}
              <div className="relative w-full mb-4 md:mb-6">
                <div className="bg-mitologi-gold py-1.5 px-1.5 md:py-2 md:px-4 rounded-lg transform -skew-x-6 md:-skew-x-12 shadow-sm md:shadow-md">
                  <div className="transform skew-x-6 md:skew-x-12 text-center flex flex-col justify-center items-center min-h-[36px] md:min-h-0">
                    <h4 className="text-[10px] sm:text-xs md:text-sm font-black text-mitologi-navy leading-tight uppercase line-clamp-2">
                      {pkg.title}
                    </h4>
                    {pkg.minOrder && (
                      <p className="text-[8px] md:text-[11px] font-black text-mitologi-navy/70 mt-0.5 md:mt-1 uppercase tracking-tighter bg-white/50 px-1.5 md:px-2 py-0.5 rounded-full inline-block mx-auto leading-none">
                        {pkg.minOrder}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="w-full space-y-1.5 md:space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-100 gap-0.5 sm:gap-2">
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
                    Pendek
                  </span>
                  <span className="text-[11px] sm:text-sm md:text-lg font-black text-mitologi-navy text-center sm:text-right">
                    IDR {pkg.short?.toString().toUpperCase().replace(/K$/, '')}K
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-100 gap-0.5 sm:gap-2">
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
                    Panjang
                  </span>
                  <span className="text-[11px] sm:text-sm md:text-lg font-black text-mitologi-navy text-center sm:text-right">
                    IDR {pkg.long?.toString().toUpperCase().replace(/K$/, '')}K
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons & Extra Options Section */}
        {addonsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
            <div className="bg-mitologi-navy rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mitologi-gold/50 to-transparent opacity-30" />
              
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="h-8 w-8 md:h-10 md:w-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                  <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-mitologi-gold" />
                </div>
                <h3 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase">
                  Add-ons & Ketentuan
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {addonsData.map((addon: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-0.5 md:gap-1 border-l-2 border-mitologi-gold/30 pl-3 md:pl-4 py-1.5 md:py-2">
                    <span className="text-white font-bold text-xs md:text-sm">{addon.name}</span>
                    <span className="text-mitologi-gold font-black text-sm md:text-base">
                      + Rp {addon.price?.toString().toUpperCase().replace(/^\+\s*RP\s*/, '').replace(/\/PCS$/, '')}/pcs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Extra Banner */}
        {extraOptionsData.length > 0 && (
          <div className="bg-mitologi-gold rounded-2xl md:rounded-full p-4 md:px-10 shadow-xl flex flex-wrap justify-center items-center gap-y-4 gap-x-8 md:gap-x-12 mb-16 border-2 border-white/20">
            <span className="text-mitologi-navy font-bold text-xs uppercase tracking-wider bg-white/30 px-3 py-1 rounded-full">
              Extra Note
            </span>
            {extraOptionsData.map((opt: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-mitologi-navy rounded-full" />
                <span className="text-sm font-black text-mitologi-navy">
                  {opt.title} <span className="font-bold opacity-70">+{opt.price}K</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

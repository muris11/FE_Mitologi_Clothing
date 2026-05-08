"use client";

import { motion } from "framer-motion";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";

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

function parseJson(raw: any, fallback: any[] = []) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return fallback; }
  }
  return fallback;
}

export function PlastisolPricing({ settings }: { settings?: PricingSettings }) {
  const plastisolData = parseJson(settings?.beranda?.pricingPlastisolData).map(
    (item: any) => ({ ...item, minOrder: item.minOrder || item.min_order })
  );
  const addonsData = parseJson(settings?.beranda?.pricingAddonsData);
  const extraOptionsData = parseJson(settings?.beranda?.pricingExtraData);
  const features = parseJson(settings?.beranda?.pricingFeaturesData)
    .map((f: any) => f.text)
    .filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-3">
            Pricelist
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mitologi-navy tracking-tight leading-tight mb-3">
            Sablon Plastisol
          </h2>
          <p className="text-base text-stone-500 leading-relaxed">
            {settings?.beranda?.pricingPlastisolSubtitle ||
              "Harga terbaik untuk kualitas premium. Garansi detailing dan ketepatan waktu."}
          </p>
        </div>

        {/* Feature tags — horizontal list dengan separator */}
        {features.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12">
            {features.map((feature: string, idx: number) => (
              <span key={idx} className="text-xs sm:text-sm font-medium text-stone-500">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Pricing grid */}
        {plastisolData.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {plastisolData.map((pkg: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-300"
              >
                {/* Image area */}
                <div className="relative aspect-square bg-stone-50 border-b border-stone-100">
                  {pkg.image ? (
                    <Image
                      src={storageUrl(pkg.image)}
                      alt={pkg.title || "Paket sablon"}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/images/logo.png"
                        alt="Placeholder"
                        width={56}
                        height={56}
                        className="opacity-10 grayscale"
                      />
                    </div>
                  )}
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-mitologi-gold text-mitologi-navy px-2 py-0.5 rounded-full">
                        Populer
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-mitologi-navy leading-tight mb-0.5">
                    {pkg.title}
                  </h3>
                  {pkg.minOrder && (
                    <p className="text-[10px] text-stone-400 font-medium mb-3">
                      {pkg.minOrder}
                    </p>
                  )}

                  <div className="space-y-1.5">
                    {pkg.short && (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                          Pendek
                        </span>
                        <span className="text-sm font-bold text-mitologi-navy">
                          Rp {pkg.short}K
                        </span>
                      </div>
                    )}
                    {pkg.long && (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                          Panjang
                        </span>
                        <span className="text-sm font-bold text-mitologi-navy">
                          Rp {pkg.long}K
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add-ons */}
        {addonsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-mitologi-navy rounded-2xl p-6 sm:p-8 mb-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mitologi-gold/70 mb-1">
              Layanan Tambahan
            </p>
            <h3 className="text-base sm:text-lg font-bold text-white mb-6">
              Add-ons & Ketentuan
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {addonsData.map((addon: any, idx: number) => (
                <div key={idx} className="border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white/90 mb-1">
                    {addon.name}
                  </p>
                  <p className="text-sm font-bold text-mitologi-gold">
                    +{" "}
                    {addon.price
                      ?.toString()
                      .replace(/^\+\s*/i, "")
                      .replace(/\/pcs$/i, "")}
                    /pcs
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Extra note — subtle, not a big gold pill */}
        {extraOptionsData.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 py-3 border-t border-stone-200">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
              Catatan
            </span>
            {extraOptionsData.map((opt: any, idx: number) => (
              <span key={idx} className="text-xs text-stone-600">
                {opt.title}
                {opt.price && (
                  <span className="text-mitologi-gold font-semibold ml-1">
                    +{opt.price}K
                  </span>
                )}
              </span>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

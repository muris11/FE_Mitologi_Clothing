"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProductPricing } from "lib/api/types";
import { cn } from "lib/utils";
import { useState } from "react";

export function CategoryPricelist({
  pricings,
}: {
  pricings?: ProductPricing[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!pricings || pricings.length === 0) return null;

  const activePricing = pricings[activeTab];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Harga Bersahabat
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-mitologi-navy tracking-tight mb-3">
            Pricelist Kategori Produk
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Temukan rentang harga untuk berbagai jenis kebutuhan seragam dan clothing Anda. Minimum order bervariasi per produk.
          </p>
        </motion.div>

        {/* Animated Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide max-w-full">
            {pricings.map((pricing, index) => (
              <button
                key={pricing.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer",
                  activeTab === index
                    ? "text-white"
                    : "text-slate-600 hover:text-mitologi-navy"
                )}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activePricingTab"
                    className="absolute inset-0 bg-mitologi-navy rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{pricing.categoryName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10"
          >
            {/* Min Order */}
            {activePricing?.minOrder && (
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-mitologi-navy text-xs font-bold uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-mitologi-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Minimal Order: {activePricing.minOrder}
                </span>
              </div>
            )}

            {/* Price Items */}
            <div className="space-y-0">
              {activePricing?.items &&
                Array.isArray(activePricing.items) &&
                activePricing.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: itemIdx * 0.05 }}
                    className="group flex justify-between items-center py-4 px-4 -mx-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-mitologi-navy group-hover:text-mitologi-navy transition-colors">
                      {item.name}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-mitologi-gold whitespace-nowrap ml-4">
                      {item.priceRange}
                    </span>
                  </motion.div>
                ))}
            </div>

            {/* Notes */}
            {activePricing?.notes && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 p-5 rounded-2xl bg-mitologi-cream/50 border border-mitologi-gold/10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-mitologi-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-mitologi-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-mitologi-gold uppercase tracking-[0.2em] mb-1">
                      Catatan
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {activePricing.notes}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

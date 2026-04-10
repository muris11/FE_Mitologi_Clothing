"use client";

import { SectionHeading } from "components/ui/section-heading";
import { ProductPricing } from "lib/api/types";
import { useState } from "react";
import { MotionSection } from "components/ui/motion";

export function CategoryPricelist({
  pricings,
}: {
  pricings?: ProductPricing[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!pricings || pricings.length === 0) return null;

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-mitologi-navy/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Harga Bersahabat"
            title="Pricelist Kategori Produk"
            subtitle="Temukan rentang harga untuk berbagai jenis kebutuhan seragam dan clothing Anda. Minimum order bervariasi per produk."
            className="items-center"
          />
        </div>

        <div className="group max-w-4xl mx-auto bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-mitologi-gold/30">
          {/* Tabs header */}
          <div className="relative border-b border-slate-100 bg-slate-50/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {pricings.map((pricing, index) => (
                <button
                  key={pricing.id}
                  onClick={() => setActiveTab(index)}
                  className={`py-4 md:py-5 px-6 md:px-8 min-h-[56px] text-[13px] sm:text-base font-bold font-sans uppercase tracking-wider whitespace-nowrap transition-all duration-300 border-b-2 flex-shrink-0 sm:flex-1 text-center ${
                    activeTab === index
                      ? "text-mitologi-gold border-mitologi-gold bg-white shadow-[inset_0_-2px_0_0_rgba(229,170,40,1)]"
                      : "text-slate-500 border-transparent hover:text-mitologi-navy hover:bg-white/50"
                  }`}
                >
                  {pricing.categoryName}
                </button>
              ))}
            </div>
            {/* Scroll indicator for mobile */}
            <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none md:hidden z-10"></div>
          </div>

          {/* Mobile Tab Indicators */}
          <div className="flex justify-center gap-1.5 pt-4 pb-2 md:hidden bg-white">
            {pricings.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === index ? "bg-mitologi-gold w-6" : "bg-slate-200 w-1.5"}`}
                aria-label={`Pilih tab ${index + 1}`}
              />
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-10">
            {pricings.map((pricing, index) => (
              <div
                key={pricing.id}
                className={`transition-all duration-500 ${activeTab === index ? "opacity-100 block" : "opacity-0 hidden"}`}
              >
                <div className="mb-8">
                  {pricing.minOrder && (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-mitologi-navy/5 text-mitologi-navy font-bold text-xs uppercase tracking-widest font-sans border border-mitologi-navy/10 mb-6">
                      Minimal Order: {pricing.minOrder}
                    </span>
                  )}

                  <div className="space-y-4">
                    {pricing.items &&
                      Array.isArray(pricing.items) &&
                      pricing.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex justify-between items-center py-4 border-b border-dashed border-slate-200 group hover:border-mitologi-gold/50 transition-colors"
                        >
                          <span className="font-sans font-bold text-sm sm:text-lg text-mitologi-navy flex-1 pr-2">
                            {item.name}
                          </span>
                          <span className="font-sans font-bold text-sm sm:text-lg text-mitologi-gold whitespace-nowrap ml-2 sm:ml-4">
                            {item.priceRange}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {pricing.notes && (
                  <div className="bg-mitologi-cream p-5 rounded-2xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-mitologi-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-mitologi-navy font-bold text-lg leading-none">
                        !
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-mitologi-gold uppercase tracking-widest mb-1 font-sans">
                        Catatan
                      </span>
                      <p className="text-slate-700 font-medium text-sm leading-relaxed font-sans">
                        {pricing.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Collection } from "lib/api/types";
import { useEffect, useState } from "react";
import { ProductFilters } from "./product-filters";
import { SortSelect } from "./sort-select";

export function MobileFilters({
  categories,
  activeCategory,
}: {
  categories: Collection[];
  activeCategory?: string | null;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Disable body scroll when mobile filters are open
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileFiltersOpen]);

  // Handle escape key to close filters
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-sans font-bold text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy hover:border-mitologi-navy/30 focus:outline-none lg:hidden shadow-sm transition-all"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Buka filter</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        <span>Filter & Urutkan</span>
      </button>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Backdrop - Fixed to cover screen */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer - Relative positioning inside a flex container to push to right */}
          <div className="fixed inset-y-0 right-0 h-full w-full max-w-[320px] flex flex-col bg-white shadow-2xl rounded-l-[2rem] border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-500 ease-out z-[201]">
            {/* Header - Fixed at top */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
              <h2 className="text-xl font-sans font-bold text-mitologi-navy">
                Filter & Urutkan
              </h2>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-mitologi-navy hover:bg-slate-50 transition-all active:scale-95 bg-slate-100/50"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Tutup menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 scrollbar-hide">
              {/* Mobile Sort */}
              <div>
                <h3 className="font-bold text-mitologi-navy font-sans text-[11px] uppercase tracking-[0.2em] mb-5 pb-2 border-b border-slate-100">
                  Urutkan
                </h3>
                <SortSelect onClose={() => setMobileFiltersOpen(false)} />
              </div>

              {/* Re-use ProductFilters */}
              <ProductFilters
                categories={categories}
                activeCategory={activeCategory}
                onClose={() => setMobileFiltersOpen(false)}
              />

              {/* Bottom close button for convenience */}
              <div className="pt-6 pb-10">
                <button
                  type="button"
                  className="w-full py-4 bg-mitologi-navy text-white rounded-2xl font-bold font-sans text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Tutup Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

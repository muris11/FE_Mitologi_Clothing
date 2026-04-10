"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Collection } from "lib/api/types";
import { useState } from "react";
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
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
          <div className="fixed inset-0 z-40 flex">
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-2xl rounded-l-3xl border-l border-slate-200">
              <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-sans font-bold text-mitologi-navy">
                  Filter & Urutkan
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full p-2 text-slate-400 hover:text-mitologi-navy hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Tutup menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 px-6 space-y-8">
                {/* Mobile Sort */}
                <div>
                  <h3 className="font-bold text-mitologi-navy font-sans text-sm uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                    Urutkan
                  </h3>
                  <SortSelect />
                </div>

                {/* Re-use ProductFilters */}
                <ProductFilters
                  categories={categories}
                  activeCategory={activeCategory}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

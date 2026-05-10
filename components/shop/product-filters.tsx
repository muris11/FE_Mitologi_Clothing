"use client";

import cx from "clsx";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Collection } from "lib/api/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  categories: Collection[];
  activeCategory?: string | null;
  onClose?: () => void;
}

export function ProductFilters({
  categories,
  activeCategory: propActiveCategory,
  onClose,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let activeCategory =
    propActiveCategory !== undefined
      ? propActiveCategory
      : searchParams.get("category") || null;
  if (pathname.startsWith("/shop/") && !propActiveCategory) {
    const lastSegment = pathname.split("/").pop();
    if (lastSegment && lastSegment.includes("-")) {
      activeCategory = lastSegment;
    }
  }

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  const handleCategoryChange = (handle: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("page");

    const queryString = params.toString() ? `?${params.toString()}` : "";

    if (handle) {
      router.push(`/shop/${handle}${queryString}`, { scroll: false });
    } else {
      router.push(`/shop${queryString}`, { scroll: false });
    }
    onClose?.();
  };

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onClose?.();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Kategori
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange(null)}
            className={cx(
              "w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors",
              !activeCategory
                ? "font-semibold text-slate-900 bg-slate-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
            )}
          >
            Semua Produk
          </button>

          {categories
            .filter(
              (category) =>
                ![
                  "",
                  "hidden-homepage-featured-items",
                  "hidden-homepage-carousel",
                ].includes(category.handle),
            )
            .map((category) => {
              const isActive = activeCategory === category.handle;
              return (
                <button
                  key={category.handle}
                  onClick={() => handleCategoryChange(category.handle)}
                  className={cx(
                    "w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors",
                    isActive
                      ? "font-semibold text-slate-900 bg-slate-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  )}
                >
                  {category.title}
                </button>
              );
            })}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Harga
        </h3>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="minPrice"
              className="text-[11px] text-slate-500 mb-1 block"
            >
              Minimal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                Rp
              </span>
              <Input
                type="number"
                id="minPrice"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="pl-8 text-sm rounded-lg border-slate-200 focus:border-slate-400 focus:ring-slate-400 [appearance:none] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="maxPrice"
              className="text-[11px] text-slate-500 mb-1 block"
            >
              Maksimal
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                Rp
              </span>
              <Input
                type="number"
                id="maxPrice"
                placeholder="~"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="pl-8 text-sm rounded-lg border-slate-200 focus:border-slate-400 focus:ring-slate-400 [appearance:none] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <Button
            onClick={handlePriceApply}
            variant="ghost"
            className="w-full text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
          >
            Terapkan
          </Button>
        </div>
      </div>
    </div>
  );
}

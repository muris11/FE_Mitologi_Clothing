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
}

export function ProductFilters({
  categories,
  activeCategory: propActiveCategory,
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

  // Price Filter State
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Update local state when URL params change (e.g. on reset)
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
  };

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Jenis Kain Section */}
      <div>
        <h3 className="font-sans font-bold text-mitologi-navy text-sm uppercase tracking-widest mb-4">
          Kategori
        </h3>

        <div className="space-y-3">
          {/* All Products Option */}
          <button
            onClick={() => handleCategoryChange(null)}
            className={cx(
              "w-full text-left text-sm transition-all font-sans group flex items-center gap-3",
              !activeCategory
                ? "font-extrabold text-mitologi-navy"
                : "font-medium text-slate-500 hover:text-mitologi-navy",
            )}
          >
            <span
              className={cx(
                "w-1.5 h-1.5 rounded-full transition-all",
                !activeCategory
                  ? "bg-mitologi-gold"
                  : "bg-transparent group-hover:bg-slate-300",
              )}
            />
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
                    "w-full text-left text-sm transition-all font-sans group flex items-center gap-3",
                    isActive
                      ? "font-extrabold text-mitologi-navy"
                      : "font-medium text-slate-500 hover:text-mitologi-navy",
                  )}
                >
                  <span
                    className={cx(
                      "w-1.5 h-1.5 rounded-full transition-all flex-shrink-0",
                      isActive
                        ? "bg-mitologi-gold"
                        : "bg-transparent group-hover:bg-slate-300",
                    )}
                  />
                  {category.title}
                </button>
              );
            })}
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="mt-8">
        <h3 className="font-sans font-bold text-mitologi-navy text-sm uppercase tracking-widest mb-4">
          Harga
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="minPrice"
                className="text-xs font-sans font-bold text-slate-500 mb-1.5 block"
              >
                Minimal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-sans font-medium">
                  Rp
                </span>
                <Input
                  type="number"
                  id="minPrice"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="pl-9 text-sm font-sans rounded-xl border-slate-200 focus:border-mitologi-navy focus:ring-mitologi-navy shadow-sm transition-shadow [appearance:none] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="text-xs font-sans font-bold text-slate-500 mb-1.5 block"
              >
                Maksimal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-sans font-medium">
                  Rp
                </span>
                <Input
                  type="number"
                  id="maxPrice"
                  placeholder="~"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="pl-9 text-sm font-sans rounded-xl border-slate-200 focus:border-mitologi-navy focus:ring-mitologi-navy shadow-sm transition-shadow [appearance:none] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handlePriceApply}
            variant="ghost"
            className="w-full rounded-xl font-sans font-bold border border-slate-200 text-slate-600 hover:border-mitologi-navy hover:text-mitologi-navy transition-colors mt-2"
          >
            Terapkan Harga
          </Button>
        </div>
      </div>
    </div>
  );
}

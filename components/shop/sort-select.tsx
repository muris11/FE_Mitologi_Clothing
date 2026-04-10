"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <select
        id="sort"
        name="sort"
        className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-sans font-medium text-slate-700 shadow-sm focus:border-mitologi-navy focus:outline-none focus:ring-1 focus:ring-mitologi-navy cursor-pointer appearance-none transition-shadow hover:border-slate-300"
        onChange={handleSortChange}
        value={currentSort}
      >
        <option value="">Terbaru</option>
        <option value="price-asc">Harga: Rendah ke Tinggi</option>
        <option value="price-desc">Harga: Tinggi ke Rendah</option>
        <option value="trending-desc">Terlaris</option>
      </select>
    </div>
  );
}

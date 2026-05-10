"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortSelect({ onClose }: { onClose?: () => void }) {
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
    onClose?.();
  };

  return (
    <select
      id="sort"
      name="sort"
      className="block w-full text-sm text-slate-700 bg-transparent border-0 border-b border-slate-200 py-2 pr-8 pl-0 focus:border-slate-900 focus:ring-0 cursor-pointer appearance-none"
      onChange={handleSortChange}
      value={currentSort}
    >
      <option value="">Terbaru</option>
      <option value="price-asc">Harga: Rendah ke Tinggi</option>
      <option value="price-desc">Harga: Tinggi ke Rendah</option>
      <option value="trending-desc">Terlaris</option>
    </select>
  );
}

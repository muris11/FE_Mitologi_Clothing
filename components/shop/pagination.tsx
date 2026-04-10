"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
  totalPages,
  currentPage = 1,
}: {
  totalPages: number;
  currentPage?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Logic to show limited page numbers (e.g., 1, 2, 3 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12 mb-8 font-sans text-sm">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-slate-400 flex items-center justify-center"
              >
                ...
              </span>
            );
          }
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className={clsx(
                "relative inline-flex items-center justify-center h-10 w-10 rounded-xl font-bold transition-all",
                page === currentPage
                  ? "bg-mitologi-navy text-white shadow-md shadow-mitologi-navy/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-mitologi-navy hover:border-mitologi-navy/30",
              )}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "relative inline-flex items-center justify-center h-10 w-10 rounded-xl transition-all",
    isDisabled
      ? "pointer-events-none opacity-50 bg-slate-50 text-slate-400 border border-slate-200"
      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-mitologi-navy hover:border-mitologi-navy/30",
  );

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="h-5 w-5" />
    ) : (
      <ChevronRightIcon className="h-5 w-5" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

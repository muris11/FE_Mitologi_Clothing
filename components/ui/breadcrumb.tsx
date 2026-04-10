import { cn } from "lib/utils";
import Link from "next/link";
import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2 break-words text-sm font-medium text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-mitologi-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="font-semibold text-slate-900"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}

              {!isLast && <span className="text-slate-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumb };

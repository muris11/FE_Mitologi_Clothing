"use client";

import { ProductCardSkeleton } from "components/shop/product-card";
import { Button } from "components/ui/button";
import { SectionHeading } from "components/ui/section-heading";
import { Product } from "lib/api/types";
import { Skeleton } from "components/ui/skeleton";
import Link from "next/link";
import { ProductGridAnimated } from "./product-grid-animated";
import { MotionSection } from "components/ui/motion";

export function NewArrivalsSkeleton() {
  return (
    <section className="bg-gradient-to-b from-slate-50/50 to-white py-16 sm:py-24 border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 mb-12">
        <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Skeleton className="h-1 w-8 bg-slate-200 rounded-full" />
            <Skeleton className="h-4 w-24 bg-slate-200 rounded-full" />
            <Skeleton className="h-1 w-8 bg-slate-200 rounded-full" />
          </div>
          <Skeleton className="h-8 md:h-12 w-3/4 max-w-md bg-slate-200 rounded-md mb-4" />
          <Skeleton className="h-4 md:h-5 w-5/6 max-w-lg bg-slate-200 rounded-md" />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex overflow-hidden gap-6 pb-8 pt-4 -mx-6 px-6 lg:mx-0 lg:px-0 w-full max-w-[1440px] mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] sm:w-[360px]">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Skeleton className="h-12 w-48 bg-slate-200 rounded-md inline-block" />
      </div>
    </section>
  );
}

export function NewArrivals({
  products = [],
  title = "New Arrivals",
  subtitle = "Koleksi Terbaru",
  description = "Dapatkan produk terbaru dengan desain eksklusif dan kualitas premium.",
}: {
  products?: Product[];
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  if (products.length === 0) return null;

  return (
    <MotionSection className="bg-gradient-to-b from-slate-50/50 to-white py-16 sm:py-24 border-t border-slate-200/50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mitologi-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mitologi-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-mitologi-gold/3 to-mitologi-navy/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 mb-12 relative z-10">
        <div className="mx-auto max-w-2xl text-center flex flex-col items-center animate-fade-in-up">
          <SectionHeading
            title={title}
            overline={subtitle}
            subtitle={description}
            className="items-center"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <ProductGridAnimated products={products} />
      </div>

      <div
        className="mt-12 text-center relative z-10 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="border-slate-200 text-mitologi-navy hover:bg-slate-50 hover:text-mitologi-navy hover:border-slate-300 shadow-soft hover:shadow-hover transition-all duration-300 group"
        >
          <Link href="/shop?sort=latest" className="flex items-center gap-2">
            Lihat Semua Koleksi
          </Link>
        </Button>
      </div>
    </MotionSection>
  );
}

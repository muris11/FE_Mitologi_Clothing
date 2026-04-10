"use client";

import { Button } from "components/ui/button";
import { SectionHeading } from "components/ui/section-heading";
import {
  StaggerGrid,
  StaggerGridItem,
  MotionSection,
} from "components/ui/motion";
import { PortfolioItem } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";

export function PortfolioGallery({
  items = [],
  showViewAll = true,
  showHeading = true,
}: {
  items?: PortfolioItem[];
  showViewAll?: boolean;
  showHeading?: boolean;
}) {
  if (!items || items.length === 0) return null;

  return (
    <MotionSection className="relative bg-slate-50 py-24 sm:py-32 border-t border-slate-200/50">
      {/* Background Decorative Graphic - Simplified */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8 z-10">
        {showHeading && (
          <div className="mx-auto max-w-2xl text-center mb-16 flex flex-col items-center">
            <SectionHeading
              overline="Portfolio"
              title="Hasil Karya Terbaik Kami"
              subtitle="Ribuan klien telah mempercayakan produksi clothing mereka kepada kami. Berikut beberapa project unggulan kami."
              className="items-center"
            />
          </div>
        )}

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <StaggerGridItem
              key={item.id}
              className="relative w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-slate-100 group shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-500 hover:-translate-y-1 focus-within:outline-none aspect-square sm:aspect-[4/3]"
            >
              <Link
                href={`/portofolio/${item.slug}`}
                className="block h-full w-full outline-none relative"
              >
                {/* Image Section */}
                {item.imageUrl ? (
                  <>
                    <Image
                      src={storageUrl(item.imageUrl)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Consolidated Overlay: Gradient for readability + Brand Tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-mitologi-navy/10 group-hover:via-black/10 transition-all duration-500 z-10" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                    <Image
                      src="/images/logo.png"
                      alt="Mitologi Clothing"
                      width={200}
                      height={200}
                      className="w-1/2 h-auto opacity-10 filter grayscale"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  </div>
                )}

                {/* Category Badge - Floating Top */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                  <span className="inline-block px-3 py-1.5 text-[9px] sm:text-[10px] font-extrabold font-sans tracking-[0.15em] text-mitologi-navy bg-white/95 rounded-full uppercase shadow-sm border border-slate-100 group-hover:bg-mitologi-gold transition-colors duration-300">
                    {item.category}
                  </span>
                </div>

                {/* Text Overlay Section - Positioned Over Image at Bottom */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-6 z-20 transition-all duration-500">
                  <h3 className="text-lg sm:text-xl font-sans font-black text-mitologi-gold leading-tight line-clamp-2 tracking-tight transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg">
                    {item.title}
                  </h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 mt-0 group-hover:mt-2">
                    <span className="inline-flex items-center text-[10px] sm:text-xs font-sans font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Lihat Detail Produksi <span className="ml-2">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerGridItem>
          ))}
        </StaggerGrid>

        {showViewAll && (
          <div className="mt-16 text-center">
            <Button
              asChild
              className="rounded-full font-sans tracking-wide font-bold bg-mitologi-navy text-white hover:bg-mitologi-navy-light shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm px-8 py-3.5"
            >
              <Link href="/portofolio">Lihat Selengkapnya</Link>
            </Button>
          </div>
        )}
      </div>
    </MotionSection>
  );
}

import clsx from "clsx";
import { Category } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Link from "next/link";
import { MotionDiv, StaggerGrid, StaggerGridItem } from "components/ui/motion";

export function CategoryGrid({
  categories = [],
  hideHeader = false,
}: {
  categories?: Category[];
  hideHeader?: boolean;
}) {
  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      className={clsx(
        "relative bg-slate-50 overflow-hidden border-t border-slate-200/50",
        hideHeader ? "py-8" : "py-16 sm:py-24 scroll-mt-24",
      )}
    >
      {/* Background Decorative Graphic matching History Section */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10">
        {!hideHeader && (
          <MotionDiv delay={0.1} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
              <span className="font-sans tracking-[0.15em] text-mitologi-gold uppercase text-sm font-bold">
                Pilihan Kategori
              </span>
              <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-mitologi-navy tracking-tight leading-[1.1]">
              Jelajahi Koleksi Kami
            </h2>
          </MotionDiv>
        )}

        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <StaggerGridItem key={category.handle}>
              <Link
                href={`/shop/${category.handle}`}
                className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-500"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: category.image
                      ? `url(${storageUrl(category.image)})`
                      : undefined,
                  }}
                >
                  {!category.image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-mitologi-navy/5 to-mitologi-navy/20 flex items-center justify-center">
                      {/* Fallback Icon/Text if no image */}
                      <span className="text-mitologi-navy/20 font-bold text-6xl select-none">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay Gradient for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/95 via-mitologi-navy/40 to-black/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <h3 className="text-xl sm:text-2xl font-sans font-black text-mitologi-gold mb-1 tracking-tight drop-shadow-md">
                    {category.name}
                  </h3>
                  <div className="mt-2 transition-all duration-300">
                    <p className="text-sm font-sans font-medium tracking-wide text-white opacity-100">
                      {category.description || "Lihat Kategori"}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-[11px] sm:text-xs font-sans font-bold text-slate-200 uppercase tracking-wider group-hover:text-mitologi-gold transition-colors duration-300">
                    Jelajahi{" "}
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerGridItem>
          ))}
        </StaggerGrid>

        {!hideHeader && (
          <MotionDiv delay={0.2} className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-mitologi-navy px-8 py-3.5 text-sm font-bold font-sans tracking-wide text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-mitologi-navy-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mitologi-navy group"
            >
              Lihat Semua Kategori
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}

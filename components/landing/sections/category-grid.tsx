"use client";

import clsx from "clsx";
import { Category } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

function AnimatedContainer({ className, delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
        "relative bg-white overflow-hidden",
        hideHeader ? "py-8" : "py-16 sm:py-24 scroll-mt-24",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {!hideHeader && (
          <AnimatedContainer className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
              Pilihan Kategori
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-mitologi-navy tracking-tight">
              Jelajahi Koleksi Kami
            </h2>
          </AnimatedContainer>
        )}

        <AnimatedContainer delay={0.3} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.handle}
              href={`/shop/${category.handle}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: category.image
                    ? `url(${storageUrl(category.image)})`
                    : undefined,
                }}
              >
                {!category.image && (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-300 font-bold text-5xl select-none">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-white/60 mt-1 line-clamp-1 hidden sm:block">
                    {category.description}
                  </p>
                )}
                <span className="mt-2 text-[10px] sm:text-xs font-medium text-white/50 group-hover:text-mitologi-gold transition-colors duration-300">
                  Lihat Produk →
                </span>
              </div>
            </Link>
          ))}
        </AnimatedContainer>

        {!hideHeader && (
          <AnimatedContainer delay={0.5} className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center text-sm font-semibold text-mitologi-navy hover:text-mitologi-gold transition-colors duration-200 cursor-pointer"
            >
              Lihat Semua Kategori
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedContainer>
        )}
      </div>
    </section>
  );
}

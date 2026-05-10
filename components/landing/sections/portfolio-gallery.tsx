"use client";

import { ArrowRight } from "lucide-react";
import { PortfolioItem } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export function PortfolioGallery({
  items = [],
  showViewAll = true,
  showHeading = true,
  title = "Hasil Karya Terbaik Kami",
  subtitle = "Ribuan klien telah mempercayakan produksi clothing mereka kepada kami. Berikut beberapa project unggulan kami.",
  overline = "Portfolio",
}: {
  items?: PortfolioItem[];
  showViewAll?: boolean;
  showHeading?: boolean;
  title?: string;
  subtitle?: string;
  overline?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const maxHeight = 120;
  const spacing = "-space-x-24 md:-space-x-32";
  const marqueeRepeat = 4;

  return (
    <section className={`relative bg-slate-50 pb-16 sm:pb-24 ${showHeading ? "pt-16 sm:pt-24" : "pt-4 sm:pt-8"}`}>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] z-10">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-visible mx-4 lg:mx-8">
          {/* Header */}
          {showHeading && (
            <div className="relative z-10 text-center pt-16 pb-8 px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-3">
                {overline}
              </p>
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-mitologi-navy mb-6 leading-[1.15] tracking-tight text-center">
                {title}
              </h2>
              <p className="text-base text-stone-500 leading-relaxed max-w-xl mx-auto mb-10">
                {subtitle}
              </p>

              {showViewAll && null}
            </div>
          )}

          {/* Desktop 3D overlapping layout */}
          <div className="hidden md:block relative overflow-visible h-[500px]">
            <div className={cn(
              `flex ${spacing} pb-8 items-end justify-center`,
              showHeading ? "pt-16" : "pt-4"
            )}>
              {items.map((item, index) => {
                const totalImages = items.length;
                const middle = Math.floor(totalImages / 2);
                const distanceFromMiddle = Math.abs(index - middle);
                const staggerOffset = maxHeight - distanceFromMiddle * 20;
                const isHovered = hoveredIndex === index;
                const zIndex = isHovered ? totalImages + 10 : totalImages - index;
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
                const yOffset = isHovered ? -160 : isOtherHovered ? 0 : -staggerOffset;
                const rotateY = isHovered ? 0 : -15;

                return (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer flex-shrink-0"
                    style={{ zIndex }}
                    initial={{
                      transform: "perspective(5000px) rotateY(-15deg) translateY(200px)",
                      opacity: 0,
                    }}
                    animate={{
                      transform: `perspective(5000px) rotateY(${rotateY}deg) translateY(${yOffset}px)`,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isHovered ? 0 : index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <Link href={`/portofolio/${item.slug}`} className="block">
                      <div
                        className="relative aspect-[3/4] w-48 md:w-64 lg:w-72 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                        style={{
                          boxShadow: "rgba(0,0,0,0.01) 0.8px 0 0.8px 0, rgba(0,0,0,0.03) 2.4px 0 2.4px 0, rgba(0,0,0,0.08) 6.4px 0 6.4px 0, rgba(0,0,0,0.25) 20px 0 20px 0",
                        }}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={storageUrl(item.imageUrl)}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <Image src="/images/logo.png" alt="Mitologi" width={80} height={80} className="opacity-10 grayscale" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-mitologi-gold">{item.category}</span>
                          <h3 className="text-sm font-bold text-white leading-tight mt-1 line-clamp-2">{item.title}</h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile 3D overlapping layout - horizontal scroll */}
          <div className={cn(
            "block md:hidden relative overflow-x-auto overflow-y-visible scrollbar-hide snap-x snap-mandatory pb-12",
            showHeading ? "pt-20" : "pt-8"
          )}>
            <div className="flex -space-x-16 px-8 items-end justify-start w-max">
              {items.map((item, index) => {
                const totalImages = items.length;
                const middle = Math.floor(totalImages / 2);
                const distanceFromMiddle = Math.abs(index - middle);
                const staggerOffset = 60 - distanceFromMiddle * 12;

                return (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer flex-shrink-0 snap-center"
                    style={{ zIndex: totalImages - index }}
                    initial={{
                      transform: "perspective(5000px) rotateY(-15deg) translateY(100px)",
                      opacity: 0,
                    }}
                    animate={{
                      transform: `perspective(5000px) rotateY(-15deg) translateY(${-staggerOffset}px)`,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <Link href={`/portofolio/${item.slug}`} className="block">
                      <div
                        className="relative aspect-[3/4] w-[55vw] max-w-[220px] rounded-xl overflow-hidden"
                        style={{
                          boxShadow: "rgba(0,0,0,0.01) 0.8px 0 0.8px 0, rgba(0,0,0,0.03) 2.4px 0 2.4px 0, rgba(0,0,0,0.08) 6.4px 0 6.4px 0, rgba(0,0,0,0.25) 20px 0 20px 0",
                        }}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={storageUrl(item.imageUrl)}
                            alt={item.title}
                            fill
                            sizes="55vw"
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <Image src="/images/logo.png" alt="Mitologi" width={60} height={60} className="opacity-10 grayscale" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full p-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-mitologi-gold">{item.category}</span>
                          <h3 className="text-xs font-bold text-white leading-tight mt-0.5 line-clamp-2">{item.title}</h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

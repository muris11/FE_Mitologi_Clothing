"use client";

import { CtaData, PortfolioItem, Product } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import React from "react";

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const filterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3",
  "col-start-1 col-end-2 row-start-2 row-end-4",
  "col-start-1 col-end-2 row-start-4 row-end-6",
  "col-start-2 col-end-3 row-start-3 row-end-5",
];

function ContainerStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2, delayChildren: 0.2, duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContainerAnimated({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={filterVariants}
      transition={{ ...SPRING_TRANSITION_CONFIG, duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GalleryGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4", className)}>
      {children}
    </div>
  );
}

function GalleryGridCell({ children, index, className }: { children: React.ReactNode; index: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      className={cn("relative overflow-hidden rounded-xl shadow-xl", areaClasses[index], className)}
    >
      {children}
    </motion.div>
  );
}

export function CTASection({
  cta,
  portfolioItems,
  products,
}: {
  cta?: CtaData;
  portfolioItems?: PortfolioItem[];
  products?: Product[];
}) {
  const title = cta?.title || "";
  const subtitle = cta?.subtitle || "";
  const buttonText = cta?.buttonText || "";
  const buttonLink = cta?.buttonLink || "#";

  const galleryImages: { src: string; alt: string }[] = [];

  if (portfolioItems && portfolioItems.length > 0) {
    galleryImages.push(
      { src: storageUrl(portfolioItems[0]?.imageUrl), alt: portfolioItems[0]?.title || "Portfolio" },
      { src: storageUrl(portfolioItems[1]?.imageUrl || portfolioItems[0]?.imageUrl), alt: portfolioItems[1]?.title || "Portfolio" },
    );
  }

  if (products && products.length > 0) {
    galleryImages.push(
      { src: storageUrl(products[0]?.featuredImage?.url), alt: products[0]?.title || "Produk" },
      { src: storageUrl(products[1]?.featuredImage?.url || products[0]?.featuredImage?.url), alt: products[1]?.title || "Produk" },
    );
  }

  while (galleryImages.length < 4) {
    galleryImages.push({ src: "/images/logo.png", alt: "Mitologi Clothing" });
  }

  return (
    <section className="bg-white relative overflow-hidden py-20 sm:py-28">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-mitologi-gold/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-mitologi-navy/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:px-8 md:grid-cols-2 relative z-10">
        {/* Text content */}
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold">
            Mulai Sekarang
          </ContainerAnimated>
          <ContainerAnimated className="text-3xl sm:text-4xl md:text-[2.4rem] font-bold text-mitologi-navy tracking-tight leading-tight">
            {title}
          </ContainerAnimated>
          <ContainerAnimated className="my-4 text-base text-slate-600 md:my-6 md:text-lg leading-relaxed">
            {subtitle}
          </ContainerAnimated>
          {buttonText && (
            <ContainerAnimated>
              <Link
                href={buttonLink}
                className="inline-flex items-center justify-center rounded-full bg-mitologi-gold px-8 py-4 text-sm font-bold tracking-wide text-mitologi-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#E5AA28]"
              >
                {buttonText}
              </Link>
            </ContainerAnimated>
          )}
        </ContainerStagger>

        {/* Gallery grid */}
        <GalleryGrid>
          {galleryImages.slice(0, 4).map((img, index) => (
            <GalleryGridCell index={index} key={index}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center"
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  );
}

"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Product } from "lib/api/types";
import { normalizeTags } from "lib/utils";
import { storageUrl } from "lib/utils/storage-url";
import Link from "next/link";
import { useState } from "react";

// Animation variants
const easeOutExpo = [0.25, 1, 0.5, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export interface ProductGridAnimatedProps {
  products: Product[];
}

interface ProductCardExpandedProps {
  product: Product;
  isActive: boolean;
  onClick: () => void;
  variants?: any;
}

export function ProductGridAnimated({ products }: ProductGridAnimatedProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-slate-400">Produk tidak ditemukan</p>
      </div>
    );
  }

  const rowOne = products.slice(0, 4);
  const rowTwo = products.slice(4, 8);

  return (
    <>
      {/* Desktop: semua produk satu baris */}
      <motion.div
        className="hidden lg:flex w-full gap-2.5"
        style={{ height: "420px" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map((product, index) => (
          <ProductCardExpanded
            key={product.id}
            product={product}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            variants={cardVariants}
          />
        ))}
      </motion.div>

      {/* Mobile: 2 baris expanding panel */}
      <motion.div
        className="flex flex-col gap-2.5 lg:hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div
          className="flex w-full gap-2"
          style={{ height: "clamp(180px, 40vw, 260px)" }}
        >
          {rowOne.map((product, index) => (
            <ProductCardExpanded
              key={product.id}
              product={product}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              variants={cardVariants}
            />
          ))}
        </div>
        {rowTwo.length > 0 && (
          <div
            className="flex w-full gap-2"
            style={{ height: "clamp(180px, 40vw, 260px)" }}
          >
            {rowTwo.map((product, index) => (
              <ProductCardExpanded
                key={product.id}
                product={product}
                isActive={activeIndex === index + 4}
                onClick={() => setActiveIndex(index + 4)}
                variants={cardVariants}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

function ProductCardExpanded({
  product,
  isActive,
  onClick,
  variants,
}: ProductCardExpandedProps) {
  const imageUrl = storageUrl(product.featuredImage?.url);
  const tags = normalizeTags(product.tags);
  const price = product.priceRange?.minVariantPrice?.amount;

  return (
    <motion.div
      onClick={onClick}
      variants={variants}
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        flex: isActive ? "4 1 0%" : "1 1 0%",
        minWidth: "clamp(28px, 6vw, 48px)",
        borderRadius: "14px",
        border: isActive
          ? "1.5px solid rgba(255,255,255,0.2)"
          : "1.5px solid rgba(255,255,255,0.06)",
      }}
      animate={{
        flex: isActive ? "4 1 0%" : "1 1 0%",
      }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
    >
      {/* Background image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.featuredImage?.altText || product.title}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            transform: isActive ? "scale(1.02)" : "scale(1.06)",
            transition: "transform 0.4s ease",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
          <ShoppingBagIcon className="w-6 h-6 text-white/20" />
        </div>
      )}

      {/* Gradient overlay — tanpa transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Badge: Baru */}
      <span className="absolute left-2 top-2 z-10 inline-flex items-center rounded bg-mitologi-navy px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
        Baru
      </span>

      {/* Badge: Kategori */}
      <span
        className="absolute right-2 top-2 z-10 inline-flex items-center rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {tags[0] || "Produk"}
      </span>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end gap-2 p-3">
        {/* Icon bag — tanpa backdrop-blur */}
        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60">
          <ShoppingBagIcon className="h-3.5 w-3.5 text-white" />
        </div>

        {/* Info text */}
        <div
          className="min-w-0 flex-1 overflow-hidden"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(12px)",
            transition: "opacity 0.25s ease 0.08s, transform 0.25s ease 0.08s",
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          <p className="truncate text-xs font-bold leading-tight text-white">
            {product.title}
          </p>
          <p className="mt-0.5 text-xs font-bold text-mitologi-gold-dark">
            {price
              ? `Rp ${parseInt(price).toLocaleString("id-ID")}`
              : "Hubungi Admin"}
          </p>
          <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/55">
            {tags[0] || "Produk"}
          </p>
        </div>

        {/* CTA arrow */}
        <Link
          href={`/shop/product/${product.handle}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? "scale(1)" : "scale(0.8)",
            transition: "opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s",
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-mitologi-navy transition-colors duration-200 group/btn">
            <svg
              className="h-3.5 w-3.5 text-mitologi-navy group-hover/btn:text-white transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

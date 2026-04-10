"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Price from "components/shared/ui/price";
import { Product } from "lib/api/types";
import { useCart } from "lib/hooks/useCart";
import { useToast } from "components/ui/ultra-quality-toast";
import { cn, normalizeTags } from "lib/utils";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";

import WishlistButton from "./wishlist-button";

interface ProductCardProps {
  product: Product;
  index?: number;
  isRecommended?: boolean;
  isBestSeller?: boolean;
}

export const ProductCard = memo(function ProductCard({
  product,
  index = 0,
  isRecommended,
  isBestSeller,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Logic for variants and stock (guard against undefined variants from recommendation API)
  const variants = product.variants ?? [];
  const hasMultipleVariants = variants.length > 1;
  const firstVariant = variants[0];
  const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

  // Variant label (e.g. "BLACK NT" or "3 Varian")
  const variantTitle = hasMultipleVariants
    ? `${variants.length} Varian`
    : firstVariant?.title !== "Default Title"
      ? firstVariant?.title
      : "";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasMultipleVariants) {
      window.location.href = `/shop/product/${product.handle}`;
      return;
    }

    setIsAdding(true);
    try {
      if (product.variants[0]?.id) {
        await addToCart(product.variants[0].id, 1, product);
      }
    } catch (e: unknown) {
      const err = e as Error;
      addToast({
        title: "Gagal",
        description: err?.message || "Gagal menambahkan ke keranjang.",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  // Calculate discount and price range
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);

  // Price range: "Rp131rb - Rp149rb"
  const isPriceRange = minPrice !== maxPrice;

  const imageUrl = storageUrl(product.featuredImage?.url);
  const tags = normalizeTags(product.tags);
  const hasSoldMetric =
    typeof product.totalSold === "number" && product.totalSold > 0;
  const hasRating =
    typeof product.averageRating === "number" && product.averageRating > 0;

  // Discount badge logic (if we have compareAt or implicit)
  const isSale = tags.includes("sale") || tags.includes("diskon");

  return (
    <div className="flex flex-col h-full bg-white rounded-[22px] shadow-soft hover:shadow-hover border border-app overflow-hidden transition-shadow duration-200 group">
      {/* Image Area */}
      <div className="relative aspect-[4/4.8] overflow-hidden bg-app-cream">
        <Link
          href={`/shop/product/${product.handle}`}
          className="relative block h-full w-full"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.featuredImage?.altText || product.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className={cn(
                "object-cover group-hover:scale-[1.02] transition-all duration-500",
                isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
              )}
              onLoad={() => setIsLoaded(true)}
              priority={index < 4}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-300">
              <ShoppingBagIcon className="w-12 h-12" />
            </div>
          )}

          {/* Wishlist Button - Top Right */}
          <div className="absolute top-3 right-3 z-10 opacity-100 transition-opacity duration-200">
            <WishlistButton
              productId={product.id}
              className="bg-white p-2 sm:p-1.5 rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors duration-200 text-slate-400 border border-app touch-manipulation"
              iconClassName="h-4 w-4"
            />
          </div>

          {/* Bottom Strip Badge (if Sale) */}
          {isSale && (
            <div className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-[rgba(20,32,51,0.84)] text-white text-[10px] font-bold uppercase tracking-[0.18em]">
              Promo
            </div>
          )}
        </Link>
      </div>

      {/* Body Area */}
      <div className="flex flex-col flex-grow p-4 bg-white relative">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {isBestSeller && (
            <span className="inline-flex items-center px-2 py-1 bg-app-cream text-mitologi-navy text-[10px] font-bold rounded-full tracking-[0.14em] uppercase border border-app">
              TERLARIS
            </span>
          )}
          {isRecommended && !isBestSeller && (
            <span className="inline-flex items-center px-2 py-1 bg-app-cream text-mitologi-gold-dark text-[10px] font-bold rounded-full tracking-[0.14em] uppercase border border-app">
              REKOMENDASI
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/shop/product/${product.handle}`} className="mb-2">
          <h3 className="text-[14px] sm:text-[15px] leading-snug font-sans font-semibold tracking-[0.01em] text-slate-800 group-hover:text-mitologi-navy transition-colors line-clamp-2 min-h-[42px]">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto mb-3 text-left">
          <div className="text-[18px] font-extrabold text-mitologi-navy font-sans leading-none">
            {isPriceRange ? (
              <div className="flex items-center gap-1">
                <Price
                  amount={product.priceRange.minVariantPrice.amount}
                  currencyCode={product.priceRange.minVariantPrice.currencyCode}
                />
                <span className="text-slate-400 font-normal text-xs">-</span>
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                />
              </div>
            ) : (
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
            )}
          </div>
        </div>

        {/* Rating & Sold Info */}
        <div className="flex min-h-[18px] items-center gap-1.5 text-[11px] text-slate-500 font-sans mt-1">
          {hasRating && (
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-mitologi-gold mr-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.averageRating?.toFixed(1)}</span>
            </div>
          )}
          {hasRating && hasSoldMetric && (
            <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
          )}
          {hasSoldMetric && <span>Terjual {product.totalSold}+</span>}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans mt-2">
          <div className="truncate">
            {variantTitle ? (
              <span>{variantTitle}</span>
            ) : (
              <span>Siap dikirim</span>
            )}
          </div>
          {totalStock !== undefined && totalStock > 0 && totalStock <= 5 && (
            <span className="text-[10px] font-bold text-red-500 tracking-wide bg-red-50 px-2 py-1 rounded-full border border-red-100">
              Sisa {totalStock}
            </span>
          )}
        </div>

        {/* Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.availableForSale === false}
          className="absolute bottom-4 right-4 p-2.5 sm:p-2 text-mitologi-navy bg-app-cream hover:bg-mitologi-navy hover:text-white rounded-full transition-colors border border-app hover:border-mitologi-navy touch-manipulation"
        >
          <ShoppingBagIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

// Skeleton Loading for Product Card
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden h-full">
      <div className="aspect-[4/5] bg-slate-100 animate-pulse rounded-2xl" />
      <div className="pt-5 px-2 flex flex-col flex-grow bg-white animate-pulse">
        <div className="flex justify-between items-start mb-2">
          <div className="h-5 bg-slate-200 rounded w-1/2" />
          <div className="h-5 bg-slate-200 rounded w-1/3" />
        </div>
        <div className="h-4 bg-slate-100 rounded w-1/4 mt-1" />
      </div>
    </div>
  );
}

// Skeleton Grid for Shop Page
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

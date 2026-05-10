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

  const variants = product.variants ?? [];
  const hasMultipleVariants = variants.length > 1;
  const firstVariant = variants[0];
  const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

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

  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const isPriceRange = minPrice !== maxPrice;

  const imageUrl = storageUrl(product.featuredImage?.url);
  const tags = normalizeTags(product.tags);
  const hasSoldMetric =
    typeof product.totalSold === "number" && product.totalSold > 0;
  const hasRating =
    typeof product.averageRating === "number" && product.averageRating > 0;

  const isSale = tags.includes("sale") || tags.includes("diskon");

  return (
    <div className="group flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
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
                "object-cover transition-transform duration-500 group-hover:scale-105",
                isLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setIsLoaded(true)}
              priority={index < 4}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-300">
              <ShoppingBagIcon className="w-10 h-10" />
            </div>
          )}
        </Link>

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {isSale && (
            <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-500 text-white rounded">
              Sale
            </span>
          )}
          {isBestSeller && (
            <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-mitologi-navy text-white rounded">
              Terlaris
            </span>
          )}
          {isRecommended && !isBestSeller && (
            <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-mitologi-gold text-mitologi-navy rounded">
              Untuk Anda
            </span>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton
            productId={product.id}
            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-slate-500 hover:text-red-500 transition-colors shadow-sm"
            iconClassName="h-4 w-4"
          />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || product.availableForSale === false}
            className="w-full py-2.5 text-xs font-semibold text-center bg-white/95 backdrop-blur-sm text-mitologi-navy rounded-md hover:bg-mitologi-navy hover:text-white transition-colors disabled:opacity-50"
          >
            {isAdding
              ? "Menambahkan..."
              : hasMultipleVariants
                ? "Pilih Varian"
                : "Tambah ke Keranjang"}
          </button>
        </div>

        {totalStock !== undefined && totalStock > 0 && totalStock <= 5 && (
          <div className="absolute bottom-2.5 left-2.5 z-10 group-hover:opacity-0 transition-opacity">
            <span className="text-[10px] font-bold text-white bg-red-500/90 px-1.5 py-0.5 rounded">
              Sisa {totalStock}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow pt-3 pb-1">
        <Link href={`/shop/product/${product.handle}`}>
          <h3 className="text-sm font-medium text-slate-800 leading-snug line-clamp-2 group-hover:text-mitologi-navy transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-slate-900">
            {isPriceRange ? (
              <span className="flex items-center gap-1">
                <Price
                  amount={product.priceRange.minVariantPrice.amount}
                  currencyCode={product.priceRange.minVariantPrice.currencyCode}
                />
                <span className="text-slate-400 font-normal text-xs">–</span>
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                />
              </span>
            ) : (
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
            )}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400">
          {hasRating && (
            <span className="flex items-center gap-0.5">
              <svg
                className="w-3 h-3 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.averageRating?.toFixed(1)}
            </span>
          )}
          {hasRating && hasSoldMetric && (
            <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
          )}
          {hasSoldMetric && <span>{product.totalSold}+ terjual</span>}
          {!hasRating && !hasSoldMetric && variantTitle && (
            <span>{variantTitle}</span>
          )}
        </div>
      </div>
    </div>
  );
});

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-[3/4] bg-slate-100 animate-pulse rounded-lg" />
      <div className="pt-3 space-y-2">
        <div className="h-4 bg-slate-100 rounded w-4/5" />
        <div className="h-4 bg-slate-100 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

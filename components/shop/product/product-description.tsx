"use client";

import {
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Price from "components/shared/ui/price";
import { Button } from "components/ui/button";
import { Product } from "lib/api/types";
import { useBatchTracker } from "lib/hooks/use-batch-tracker";
import { useCart } from "lib/hooks/useCart";
import { useToast } from "components/ui/ultra-quality-toast";
import { normalizeTags } from "lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import WishlistButton from "../wishlist-button";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const { track } = useBatchTracker();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const { addToast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Determine the currently matched variant directly from searchParams
  const matchedVariant = product.variants.find((variant) => {
    const selectedOptions = Array.isArray(variant.selectedOptions)
      ? variant.selectedOptions
      : [];
    // If all required options are present in the URL, this variant matches
    const allOptionsMatch = selectedOptions.every(
      (opt) => searchParams.get(opt.name.toLowerCase()) === opt.value,
    );
    return allOptionsMatch;
  });

  // Track the previously matched variant ID to reset quantity on change
  const [prevVariantId, setPrevVariantId] = useState<string | undefined>(
    undefined,
  );

  const hasMultipleSelectableVariants =
    Array.isArray(product.options) &&
    product.options.some(
      (option) => Array.isArray(option.values) && option.values.length > 1,
    );

  useEffect(() => {
    if (matchedVariant?.id && matchedVariant.id !== prevVariantId) {
      setQuantity(1); // Reset quantity when variant parameters change
      setPrevVariantId(matchedVariant.id);
    }
  }, [matchedVariant?.id, prevVariantId]);

  useEffect(() => {
    if (!hasMultipleSelectableVariants && product.variants.length !== 1) {
      return;
    }

    const hasSelectedVariantInParams = product.variants.some((variant) => {
      const selectedOptions = Array.isArray(variant.selectedOptions)
        ? variant.selectedOptions
        : [];
      return (
        selectedOptions.length > 0 &&
        selectedOptions.every(
          (opt) => searchParams.get(opt.name.toLowerCase()) === opt.value,
        )
      );
    });

    if (hasSelectedVariantInParams) {
      return;
    }

    const defaultVariant = product.variants[0];
    const selectedOptions = Array.isArray(defaultVariant?.selectedOptions)
      ? defaultVariant.selectedOptions
      : [];
    if (!defaultVariant || selectedOptions.length === 0) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    selectedOptions.forEach((option) => {
      params.set(option.name.toLowerCase(), option.value);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [hasMultipleSelectableVariants, product.variants, router, searchParams]);

  // Track view when component mounts
  useEffect(() => {
    if (product.id) {
      track(Number(product.id), "view");
    }
  }, [product.id, track]);

  // Calculate discount if applicable
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const hasDiscount = minPrice < maxPrice;
  const tags = normalizeTags(product.tags);

  const handleQuantityChange = (type: "plus" | "minus") => {
    if (type === "plus") {
      setQuantity((prev) => {
        // Check stock limit if available
        if (
          matchedVariant?.stock !== undefined &&
          prev >= matchedVariant.stock
        ) {
          return prev;
        }
        return prev + 1;
      });
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    const targetVariant = matchedVariant || product.variants[0];
    if (!targetVariant?.id) return;
    const variantId = targetVariant.id;

    startTransition(async () => {
      try {
        await addToCart(variantId, quantity);
        // Optional: Show success toast or open cart
      } catch (e: unknown) {
        const err = e as Error;
        addToast({
          title: "Gagal",
          description: err?.message || "Gagal menambahkan ke keranjang.",
          variant: "error",
        });
      }
    });
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();

    const targetVariant = matchedVariant || product.variants[0];
    if (!targetVariant?.id) {
      return;
    }

    startTransition(async () => {
      try {
        await addToCart(targetVariant.id, quantity);
        router.push("/shop/checkout");
      } catch (e: unknown) {
        const err = e as Error;
        addToast({
          title: "Gagal",
          description: err?.message || "Gagal memproses pesanan.",
          variant: "error",
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Header Section */}
      <div className="mb-8 pb-8 border-b border-slate-200">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-mitologi-navy leading-tight mb-4 tracking-tight">
          {product.title}
        </h1>

        {/* Rating & Sold Info */}
        <div className="flex items-center gap-4 text-sm font-sans font-medium text-slate-500 mb-6 flex-wrap">
          {product.averageRating && product.averageRating > 0 ? (
            <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-md text-amber-700">
              <span className="font-bold">
                {product.averageRating.toFixed(1)}
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.averageRating!) ? "fill-current" : "fill-slate-200 text-slate-200"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ) : (
            <span className="text-slate-400 italic text-xs">
              Belum ada ulasan
            </span>
          )}
          {(product.totalReviews ?? 0) > 0 && (
            <>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-mitologi-navy">
                  {product.totalReviews}
                </span>
                <span>Penilaian</span>
              </div>
            </>
          )}
          {(product.totalSold ?? 0) > 0 && (
            <>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-mitologi-navy">
                  {product.totalSold}
                </span>
                <span>Terjual</span>
              </div>
            </>
          )}
        </div>

        {/* Price Section */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-sm border border-slate-100">
          {minPrice !== maxPrice ? (
            <div className="flex flex-col border-r border-slate-200 pr-3 sm:pr-4">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <Price
                  amount={product.priceRange.minVariantPrice.amount}
                  currencyCode={product.priceRange.minVariantPrice.currencyCode}
                  className="text-2xl lg:text-3xl font-sans font-extrabold text-mitologi-navy"
                />
                <span className="text-slate-400 font-medium">-</span>
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  className="text-lg lg:text-xl font-sans font-medium text-slate-500 line-through"
                />
              </div>
            </div>
          ) : (
            <div className="border-r border-slate-200 pr-3 sm:pr-4">
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
                className="text-2xl lg:text-3xl font-sans font-extrabold text-mitologi-navy"
              />
            </div>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-sans font-bold uppercase rounded-md border border-red-100 shadow-sm ml-2">
              Diskon Khusus
            </span>
          )}
        </div>
      </div>

      {/* Product Options */}
      <div className="space-y-6 mb-10">
        {/* SKU Info */}
        <div className="flex gap-4 items-center">
          <div className="w-24 flex-shrink-0 text-slate-500 text-sm font-sans font-medium">
            SKU
          </div>
          <div className="flex-1 text-sm font-sans font-bold text-mitologi-navy bg-slate-50 px-3 py-1.5 rounded-lg inline-block w-fit">
            {(matchedVariant || product.variants[0])?.sku || "-"}
          </div>
        </div>

        {Array.isArray(product.options) && product.options.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="w-24 flex-shrink-0 text-slate-900 sm:text-slate-500 text-sm font-sans font-bold sm:font-medium pt-1">
              Varian
            </div>
            <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <VariantSelector
                options={product.options}
                variants={product.variants}
              />
            </div>
          </div>
        )}

        {/* Shipping Info */}
        <div className="flex gap-4">
          <div className="w-24 flex-shrink-0 text-slate-500 text-sm font-sans font-medium mt-1">
            Pengiriman
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <TruckIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-bold font-sans text-sm">
                Pengiriman Gratis
              </span>
            </div>
            <p className="text-sm font-sans text-slate-500">
              Ongkos kirim Rp0 untuk pesanan di atas Rp500rb
            </p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
          <div className="w-24 flex-shrink-0 text-slate-900 sm:text-slate-500 text-sm font-sans font-bold sm:font-medium mb-1 sm:mb-0">
            Kuantitas
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white h-10">
              <button
                onClick={() => handleQuantityChange("minus")}
                className="w-10 h-full flex items-center justify-center border-r border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-mitologi-navy disabled:opacity-50 transition-colors"
                disabled={quantity <= 1 || isPending}
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 h-full text-center text-sm font-sans font-bold text-mitologi-navy bg-transparent border-none focus:outline-none focus:ring-0 cursor-default"
              />
              <button
                onClick={() => handleQuantityChange("plus")}
                className="w-10 h-full flex items-center justify-center border-l border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-mitologi-navy disabled:opacity-50 transition-colors"
                disabled={
                  isPending ||
                  (matchedVariant?.stock !== undefined &&
                    quantity >= matchedVariant.stock)
                }
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs sm:text-sm font-sans font-medium text-slate-500">
              {matchedVariant && matchedVariant.stock !== undefined
                ? `Tersedia ${matchedVariant.stock} buah`
                : product.totalStock !== undefined
                  ? `Tersedia ${product.totalStock} buah`
                  : "Stok Tersedia"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row items-center gap-2 sm:gap-3 mb-10 w-full">
        <div className="flex flex-row gap-2 sm:gap-3 flex-1 w-full">
          <Button
            onClick={handleAddToCart}
            disabled={
              !(matchedVariant || product.variants[0])?.availableForSale ||
              isPending
            }
            size="lg"
            variant="secondary"
            className="flex-1 rounded-xl font-sans text-[13px] sm:text-base border-2 border-slate-200 text-mitologi-navy hover:bg-slate-50 transition-all font-bold h-12 px-2"
          >
            <ShoppingCartIcon className="hidden sm:inline-block w-5 h-5 mr-2" />
            <span>Masuk Keranjang</span>
          </Button>

          <Button
            onClick={handleBuyNow}
            disabled={
              !(matchedVariant || product.variants[0])?.availableForSale ||
              isPending
            }
            size="lg"
            variant="primary"
            className="flex-1 rounded-xl font-sans text-[13px] sm:text-base shadow-md hover:shadow-lg transition-all text-mitologi-gold bg-mitologi-navy font-bold h-12 border border-mitologi-navy px-2"
          >
            {isPending ? "Proses..." : "Beli Sekarang"}
          </Button>
        </div>

        {/* Wishlist Button */}
        <div className="flex-shrink-0">
          <WishlistButton
            productId={product.id}
            className="h-12 w-12 flex items-center justify-center border-2 border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all bg-white shadow-sm"
            iconClassName="h-5 w-5 sm:h-6 sm:w-6"
          />
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-3 gap-2 py-5 border-t border-slate-200 text-xs font-sans font-bold text-mitologi-navy">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center group">
          <div className="p-2 rounded-full bg-slate-50 group-hover:bg-mitologi-gold/10 transition-colors">
            <ShieldCheckIcon className="w-5 h-5 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
          </div>
          <span>
            Garansi
            <br className="sm:hidden" /> Mitologi
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center group border-x border-slate-100">
          <div className="p-2 rounded-full bg-slate-50 group-hover:bg-mitologi-gold/10 transition-colors">
            <TruckIcon className="w-5 h-5 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
          </div>
          <span>
            Garansi
            <br className="sm:hidden" /> Ongkir
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center group">
          <div className="p-2 rounded-full bg-slate-50 group-hover:bg-mitologi-gold/10 transition-colors">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
          </div>
          <span>
            Chat
            <br className="sm:hidden" /> Penjual
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
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

  const matchedVariant = product.variants.find((variant) => {
    const selectedOptions = Array.isArray(variant.selectedOptions)
      ? variant.selectedOptions
      : [];
    const allOptionsMatch = selectedOptions.every(
      (opt) => searchParams.get(opt.name.toLowerCase()) === opt.value,
    );
    return allOptionsMatch;
  });

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
      setQuantity(1);
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

  useEffect(() => {
    if (product.id) {
      track(Number(product.id), "view");
    }
  }, [product.id, track]);

  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const tags = normalizeTags(product.tags);

  const handleQuantityChange = (type: "plus" | "minus") => {
    if (type === "plus") {
      setQuantity((prev) => {
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
    <div className="flex flex-col h-full">
      <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-3">
        {product.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
        {product.averageRating && product.averageRating > 0 && (
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium border border-amber-100">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.averageRating.toFixed(1)}
          </span>
        )}
        {(product.totalReviews ?? 0) > 0 && (
          <>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{product.totalReviews} ulasan</span>
          </>
        )}
        {(product.totalSold ?? 0) > 0 && (
          <>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{product.totalSold}+ terjual</span>
          </>
        )}
      </div>

      <div className="mb-6 sm:mb-8">
        {minPrice !== maxPrice ? (
          <div className="flex items-baseline gap-2">
            <Price
              amount={product.priceRange.minVariantPrice.amount}
              currencyCode={product.priceRange.minVariantPrice.currencyCode}
              className="text-2xl sm:text-3xl font-bold text-slate-900"
            />
            <span className="text-slate-400">–</span>
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              className="text-lg sm:text-xl text-slate-400 line-through"
            />
          </div>
        ) : (
          <Price
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            className="text-2xl sm:text-3xl font-bold text-slate-900"
          />
        )}
      </div>

      {Array.isArray(product.options) && product.options.length > 0 && (
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-100">
          <VariantSelector
            options={product.options}
            variants={product.variants}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
        <span className="text-sm font-medium text-slate-700">Jumlah</span>
        <div className="flex items-center border border-slate-200 rounded-lg h-9 sm:h-10 shadow-sm">
          <button
            onClick={() => handleQuantityChange("minus")}
            className="w-9 sm:w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors"
            disabled={quantity <= 1 || isPending}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 sm:w-12 h-full text-center text-sm font-bold text-slate-900 bg-transparent border-x border-slate-200 focus:outline-none"
          />
          <button
            onClick={() => handleQuantityChange("plus")}
            className="w-9 sm:w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-40 transition-colors"
            disabled={
              isPending ||
              (matchedVariant?.stock !== undefined &&
                quantity >= matchedVariant.stock)
            }
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
          {matchedVariant && matchedVariant.stock !== undefined
            ? `${matchedVariant.stock} tersedia`
            : product.totalStock !== undefined
              ? `${product.totalStock} tersedia`
              : "Stok tersedia"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-6">
        <Button
          onClick={handleBuyNow}
          disabled={
            !(matchedVariant || product.variants[0])?.availableForSale ||
            isPending
          }
          className="flex-1 h-12 sm:h-11 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          {isPending ? "Memproses..." : "Beli Sekarang"}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={
              !(matchedVariant || product.variants[0])?.availableForSale ||
              isPending
            }
            variant="ghost"
            className="flex-1 sm:flex-none h-12 sm:h-11 px-4 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2 sm:mr-0" />
            <span className="sm:hidden text-sm">Keranjang</span>
          </Button>

          <WishlistButton
            productId={product.id}
            className="h-12 w-12 sm:h-11 sm:w-11 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0"
            iconClassName="h-5 w-5"
          />
        </div>
      </div>

      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>Pengiriman gratis &gt; Rp500rb</span>
        <span className="w-1 h-1 rounded-full bg-slate-200" />
        <span>Garansi produk</span>
      </div>
    </div>
  );
}

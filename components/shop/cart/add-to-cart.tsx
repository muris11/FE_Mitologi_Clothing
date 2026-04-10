"use client";

import clsx from "clsx";
import { Product, ProductVariant } from "lib/api/types";
import { useCart } from "lib/hooks/useCart";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPending,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isPending: boolean;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-xl bg-mitologi-navy p-4 font-sans font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-95";
  const disabledClasses =
    "cursor-not-allowed opacity-50 bg-slate-100 text-slate-400 shadow-none hover:scale-100 active:scale-100";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Stok Habis
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Pilih varian terlebih dahulu"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Pilih Varian
      </button>
    );
  }

  return (
    <button
      type="submit"
      aria-label="Tambah ke keranjang"
      disabled={isPending}
      className={clsx(buttonClasses, {
        "hover:bg-mitologi-navy/90 shadow-hover": !isPending,
        "cursor-not-allowed opacity-70": isPending,
      })}
    >
      {isPending ? "Menambahkan..." : "Tambah ke Keranjang"}
    </button>
  );
}

export function AddToCart({
  product,
  selectedVariant,
}: {
  product: Product;
  selectedVariant?: ProductVariant;
}) {
  const { variants, availableForSale } = product;
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);

  const variantFromParams = variants.find((variant: ProductVariant) => {
    const selectedOptions = Array.isArray(variant.selectedOptions)
      ? variant.selectedOptions
      : [];
    return selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    );
  });
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId =
    selectedVariant?.id || variantFromParams?.id || defaultVariantId;

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariantId) return;

    setIsPending(true);
    try {
      // Pass the product details down to `useCart` so it can optimistically render the cart UI immediately
      await addToCart(selectedVariantId, 1, product);
    } catch (e: unknown) {
      const err = e as Error;
      // Silent fail - useCart handles toast notification
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleAddToCart}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isPending={isPending}
      />
    </form>
  );
}

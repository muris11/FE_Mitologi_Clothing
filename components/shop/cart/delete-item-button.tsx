"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CartItem } from "lib/api/types";
import { useCart } from "lib/hooks/useCart";
import { useToast } from "components/ui/ultra-quality-toast";
import { useState } from "react";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();
  const { addToast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleRemove = async () => {
    if (!item.id) return;
    setIsPending(true);
    try {
      await removeFromCart(item.id);
    } catch (e: unknown) {
      const err = e as Error;
      addToast({
        title: "Gagal",
        description: err?.message || "Gagal menghapus produk.",
        variant: "error",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      aria-label="Hapus produk dari keranjang"
      onClick={handleRemove}
      disabled={isPending}
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-colors shadow-sm group touch-manipulation",
        { "cursor-not-allowed opacity-50": isPending },
      )}
    >
      <XMarkIcon className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
    </button>
  );
}

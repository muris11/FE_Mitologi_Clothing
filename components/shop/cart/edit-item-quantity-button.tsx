"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { CartItem } from "lib/api/types";
import { useCart } from "lib/hooks/useCart";
import { useToast } from "components/ui/ultra-quality-toast";
import { useState } from "react";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const { updateQuantity } = useCart();
  const { addToast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async () => {
    if (!item.id) return;
    setIsPending(true);
    try {
      const newQuantity =
        type === "plus" ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity < 1) return; // Prevent 0 if backend doesn't handle it
      await updateQuantity(item.id, item.merchandise.id, newQuantity);
    } catch (e: unknown) {
      const err = e as Error;
      addToast({
        title: "Gagal",
        description: err?.message || "Gagal memperbarui jumlah.",
        variant: "error",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      aria-label={
        type === "plus" ? "Tambah jumlah produk" : "Kurangi jumlah produk"
      }
      onClick={handleUpdate}
      disabled={isPending}
      className={clsx(
        "ease flex h-full min-w-[44px] max-w-[44px] flex-none items-center justify-center rounded-lg p-3 transition-colors hover:bg-slate-100 hover:text-mitologi-navy text-slate-500 group touch-manipulation",
        {
          "ml-auto": type === "minus",
          "cursor-not-allowed opacity-50": isPending,
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 transition-colors group-hover:text-mitologi-navy" />
      ) : (
        <MinusIcon className="h-4 w-4 transition-colors group-hover:text-mitologi-navy" />
      )}
    </button>
  );
}

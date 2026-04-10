"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Price from "components/shared/ui/price";
import { DEFAULT_OPTION } from "lib/constants";
import { useAuth } from "lib/hooks/useAuth";
import { useCart } from "lib/hooks/useCart";
import { createUrl } from "lib/utils";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

/**
 * Determines if we should bypass Next.js Image Optimization for specific external hosts.
 * This prevents processing overhead for reliable CDNs or mock image providers.
 */
function shouldBypassImageOptimization(src: string): boolean {
  if (!src) return false;
  
  try {
    const imageUrl = new URL(src);
    const host = imageUrl.hostname.toLowerCase();
    
    // Hosts from environment variables
    const bypassHosts = [
      process.env.NEXT_PUBLIC_PLACEHOLD_ORIGIN?.replace("https://", ""),
      process.env.NEXT_PUBLIC_UNSPLASH_ORIGIN?.replace("https://", ""),
      process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname : "",
      process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname : "",
      process.env.INTERNAL_API_URL ? new URL(process.env.INTERNAL_API_URL).hostname : "",
    ].filter(Boolean) as string[];

    if (bypassHosts.some(h => host === h || host.endsWith(h))) {
      return true;
    }

    // AWS S3 buckets are often used for direct serving
    if (host.endsWith(".amazonaws.com")) return true;

    return false;
  } catch {
    return false;
  }
}

export default function CartModal() {
  const { cart, isCartOpen, closeCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    closeCart();
    if (!user) {
      router.push("/shop/login?redirect=/shop/checkout");
    } else {
      router.push("/shop/checkout");
    }
  };

  return (
    <Transition show={isCartOpen} as={Fragment}>
      <Dialog onClose={closeCart} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-slate-200 bg-white p-6 shadow-xl md:w-[390px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="text-xl font-sans font-bold text-mitologi-navy">
                Keranjang Belanja
              </p>
              <button
                aria-label="Tutup keranjang"
                onClick={closeCart}
                className="text-slate-400 hover:text-mitologi-navy transition-colors"
              >
                <CloseCart />
              </button>
            </div>

            {!cart || !cart.lines || cart.lines.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 mb-6">
                  <ShoppingCartIcon className="h-12 w-12 text-slate-300" />
                </div>
                <p className="text-xl font-sans font-bold text-mitologi-navy mb-2">
                  Keranjang Kosong
                </p>
                <p className="text-center text-sm font-sans font-medium text-slate-500 mb-8 max-w-[250px]">
                  Mulai belanja dan temukan koleksi streetwear terbaik kami.
                </p>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-mitologi-navy px-8 py-3 text-sm font-sans font-bold text-white shadow-md hover:bg-mitologi-navy/90 hover:shadow-lg transition-all active:scale-95"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="grow overflow-auto py-4 space-y-4">
                  {cart.lines.map((item, i) => {
                    const merchandiseSearchParams =
                      {} as MerchandiseSearchParams;
                    const selectedOptions = Array.isArray(
                      item.merchandise.selectedOptions,
                    )
                      ? item.merchandise.selectedOptions
                      : [];
                    selectedOptions.forEach(({ name, value }) => {
                      if (value !== DEFAULT_OPTION) {
                        merchandiseSearchParams[name.toLowerCase()] = value;
                      }
                    });
                    const merchandiseUrl = createUrl(
                      `/shop/product/${item.merchandise.product.handle}`,
                      new URLSearchParams(merchandiseSearchParams),
                    );

                    // Use item.id if available (unique per line), otherwise fallback to merchandise.id and index composite
                    const itemKey = item.id || `${item.merchandise.id}-${i}`;

                    // Resolved Image URL via storageUrl helper
                    const imageUrl = storageUrl(item.merchandise.product.featuredImage?.url);

                    return (
                      <li
                        key={itemKey}
                        className="flex w-full flex-col border-b border-slate-100 pb-4 last:border-0 pt-4 first:pt-0"
                      >
                        <div className="relative flex w-full flex-row justify-between px-1 py-2">
                          <div className="absolute z-40 -ml-2 -mt-3">
                            <DeleteItemButton item={item} />
                          </div>
                          <div className="flex flex-row gap-4">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                              {imageUrl ? (
                                <Image
                                  className="h-full w-full object-cover"
                                  width={96}
                                  height={96}
                                  alt={
                                    item.merchandise.product.featuredImage
                                      ?.altText || item.merchandise.product.title
                                  }
                                  src={imageUrl}
                                  unoptimized={shouldBypassImageOptimization(imageUrl)}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] font-sans font-semibold uppercase text-slate-400">
                                  No Image
                                </div>
                              )}
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-col justify-between"
                            >
                              <div>
                                <span className="leading-tight font-sans font-bold text-mitologi-navy hover:text-mitologi-gold transition-colors block mb-1 text-base">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION && (
                                  <p className="text-sm font-sans text-slate-500">
                                    {item.merchandise.title}
                                  </p>
                                )}
                              </div>
                              <Price
                                className="text-sm font-sans font-semibold text-mitologi-navy"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                            </Link>
                          </div>
                          <div className="flex flex-col justify-end items-end">
                            <div className="flex h-9 flex-row items-center rounded-lg border border-slate-200 bg-white shadow-sm">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                              />
                              <p className="w-8 text-center">
                                <span className="w-full text-sm font-sans font-semibold text-mitologi-navy">
                                  {item.quantity}
                                </span>
                              </p>
                              <EditItemQuantityButton item={item} type="plus" />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="py-6 text-sm font-sans text-slate-600">
                  <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                    <p>Total</p>
                    <Price
                      className="text-right text-2xl font-sans font-bold text-mitologi-navy"
                      amount={cart.cost.totalAmount.amount}
                      currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="block w-full rounded-xl bg-mitologi-navy p-4 text-center text-sm font-sans font-bold text-white shadow-md hover:bg-mitologi-navy/90 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function CloseCart({ className }: { className?: string }) {
  return <XMarkIcon className={clsx("h-6 transition-none", className)} />;
}

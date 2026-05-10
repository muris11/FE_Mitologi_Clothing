"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

function shouldBypassImageOptimization(src: string): boolean {
  if (!src) return false;

  try {
    const imageUrl = new URL(src);
    const host = imageUrl.hostname.toLowerCase();

    const bypassHosts = [
      process.env.NEXT_PUBLIC_PLACEHOLD_ORIGIN?.replace("https://", ""),
      process.env.NEXT_PUBLIC_UNSPLASH_ORIGIN?.replace("https://", ""),
      process.env.NEXT_PUBLIC_SITE_URL
        ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
        : "",
      process.env.NEXT_PUBLIC_API_URL
        ? new URL(process.env.NEXT_PUBLIC_API_URL).hostname
        : "",
      process.env.INTERNAL_API_URL
        ? new URL(process.env.INTERNAL_API_URL).hostname
        : "",
    ].filter(Boolean) as string[];

    if (bypassHosts.some((h) => host === h || host.endsWith(h))) {
      return true;
    }

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
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
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
          <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white md:w-[400px] md:border-l md:border-slate-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <p className="text-base font-semibold text-slate-900">
                Keranjang
              </p>
              <button
                aria-label="Tutup keranjang"
                onClick={closeCart}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {!cart || !cart.lines || cart.lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-5">
                  <ShoppingCartIcon className="h-7 w-7 text-slate-300" />
                </div>
                <p className="text-base font-semibold text-slate-900 mb-1">
                  Keranjang kosong
                </p>
                <p className="text-sm text-slate-500 text-center mb-6 max-w-[220px]">
                  Temukan koleksi terbaik kami dan mulai belanja.
                </p>
                <button
                  onClick={closeCart}
                  className="w-full max-w-[200px] py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden">
                <ul className="flex-1 overflow-auto px-6 py-4 divide-y divide-slate-100">
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

                    const itemKey = item.id || `${item.merchandise.id}-${i}`;
                    const imageUrl = storageUrl(
                      item.merchandise.product.featuredImage?.url,
                    );

                    return (
                      <li key={itemKey} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex gap-4">
                          <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-50">
                            {imageUrl ? (
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={80}
                                alt={
                                  item.merchandise.product.featuredImage
                                    ?.altText ||
                                  item.merchandise.product.title
                                }
                                src={imageUrl}
                                unoptimized={shouldBypassImageOptimization(
                                  imageUrl,
                                )}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[9px] uppercase text-slate-400">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col justify-between min-w-0">
                            <div>
                              <Link
                                href={merchandiseUrl}
                                onClick={closeCart}
                                className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors line-clamp-1"
                              >
                                {item.merchandise.product.title}
                              </Link>
                              {item.merchandise.title !== DEFAULT_OPTION && (
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {item.merchandise.title}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center h-7 border border-slate-200 rounded">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                />
                                <span className="w-7 text-center text-xs font-medium text-slate-900">
                                  {item.quantity}
                                </span>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                />
                              </div>
                              <Price
                                className="text-sm font-medium text-slate-900"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-0.5">
                            <DeleteItemButton item={item} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-slate-100 px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-500">Total</span>
                    <Price
                      className="text-lg font-semibold text-slate-900"
                      amount={cart.cost.totalAmount.amount}
                      currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 text-sm font-medium text-center bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Checkout
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-3">
                    Pengiriman dihitung saat checkout
                  </p>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

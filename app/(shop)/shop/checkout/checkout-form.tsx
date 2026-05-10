"use client";

import Price from "components/shared/ui/price";
import Cookies from "js-cookie";
import {
  ApiError,
  Cart,
  CheckoutResponse,
  MidtransPaymentResponse,
  User,
  Address,
  createCheckout,
} from "lib/api";
import { useToast } from "components/ui/ultra-quality-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, useEffect } from "react";
import { MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { storageUrl } from "lib/utils/storage-url";

declare global {
  interface Window {
    snap: import("lib/api/types").MidtransSnap;
  }
}

export default function CheckoutForm({ user, cart }: { user: User; cart: Cart }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(user.addresses || []);

  useEffect(() => {
    if (addresses.length > 0) {
      const primary = addresses.find((a) => a.isPrimary);
      setSelectedAddressId(primary?.id || addresses[0]?.id || null);
    }
  }, [addresses]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) {
      addToast({ title: "Pilih alamat pengiriman", variant: "warning" });
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        label: selectedAddress.label,
        recipientName: selectedAddress.recipientName,
        phone: selectedAddress.phone,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2,
        city: selectedAddress.city,
        province: selectedAddress.province,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country,
        isPrimary: selectedAddress.isPrimary,
        notes: "",
      };

      const data = await createCheckout(payload);
      const snapToken = data.snapToken || "";
      const orderNumber = data.orderNumber || "";
      const redirectUrl = data.redirectUrl;

      const isMock = data?.mock === true || snapToken === "MOCK_SNAP_TOKEN";
      if (isMock) {
        addToast({ title: "Pesanan Berhasil", variant: "success" });
        Cookies.remove("cartSessionId");
        window.dispatchEvent(new Event("auth:changed"));
        router.push("/shop/checkout/success?orderId=" + orderNumber + "&mock=true");
        return;
      }

      if (!snapToken) {
        if (data?.error) throw new Error(data.error);
        if (redirectUrl) { router.push(redirectUrl); return; }
        throw new Error("No payment token returned");
      }

      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result: MidtransPaymentResponse) {
            try { const { confirmOrderPayment } = await import("lib/api"); await confirmOrderPayment(orderNumber); } catch (e) {}
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({ title: "Pembayaran Berhasil", variant: "success" });
            router.push("/shop/checkout/success?orderId=" + orderNumber);
          },
          onPending: async function (result: MidtransPaymentResponse) {
            try { const { confirmOrderPayment } = await import("lib/api"); await confirmOrderPayment(orderNumber); } catch (e) {}
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({ title: "Menunggu Pembayaran", variant: "warning" });
            router.push(`/shop/account/orders/${orderNumber}`);
          },
          onError: function (result: MidtransPaymentResponse) {
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({ title: "Pembayaran Gagal", variant: "error" });
            setIsProcessing(false);
            router.push(`/shop/account/orders/${orderNumber}`);
          },
          onClose: function () {
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({ title: "Pembayaran Dibatalkan", variant: "warning" });
            setIsProcessing(false);
            router.push(`/shop/account/orders/${orderNumber}`);
          },
        });
      }
    } catch (error: unknown) {
      if (error instanceof ApiError && error.isValidationError() && error.errors) {
        addToast({ title: "Data Tidak Valid", description: Object.values(error.errors).flat().join(". "), variant: "error" });
      } else if (error instanceof Error) {
        addToast({ title: "Kesalahan", description: error.message, variant: "error" });
      } else {
        addToast({ title: "Kesalahan", description: "Terjadi kesalahan.", variant: "error" });
      }
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <form onSubmit={handleCheckout} className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-10">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Alamat Pengiriman</h2>
                <p className="text-sm text-slate-500 mt-1">Pilih alamat tujuan pengiriman</p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/shop/account")}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2.5 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
              >
                + Tambah
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-16 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
                  <MapPinIcon className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-base text-slate-700 font-medium mb-1">Belum ada alamat</p>
                <p className="text-sm text-slate-400 mb-6">Tambahkan alamat untuk melanjutkan</p>
                <button
                  type="button"
                  onClick={() => router.push("/shop/account")}
                  className="px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Tambah Alamat Baru
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => {
                  const isSelected = selectedAddressId === address.id;
                  return (
                    <label
                      key={address.id}
                      className={`relative block p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                          : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={isSelected}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className={`text-base font-semibold ${isSelected ? "text-white" : "text-slate-900"}`}>
                              {address.recipientName}
                            </span>
                            {address.isPrimary && (
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                                isSelected ? "bg-white/20 text-white" : "bg-slate-900 text-white"
                              }`}>
                                Utama
                              </span>
                            )}
                          </div>
                          <p className={`text-sm mb-3 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                            {address.phone}
                          </p>
                          <p className={`text-sm leading-relaxed ${isSelected ? "text-slate-200" : "text-slate-600"}`}>
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                            <br />
                            {address.city}, {address.province} {address.postalCode}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          isSelected ? "bg-white" : "border-2 border-slate-300"
                        }`}>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing || !selectedAddress}
            className="w-full py-4 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memproses Pembayaran...
              </span>
            ) : (
              "Bayar Pesanan"
            )}
          </button>

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pembayaran aman & terenkripsi
          </p>
        </form>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-8 bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
            <div className="p-8 pb-6">
              <h2 className="text-lg font-semibold text-slate-900">Ringkasan Pesanan</h2>
              <p className="text-sm text-slate-500 mt-1">{cart.lines.length} item dalam keranjang</p>
            </div>
            <ul className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto px-8">
              {cart.lines.map((item) => {
                const product = item.merchandise.product as typeof item.merchandise.product & {
                  featured_image?: { url?: string; alt_text?: string };
                  images?: Array<{ url?: string }>;
                };
                const imageUrl = product.featuredImage?.url || product.featured_image?.url || product.images?.[0]?.url;

                return (
                  <li key={item.id} className="flex gap-4 py-5 first:pt-0">
                    <div className="relative h-20 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <Image src={storageUrl(imageUrl)} alt={product.title} fill className="object-cover" sizes="64px" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-300">No img</div>
                      )}
                      <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
                        {item.merchandise.product.title}
                      </p>
                      {item.merchandise.title !== "Default Title" && (
                        <p className="text-xs text-slate-500 mt-1.5 bg-slate-100 inline-block px-2 py-0.5 rounded">
                          {item.merchandise.title}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start text-sm font-semibold text-slate-900 pt-0.5 whitespace-nowrap">
                      <Price amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-slate-200 mx-8" />
            <div className="p-8 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700 font-medium">
                  <Price amount={cart.cost.subtotalAmount.amount} currencyCode={cart.cost.subtotalAmount.currencyCode} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pengiriman</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between pt-5 mt-4 border-t border-slate-200">
                <span className="text-base font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  <Price amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

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
import {
  MapPinIcon,
  PlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { storageUrl } from "lib/utils/storage-url";

declare global {
  interface Window {
    snap: import("lib/api/types").MidtransSnap;
  }
}

export default function CheckoutForm({
  user,
  cart,
}: {
  user: User;
  cart: Cart;
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [addresses, setAddresses] = useState<Address[]>(user.addresses || []);

  // Set default selected address (primary or first)
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
      addToast({
        title: "Alamat Belum Dipilih",
        description:
          "Silakan pilih alamat pengiriman atau tambah alamat baru di halaman Akun.",
        variant: "warning",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const payload = {
        shippingName: selectedAddress.recipientName,
        shippingPhone: selectedAddress.phone,
        shippingAddress:
          selectedAddress.addressLine1 +
          (selectedAddress.addressLine2
            ? `, ${selectedAddress.addressLine2}`
            : ""),
        shippingCity: selectedAddress.city,
        shippingProvince: selectedAddress.province,
        shippingPostalCode: selectedAddress.postalCode,
        notes: "",
      };

      const data = await createCheckout(payload);

      const snapToken = data.snapToken || "";
      const orderNumber = data.orderNumber || "";
      const redirectUrl = data.redirectUrl;

      const isMock = data?.mock === true || snapToken === "MOCK_SNAP_TOKEN";
      if (isMock) {
        addToast({
          title: "Pesanan Berhasil",
          description:
            "Pesanan berhasil dibuat! Mengalihkan ke halaman sukses...",
          variant: "success",
        });
        Cookies.remove("cartSessionId");
        window.dispatchEvent(new Event("auth:changed"));
        router.push(
          "/shop/checkout/success?orderId=" + orderNumber + "&mock=true",
        );
        return;
      }

      if (!snapToken) {
        if (data?.error) {
          throw new Error(data.error);
        }

        if (redirectUrl) {
          router.push(redirectUrl);
          return;
        }

        throw new Error("No payment token returned");
      }

      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result: MidtransPaymentResponse) {
            try {
              const { confirmOrderPayment } = await import("lib/api");
              await confirmOrderPayment(orderNumber);
            } catch (e) {
              // Silent fail
            }
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({
              title: "Pembayaran Berhasil",
              description: "Pembayaran berhasil! Pesanan Anda sedang diproses.",
              variant: "success",
            });
            router.push("/shop/checkout/success?orderId=" + orderNumber);
          },
          onPending: async function (result: MidtransPaymentResponse) {
            try {
              const { confirmOrderPayment } = await import("lib/api");
              await confirmOrderPayment(orderNumber);
            } catch (e) {}
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({
              title: "Pembayaran Tertunda",
              description:
                "Menunggu pembayaran. Silahkan selesaikan pembayaran pesanan Anda.",
              variant: "warning",
            });
            router.push(`/shop/account/orders/${orderNumber}`);
          },
          onError: function (result: MidtransPaymentResponse) {
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({
              title: "Pembayaran Gagal",
              description:
                "Pembayaran gagal. Silahkan coba lagi dari detail pesanan.",
              variant: "error",
            });
            setIsProcessing(false);
            router.push(`/shop/account/orders/${orderNumber}`);
          },
          onClose: function () {
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            addToast({
              title: "Pembayaran Dibatalkan",
              description:
                "Anda menutup jendela pembayaran. Silahkan lakukan pembayaran dari detail pesanan.",
              variant: "warning",
            });
            setIsProcessing(false);
            router.push(`/shop/account/orders/${orderNumber}`);
          },
        });
      }
    } catch (error: unknown) {
      if (
        error instanceof ApiError &&
        error.isValidationError() &&
        error.errors
      ) {
        addToast({
          title: "Data Tidak Valid",
          description: Object.values(error.errors).flat().join(". "),
          variant: "error",
        });
      } else if (error instanceof Error) {
        addToast({
          title: "Kesalahan",
          description:
            error.message || "Terjadi kesalahan saat memproses checkout.",
          variant: "error",
        });
      } else {
        addToast({
          title: "Kesalahan",
          description: "Terjadi kesalahan saat memproses checkout.",
          variant: "error",
        });
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

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Checkout Form */}
        <section className="lg:col-span-7">
          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Address Selection Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mitologi-navy text-white font-sans text-sm font-bold shadow-md">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-sans font-bold text-mitologi-navy">
                      Alamat Pengiriman
                    </h2>
                    <p className="text-sm font-sans text-slate-400 mt-0.5">
                      Pilih alamat untuk pengiriman pesanan
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/shop/account")}
                  className="text-sm font-sans font-semibold text-mitologi-navy hover:text-mitologi-gold transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
                >
                  <PlusIcon className="w-4 h-4" />
                  Tambah Alamat
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <MapPinIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-sans mb-4">
                    Anda belum memiliki alamat pengiriman
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push("/shop/account")}
                    className="bg-mitologi-navy text-white px-6 py-3 rounded-xl font-sans font-semibold hover:bg-mitologi-navy/90 transition-colors shadow-md"
                  >
                    Tambah Alamat
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`relative flex items-start p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedAddressId === address.id
                          ? "border-mitologi-navy bg-white shadow-md"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="sr-only"
                      />
                      <div className="flex-1 min-w-0">
                        {/* Badge and Selection Indicator */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {address.isPrimary ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold bg-mitologi-navy text-white shadow-sm">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Utama
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-bold bg-amber-100 text-amber-700">
                                {address.label}
                              </span>
                            )}
                          </div>
                          {selectedAddressId === address.id && (
                            <div className="flex items-center gap-1 text-mitologi-navy">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-sans font-semibold">Dipilih</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Recipient Info */}
                        <p className="font-sans font-bold text-lg text-slate-900 mb-1">
                          {address.recipientName}
                        </p>
                        <p className="font-sans text-sm text-slate-600 mb-3">
                          {address.phone}
                        </p>
                        
                        {/* Address with icon */}
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <MapPinIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <div className="space-y-0.5">
                            <p className="font-sans">
                              {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                            </p>
                            <p className="font-sans">
                              {address.city}, {address.province} {address.postalCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Selected Address Summary */}
              {selectedAddress && (
                <div className="mt-6 p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-sans font-bold text-emerald-700">
                      Alamat yang dipilih
                    </p>
                  </div>
                  <p className="text-sm font-sans text-emerald-600 ml-7">
                    {selectedAddress.recipientName} • {selectedAddress.phone}
                  </p>
                  <p className="text-sm font-sans text-emerald-600 ml-7">
                    {selectedAddress.addressLine1}, {selectedAddress.city}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !selectedAddress}
              className={`w-full bg-mitologi-navy border border-transparent rounded-full py-4 px-6 font-sans tracking-wide font-bold text-white transition-all disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed ${
                isProcessing
                  ? "pulse text-transparent relative shadow-none"
                  : "hover:bg-mitologi-navy/90 focus:outline-none focus:ring-4 focus:ring-mitologi-navy/30 shadow-lg shadow-mitologi-navy/20 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              }`}
            >
              {isProcessing && (
                <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                </div>
              )}
              {isProcessing ? "Memproses..." : "Lanjut ke Pembayaran"}
            </button>
          </form>
        </section>

        {/* Order Summary */}
        <section className="lg:col-span-5 mt-14 lg:mt-0">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full sticky top-24">
            <h2 className="text-xl font-sans font-extrabold text-mitologi-navy mb-8 pb-4 border-b border-slate-100">
              Ringkasan Pesanan
            </h2>
            <ul className="divide-y divide-slate-100 pr-2 custom-scrollbar max-h-96 overflow-y-auto">
              {cart.lines.map((item) => {
                const product = item.merchandise
                  .product as typeof item.merchandise.product & {
                  featured_image?: { url?: string; alt_text?: string };
                  images?: Array<{ url?: string }>;
                };
                const imageUrl =
                  product.featuredImage?.url ||
                  product.featured_image?.url ||
                  product.images?.[0]?.url;
                const altText =
                  product.featuredImage?.altText ||
                  product.featured_image?.alt_text ||
                  product.title;

                return (
                  <li key={item.id} className="py-5 flex gap-5">
                    <div className="shrink-0 relative">
                      <div className="h-20 w-20 border border-slate-100 rounded-xl overflow-hidden bg-slate-50 shadow-sm relative">
                        {imageUrl ? (
                          <Image
                            src={storageUrl(imageUrl)}
                            alt={altText}
                            fill
                            className="object-cover object-center"
                            sizes="80px"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-sans text-[10px] tracking-widest font-bold text-center p-2 leading-tight">
                            No Img
                          </div>
                        )}
                      </div>
                      <span className="absolute -top-2 -right-2 bg-mitologi-navy text-white rounded-full border border-white h-6 w-6 flex items-center justify-center font-sans text-[11px] font-bold shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-1">
                      <span className="text-sm font-bold font-sans text-slate-900 line-clamp-2">
                        {item.merchandise.product.title}
                      </span>
                      {item.merchandise.title !== "Default Title" && (
                        <span className="text-xs font-sans font-medium text-slate-500 mt-1.5 bg-slate-100 inline-flex px-2 py-0.5 rounded-md w-fit">
                          {item.merchandise.title}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-extrabold font-sans text-mitologi-navy flex flex-col justify-center">
                      <Price
                        amount={item.cost.totalAmount.amount}
                        currencyCode={item.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <dl className="border-t border-slate-100 py-6 space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <dt className="text-sm font-sans font-medium text-slate-500">
                  Subtotal
                </dt>
                <dd className="text-sm font-sans font-bold text-slate-700">
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-sans font-medium text-slate-500">
                  Pengiriman
                </dt>
                <dd className="text-sm font-sans font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Gratis Ongkir
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-200 mt-6 pt-6 -mx-6 md:-mx-8 px-6 md:px-8 bg-slate-50/50 pb-2 -mb-2 rounded-b-3xl">
                <dt className="text-base font-sans font-bold text-slate-700">
                  Total Bayar
                </dt>
                <dd className="text-xl font-sans font-extrabold text-mitologi-navy">
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}

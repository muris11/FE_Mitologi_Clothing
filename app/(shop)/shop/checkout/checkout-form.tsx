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
  City,
  Province,
  ShippingOption,
  createCheckout,
} from "lib/api";
import { getCities, getProvinces, calculateShippingCost } from "lib/api/shipping";
import { useToast } from "components/ui/ultra-quality-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, useEffect, useMemo } from "react";
import { MapPinIcon, CheckCircleIcon, TruckIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { storageUrl } from "lib/utils/storage-url";

declare global {
  interface Window {
    snap: import("lib/api/types").MidtransSnap;
  }
}

type ShippingMethod = "pickup" | "delivery";

const SHIPPING_COST_DEFAULT = 0;

export default function CheckoutForm({ user, cart }: { user: User; cart: Cart }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(user.addresses || []);

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("delivery");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  useEffect(() => {
    if (addresses.length > 0) {
      const primary = addresses.find((a) => a.isPrimary);
      setSelectedAddressId(primary?.id || addresses[0]?.id || null);
    }
  }, [addresses]);

  useEffect(() => {
    loadProvinces();
  }, []);

  // Automatically resolve province ID based on selectedAddress text
  useEffect(() => {
    if (!selectedAddress || provinces.length === 0) return;

    const provinceNorm = selectedAddress.province.toLowerCase();
    const foundProv = provinces.find((p) => {
      const nameNorm = (p.province || (p as any).name || "").toLowerCase();
      return nameNorm === provinceNorm || nameNorm.includes(provinceNorm) || provinceNorm.includes(nameNorm);
    });

    if (foundProv) {
      const provId = Number(foundProv.province_id || (foundProv as any).id);
      setSelectedProvinceId(provId);
    }
  }, [selectedAddress, provinces]);

  useEffect(() => {
    if (selectedProvinceId) {
      loadCities(selectedProvinceId);
    }
  }, [selectedProvinceId]);

  // Automatically resolve city ID based on selectedAddress text
  useEffect(() => {
    if (!selectedAddress || cities.length === 0) return;

    const cityNorm = selectedAddress.city.toLowerCase();
    const cleanName = (name: string) =>
      name.toLowerCase()
        .replace(/^(kabupaten|kab\.|kota)\s+/i, "")
        .trim();

    const cleanCityNorm = cleanName(cityNorm);
    const foundCity = cities.find((c) => {
      const cleanCName = cleanName(c.city_name || (c as any).name || "");
      return cleanCName === cleanCityNorm || cleanCName.includes(cleanCityNorm) || cleanCityNorm.includes(cleanCName);
    });

    if (foundCity) {
      const cityId = Number(foundCity.city_id || (foundCity as any).id);
      setSelectedCityId(cityId);
    }
  }, [selectedAddress, cities]);

  useEffect(() => {
    if (selectedCityId && shippingMethod === "delivery") {
      calculateShipping(selectedCityId);
    }
  }, [selectedCityId, shippingMethod]);

  const selectedCity = useMemo(() => {
    return cities.find((c) => Number(c.city_id || (c as any).id) === selectedCityId);
  }, [cities, selectedCityId]);

  const shippingCost = selectedShipping?.cost ?? SHIPPING_COST_DEFAULT;
  const totalAmount = Number(cart.cost.subtotalAmount.amount) + shippingCost;

  async function loadProvinces() {
    try {
      const data = await getProvinces();
      setProvinces(data);
    } catch (e) {
      console.error("Failed to load provinces:", e);
    }
  }

  async function loadCities(provinceId: number) {
    try {
      const data = await getCities(provinceId);
      setCities(data);
    } catch (e) {
      console.error("Failed to load cities:", e);
    }
  }

  async function calculateShipping(cityId: number) {
    setIsLoadingShipping(true);
    setSelectedShipping(null);
    setShippingOptions([]);

    try {
      const totalWeight = cart.lines.reduce((sum, item) => sum + item.quantity * 1000, 1000);
      const options = await calculateShippingCost(cityId, totalWeight);
      setShippingOptions(options);
      if (options.length > 0) {
        setSelectedShipping(options[0] || null);
      }
    } catch (e) {
      console.error("Failed to calculate shipping:", e);
      addToast({
        title: "Gagal menghitung ongkir",
        description: "Silakan pilih kota lain atau coba lagi",
        variant: "error",
      });
    } finally {
      setIsLoadingShipping(false);
    }
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (shippingMethod === "delivery" && !selectedShipping) {
      addToast({ title: "Pilih metode pengiriman", variant: "warning" });
      return;
    }

    if (shippingMethod === "delivery" && !selectedAddress) {
      addToast({ title: "Pilih alamat pengiriman", variant: "warning" });
      return;
    }

    setIsProcessing(true);
    try {
      const payload: Record<string, unknown> = {
        shippingMethod,
        shippingCost: shippingCost,
        notes: "",
      };

      if (shippingMethod === "delivery") {
        payload.label = selectedAddress!.label;
        payload.recipientName = selectedAddress!.recipientName;
        payload.phone = selectedAddress!.phone;
        payload.addressLine1 = selectedAddress!.addressLine1;
        payload.addressLine2 = selectedAddress!.addressLine2;
        payload.city = selectedAddress!.city;
        payload.province = selectedAddress!.province;
        payload.postalCode = selectedAddress!.postalCode;
        payload.country = selectedAddress!.country;
        payload.isPrimary = selectedAddress!.isPrimary;

        if (selectedShipping) {
          payload.shippingCourier = selectedShipping.courier;
          payload.shippingService = selectedShipping.service;
        }
      }

      const data = await createCheckout(payload as any);
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

      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: () => {
            Cookies.remove("cartSessionId");
            window.dispatchEvent(new Event("auth:changed"));
            router.push("/shop/checkout/success?orderId=" + orderNumber);
          },
          onPending: () => {
            addToast({
              title: "Pembayaran Pending",
              description: "Silakan selesaikan pembayaran Anda",
              variant: "info",
            });
          },
          onError: () => {
            addToast({
              title: "Pembayaran Gagal",
              description: "Silakan coba lagi",
              variant: "error",
            });
            setIsProcessing(false);
          },
          onClose: () => {
            setIsProcessing(false);
          },
        });
      } else if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (err: any) {
      addToast({
        title: "Gagal Memproses Pesanan",
        description: err.response?.data?.error?.message || err.message || "Terjadi kesalahan",
        variant: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || ""} strategy="lazyOnload" />

      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Pengiriman</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setShippingMethod("pickup")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                  shippingMethod === "pickup"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <BuildingStorefrontIcon className={`w-8 h-8 ${shippingMethod === "pickup" ? "text-white" : "text-slate-400"}`} />
                <span className="font-semibold">Ambil di Toko</span>
                <span className={`text-xs ${shippingMethod === "pickup" ? "text-slate-300" : "text-slate-400"}`}>Gratis</span>
              </button>
              <button
                type="button"
                onClick={() => setShippingMethod("delivery")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                  shippingMethod === "delivery"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <TruckIcon className={`w-8 h-8 ${shippingMethod === "delivery" ? "text-white" : "text-slate-400"}`} />
                <span className="font-semibold">Kirim ke Alamat</span>
                <span className={`text-xs ${shippingMethod === "delivery" ? "text-slate-300" : "text-slate-400"}`}>
                  {shippingCost > 0 ? <Price amount={String(shippingCost)} currencyCode="IDR" /> : "Hitung Ongkir"}
                </span>
              </button>
            </div>

            {shippingMethod === "delivery" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Alamat Pengiriman</h3>
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

                {selectedAddress && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Pilih Kurir</h3>

                    {isLoadingShipping ? (
                      <div className="py-12 text-center">
                        <div className="w-8 h-8 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-slate-500">Menghitung ongkir...</p>
                      </div>
                    ) : shippingOptions.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {shippingOptions.slice(0, 8).map((option, idx) => {
                          const isSelected = selectedShipping?.courier === option.courier && selectedShipping?.service === option.service;
                          return (
                            <button
                              key={`${option.courier}-${option.service}-${idx}`}
                              type="button"
                              onClick={() => setSelectedShipping(option)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                isSelected
                                  ? "border-slate-900 bg-slate-900 text-white"
                                  : "border-slate-200 hover:border-slate-300 bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{option.courierName}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-slate-100"}`}>
                                      {option.service}
                                    </span>
                                  </div>
                                  <p className={`text-sm mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                                    Estimasi {option.etd} hari • {option.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className={`text-lg font-bold ${isSelected ? "text-white" : ""}`}>
                                    <Price amount={String(option.cost)} currencyCode="IDR" className={isSelected ? "!text-white" : ""} />
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-500">
                          {selectedAddress
                            ? "Tidak ada kurir tersedia untuk alamat ini"
                            : "Pilih alamat terlebih dahulu"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing || (shippingMethod === "delivery" && !selectedShipping)}
            className="w-full py-4 text-base font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memproses Pembayaran...
              </span>
            ) : (
              `Bayar (Rp ${totalAmount.toLocaleString("id-ID")})`
            )}
          </button>

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pembayaran aman & terenkripsi
          </p>
        </div>

        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-8 bg-white rounded-2xl shadow-sm shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
            <div className="p-6 pb-4">
              <h2 className="text-lg font-semibold text-slate-900">Ringkasan Pesanan</h2>
              <p className="text-sm text-slate-500 mt-1">{cart.lines.length} item dalam keranjang</p>
            </div>
            <ul className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto px-6">
              {cart.lines.map((item) => {
                const product = item.merchandise.product as typeof item.merchandise.product & {
                  featured_image?: { url?: string; alt_text?: string };
                  images?: Array<{ url?: string }>;
                };
                const imageUrl = product.featuredImage?.url || product.featured_image?.url || product.images?.[0]?.url;

                return (
                  <li key={item.id} className="flex gap-3 py-4 first:pt-0">
                    <div className="relative h-16 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <Image src={storageUrl(imageUrl)} alt={product.title} fill className="object-cover" sizes="48px" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-300">No img</div>
                      )}
                      <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
                        {item.merchandise.product.title}
                      </p>
                    </div>
                    <div className="flex items-start text-sm font-semibold text-slate-900 pt-0.5 whitespace-nowrap">
                      <Price amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-slate-200" />
            <div className="p-6 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-700 font-medium">
                  <Price amount={cart.cost.subtotalAmount.amount} currencyCode={cart.cost.subtotalAmount.currencyCode} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  {shippingMethod === "pickup" ? "Pengambilan di Toko" : "Pengiriman"}
                </span>
                <span className={`font-medium ${shippingCost === 0 ? "text-emerald-600" : "text-slate-700"}`}>
                  {shippingCost === 0 ? (
                    "Gratis"
                  ) : (
                    <Price amount={String(shippingCost)} currencyCode="IDR" />
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-4 mt-3 border-t border-slate-200">
                <span className="text-base font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">
                  <Price amount={String(totalAmount)} currencyCode={cart.cost.totalAmount.currencyCode} />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </>
  );
}
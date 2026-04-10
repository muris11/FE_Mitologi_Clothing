"use client";

import {
  ArrowLeftIcon,
  CreditCardIcon,
  HomeIcon,
  MapPinIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { getOrderDetail, payOrder } from "lib/api";
import {
  MidtransPaymentResponse,
  MidtransSnap,
  Order,
  UnknownError,
} from "lib/api/types";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import Script from "next/script";
import { use, useEffect, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";
import { storageUrl } from "lib/utils/storage-url";

export default function OrderDetailPage(props: {
  params: Promise<{ orderNumber: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const { addToast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  useEffect(() => {
    getOrderDetail(params.orderNumber).then((data) => {
      setOrder(data || null);
      setLoading(false);
    });
  }, [params.orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-slate-800 border-t-slate-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return notFound();
  }

  const handlePayNow = async () => {
    if (!order) return;
    setIsPaying(true);
    try {
      const res = (await payOrder(order.orderNumber)) as {
        snapToken?: string;
        mock?: boolean;
      };
      if (res && res.snapToken) {
        if (res.mock) {
          addToast({
            variant: "success",
            title: "Pembayaran disimulasikan sukses (Mock)",
          });
        } else {
          const snap = (window as Window & { snap?: MidtransSnap }).snap;
          if (!snap) {
            addToast({
              variant: "error",
              title: "Library Snap belum dimuat. Silakan refresh halaman.",
            });
            return;
          }
          snap.pay(res.snapToken, {
            onSuccess: async function (_result: MidtransPaymentResponse) {
              try {
                const { confirmOrderPayment } = await import("lib/api");
                await confirmOrderPayment(order.orderNumber);
              } catch (e) {}
              addToast({ variant: "success", title: "Pembayaran berhasil!" });
              window.location.reload();
            },
            onPending: async function (_result: MidtransPaymentResponse) {
              try {
                const { confirmOrderPayment } = await import("lib/api");
                await confirmOrderPayment(order.orderNumber);
              } catch (e) {}
              addToast({ variant: "info", title: "Menunggu pembayaran Anda!" });
              window.location.reload();
            },
            onError: function (_result: MidtransPaymentResponse) {
              addToast({ variant: "error", title: "Pembayaran gagal!" });
            },
            onClose: function () {
              addToast({
                variant: "error",
                title: "Anda menutup popup sebelum menyelesaikan pembayaran",
              });
            },
          });
        }
      } else {
        addToast({
          variant: "error",
          title: "Gagal mendapatkan token pembayaran",
        });
      }
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Terjadi kesalahan saat memulai pembayaran",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const handleRefund = () => {
    setShowRefundForm(true);
  };

  const submitRefund = async () => {
    if (!order || !refundReason.trim()) return;

    setIsRefunding(true);
    try {
      const { requestOrderRefund } = await import("lib/api");
      const res = await requestOrderRefund(
        order.orderNumber,
        refundReason.trim(),
      );

      if (res.success) {
        addToast({
          variant: "success",
          title:
            "Pengajuan refund berhasil dikirim. Menunggu konfirmasi admin.",
        });
        setShowRefundForm(false);
        setRefundReason("");
        window.location.reload();
      } else {
        addToast({
          variant: "error",
          title: res.message || "Gagal mengajukan refund.",
        });
      }
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: "Terjadi kesalahan sistem saat mengajukan refund.",
      });
    } finally {
      setIsRefunding(false);
    }
  };

  const lines = order.items || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
        strategy="lazyOnload"
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop/account"
            className="text-sm font-sans font-medium text-slate-500 hover:text-mitologi-navy mb-6 inline-flex items-center gap-2 transition-colors group"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Pesanan Saya
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mb-1">
                Order #{order.orderNumber}
              </h1>
              <p className="text-sm font-sans text-slate-500">
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-sans font-semibold ${
                order.status === "paid"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : order.status === "processing"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : order.status === "shipped"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : order.status === "delivered"
                        ? "bg-teal-50 text-teal-700 border border-teal-200"
                        : order.status === "completed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : order.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : order.status === "refunded"
                              ? "bg-slate-50 text-slate-700 border border-slate-200"
                              : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {order.status === "paid"
                ? "Lunas"
                : order.status === "processing"
                  ? "Diproses"
                  : order.status === "shipped"
                    ? "Dikirim"
                    : order.status === "delivered"
                      ? "Terkirim"
                      : order.status === "completed"
                        ? "Selesai"
                        : order.status === "pending"
                          ? "Menunggu Pembayaran"
                          : order.status === "refunded"
                            ? "Dikembalikan"
                            : order.status === "cancelled"
                              ? "Dibatalkan"
                              : order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-xl border border-slate-200 p-4 md:p-6">
          <div className="flex items-center justify-between relative">
            {[
              { key: 'pending', label: 'Dipesan' },
              { key: 'paid', label: 'Dibayar' },
              { key: 'processing', label: 'Diproses' },
              { key: 'shipped', label: 'Dikirim' },
              { key: 'delivered', label: 'Sampai' },
            ].map((step, idx) => {
              const currentStatusIdx = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'completed'].indexOf(order.status);
              const isActive = currentStatusIdx >= idx;
              const isCurrent = ['pending', 'paid', 'processing', 'shipped', 'delivered'].includes(order.status) && 
                order.status === step.key;
              const isCompleted = currentStatusIdx > idx || order.status === 'completed';
              
              return (
                <div key={step.key} className="flex items-center flex-1 relative z-10">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                      isCompleted
                        ? "bg-mitologi-navy text-white"
                        : isCurrent
                          ? "bg-mitologi-navy text-white ring-4 ring-mitologi-navy/20"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}>
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={`text-xs font-sans font-medium whitespace-nowrap ${
                      isActive ? "text-slate-700" : "text-slate-400"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 4 && (
                    <div className="flex-1 h-0.5 mx-2 bg-slate-200 relative">
                      <div 
                        className="absolute inset-y-0 left-0 bg-mitologi-navy transition-all duration-500"
                        style={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Items */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h2 className="font-sans font-semibold text-slate-900 flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-slate-500" />
                  Produk ({lines.length} {lines.length > 1 ? 'items' : 'item'})
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className="p-6 flex gap-4 hover:bg-slate-50/30 transition-colors"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 relative bg-slate-50">
                      {line.productImage ? (
                        <Image
                          src={storageUrl(line.productImage)}
                          alt={line.productTitle}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs font-sans">
                          No Img
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-sans font-medium text-slate-900 mb-1 line-clamp-2">
                          {line.productHandle ? (
                            <Link
                              href={`/shop/product/${line.productHandle}`}
                              className="hover:text-mitologi-navy transition-colors"
                            >
                              {line.productTitle}
                            </Link>
                          ) : (
                            <span>{line.productTitle}</span>
                          )}
                        </h3>
                        {line.variantTitle && (
                          <p className="text-sm font-sans text-slate-500">
                            {line.variantTitle}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-sans text-slate-500">
                          {line.quantity} x {" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(Number(line.price))}
                        </span>
                        <span className="font-sans font-semibold text-slate-900">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(Number(line.total))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPinIcon className="h-5 w-5 text-slate-500" />
                <h2 className="font-sans font-semibold text-slate-900">
                  Informasi Pengiriman
                </h2>
              </div>
              
              {order.shippingAddress ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <HomeIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-slate-900 text-base">
                        {order.shippingAddress.name}
                      </p>
                      <p className="font-sans text-sm text-slate-600 mt-0.5">
                        {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pl-16">
                    <p className="font-sans text-sm text-slate-700 leading-relaxed">
                      {order.shippingAddress.address}
                    </p>
                    <p className="font-sans text-sm text-slate-700 mt-1">
                      {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                    </p>
                  </div>

                  {/* Tracking Number */}
                  {order.trackingNumber && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-sans font-medium text-sm text-amber-900">Nomor Resi</p>
                            <p className="font-sans text-xs text-amber-700">Pesanan sedang dalam perjalanan</p>
                          </div>
                        </div>
                        <span className="font-sans font-bold text-amber-900 tracking-wider text-lg">
                          {order.trackingNumber}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-slate-400 font-sans text-sm italic">Alamat tidak tersedia.</p>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-4">
            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-5">
                <CreditCardIcon className="h-5 w-5 text-slate-500" />
                <h2 className="font-sans font-semibold text-slate-900">
                  Ringkasan Pembayaran
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center font-sans text-sm">
                  <span className="text-slate-500">Subtotal Produk</span>
                  <span className="text-slate-700">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(order.subtotal || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-sans text-sm">
                  <span className="text-slate-500">Biaya Pengiriman</span>
                  <span className="text-slate-700">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(order.shippingCost || 0)}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex justify-between items-center font-sans">
                    <span className="font-semibold text-slate-900">Total Pembayaran</span>
                    <span className="font-bold text-xl text-mitologi-navy">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                {order.status === "pending" && (
                  <Button
                    onClick={handlePayNow}
                    disabled={isPaying}
                    variant="primary"
                    className="w-full py-3 rounded-xl font-sans font-semibold shadow-lg shadow-mitologi-navy/20 hover:shadow-xl hover:shadow-mitologi-navy/30 transition-shadow"
                  >
                    {isPaying ? "Memproses..." : "Bayar Sekarang"}
                  </Button>
                )}
                
                {order.status === "processing" && !order.refundRequestedAt && !showRefundForm && (
                  <Button
                    onClick={handleRefund}
                    variant="secondary"
                    className="w-full py-3 rounded-xl font-sans font-medium border-slate-200 hover:bg-slate-50"
                  >
                    Ajukan Pengembalian Dana
                  </Button>
                )}
              </div>

              {/* Refund Status */}
              {order.refundRequestedAt && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-600 rounded-full p-1.5 shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 font-sans">
                        Pengajuan Refund Diproses
                      </h4>
                      <p className="text-xs font-sans text-amber-700 mt-1">
                        Diajukan pada {new Date(order.refundRequestedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Refund Form */}
              {showRefundForm && (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <label className="block text-sm font-semibold font-sans text-slate-700">
                    Alasan Pengembalian Dana
                  </label>
                  <textarea
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="Jelaskan alasan mengajukan pengembalian dana..."
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-sans text-slate-700 placeholder:text-slate-400 focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/20 outline-none resize-none transition-all"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitRefund}
                      disabled={isRefunding || !refundReason.trim()}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                      variant="primary"
                    >
                      {isRefunding ? "Mengirim..." : "Kirim Pengajuan"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowRefundForm(false);
                        setRefundReason("");
                      }}
                      disabled={isRefunding}
                      variant="secondary"
                      className="py-2.5 px-4 rounded-lg text-sm border-slate-200"
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

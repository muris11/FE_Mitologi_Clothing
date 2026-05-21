"use client";

import { ArrowLeftIcon, TruckIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
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
import { notFound } from "next/navigation";
import Script from "next/script";
import { use, useEffect, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";
import { storageUrl } from "lib/utils/storage-url";

export default function OrderDetailPage(props: {
  params: Promise<{ orderNumber: string }>;
}) {
  const params = use(props.params);
  const { addToast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [copiedOrder, setCopiedOrder] = useState(false);

  const copyOrderNumber = async () => {
    if (!order?.orderNumber) return;
    await navigator.clipboard.writeText(order.orderNumber);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  useEffect(() => {
    getOrderDetail(params.orderNumber).then((data) => {
      setOrder(data || null);
      setLoading(false);
    });
  }, [params.orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
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
          addToast({ variant: "success", title: "Pembayaran berhasil (Mock)" });
          window.location.reload();
        } else {
          const snap = (window as Window & { snap?: MidtransSnap }).snap;
          if (!snap) {
            addToast({ variant: "error", title: "Snap belum dimuat. Refresh halaman." });
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
              addToast({ variant: "info", title: "Menunggu pembayaran." });
              window.location.reload();
            },
            onError: function (_result: MidtransPaymentResponse) {
              addToast({ variant: "error", title: "Pembayaran gagal." });
            },
            onClose: function () {
              addToast({ variant: "error", title: "Popup ditutup sebelum selesai." });
            },
          });
        }
      } else {
        addToast({ variant: "error", title: "Gagal mendapatkan token." });
      }
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({ variant: "error", title: err?.message || "Terjadi kesalahan." });
    } finally {
      setIsPaying(false);
    }
  };

  const submitRefund = async () => {
    if (!order || !refundReason.trim()) return;
    setIsRefunding(true);
    try {
      const { requestOrderRefund } = await import("lib/api");
      const res = await requestOrderRefund(order.orderNumber, refundReason.trim());
      if (res.success) {
        addToast({ variant: "success", title: "Pengajuan refund dikirim." });
        setShowRefundForm(false);
        setRefundReason("");
        window.location.reload();
      } else {
        addToast({ variant: "error", title: res.message || "Gagal mengajukan refund." });
      }
    } catch (error: unknown) {
      addToast({ variant: "error", title: "Terjadi kesalahan." });
    } finally {
      setIsRefunding(false);
    }
  };

  const lines = order.items || [];

  const statusLabel: Record<string, string> = {
    paid: "Lunas",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Terkirim",
    completed: "Selesai",
    pending: "Menunggu Pembayaran",
    refunded: "Dikembalikan",
    cancelled: "Dibatalkan",
  };

  const statusColor: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-700",
    processing: "bg-blue-50 text-blue-700",
    shipped: "bg-purple-50 text-purple-700",
    delivered: "bg-teal-50 text-teal-700",
    completed: "bg-green-50 text-green-700",
    pending: "bg-amber-50 text-amber-700",
    refunded: "bg-slate-100 text-slate-600",
    cancelled: "bg-red-50 text-red-700",
  };

  const fmt = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  const steps = ["pending", "paid", "processing", "shipped", "delivered"];
  const currentIdx = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-white">
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
        strategy="lazyOnload"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Link
          href="/shop/account"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Pesanan Saya
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-900">
                {order.orderNumber}
              </h1>
              <button
                type="button"
                onClick={copyOrderNumber}
                className="p-1 rounded hover:bg-slate-100 transition-colors"
                title="Salin nomor pesanan"
              >
                {copiedOrder ? (
                  <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4 text-slate-400" />
                )}
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <span className={`inline-flex px-2.5 py-1 rounded text-xs font-medium ${statusColor[order.status] || "bg-slate-100 text-slate-600"}`}>
            {statusLabel[order.status] || order.status}
          </span>
        </div>

        {!["cancelled", "refunded"].includes(order.status) && (
          <div className="mb-10 pb-8 border-b border-slate-100">
            <div className="flex items-center">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        idx <= currentIdx || order.status === "completed"
                          ? "bg-slate-900"
                          : "bg-slate-200"
                      }`}
                    />
                    <span className={`text-[10px] mt-1.5 whitespace-nowrap ${
                      idx <= currentIdx ? "text-slate-700" : "text-slate-400"
                    }`}>
                      {["Dipesan", "Dibayar", "Diproses", "Dikirim", "Sampai"][idx]}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-px mx-2 -mt-3.5">
                      <div className={`h-full ${idx < currentIdx || order.status === "completed" ? "bg-slate-900" : "bg-slate-200"}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4">
            Item Pesanan
          </h2>
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {lines.map((line) => (
              <div key={line.id} className="flex gap-4 p-4">
                <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-md bg-slate-50">
                  {line.productImage ? (
                    <Image
                      src={storageUrl(line.productImage)}
                      alt={line.productTitle}
                      width={56}
                      height={64}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300 text-[9px]">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">
                    {line.productHandle ? (
                      <Link href={`/shop/product/${line.productHandle}`} className="hover:text-slate-600">
                        {line.productTitle}
                      </Link>
                    ) : (
                      line.productTitle
                    )}
                  </p>
                  {line.variantTitle && (
                    <p className="text-xs text-slate-500 mt-0.5">{line.variantTitle}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500">
                      {line.quantity} x {fmt(Number(line.price))}
                    </span>
                    <span className="text-sm font-medium text-slate-900">
                      {fmt(Number(line.total))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div className="border border-slate-200 rounded-xl p-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4">
              Pembayaran
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>{fmt(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pengiriman</span>
                <span>{fmt(order.shippingCost || 0)}</span>
              </div>
              <div className="flex justify-between pt-3 mt-2 border-t border-slate-100 font-medium text-slate-900">
                <span>Total</span>
                <span>{fmt(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4">
              Pengiriman
            </h2>
            {order.shippingAddress ? (
              <div className="text-sm space-y-1">
                <p className="font-medium text-slate-900">{order.shippingAddress.recipientName}</p>
                <p className="text-slate-500">{order.shippingAddress.phone}</p>
                <p className="text-slate-600 mt-2">
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                </p>
                <p className="text-slate-600">
                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">Tidak tersedia</p>
            )}
            {order.trackingNumber && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">Nomor Resi</p>
                <p className="text-sm font-mono font-medium text-slate-900">{order.trackingNumber}</p>
              </div>
            )}
            {(order.trackingNumber || order.status === "shipped" || order.status === "processing") && (
              <div className="mt-3">
                <Link
                  href={`/shop/track-order?order=${order.orderNumber}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <TruckIcon className="h-4 w-4" />
                  Lacak Paket
                </Link>
              </div>
            )}
          </div>
        </div>

        {order.status === "pending" && (
          <div className="mb-6">
            <button
              onClick={handlePayNow}
              disabled={isPaying}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {isPaying ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        )}

        {order.status === "processing" && !order.refundRequestedAt && !showRefundForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowRefundForm(true)}
              className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-900 transition-colors"
            >
              Ajukan pengembalian dana
            </button>
          </div>
        )}

        {order.status === "refunded" && (
          <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <p className="text-sm font-medium text-emerald-800">Refund selesai</p>
            <p className="text-xs text-emerald-600 mt-0.5">Dana telah dikembalikan.</p>
          </div>
        )}

        {order.refundRequestedAt && order.status !== "refunded" && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-sm font-medium text-amber-800">Refund sedang diproses</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Diajukan {new Date(order.refundRequestedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        )}

        {showRefundForm && (
          <div className="mb-6 border border-slate-200 rounded-xl p-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alasan pengembalian
            </label>
            <textarea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Jelaskan alasan Anda..."
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:ring-0 resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={submitRefund}
                disabled={isRefunding || !refundReason.trim()}
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                {isRefunding ? "Mengirim..." : "Kirim"}
              </button>
              <button
                onClick={() => { setShowRefundForm(false); setRefundReason(""); }}
                disabled={isRefunding}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

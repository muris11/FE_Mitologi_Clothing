"use client";

import { CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CopyOrderId from "./copy-order-id";
import { useEffect, useState } from "react";
import { confirmOrderPayment } from "lib/api";

export default function CheckoutSuccessClient({ orderId }: { orderId: string }) {
  const [syncing, setSyncing] = useState(true);
  const [syncStatus, setSyncStatus] = useState<"checking" | "paid" | "pending" | "error">("checking");

  useEffect(() => {
    if (!orderId) {
      setSyncing(false);
      return;
    }

    const syncPaymentStatus = async () => {
      try {
        const result = await confirmOrderPayment(orderId);

        if (result.success && result.order?.status === "processing") {
          setSyncStatus("paid");
        } else {
          setSyncStatus("pending");
        }
      } catch {
        setSyncStatus("error");
      } finally {
        setSyncing(false);
      }
    };

    syncPaymentStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-500 mt-1">Pesanan berhasil dibuat</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Pesanan berhasil dibuat
              </h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Terima kasih telah berbelanja. Konfirmasi pesanan telah dikirim ke
                email Anda.
              </p>

              {syncing ? (
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  Memeriksa status pembayaran...
                </div>
              ) : syncStatus === "paid" ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 rounded-xl border border-emerald-200 mb-8">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Pembayaran terkonfirmasi!</span>
                </div>
              ) : syncStatus === "pending" ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-xl border border-amber-200 mb-8">
                  <ArrowPathIcon className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">Menunggu konfirmasi pembayaran</span>
                </div>
              ) : null}

              {orderId && <CopyOrderId orderId={orderId} />}
            </div>

            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/shop/account/orders/${orderId}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Lihat Pesanan
                </Link>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { CheckCircleIcon, ArrowPathIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { confirmOrderPayment } from "lib/api";

export default function CheckoutSuccessClient({ orderId }: { orderId: string }) {
  const [syncing, setSyncing] = useState(true);
  const [syncStatus, setSyncStatus] = useState<"checking" | "paid" | "pending" | "error">("checking");
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!orderId) {
      setSyncing(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const result = await confirmOrderPayment(orderId);

        if (result.success && result.order?.status === "processing") {
          setSyncStatus("paid");
          setSyncing(false);
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // Keep polling on error
      }
    };

    // Check immediately
    checkStatus();

    // Poll every 3 seconds until paid (max 30 seconds)
    let attempts = 0;
    pollRef.current = setInterval(() => {
      attempts++;
      if (attempts >= 10) {
        setSyncStatus("pending");
        setSyncing(false);
        if (pollRef.current) clearInterval(pollRef.current);
        return;
      }
      checkStatus();
    }, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [orderId]);

  const handleCopy = async () => {
    if (!orderId) return;
    await navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Pesanan berhasil dibuat
          </h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Terima kasih telah berbelanja. Konfirmasi pesanan telah dikirim ke email Anda.
          </p>

          {syncing ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
              Memeriksa status pembayaran...
            </div>
          ) : syncStatus === "paid" ? (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 rounded-full border border-emerald-200 mb-6">
              <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Pembayaran terkonfirmasi!</span>
            </div>
          ) : null}

          {orderId && (
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Order ID</span>
              <span className="font-mono text-sm font-semibold text-slate-900">{orderId}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 rounded hover:bg-slate-200 transition-colors"
                title="Salin Order ID"
              >
                {copied ? (
                  <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4 text-slate-400" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
          <div className="flex items-center justify-center gap-3">
            <Link
              href={`/shop/account/orders/${orderId}`}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Lihat Pesanan
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

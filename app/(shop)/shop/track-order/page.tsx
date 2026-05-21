"use client";

import { MagnifyingGlassIcon, TruckIcon, CheckCircleIcon, ClockIcon, ArrowPathIcon, XCircleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderTracking } from "lib/api/shipping";
import { OrderTracking, TrackingEvent } from "lib/api/types";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const order = searchParams.get("order");
    if (order) {
      setOrderNumber(order);
    }
  }, [searchParams]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError(null);
    setTracking(null);

    try {
      const data = await getOrderTracking(orderNumber.trim());
      setTracking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data tracking");
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (event: TrackingEvent) => {
    if (!event.isSystemEvent) {
      return <DocumentTextIcon className="h-5 w-5" />;
    }

    switch (event.status) {
      case "paid":
        return <CheckCircleSolidIcon className="h-5 w-5" />;
      case "processing":
        return <ArrowPathIcon className="h-5 w-5" />;
      case "shipped":
        return <TruckIcon className="h-5 w-5" />;
      case "delivered":
      case "completed":
        return <CheckCircleIcon className="h-5 w-5" />;
      case "cancelled":
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return <ClockIcon className="h-5 w-5" />;
    }
  };

  const statusColor = (event: TrackingEvent) => {
    if (!event.isSystemEvent) return "text-slate-600";

    switch (event.status) {
      case "paid":
        return "text-emerald-600";
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-amber-600";
      case "delivered":
      case "completed":
        return "text-emerald-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Lacak Pesanan</h1>
          <p className="text-sm text-slate-500 mt-1">Cek status pengiriman pesanan Anda</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-200">
              <form onSubmit={handleTrack} className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    placeholder="Masukkan nomor pesanan (contoh: MC-20260521-ABC123)"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !orderNumber.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mencari...
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-4 w-4" />
                      Lacak
                    </>
                  )}
                </button>
              </form>
            </div>

            {error && (
              <div className="p-6 sm:p-8">
                <div className="text-center py-8">
                  <XCircleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              </div>
            )}

            {tracking && (
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Nomor Pesanan</p>
                      <p className="font-mono text-lg font-bold text-slate-900">{tracking.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Status</p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        tracking.status === "delivered" || tracking.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : tracking.status === "cancelled"
                          ? "bg-red-50 text-red-700"
                          : tracking.status === "shipped"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {tracking.statusLabel}
                      </span>
                    </div>
                  </div>

                  {(tracking.shippingCourier || tracking.trackingNumber) && (
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                      {tracking.shippingCourier && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase">Kurir</p>
                          <p className="text-sm font-semibold text-slate-900">{tracking.shippingCourier.toUpperCase()}</p>
                        </div>
                      )}
                      {tracking.trackingNumber && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase">Nomor Resi</p>
                          <p className="text-sm font-mono font-semibold text-slate-900">{tracking.trackingNumber}</p>
                        </div>
                      )}
                      {tracking.shippingAddress && (
                        <div>
                          <p className="text-xs text-slate-500 uppercase">Tujuan</p>
                          <p className="text-sm font-semibold text-slate-900">{tracking.shippingAddress.city}, {tracking.shippingAddress.province}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <h3 className="text-sm font-semibold text-slate-900 mb-6">Riwayat Pengiriman</h3>

                  {tracking.events.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-xl">
                      <ClockIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">Belum ada riwayat pengiriman</p>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      {tracking.events.map((event, idx) => (
                        <div key={event.id} className="relative flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              idx === 0
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 " + statusColor(event)
                            }`}>
                              {statusIcon(event)}
                            </div>
                            {idx < tracking.events.length - 1 && (
                              <div className="w-0.5 h-full bg-slate-200 mt-2" />
                            )}
                          </div>

                          <div className="flex-1 pb-8">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className={`font-semibold text-sm ${idx === 0 ? "text-slate-900" : "text-slate-700"}`}>
                                  {event.title}
                                </p>
                                {event.description && (
                                  <p className="text-sm text-slate-500 mt-0.5">{event.description}</p>
                                )}
                                {event.location && (
                                  <p className="text-xs text-slate-400 mt-1">{event.location}</p>
                                )}
                              </div>
                              <time className="text-xs text-slate-400 whitespace-nowrap ml-4">
                                {new Date(event.occurredAt).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                                {" "}
                                {new Date(event.occurredAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </time>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!tracking && !error && !loading && (
              <div className="p-12 text-center">
                <TruckIcon className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <p className="text-sm text-slate-500">Masukkan nomor pesanan untuk melacak pengiriman</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

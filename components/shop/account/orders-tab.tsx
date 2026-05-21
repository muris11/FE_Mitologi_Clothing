"use client";

import { ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { Order } from "lib/api/types";
import Link from "next/link";
import { useState, useMemo } from "react";

interface OrdersTabProps {
  orders: Order[];
}

const statusGroups: Record<string, string[]> = {
  all: [],
  ongoing: ["pending", "processing", "shipped"],
  completed: ["completed", "delivered"],
  cancelled: ["cancelled", "refunded"],
};

export function OrdersTab({ orders }: OrdersTabProps) {
  const [filter, setFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    const allowed = statusGroups[filter] || [];
    return orders.filter((o) => allowed.includes(o.status));
  }, [orders, filter]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      paid: "Lunas",
      processing: "Diproses",
      shipped: "Dikirim",
      delivered: "Terkirim",
      completed: "Selesai",
      pending: "Menunggu Pembayaran",
      refunded: "Dikembalikan",
      cancelled: "Dibatalkan",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    if (["processing", "shipped", "delivered", "completed", "paid"].includes(status)) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (["pending"].includes(status)) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-2">
            Riwayat Pesanan
          </h2>
          <p className="text-sm font-sans text-slate-500">
            Pantau status pengiriman belanjaan Anda.
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm font-sans font-medium border border-slate-200 bg-white text-slate-700 rounded-xl focus:ring-1 focus:ring-mitologi-navy focus:border-mitologi-navy py-2 px-4 w-full sm:w-auto outline-none shadow-sm cursor-pointer hover:border-slate-300 transition-colors"
          >
            <option value="all">Semua Pesanan</option>
            <option value="ongoing">Berlangsung</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto border border-slate-100 shadow-sm mb-5">
              <ShoppingBagIcon className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-sans font-bold text-mitologi-navy mb-2">
              {filter === "all" ? "Belum ada pesanan" : "Tidak ada pesanan dengan filter ini"}
            </h3>
            <p className="text-sm font-sans text-slate-500 max-w-xs mx-auto mb-8">
              {filter === "all"
                ? "Mulai koleksi fashion Anda dengan produk-produk terbaik kami."
                : "Coba ubah filter untuk melihat pesanan lainnya."}
            </p>
            {filter === "all" && (
              <Button
                asChild
                variant="primary"
                size="lg"
                className="rounded-full shadow-md font-sans font-bold"
              >
                <Link href="/shop">Mulai Belanja</Link>
              </Button>
            )}
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-soft transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-sans font-bold">
                      #{order.orderNumber}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="text-sm font-sans text-slate-500 block sm:inline w-full sm:w-auto">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-sans font-bold text-mitologi-navy">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order.total)}
                    </span>
                    <span className="text-sm font-sans text-slate-400 border-l border-slate-200 pl-3">
                      ({order.itemsCount || order.items?.length || 0} item)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>

                  <div className="h-8 w-px bg-slate-200 hidden md:block" />

                  <Link
                    href={`/shop/account/orders/${order.orderNumber}`}
                    className="inline-flex items-center gap-2 text-sm font-sans font-bold text-mitologi-navy hover:text-mitologi-gold transition-colors"
                  >
                    Lihat Detail <ChevronRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

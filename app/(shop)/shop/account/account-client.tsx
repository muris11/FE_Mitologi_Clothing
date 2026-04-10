"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { AccountDashboard } from "components/shop/account/account-dashboard";
import Cookies from "js-cookie";
import { getOrders } from "lib/api";
import { Order } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Client-side account page wrapper.
 * Uses useAuth() context for authentication (same as login)
 * instead of server-side cookies which can be stale.
 */
export default function AccountClient() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user) {
      router.replace("/shop/login");
      return;
    }

    // Fetch orders with auth token from cookie
    const token = Cookies.get("auth_token");
    if (!token) {
      router.replace("/shop/login");
      return;
    }

    getOrders({
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        setOrders(data?.orders || []);
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-mitologi-navy text-white pt-16 pb-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-white/10 rounded w-48" />
              <div className="h-12 bg-white/10 rounded w-64" />
              <div className="h-6 bg-white/10 rounded w-96" />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 min-h-[600px]">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-slate-200 rounded w-48" />
              <div className="h-48 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-mitologi-navy text-white pt-16 pb-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-800/60 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
        <div
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)]"
          style={{ backgroundSize: "32px 32px" }}
        />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-300 font-sans font-medium mb-8">
            <Link
              href="/shop"
              className="hover:text-mitologi-gold transition-colors"
            >
              Beranda
            </Link>
            <ChevronRightIcon className="h-3.5 w-3.5" />
            <span className="text-white font-bold">Akun Saya</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight mb-4">
            Akun Saya
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl font-sans font-medium">
            Kelola informasi profil, pantau status pesanan, dan atur preferensi
            akun Anda dalam satu tempat.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-24">
        <div className="bg-white rounded-3xl shadow-xl shadow-mitologi-navy/5 border border-slate-100 overflow-hidden min-h-[600px]">
          <AccountDashboard user={user} orders={orders} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { AccountDashboard } from "components/shop/account/account-dashboard";
import Cookies from "js-cookie";
import { getOrders } from "lib/api";
import { Order } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "components/ui/skeleton";

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

    const token = Cookies.get("mitologi_auth_token");
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
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
          <Skeleton className="h-7 w-32 rounded mb-2" />
          <Skeleton className="h-4 w-64 rounded mb-10" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1">
            Akun Saya
          </h1>
          <p className="text-sm text-slate-500">
            Halo, {user.name}. Kelola pesanan dan informasi akun Anda.
          </p>
        </div>

        <AccountDashboard user={user} orders={orders} />
      </div>
    </div>
  );
}

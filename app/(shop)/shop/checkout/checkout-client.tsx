"use client";

import Cookies from "js-cookie";
import { getCart } from "lib/api";
import { Cart } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkout-form";

export default function CheckoutClient() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !user) {
      router.replace("/shop/login?redirect=/shop/checkout");
      return;
    }

    const cartId = Cookies.get("cartSessionId");
    if (!cartId) {
      router.replace("/shop");
      return;
    }

    getCart(cartId)
      .then((cartData) => {
        if (!cartData || !cartData.lines || cartData.lines.length === 0) {
          router.replace("/shop");
          return;
        }
        setCart(cartData);
      })
      .catch(() => {
        router.replace("/shop");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authLoading, isAuthenticated, user, router]);

  if (authLoading || loading || !cart || !user) {
    return (
      <div className="min-h-screen bg-white pt-12 pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-7 bg-slate-100 rounded w-32" />
            <div className="h-px bg-slate-100" />
            <div className="h-48 bg-slate-50 rounded-lg" />
            <div className="h-32 bg-slate-50 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-500 mt-1">Selesaikan pesanan Anda</p>
        </div>
        <CheckoutForm user={user} cart={cart} />
      </div>
    </div>
  );
}

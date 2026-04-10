"use client";

import Cookies from "js-cookie";
import { getCart } from "lib/api";
import { Cart } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkout-form";

/**
 * Client-side checkout wrapper.
 * Reads auth from useAuth context (same source as login) rather than
 * trying to read server-side cookies, which can be stale after
 * client-side navigation from login → checkout.
 */
export default function CheckoutClient() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.replace("/shop/login?redirect=/shop/checkout");
      return;
    }

    // Fetch cart
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

  // Loading state
  if (authLoading || loading || !cart || !user) {
    return (
      <div className="bg-slate-50 min-h-screen pt-12 pb-32">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-slate-200 rounded w-48" />
            <div className="h-64 bg-slate-200 rounded" />
            <div className="h-48 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-sans font-extrabold text-mitologi-navy mb-8 pb-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-1.5 h-8 bg-mitologi-gold rounded-full"></div>
          Checkout
        </h1>
        <CheckoutForm user={user} cart={cart} />
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { ToastProvider } from "components/ui/ultra-quality-toast";
import { AuthProvider } from "lib/hooks/useAuth";
import { CartProvider } from "lib/hooks/useCart";

/**
 * Client-side providers wrapper that ensures proper nesting:
 * ToastProvider (outermost) -> AuthProvider -> CartProvider (innermost)
 * 
 * This prevents "useToast must be used within ToastProvider" errors
 * when AuthProvider or CartProvider try to use toast notifications.
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

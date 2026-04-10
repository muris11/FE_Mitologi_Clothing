"use client";

import { useAuth } from "lib/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      const loginUrl = `/shop/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading || !user) {
    // Render nothing or a loading spinner while checking auth or redirecting
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-mitologi-navy"></div>
          <p className="text-sm font-sans font-medium text-slate-500">
            Memeriksa sesi...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

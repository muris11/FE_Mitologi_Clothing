"use client";

import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { forgotPassword } from "lib/api/auth";
import { UnknownError } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/shop");
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setSuccessMsg("");

    try {
      const result = await forgotPassword(email);
      setSuccessMsg(
        result.message || "Link reset password telah dikirim ke email Anda.",
      );
      setEmail("");
    } catch (err: unknown) {
      const error = err as UnknownError;
      setApiError(
        error?.message || "Gagal mengirim link reset. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-[16px] text-sm font-medium flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {apiError}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-[16px] text-sm font-medium flex items-start gap-3">
          <svg
            className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {successMsg}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 mb-2"
        >
          Email
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-mitologi-navy transition-colors" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-11 pr-4 py-3.5 rounded-[16px] text-sm border border-slate-200 bg-app-cream text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-mitologi-navy/20 focus:border-mitologi-navy font-sans transition-colors"
            placeholder="nama@email.com"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        className="w-full flex items-center justify-center p-4 text-base"
      >
        {loading ? "Mengirim…" : "Kirim Tautan Reset"}
      </Button>

      <div className="text-center pt-2">
        <Link
          href="/shop/login"
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-mitologi-navy hover:text-mitologi-gold transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Login</span>
        </Link>
      </div>
    </form>
  );
}

"use client";

import {
  ArrowRightIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { ApiError } from "lib/api";
import { UnknownError } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/shop";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");

  // Redirect if already logged in (only on mount/external state change)
  useEffect(() => {
    if (user && !isPending && !apiError) {
      // If we're already logged in, just go to shop
      router.push(redirect);
    }
  }, [user, redirect, router, isPending, apiError]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setFieldErrors({});
    setApiError("");

    try {
      await login(email, password);
      // Full page reload/redirect to ensure state is fresh
      window.location.href = redirect;
    } catch (e: unknown) {
      const error = e as UnknownError;
      if (e instanceof ApiError) {
        if (e.isValidationError()) {
          const errors: FieldErrors = {};
          if (e.errors) {
            errors.email = e.getFieldError("email");
            errors.password = e.getFieldError("password");
          }
          setFieldErrors(errors);

          // Show general error message
          if (e.message) {
            setApiError(e.message);
          }
        } else {
          setApiError(e.message || "Email atau password salah.");
        }
      } else {
        setApiError("Email atau password salah. Silakan coba lagi.");
      }
    } finally {
      setIsPending(false);
    }
  };

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
      <div className="space-y-4">
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={clsx(
                "block w-full pl-11 pr-4 py-3.5 rounded-[16px] text-sm border bg-app-cream text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mitologi-navy/20 focus:border-mitologi-navy font-sans transition-colors",
                fieldErrors.email
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200 hover:border-slate-300",
              )}
              placeholder="nama@email.com"
              required
              autoComplete="email"
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-2 text-xs font-sans font-medium text-red-500">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 mb-2"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-mitologi-navy transition-colors" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              className={clsx(
                "block w-full pl-11 pr-12 py-3.5 rounded-[16px] text-sm border bg-app-cream text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mitologi-navy/20 focus:border-mitologi-navy font-sans transition-colors",
                fieldErrors.password
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200 hover:border-slate-300",
              )}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-2 text-xs font-sans font-medium text-red-500">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/shop/forgot-password"
            className="text-sm font-sans font-semibold text-mitologi-navy hover:text-mitologi-gold transition-colors"
          >
            Lupa Password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        variant="primary"
        className="w-full flex items-center justify-center p-4 text-base"
      >
        <span>{isPending ? "Memproses…" : "Masuk Sekarang"}</span>
        {!isPending}
      </Button>

      <div className="text-center pt-2">
        <p className="text-sm font-sans font-medium text-slate-500">
          Belum punya akun?{" "}
          <Link
            href={
              redirect && redirect !== "/shop"
                ? `/shop/register?redirect=${encodeURIComponent(redirect)}`
                : "/shop/register"
            }
            className="font-bold text-mitologi-navy hover:text-mitologi-gold transition-colors"
          >
            Daftar Disini
          </Link>
        </p>
      </div>
    </form>
  );
}

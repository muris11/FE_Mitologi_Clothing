"use client";

import {
  ArrowRightIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { ApiError } from "lib/api";
import { UnknownError } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export default function RegisterForm() {
  const { register, user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [isPending, setIsPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [apiError, setApiError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isPending) {
      router.replace("/shop");
    }
  }, [user, router, isPending]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "email") setIsEmailTaken(false);
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setFieldErrors({
        password_confirmation: "Konfirmasi password tidak cocok.",
      });
      return;
    }

    setIsPending(true);
    setFieldErrors({});
    setIsEmailTaken(false);
    setApiError("");

    try {
      await register(name, email, password, passwordConfirmation);
      // Full page reload to ensure session is correctly initialized
      window.location.href = "/shop";
    } catch (e: unknown) {
      const error = e as UnknownError;
      if (e instanceof ApiError && e.isValidationError()) {
        const errors: FieldErrors = {};
        if (e.errors) {
          errors.name = e.getFieldError("name");
          errors.email = e.getFieldError("email");
          errors.password = e.getFieldError("password");
          errors.password_confirmation = e.getFieldError(
            "password_confirmation",
          );
        }
        setFieldErrors(errors);

        if (e.isEmailTaken()) {
          setIsEmailTaken(true);
        } else {
          setApiError(e.message || "Mohon periksa kembali data Anda.");
        }
      } else {
        setApiError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEmailTaken && (
        <div className="p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded-[16px] text-sm font-medium flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            Email ini sudah terdaftar. Silakan{" "}
            <Link
              href="/shop/login"
              className="font-bold underline text-amber-900 hover:text-mitologi-navy"
            >
              login disini
            </Link>{" "}
            untuk masuk.
          </div>
        </div>
      )}
      {apiError && !isEmailTaken && (
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
            htmlFor="register-name"
            className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 mb-2"
          >
            Nama Lengkap
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-mitologi-navy transition-colors" />
            </div>
            <input
              id="register-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              className={clsx(
                "block w-full pl-11 pr-4 py-3.5 rounded-[16px] text-sm border bg-app-cream text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mitologi-navy/20 focus:border-mitologi-navy font-sans transition-colors",
                fieldErrors.name
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200 hover:border-slate-300",
              )}
              placeholder="Nama Anda"
              required
              autoComplete="name"
            />
          </div>
          {fieldErrors.name && (
            <p className="mt-2 text-xs font-sans font-medium text-red-500">
              {fieldErrors.name}
            </p>
          )}
        </div>

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
              autoComplete="new-password"
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

        <div>
          <label
            htmlFor="password_confirmation"
            className="block text-[12px] font-sans font-semibold uppercase tracking-[0.16em] text-slate-600 mb-2"
          >
            Konfirmasi Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-mitologi-navy transition-colors" />
            </div>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                clearFieldError("password_confirmation");
              }}
              className={clsx(
                "block w-full pl-11 pr-12 py-3.5 rounded-[16px] text-sm border bg-app-cream text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mitologi-navy/20 focus:border-mitologi-navy font-sans transition-colors",
                fieldErrors.password_confirmation
                  ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                  : "border-slate-200 hover:border-slate-300",
              )}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              tabIndex={-1}
            >
              {showPasswordConfirmation ? (
                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
          {fieldErrors.password_confirmation && (
            <p className="mt-2 text-xs font-sans font-medium text-red-500">
              {fieldErrors.password_confirmation}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        variant="primary"
        className="w-full flex items-center justify-center p-4 text-base"
      >
        <span>{isPending ? "Mendaftarkan…" : "Buat Akun"}</span>
        {!isPending}
      </Button>

      <div className="text-center pt-2">
        <p className="text-sm font-sans font-medium text-slate-500">
          Sudah punya akun?{" "}
          <Link
            href="/shop/login"
            className="font-bold text-mitologi-navy hover:text-mitologi-gold transition-colors"
          >
            Masuk Disini
          </Link>
        </p>
      </div>
    </form>
  );
}

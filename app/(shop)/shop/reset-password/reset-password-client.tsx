"use client";

import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/ultra-quality-toast";
import { resetPassword } from "lib/api/auth";
import { UnknownError } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordClient() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/shop");
    }
  }, [user, router]);

  const validate = () => {
    let isValid = true;
    setPasswordError("");
    setConfirmPasswordError("");

    if (password.length < 8) {
      setPasswordError("Password minimal 8 karakter");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Konfirmasi password tidak cocok");
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenericError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await resetPassword(token, email, password, confirmPassword);
      addToast({
        variant: "success",
        title: "Password Diperbarui",
        description:
          "Password Anda berhasil direset. Silakan login dengan password baru.",
      });
      router.push("/shop/login");
    } catch (err: unknown) {
      const error = err as UnknownError;
      setGenericError(
        error?.message || "Gagal mereset password. Link mungkin sudah kedaluwarsa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,149,91,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_40%)]" />

      <div className="w-full max-w-xl p-8 sm:p-10 relative z-10 bg-white rounded-[30px] shadow-soft border border-app">
        <div className="text-center mb-10 border-b border-app pb-8 relative">
          <Link
            href="/shop/login"
            className="absolute left-0 top-1 text-slate-400 hover:text-mitologi-navy transition-colors"
            title="Kembali ke login"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>

          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-mitologi-gold-dark mb-4">
            Keamanan Akun
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-mitologi-navy tracking-tight mb-3 leading-none">
            Reset Password
          </h1>
          <p className="text-sm font-sans text-slate-500 max-w-sm mx-auto leading-relaxed">
            Masukkan password baru Anda yang aman untuk memulihkan akses ke akun Anda
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {genericError && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm text-red-600 font-medium font-sans">
                {genericError}
              </p>
            </div>
          )}

          {/* Email (Read Only) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Alamat Email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                readOnly
                className="block w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-slate-400 text-sm font-sans cursor-not-allowed transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1"
            >
              Password Baru
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <LockClosedIcon
                  className={clsx(
                    "h-5 w-5 transition-colors duration-300",
                    passwordError
                      ? "text-red-400"
                      : "text-slate-300 group-focus-within:text-mitologi-navy",
                  )}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan minimal 8 karakter"
                className={clsx(
                  "block w-full pl-12 pr-12 py-4 border rounded-2xl text-sm font-sans outline-none transition-all duration-300",
                  passwordError
                    ? "border-red-200 bg-red-50/30 text-red-900 focus:border-red-300 ring-4 ring-red-50/50"
                    : "border-slate-100 bg-slate-50/30 focus:bg-white focus:border-mitologi-navy focus:ring-4 focus:ring-mitologi-navy/5 text-slate-900",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-mitologi-navy transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-[11px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1"
            >
              Konfirmasi Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <LockClosedIcon
                  className={clsx(
                    "h-5 w-5 transition-colors duration-300",
                    confirmPasswordError
                      ? "text-red-400"
                      : "text-slate-300 group-focus-within:text-mitologi-navy",
                  )}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password Anda"
                className={clsx(
                  "block w-full pl-12 pr-5 py-4 border rounded-2xl text-sm font-sans outline-none transition-all duration-300",
                  confirmPasswordError
                    ? "border-red-200 bg-red-50/30 text-red-900 focus:border-red-300 ring-4 ring-red-50/50"
                    : "border-slate-100 bg-slate-50/30 focus:bg-white focus:border-mitologi-navy focus:ring-4 focus:ring-mitologi-navy/5 text-slate-900",
                )}
              />
            </div>
            {confirmPasswordError && (
              <p className="text-[11px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mitologi-navy text-white font-sans font-bold text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:bg-mitologi-navy/90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3 mt-4"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Perbarui Password"
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-xs font-sans font-medium text-slate-400 pt-8 border-t border-slate-100">
          &copy; {new Date().getFullYear()} Mitologi Clothing. Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  );
}

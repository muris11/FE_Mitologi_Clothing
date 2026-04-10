"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Button } from "components/ui/button";
import { resetPassword } from "lib/api/auth";
import { UnknownError } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordClient() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
    setSuccessMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await resetPassword(
        token,
        email,
        password,
        confirmPassword,
      );
      setSuccessMessage(
        result.message ||
          "Password berhasil direset. Silakan login dengan password baru.",
      );
    } catch (err: unknown) {
      const error = err as UnknownError;
      setGenericError(
        error?.message ||
          "Gagal mereset password. Token mungkin sudah kadaluarsa.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 relative z-10">
        <Link
          href="/shop/login"
          className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali ke Login
        </Link>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/images/logo.png"
                alt="Mitologi Logo"
                width={200}
                height={48}
                className="h-12 w-auto invert"
              />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Reset Password
            </h1>
            <p className="text-slate-600">
              Masukkan password baru yang kuat dan aman.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-green-700 font-medium">
                    {successMessage}
                  </p>
                  <Link
                    href="/shop/login"
                    className="text-sm font-bold text-green-800 underline hover:text-green-900 mt-1 inline-block"
                  >
                    Login dengan Password Baru
                  </Link>
                </div>
              </div>
            )}

            {genericError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">
                  {genericError}
                </p>
              </div>
            )}

            {/* Email (Read Only) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-900 pl-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="block w-full px-4 py-3 border border-slate-200 rounded-md bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-900 pl-1"
              >
                Password Baru
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LockClosedIcon
                    className={clsx(
                      "h-5 w-5",
                      passwordError
                        ? "text-red-500"
                        : "text-slate-400 group-focus-within:text-mitologi-navy",
                    )}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={clsx(
                    "block w-full pl-11 pr-11 py-3 border rounded-md text-sm outline-none",
                    passwordError
                      ? "border-red-500 bg-white focus:border-red-500 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                      : "border-slate-300 bg-white focus:border-mitologi-navy focus:ring-0 text-slate-900 placeholder:text-slate-400",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
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
                <p className="text-xs text-red-500 font-medium pl-1">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-900 pl-1"
              >
                Konfirmasi Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LockClosedIcon
                    className={clsx(
                      "h-5 w-5",
                      confirmPasswordError
                        ? "text-red-500"
                        : "text-slate-400 group-focus-within:text-mitologi-navy",
                    )}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={clsx(
                    "block w-full pl-11 pr-11 py-3 border rounded-md text-sm outline-none",
                    confirmPasswordError
                      ? "border-red-500 bg-white focus:border-red-500 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                      : "border-slate-300 bg-white focus:border-mitologi-navy focus:ring-0 text-slate-900 placeholder:text-slate-400",
                  )}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-xs text-red-500 font-medium pl-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2"
              size="lg"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Reset Password</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Decoration */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-white border-l border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-10 mix-blend-multiply"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-slate-900 text-center z-10">
          <h2 className="font-bold text-4xl mb-4 tracking-tight leading-tight">
            Mulai Kembali dengan Aman
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            Kembalilah menikmati koleksi eksklusif kami dengan ketenangan
            pikiran.
          </p>
        </div>
      </div>
    </div>
  );
}

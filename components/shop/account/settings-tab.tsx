"use client";

import { Button } from "components/ui/button";
import { updatePassword } from "lib/api";
import { UnknownError } from "lib/api/types";
import { useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";

export function SettingsTab() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { addToast } = useToast();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    if (passwordForm.password !== passwordForm.passwordConfirmation) {
      addToast({ variant: "error", title: "Konfirmasi password tidak cocok" });
      setIsUpdating(false);
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        password: passwordForm.password,
        passwordConfirmation: passwordForm.passwordConfirmation,
      });
      addToast({ variant: "success", title: "Password berhasil diperbarui" });
      setPasswordForm({
        currentPassword: "",
        password: "",
        passwordConfirmation: "",
      });
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Gagal memperbarui password",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-2">
          Pengaturan Keamanan
        </h2>
        <p className="text-sm font-sans text-slate-500">
          Perbarui password dan keamanan akun Anda.
        </p>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="space-y-6 p-8 rounded-2xl border border-slate-100 bg-white shadow-sm"
      >
        <div>
          <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
            Password Saat Ini
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-1 focus:ring-mitologi-navy sm:text-sm py-3 px-4 font-sans transition-shadow"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
            Password Baru
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-1 focus:ring-mitologi-navy sm:text-sm py-3 px-4 font-sans transition-shadow"
            value={passwordForm.password}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, password: e.target.value })
            }
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>
        <div>
          <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-1 focus:ring-mitologi-navy sm:text-sm py-3 px-4 font-sans transition-shadow"
            value={passwordForm.passwordConfirmation}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                passwordConfirmation: e.target.value,
              })
            }
            autoComplete="new-password"
            required
          />
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isUpdating}
            variant="primary"
            size="lg"
            className="w-full shadow-md"
          >
            {isUpdating ? "Memproses…" : "Ganti Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

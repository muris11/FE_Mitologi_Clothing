import { Suspense } from "react";
import RegisterForm from "./register-form";

export const metadata = {
  title: "Daftar Akun | Mitologi Clothing",
  description: "Buat akun baru di Mitologi Clothing.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,149,91,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_40%)]" />

      <div className="w-full max-w-xl p-8 sm:p-10 relative z-10 bg-white rounded-[30px] shadow-soft border border-app">
        <div className="text-center mb-10 border-b border-app pb-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-mitologi-gold-dark mb-4">
            Akun Toko
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-mitologi-navy tracking-tight mb-3 leading-none">
            Buat Akun Baru
          </h1>
          <p className="text-sm font-sans text-slate-500 max-w-sm mx-auto leading-relaxed">
            Daftar untuk menyimpan pesanan, melacak status belanja, dan
            menikmati pengalaman toko yang lebih personal
          </p>
        </div>

        <div>
          <Suspense
            fallback={
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-mitologi-navy border-t-transparent"></div>
              </div>
            }
          >
            <RegisterForm />
          </Suspense>
        </div>

        <p className="text-center mt-10 text-xs font-sans font-medium text-slate-400 pt-8 border-t border-slate-100">
          &copy; {new Date().getFullYear()} Mitologi Clothing. Hak cipta
          dilindungi.
        </p>
      </div>
    </div>
  );
}

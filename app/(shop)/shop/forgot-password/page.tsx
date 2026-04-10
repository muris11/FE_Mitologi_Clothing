import ForgotPasswordForm from "./forgot-password-form";

export const metadata = {
  title: "Lupa Password | Mitologi Clothing",
  description: "Reset password akun Mitologi Clothing Anda.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,149,91,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.6),transparent_40%)]" />

      <div className="w-full max-w-xl p-8 sm:p-10 relative z-10 bg-white rounded-[30px] shadow-soft border border-app">
        <div className="text-center mb-10 border-b border-app pb-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-mitologi-gold-dark mb-4">
            Akun Toko
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-mitologi-navy tracking-tight mb-3 leading-none">
            Lupa Password
          </h1>
          <p className="text-sm font-sans text-slate-500 max-w-sm mx-auto leading-relaxed">
            Masukkan email akun Anda dan kami akan mengirimkan tautan untuk
            mengatur ulang password
          </p>
        </div>

        <div>
          <ForgotPasswordForm />
        </div>

        <p className="text-center mt-10 text-xs font-sans font-medium text-slate-400 pt-8 border-t border-slate-100">
          &copy; {new Date().getFullYear()} Mitologi Clothing. Hak cipta
          dilindungi.
        </p>
      </div>
    </div>
  );
}

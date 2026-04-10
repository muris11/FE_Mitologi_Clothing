import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "Pesanan Berhasil | Mitologi Clothing",
  description: "Terima kasih telah berbelanja.",
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden py-24">
      {/* Decorative background Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-mitologi-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-mitologi-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-mitologi-navy/5 p-8 sm:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircleIcon className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-mitologi-navy mb-4 tracking-tight">
            Pesanan Berhasil
          </h1>
          <p className="text-base font-sans font-medium text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
            Terima kasih telah berbelanja di Mitologi Clothing. Pesanan Anda
            sedang diproses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="/shop/account"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-mitologi-navy px-8 py-3.5 font-sans font-bold text-sm text-white hover:bg-mitologi-gold transition-all shadow-md shadow-mitologi-navy/20 hover:-translate-y-0.5"
            >
              Lihat Pesanan Saya
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-8 py-3.5 font-sans font-bold text-sm text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy hover:border-mitologi-navy/30 transition-all shadow-sm"
            >
              Lanjut Belanja
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-sm font-sans font-medium text-slate-400">
          Konfirmasi pesanan telah dikirim ke email Anda.
        </p>
      </div>
    </div>
  );
}

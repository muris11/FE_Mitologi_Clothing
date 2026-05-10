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
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-24 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="h-7 w-7 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Pesanan berhasil dibuat
        </h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Terima kasih telah berbelanja. Konfirmasi pesanan telah dikirim ke
          email Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop/account"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Lihat Pesanan
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}

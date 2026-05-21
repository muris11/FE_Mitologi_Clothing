import { CheckCircleIcon, ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CheckoutSuccessClient from "./checkout-success-client";

export const metadata = {
  title: "Pesanan Berhasil | Mitologi Clothing",
  description: "Terima kasih telah berbelanja.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const orderId = typeof params.orderId === "string" ? params.orderId : "";
  const isMock = params.mock === "true";

  if (isMock) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Pesanan berhasil dibuat
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Terima kasih telah berbelanja. Konfirmasi pesanan telah dikirim ke email Anda.
            </p>

            {orderId && (
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-400 uppercase tracking-wide">Order ID</span>
                <span className="font-mono text-sm font-semibold text-slate-900">{orderId}</span>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-slate-200 transition-colors"
                  title="Salin Order ID"
                >
                  <ClipboardDocumentIcon className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/shop/account"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                Lihat Pesanan
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <CheckoutSuccessClient orderId={orderId} />;
}

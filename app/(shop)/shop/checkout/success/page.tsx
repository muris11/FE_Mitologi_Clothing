import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CopyOrderId from "./copy-order-id";
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
      <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
            <p className="text-sm text-slate-500 mt-1">Pesanan berhasil dibuat</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 sm:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Pesanan berhasil dibuat
                </h2>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  Terima kasih telah berbelanja. Konfirmasi pesanan telah dikirim ke
                  email Anda.
                </p>

                {orderId && <CopyOrderId orderId={orderId} />}
              </div>

              <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
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
          </div>
        </div>
      </div>
    );
  }

  return <CheckoutSuccessClient orderId={orderId} />;
}

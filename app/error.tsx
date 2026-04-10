"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm z-50">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-2xl shadow-mitologi-navy/10 m-4">
        {/* Error Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-sans font-extrabold text-mitologi-navy mb-4 tracking-tight">
          Terjadi Kesalahan
        </h2>
        <p className="font-sans font-medium text-slate-500 leading-relaxed mb-8 max-w-md">
          Maaf, terjadi kendala saat memuat halaman ini. Silakan coba muat ulang
          atau kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            className="rounded-full bg-mitologi-navy px-8 py-3.5 font-sans font-bold text-white transition-all hover:bg-mitologi-navy/90 hover:scale-105 active:scale-95 shadow-lg shadow-mitologi-navy/20"
            onClick={() => reset()}
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="rounded-full border-2 border-slate-200 bg-white px-8 py-3.5 font-sans font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-mitologi-navy shadow-sm text-center"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

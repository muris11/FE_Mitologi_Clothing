import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* 404 Number */}
        <h1 className="select-none text-[8rem] sm:text-[10rem] font-sans font-extrabold leading-none text-slate-200 mb-6 tracking-tighter">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-mitologi-navy mb-4 tracking-tight">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="font-sans font-medium text-slate-500 leading-relaxed mb-10 max-w-sm mx-auto">
          Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau
          tidak tersedia sementara.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white border border-slate-200 px-8 py-3.5 font-sans font-bold text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy transition-all shadow-sm"
          >
            Kembali ke Beranda
          </Link>

          <Link
            href="/shop"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-mitologi-navy px-8 py-3.5 font-sans font-bold text-white hover:bg-mitologi-navy/90 transition-all shadow-md shadow-mitologi-navy/10"
          >
            Belanja Sekarang
          </Link>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 z-10 text-xs font-sans font-bold tracking-widest text-slate-400">
        MITOLOGI CLOTHING
      </div>
    </div>
  );
}

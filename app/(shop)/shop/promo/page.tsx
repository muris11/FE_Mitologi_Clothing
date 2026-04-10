import {
  CalendarDaysIcon,
  GiftIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { StaticPageShell } from "components/shop/static-page-shell";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Promo & Penawaran Spesial - Mitologi Clothing",
  description:
    "Dapatkan penawaran terbaik dari Mitologi Clothing. Diskon eksklusif, gratis ongkir, dan promo spesial untuk member.",
};

const benefits = [
  {
    icon: TruckIcon,
    title: "Gratis Ongkir",
    description:
      "Nikmati gratis ongkir untuk setiap pembelian minimum Rp 200.000 ke seluruh Indonesia.",
  },
  {
    icon: TagIcon,
    title: "Diskon Member",
    description:
      "Daftar sebagai member dan dapatkan diskon hingga 15% untuk setiap pembelian berikutnya.",
  },
  {
    icon: GiftIcon,
    title: "Hadiah Spesial",
    description:
      "Dapatkan hadiah spesial di hari ulang tahun Anda dan bonus poin setiap transaksi.",
  },
];

const promos = [
  {
    title: "Flash Sale Mingguan",
    description:
      "Setiap hari Jumat, nikmati diskon hingga 30% untuk produk-produk pilihan. Stok terbatas, jangan sampai kehabisan!",
    badge: "Setiap Jumat",
    icon: CalendarDaysIcon,
  },
  {
    title: "Beli 2 Gratis 1",
    description:
      "Berlaku untuk kategori kaos dan t-shirt pilihan. Pilih 3 produk favorit Anda dan bayar hanya 2!",
    badge: "Syarat & Ketentuan Berlaku",
    icon: UserGroupIcon,
  },
  {
    title: "Diskon Koleksi Baru",
    description:
      "Dapatkan potongan 10% untuk pre-order koleksi terbaru kami. Jadilah yang pertama memiliki desain eksklusif.",
    badge: "Pre-Order",
    icon: TagIcon,
  },
];

export default function PromoPage() {
  return (
    <StaticPageShell
      title="Promo & Penawaran Spesial"
      subtitle="Nikmati berbagai penawaran menarik dan keuntungan eksklusif dari Mitologi Clothing."
      breadcrumbs={[{ label: "Promo" }]}
      maxWidth="wide"
    >
      {/* Active Promos */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
          <TagIcon className="w-8 h-8 text-mitologi-navy" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-mitologi-navy tracking-tight mb-2">
              Promo Aktif
            </h2>
            <p className="text-sm font-sans font-medium text-slate-500">
              Penawaran terbatas, segera manfaatkan!
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-mitologi-navy/10 overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6 border-b border-slate-100 pb-6">
                <promo.icon className="w-8 h-8 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
                <span className="text-xs font-sans font-bold bg-mitologi-gold/10 text-mitologi-gold-dark px-3.5 py-1.5 rounded-full border border-mitologi-gold/20 shadow-sm shadow-mitologi-gold/5">
                  {promo.badge}
                </span>
              </div>
              <h3 className="text-lg font-sans font-extrabold text-slate-800 mb-3 group-hover:text-mitologi-navy transition-colors">
                {promo.title}
              </h3>
              <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
                {promo.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-slate-100 my-16" />

      {/* Benefits */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
          <GiftIcon className="w-8 h-8 text-mitologi-navy" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-mitologi-navy tracking-tight mb-2">
              Keuntungan Berbelanja
            </h2>
            <p className="text-sm font-sans font-medium text-slate-500">
              Lebih hemat dengan keuntungan eksklusif untuk pelanggan kami.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-3xl border border-slate-100 bg-white p-8 text-center transition-all hover:border-mitologi-navy/20 hover:shadow-xl hover:shadow-mitologi-navy/10 hover:-translate-y-1"
            >
              <div className="mb-6 flex justify-center">
                <benefit.icon className="w-10 h-10 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
              </div>
              <h3 className="text-lg font-sans font-extrabold text-slate-800 mb-3 group-hover:text-mitologi-navy transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 rounded-3xl bg-mitologi-navy p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-mitologi-navy/20 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-mitologi-gold/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mitologi-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold mb-4 tracking-tight">
            Jangan Lewatkan Penawaran Eksklusif!
          </h3>
          <p className="text-slate-300 font-sans text-sm sm:text-base font-medium mb-10 max-w-lg mx-auto leading-relaxed">
            Daftar sekarang untuk mendapatkan notifikasi promo terbaru dan akses
            ke penawaran khusus member.
          </p>
          <Link
            href="/shop/register"
            className="inline-flex items-center justify-center px-10 py-4 bg-mitologi-gold text-mitologi-navy hover:bg-mitologi-gold-dark rounded-full font-sans tracking-wide font-extrabold transition-all shadow-xl hover:shadow-mitologi-gold/30 text-base"
          >
            Daftar Sekarang
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </StaticPageShell>
  );
}

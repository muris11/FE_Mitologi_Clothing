import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { StaticPageShell } from "components/shop/static-page-shell";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Pengembalian - Mitologi Clothing",
  description:
    "Pelajari kebijakan pengembalian dan refund produk Mitologi Clothing. Proses mudah dalam 7 hari setelah barang diterima.",
};

const steps = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Hubungi CS",
    description:
      "Hubungi customer service kami melalui WhatsApp atau email untuk mengajukan pengembalian.",
  },
  {
    icon: TruckIcon,
    title: "Kirim Barang",
    description:
      "Kemas barang dengan rapi dan kirimkan ke alamat workshop kami menggunakan jasa pengiriman.",
  },
  {
    icon: CheckBadgeIcon,
    title: "Verifikasi",
    description:
      "Tim kami akan memeriksa kondisi barang dalam 1-3 hari kerja setelah barang diterima.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Refund / Tukar",
    description:
      "Dana akan dikembalikan atau produk pengganti dikirimkan dalam 5-14 hari kerja.",
  },
];

const faqs = [
  {
    q: "Berapa lama batas waktu pengajuan pengembalian?",
    a: "Anda memiliki waktu 7 hari kalender setelah barang diterima untuk mengajukan pengembalian. Pengajuan yang melewati batas waktu tersebut tidak dapat diproses.",
  },
  {
    q: "Apakah biaya pengiriman pengembalian ditanggung Mitologi?",
    a: "Jika pengembalian disebabkan oleh kesalahan kami (barang cacat, salah produk, salah ukuran dari sisi produksi), biaya pengiriman kami tanggung. Untuk alasan lain, biaya menjadi tanggung jawab pembeli.",
  },
  {
    q: "Bagaimana proses refund dilakukan?",
    a: "Refund akan dilakukan melalui Transfer Bank ke rekening yang Anda informasikan. Proses memakan waktu 5-14 hari kerja setelah verifikasi selesai. Kami akan menginformasikan progress melalui WhatsApp atau email.",
  },
  {
    q: "Apakah bisa tukar produk saja tanpa refund?",
    a: "Ya, kami menyediakan opsi penukaran produk (misalnya tukar ukuran atau warna). Penukaran akan diproses setelah barang asli diterima dan diverifikasi oleh tim kami.",
  },
];

export default function KebijakanPengembalianPage() {
  return (
    <StaticPageShell
      title="Kebijakan Pengembalian"
      subtitle="Kami ingin Anda puas dengan setiap pembelian. Jika tidak sesuai, kami siap membantu."
      breadcrumbs={[{ label: "Kebijakan Pengembalian" }]}
      maxWidth="wide"
    >
      {/* Return Steps */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
          <ArrowPathIcon className="w-8 h-8 text-mitologi-navy" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-mitologi-navy tracking-tight mb-2">
              Langkah Pengembalian
            </h2>
            <p className="text-sm font-sans font-medium text-slate-500">
              Proses pengembalian barang di Mitologi Clothing mudah dan
              transparan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-3xl border border-slate-100 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-mitologi-navy/10 overflow-hidden"
            >
              <span className="absolute top-4 left-4 text-xs font-sans font-bold text-slate-300 group-hover:text-mitologi-gold transition-colors">
                0{i + 1}
              </span>
              <div className="mb-6 flex justify-center mt-4">
                <step.icon className="w-10 h-10 text-mitologi-navy group-hover:text-mitologi-gold transition-colors" />
              </div>
              <h3 className="text-lg font-sans font-extrabold text-slate-800 mb-3 group-hover:text-mitologi-navy transition-colors">
                {step.title}
              </h3>
              <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-slate-100 my-16" />

      {/* Main Content */}
      <section className="mb-16 prose max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-800 prose-p:font-sans prose-p:text-slate-600 prose-p:leading-relaxed prose-li:font-sans prose-li:text-slate-600 prose-strong:font-bold prose-strong:text-slate-800 prose-a:text-mitologi-navy hover:prose-a:underline prose-a:font-semibold">
        <h2 className="text-3xl font-sans font-bold text-mitologi-navy mb-8">
          Syarat Pengembalian
        </h2>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Produk yang Dapat Dikembalikan
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Produk yang diterima dalam kondisi cacat/rusak dari pabrik</li>
          <li>
            Produk yang tidak sesuai dengan pesanan (salah warna, salah model,
            salah ukuran karena kesalahan produksi)
          </li>
          <li>
            Produk yang berbeda dari deskripsi di website secara signifikan
          </li>
          <li>
            Produk yang masih dalam kondisi baru, belum dicuci, belum dipakai,
            dan tag masih melekat
          </li>
        </ul>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Produk yang Tidak Dapat Dikembalikan
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Produk yang sudah dicuci, dipakai, atau dimodifikasi dengan cara
            apapun
          </li>
          <li>Produk dengan tag yang sudah dilepas atau rusak</li>
          <li>Produk yang dikembalikan setelah melewati batas waktu 7 hari</li>
          <li>
            Produk custom atau pesanan khusus yang dibuat sesuai permintaan
            spesifik
          </li>
          <li>
            Produk yang rusak akibat kelalaian pembeli (bukan dari pabrik)
          </li>
          <li>
            Produk sale/clearance dengan keterangan &quot;tanpa
            pengembalian&quot;
          </li>
        </ul>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Batas Waktu Pengembalian
        </h3>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 not-prose mb-8 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 shrink-0 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-sm shadow-mitologi-navy/5">
              <ArrowPathIcon className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <p className="text-base font-bold font-sans text-slate-800 mb-1">
                7 Hari Kalender
              </p>
              <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
                Pengajuan pengembalian harus dilakukan dalam waktu 7 hari
                kalender setelah barang diterima. Tanggal penerimaan dihitung
                berdasarkan konfirmasi penerimaan dari jasa pengiriman.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Prosedur Pengembalian
        </h3>
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>Hubungi customer service kami</strong> melalui WhatsApp (+62
            813-2217-0902) atau email (mitologiclothing@gmail.com) dengan
            menyertakan:
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Nomor pesanan (Order ID)</li>
              <li>Foto produk yang menunjukkan kondisi/masalah</li>
              <li>Alasan pengembalian</li>
            </ul>
          </li>
          <li>
            <strong>Tunggu konfirmasi</strong> dari tim kami (maksimal 1×24 jam
            pada hari kerja)
          </li>
          <li>
            <strong>Kemas produk</strong> dengan rapi menggunakan kemasan yang
            aman untuk pengiriman
          </li>
          <li>
            <strong>Kirimkan produk</strong> ke alamat yang diberikan oleh tim
            kami beserta salinan nomor pesanan
          </li>
          <li>
            <strong>Konfirmasi pengiriman</strong> dengan mengirimkan nomor resi
            kepada tim kami
          </li>
        </ol>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Proses Pengembalian Dana
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Refund diproses setelah barang diterima dan lolos verifikasi oleh
            tim kami (1-3 hari kerja)
          </li>
          <li>
            Dana akan dikembalikan melalui Transfer Bank ke rekening yang Anda
            informasikan
          </li>
          <li>
            Proses transfer refund memakan waktu 5-14 hari kerja setelah
            verifikasi selesai
          </li>
          <li>
            Jumlah refund mencakup harga produk. Biaya pengiriman awal tidak
            dikembalikan kecuali pengembalian disebabkan oleh kesalahan kami
          </li>
        </ul>

        <h3 className="text-xl font-sans font-bold mt-10 mb-4">
          Penukaran Produk
        </h3>
        <p>
          Jika Anda memilih untuk menukar produk (misalnya tukar ukuran atau
          warna), proses pengiriman produk pengganti akan dilakukan setelah
          barang asli diterima dan diverifikasi. Biaya pengiriman produk
          pengganti ditanggung oleh Mitologi Clothing jika penukaran disebabkan
          oleh kesalahan kami.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-slate-100 my-16" />

      {/* Mini FAQ */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-mitologi-navy" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-mitologi-navy tracking-tight mb-2">
              Pertanyaan Umum
            </h2>
            <p className="text-sm font-sans font-medium text-slate-500">
              Jawaban atas pertanyaan yang sering diajukan terkait pengembalian.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-mitologi-navy/20 hover:shadow-md"
            >
              <h3 className="text-base font-sans font-bold text-slate-800 mb-2">
                {faq.q}
              </h3>
              <p className="text-sm font-sans font-medium text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-20 rounded-3xl bg-mitologi-navy p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-mitologi-navy/20 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-mitologi-gold/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mitologi-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold mb-4 tracking-tight">
            Butuh Bantuan dengan Pengembalian?
          </h3>
          <p className="text-slate-300 font-sans text-sm sm:text-base font-medium mb-10 max-w-lg mx-auto leading-relaxed">
            Tim customer service kami siap membantu Anda. Hubungi kami untuk
            proses pengembalian yang cepat dan mudah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/6281322170902?text=Halo%2C%20saya%20ingin%20mengajukan%20pengembalian%20produk`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-mitologi-gold text-mitologi-navy hover:bg-mitologi-gold-dark rounded-full font-sans tracking-wide font-extrabold transition-all shadow-xl text-sm"
            >
              Chat WhatsApp
            </a>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-slate-300 text-white hover:bg-white/10 rounded-full font-sans tracking-wide font-extrabold transition-all text-sm"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
        <Link
          href="/shop/syarat-ketentuan"
          className="inline-flex items-center text-sm font-sans font-bold text-slate-600 hover:text-mitologi-navy transition-colors"
        >
          &larr; Syarat & Ketentuan
        </Link>
        <Link
          href="/shop/kebijakan-privasi"
          className="inline-flex items-center text-sm font-sans font-bold text-slate-600 hover:text-mitologi-navy transition-colors"
        >
          Kebijakan Privasi &rarr;
        </Link>
      </div>
    </StaticPageShell>
  );
}

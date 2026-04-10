"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { StaticPageShell } from "components/shop/static-page-shell";
import Link from "next/link";
import { useState } from "react";

const faqCategories = [
  { key: "umum", label: "Umum" },
  { key: "pemesanan", label: "Pemesanan" },
  { key: "pengiriman", label: "Pengiriman" },
  { key: "pengembalian", label: "Pengembalian & Penukaran" },
  { key: "pembayaran", label: "Pembayaran" },
  { key: "akun", label: "Akun" },
];

const faqData: Record<string, { q: string; a: string }[]> = {
  umum: [
    {
      q: "Apa itu Mitologi Clothing?",
      a: "Mitologi Clothing adalah brand pakaian premium yang memproduksi berbagai jenis pakaian seperti kaos, kemeja, jaket, dan merchandise dengan sentuhan budaya Indonesia dan kualitas terbaik. Kami berlokasi di Indramayu, Jawa Barat.",
    },
    {
      q: "Apakah produk Mitologi Clothing dibuat secara handmade?",
      a: "Sebagian besar produk kami diproduksi dengan kombinasi teknik modern dan sentuhan tangan terampil. Setiap produk melewati quality control yang ketat untuk memastikan kualitas terbaik sampai ke tangan Anda.",
    },
    {
      q: "Apakah Mitologi Clothing menerima pesanan custom/partai besar?",
      a: "Ya, kami menerima pesanan custom untuk kebutuhan instansi, seragam, komunitas, atau event. Silakan hubungi kami melalui WhatsApp atau halaman Hubungi Kami untuk diskusi lebih lanjut mengenai desain, bahan, dan minimum order.",
    },
    {
      q: "Apakah ukuran produk sesuai dengan standar lokal?",
      a: "Produk kami menggunakan standar ukuran lokal (Reguler Fit). Kami sangat menyarankan Anda melihat tabel 'Panduan Ukuran' yang tersedia di setiap halaman produk atau mencoba Kalkulator Ukuran kami sebelum membeli.",
    },
  ],
  pemesanan: [
    {
      q: "Bagaimana cara melakukan pemesanan?",
      a: "Anda dapat melakukan pemesanan melalui website kami. Pilih produk yang diinginkan, tambahkan ke keranjang, lalu ikuti proses checkout. Anda juga bisa memesan langsung melalui WhatsApp kami.",
    },
    {
      q: "Apakah saya perlu membuat akun untuk berbelanja?",
      a: "Tidak wajib, Anda bisa berbelanja sebagai tamu (guest checkout). Namun, kami sarankan membuat akun untuk menikmati keuntungan seperti riwayat pesanan, pelacakan pengiriman yang lebih mudah, dan penawaran khusus member.",
    },
    {
      q: "Bisakah saya mengubah atau membatalkan pesanan?",
      a: "Perubahan atau pembatalan pesanan dapat dilakukan selama pesanan belum diproses. Hubungi customer service kami sesegera mungkin melalui WhatsApp atau email. Pesanan yang sudah dikirim tidak dapat dibatalkan.",
    },
  ],
  pengiriman: [
    {
      q: "Berapa lama proses pengiriman?",
      a: "Proses pengiriman biasanya memakan waktu 2-5 hari kerja untuk wilayah Jawa dan 5-10 hari kerja untuk luar Jawa, tergantung pada jasa pengiriman yang dipilih. Pesanan akan diproses dalam 1-2 hari kerja setelah pembayaran dikonfirmasi.",
    },
    {
      q: "Jasa pengiriman apa yang digunakan?",
      a: "Kami bekerja sama dengan berbagai jasa pengiriman terpercaya seperti JNE, J&T Express, SiCepat, dan Anteraja. Anda dapat memilih jasa pengiriman yang sesuai saat checkout.",
    },
    {
      q: "Apakah tersedia gratis ongkir?",
      a: "Ya! Kami menyediakan gratis ongkir untuk pembelian dengan minimum Rp 200.000 ke seluruh wilayah Indonesia. Promo ini dapat berubah sewaktu-waktu, jadi pastikan untuk mengecek halaman promo kami.",
    },
    {
      q: "Bagaimana cara melacak pesanan saya?",
      a: "Setelah pesanan dikirim, Anda akan mendapatkan nomor resi melalui email atau WhatsApp. Anda juga dapat melihat status pesanan melalui halaman akun Anda di website kami.",
    },
  ],
  pengembalian: [
    {
      q: "Apakah bisa melakukan pengembalian barang?",
      a: "Ya, kami menerima pengembalian barang dalam waktu 7 hari setelah barang diterima, dengan syarat barang masih dalam kondisi original (belum dicuci, belum dipakai, tag masih terpasang). Baca kebijakan pengembalian kami untuk detail lengkap.",
    },
    {
      q: "Bagaimana proses penukaran ukuran?",
      a: "Jika ukuran tidak sesuai, Anda dapat mengajukan penukaran dalam waktu 7 hari. Hubungi customer service kami, kirimkan barang kembali, dan kami akan mengirimkan ukuran yang sesuai setelah barang diterima dan diverifikasi.",
    },
    {
      q: "Siapa yang menanggung biaya pengiriman pengembalian?",
      a: "Jika pengembalian disebabkan oleh kesalahan kami (barang cacat, salah kirim), biaya pengiriman ditanggung oleh Mitologi Clothing. Untuk pengembalian dengan alasan lain (tidak cocok ukuran, berubah pikiran), biaya pengiriman ditanggung oleh pembeli.",
    },
  ],
  pembayaran: [
    {
      q: "Metode pembayaran apa saja yang tersedia?",
      a: "Kami menerima pembayaran melalui Transfer Bank (BCA, BRI, Mandiri, BNI), E-Wallet (GoPay, OVO, Dana, ShopeePay), Virtual Account, dan pembayaran melalui Indomaret/Alfamart. Semua transaksi diproses secara aman melalui Midtrans.",
    },
    {
      q: "Apakah pembayaran di website ini aman?",
      a: "Sangat aman. Kami menggunakan Midtrans sebagai payment gateway yang sudah tersertifikasi PCI DSS. Data pembayaran Anda dienkripsi dan tidak tersimpan di server kami.",
    },
    {
      q: "Berapa lama batas waktu pembayaran?",
      a: "Batas waktu pembayaran untuk Transfer Bank dan Virtual Account adalah 24 jam setelah pesanan dibuat. Jika pembayaran tidak diterima dalam waktu tersebut, pesanan akan otomatis dibatalkan.",
    },
  ],
  akun: [
    {
      q: "Bagaimana cara merubah informasi akun saya?",
      a: "Anda dapat merubah nama, email, dan password Anda melalui menu 'Profile Saya' -> 'Pengaturan' setelah Anda login ke dalam akun Anda.",
    },
    {
      q: "Apa fungsi fitur Wishlist?",
      a: "Fitur Wishlist memungkinkan Anda menyimpan produk-produk yang Anda sukai untuk dibeli nanti tanpa harus mencarinya kembali di katalog.",
    },
  ],
};

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-mitologi-navy/30 hover:shadow-md transition-all group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white focus:outline-none focus:bg-slate-50"
      >
        <span className="text-base font-sans font-bold text-slate-800 leading-relaxed group-hover:text-mitologi-navy transition-colors">
          {question}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 shrink-0 transition-transform duration-300 mt-0.5 ${isOpen ? "rotate-180 text-mitologi-navy" : "text-slate-400 group-hover:text-mitologi-navy"}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 text-sm font-sans font-medium text-slate-600 leading-relaxed bg-white">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum");

  const activeFaqs = faqData[activeCategory] || [];

  return (
    <StaticPageShell
      title="Pertanyaan yang Sering Diajukan"
      subtitle="Temukan jawaban atas pertanyaan umum tentang produk, pemesanan, pengiriman, dan lainnya."
      breadcrumbs={[{ label: "FAQ" }]}
    >
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 snap-x scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
        {faqCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap snap-start px-5 py-2.5 rounded-full text-sm font-sans font-bold transition-all border outline-none ${
              activeCategory === cat.key
                ? "bg-mitologi-navy text-white border-mitologi-navy shadow-md shadow-mitologi-navy/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-mitologi-navy/30 hover:text-mitologi-navy"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {activeFaqs.map((faq, i) => (
          <AccordionItem
            key={`${activeCategory}-${i}`}
            question={faq.q}
            answer={faq.a}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 p-10 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl text-center shadow-xl shadow-mitologi-navy/5">
        <h3 className="text-2xl font-sans font-bold text-mitologi-navy mb-3">
          Masih punya pertanyaan?
        </h3>
        <p className="text-sm font-sans font-medium text-slate-500 mb-8 max-w-md mx-auto">
          Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk
          menghubungi tim kami.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/kontak"
            className="px-6 py-3 bg-mitologi-navy text-white hover:bg-mitologi-navy-light rounded-full text-sm font-sans font-bold transition-all shadow-lg shadow-mitologi-navy/20 hover:shadow-mitologi-gold/20"
          >
            Hubungi Kami
          </Link>
          <a
            href={`${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/6281322170902`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 hover:border-mitologi-navy/30 hover:text-mitologi-navy text-slate-700 rounded-full text-sm font-sans font-bold transition-all"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
    </StaticPageShell>
  );
}

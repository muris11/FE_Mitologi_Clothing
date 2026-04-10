"use client";

import { StaticPageShell } from "components/shop/static-page-shell";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "definisi", label: "Definisi & Istilah" },
  { id: "umum", label: "Persyaratan Umum" },
  { id: "akun", label: "Akun Pengguna" },
  { id: "produk", label: "Produk & Harga" },
  { id: "pemesanan", label: "Pemesanan & Pembayaran" },
  { id: "pengiriman", label: "Pengiriman" },
  { id: "pembatalan", label: "Pembatalan & Pengembalian" },
  { id: "hki", label: "Hak Kekayaan Intelektual" },
  { id: "batasan", label: "Batasan Tanggung Jawab" },
  { id: "sengketa", label: "Penyelesaian Sengketa" },
  { id: "hukum", label: "Hukum yang Berlaku" },
  { id: "perubahan", label: "Perubahan Syarat" },
  { id: "kontak", label: "Hubungi Kami" },
];

function TableOfContents({ activeSection }: { activeSection: string }) {
  return (
    <nav className="space-y-1 p-6 border border-slate-200 bg-slate-50 rounded-2xl">
      <p className="text-sm font-sans font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-200 pb-4">
        Daftar Isi
      </p>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block text-sm py-3 px-4 rounded-xl font-sans font-medium transition-colors ${
            activeSection === section.id
              ? "bg-mitologi-navy text-white shadow-md shadow-mitologi-navy/10"
              : "text-slate-600 hover:text-mitologi-navy hover:bg-slate-100"
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}

export default function SyaratKetentuanPage() {
  const [activeSection, setActiveSection] = useState("definisi");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <StaticPageShell
      title="Syarat & Ketentuan"
      subtitle="Ketentuan penggunaan layanan Mitologi Clothing. Mohon baca dengan saksama sebelum menggunakan layanan kami."
      breadcrumbs={[{ label: "Syarat & Ketentuan" }]}
      maxWidth="wide"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <TableOfContents activeSection={activeSection} />
          </div>
        </aside>

        {/* Mobile TOC */}
        <div className="lg:hidden mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <details className="group">
            <summary className="text-sm font-sans font-bold uppercase tracking-wider text-slate-800 cursor-pointer list-none flex justify-between items-center">
              <span>Daftar Isi</span>
              <span className="group-open:rotate-180 transition-transform duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <div className="mt-6 border-t border-slate-200 pt-6 [&>nav>p]:hidden">
              <TableOfContents activeSection={activeSection} />
            </div>
          </details>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 prose max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-800 prose-p:font-sans prose-p:text-slate-600 prose-p:leading-relaxed prose-li:font-sans prose-li:text-slate-600 prose-strong:font-bold prose-strong:text-slate-800 prose-a:text-mitologi-navy hover:prose-a:underline prose-a:font-semibold">
          <p className="text-sm font-sans font-medium text-slate-500 mb-10 pb-6 border-b border-slate-200">
            Terakhir diperbarui: Februari 2026
          </p>

          <section id="definisi" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              1. Definisi & Istilah
            </h2>
            <p>Dalam Syarat & Ketentuan ini, yang dimaksud dengan:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>&quot;Mitologi&quot;</strong> atau{" "}
                <strong>&quot;Kami&quot;</strong>: Merujuk pada Mitologi
                Clothing, termasuk website, layanan, dan seluruh operasional
                yang terkait
              </li>
              <li>
                <strong>&quot;Pengguna&quot;</strong> atau{" "}
                <strong>&quot;Anda&quot;</strong>: Setiap individu yang
                mengakses, mendaftar, atau menggunakan layanan Mitologi Clothing
              </li>
              <li>
                <strong>&quot;Website&quot;</strong>: Situs web resmi Mitologi
                Clothing yang dapat diakses melalui domain utama kami
              </li>
              <li>
                <strong>&quot;Produk&quot;</strong>: Seluruh barang dagangan
                yang ditawarkan melalui website, termasuk kaos, kemeja, jaket,
                dan merchandise lainnya
              </li>
              <li>
                <strong>&quot;Pesanan&quot;</strong>: Pembelian yang dilakukan
                oleh Pengguna melalui website kami
              </li>
              <li>
                <strong>&quot;Layanan&quot;</strong>: Seluruh fitur dan fungsi
                yang disediakan melalui website, termasuk namun tidak terbatas
                pada jual beli produk, pembuatan akun, dan layanan pelanggan
              </li>
            </ul>
          </section>

          <section id="umum" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              2. Persyaratan Umum Penggunaan
            </h2>
            <p>
              Dengan menggunakan layanan kami, Anda menyatakan dan menjamin
              bahwa:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Anda berusia minimal 17 tahun atau memiliki izin dari orang
                tua/wali yang sah
              </li>
              <li>
                Anda memberikan informasi yang benar, akurat, dan lengkap saat
                mendaftar dan melakukan transaksi
              </li>
              <li>
                Anda bertanggung jawab atas keamanan akun dan password Anda
              </li>
              <li>
                Anda tidak akan menggunakan layanan kami untuk tujuan ilegal
                atau yang melanggar ketentuan ini
              </li>
              <li>
                Anda tidak akan berusaha mengakses sistem kami secara tidak sah
                atau mengganggu operasional website
              </li>
            </ul>
          </section>

          <section id="akun" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              3. Akun Pengguna
            </h2>
            <p>
              Untuk menikmati layanan penuh, Anda dapat membuat akun di website
              kami. Ketentuan terkait akun meliputi:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Setiap pengguna hanya diperbolehkan memiliki satu akun</li>
              <li>
                Anda bertanggung jawab penuh atas semua aktivitas yang dilakukan
                melalui akun Anda
              </li>
              <li>
                Segera hubungi kami jika Anda menduga ada penggunaan tidak sah
                atas akun Anda
              </li>
              <li>
                Kami berhak menangguhkan atau menutup akun yang melanggar
                ketentuan ini
              </li>
              <li>
                Anda dapat menghapus akun Anda kapan saja melalui pengaturan
                akun atau dengan menghubungi layanan pelanggan kami
              </li>
            </ul>
          </section>

          <section id="produk" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              4. Produk & Harga
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Kami berusaha menyajikan informasi produk (deskripsi, gambar,
                ukuran) seakurat mungkin. Namun, perbedaan warna minor dapat
                terjadi akibat pengaturan layar perangkat Anda
              </li>
              <li>
                Semua harga yang ditampilkan dalam mata uang Rupiah (IDR) dan
                sudah termasuk PPN jika berlaku
              </li>
              <li>
                Harga dapat berubah sewaktu-waktu tanpa pemberitahuan
                sebelumnya, namun perubahan tidak berlaku untuk pesanan yang
                sudah dikonfirmasi
              </li>
              <li>
                Ketersediaan produk tergantung pada stok yang tersedia. Kami
                berhak membatalkan pesanan jika stok habis setelah pemesanan
                dilakukan
              </li>
              <li>
                Produk promo atau diskon memiliki ketentuan khusus yang berlaku
                selama periode promo
              </li>
            </ul>
          </section>

          <section id="pemesanan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              5. Proses Pemesanan & Pembayaran
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Pesanan dianggap sah setelah pembayaran berhasil dikonfirmasi
                oleh sistem kami
              </li>
              <li>
                Batas waktu pembayaran untuk metode Transfer Bank dan Virtual
                Account adalah 24 jam. Pembayaran yang melewati batas waktu akan
                dibatalkan secara otomatis
              </li>
              <li>
                Semua transaksi pembayaran diproses melalui Midtrans, payment
                gateway yang tersertifikasi keamanan PCI DSS
              </li>
              <li>
                Kami tidak menyimpan informasi kartu kredit/debit Anda di server
                kami
              </li>
              <li>
                Bukti pembayaran resmi berupa email konfirmasi yang dikirimkan
                setelah pembayaran diverifikasi
              </li>
              <li>
                Kami berhak menolak pesanan jika terdapat indikasi penipuan atau
                aktivitas mencurigakan
              </li>
            </ul>
          </section>

          <section id="pengiriman" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              6. Pengiriman
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Pesanan akan diproses dalam 1-2 hari kerja setelah pembayaran
                dikonfirmasi
              </li>
              <li>
                Estimasi pengiriman: 2-5 hari kerja (Jawa) dan 5-10 hari kerja
                (luar Jawa), tergantung jasa pengiriman
              </li>
              <li>
                Nomor resi akan dikirimkan melalui email atau WhatsApp setelah
                paket dikirimkan
              </li>
              <li>
                Pastikan alamat pengiriman yang diberikan sudah benar dan
                lengkap. Kesalahan alamat yang mengakibatkan pengiriman gagal
                menjadi tanggung jawab pembeli
              </li>
              <li>
                Risiko kerusakan atau kehilangan selama pengiriman menjadi
                tanggung jawab jasa pengiriman. Kami akan membantu klaim jika
                disertai bukti yang memadai
              </li>
              <li>
                Gratis ongkir berlaku untuk pembelian minimum Rp 200.000 (syarat
                dan ketentuan berlaku)
              </li>
            </ul>
          </section>

          <section id="pembatalan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              7. Pembatalan & Pengembalian
            </h2>
            <p>
              Untuk kebijakan lengkap mengenai pengembalian dan refund, silakan
              kunjungi halaman{" "}
              <Link
                href="/shop/kebijakan-pengembalian"
                className="text-mitologi-gold hover:underline"
              >
                Kebijakan Pengembalian
              </Link>{" "}
              kami.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Pembatalan pesanan hanya dapat dilakukan sebelum pesanan
                diproses/dikemas
              </li>
              <li>
                Pengembalian produk dapat dilakukan dalam waktu 7 hari setelah
                barang diterima
              </li>
              <li>
                Produk yang dikembalikan harus dalam kondisi original (belum
                dicuci, belum dipakai, tag masih terpasang)
              </li>
              <li>
                Proses refund memakan waktu 5-14 hari kerja setelah barang
                diterima dan diverifikasi oleh tim kami
              </li>
            </ul>
          </section>

          <section id="hki" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              8. Hak Kekayaan Intelektual
            </h2>
            <p>
              Seluruh konten yang ditampilkan di website ini, termasuk namun
              tidak terbatas pada logo, desain, teks, grafis, gambar, foto
              produk, dan kode program, merupakan hak kekayaan intelektual
              Mitologi Clothing dan dilindungi oleh undang-undang hak cipta yang
              berlaku di Republik Indonesia.
            </p>
            <p>Pengguna dilarang untuk:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Menyalin, memodifikasi, atau memproduksi ulang konten tanpa izin
                tertulis
              </li>
              <li>
                Menggunakan merek, logo, atau desain Mitologi untuk kepentingan
                komersial
              </li>
              <li>
                Menggunakan konten website untuk membuat produk atau layanan
                yang bersaing
              </li>
            </ul>
          </section>

          <section id="batasan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              9. Batasan Tanggung Jawab
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Layanan kami disediakan &quot;sebagaimana adanya&quot; tanpa
                jaminan dari segala jenis, baik tersurat maupun tersirat
              </li>
              <li>
                Kami tidak bertanggung jawab atas kerugian tidak langsung,
                insidental, atau konsekuensial yang timbul dari penggunaan
                layanan kami
              </li>
              <li>
                Kami tidak menjamin bahwa website akan selalu tersedia tanpa
                gangguan atau bebas dari kesalahan
              </li>
              <li>
                Total tanggung jawab kami terbatas pada jumlah yang Anda
                bayarkan untuk produk terkait
              </li>
            </ul>
          </section>

          <section id="sengketa" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              10. Penyelesaian Sengketa
            </h2>
            <p>
              Setiap sengketa yang timbul dari penggunaan layanan kami akan
              diselesaikan dengan cara berikut:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Musyawarah</strong>: Para pihak akan berusaha
                menyelesaikan sengketa secara musyawarah dalam waktu 30 hari
                kalender
              </li>
              <li>
                <strong>Mediasi</strong>: Jika musyawarah gagal, sengketa akan
                diselesaikan melalui mediasi di bawah lembaga mediasi yang
                disepakati bersama
              </li>
              <li>
                <strong>Arbitrase/Pengadilan</strong>: Sebagai upaya terakhir,
                sengketa akan diselesaikan melalui Pengadilan Negeri yang
                berwenang di wilayah Indramayu, Jawa Barat
              </li>
            </ol>
          </section>

          <section id="hukum" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              11. Hukum yang Berlaku
            </h2>
            <p>
              Syarat & Ketentuan ini diatur dan ditafsirkan berdasarkan hukum
              Republik Indonesia. Dengan menggunakan layanan kami, Anda tunduk
              pada yurisdiksi pengadilan Republik Indonesia.
            </p>
          </section>

          <section id="perubahan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              12. Perubahan Syarat & Ketentuan
            </h2>
            <p>
              Kami berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan
              signifikan akan diumumkan melalui website dan akan berlaku efektif
              sejak tanggal publikasi. Penggunaan berkelanjutan atas layanan
              kami setelah perubahan diposting berarti Anda menerima syarat yang
              telah diperbarui.
            </p>
          </section>

          <section id="kontak" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              13. Hubungi Kami
            </h2>
            <p>
              Untuk pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi
              kami:
            </p>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 mt-8 not-prose shadow-sm">
              <div className="space-y-3 font-sans text-base text-slate-700">
                <p className="font-bold text-lg font-sans text-mitologi-navy mb-4">
                  Mitologi Clothing
                </p>
                <p>Email: mitologiclothing@gmail.com</p>
                <p>Telepon: +62 813-2217-0902</p>
                <p>
                  Alamat: Desa Leuwigede Kec. Widasari, Kab. Indramayu 45271
                </p>
              </div>
            </div>
          </section>

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
            <Link
              href="/shop/kebijakan-privasi"
              className="inline-flex items-center text-sm font-sans font-bold text-slate-600 hover:text-mitologi-navy transition-colors"
            >
              &larr; Kebijakan Privasi
            </Link>
            <Link
              href="/shop/kebijakan-pengembalian"
              className="inline-flex items-center text-sm font-sans font-bold text-slate-600 hover:text-mitologi-navy transition-colors"
            >
              Kebijakan Pengembalian &rarr;
            </Link>
          </div>
        </div>
      </div>
    </StaticPageShell>
  );
}

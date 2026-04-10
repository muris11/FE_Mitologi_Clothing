"use client";

import { StaticPageShell } from "components/shop/static-page-shell";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "pendahuluan", label: "Pendahuluan" },
  { id: "informasi", label: "Informasi yang Dikumpulkan" },
  { id: "penggunaan", label: "Penggunaan Informasi" },
  { id: "perlindungan", label: "Perlindungan Data" },
  { id: "pihak-ketiga", label: "Pihak Ketiga" },
  { id: "hak-pengguna", label: "Hak Pengguna" },
  { id: "cookie", label: "Kebijakan Cookie" },
  { id: "perubahan", label: "Perubahan Kebijakan" },
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

export default function KebijakanPrivasiPage() {
  const [activeSection, setActiveSection] = useState("pendahuluan");

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
      title="Kebijakan Privasi"
      subtitle="Komitmen kami dalam melindungi privasi dan data pribadi Anda."
      breadcrumbs={[{ label: "Kebijakan Privasi" }]}
      maxWidth="wide"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar TOC — Desktop Only */}
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

          <section id="pendahuluan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              1. Pendahuluan
            </h2>
            <p>
              Mitologi Clothing (&quot;kami&quot;, &quot;milik kami&quot;, atau
              &quot;Mitologi&quot;) berkomitmen untuk melindungi privasi dan
              data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana
              kami mengumpulkan, menggunakan, menyimpan, dan melindungi
              informasi pribadi Anda saat Anda menggunakan website kami,
              melakukan pembelian, atau berinteraksi dengan layanan kami.
            </p>
            <p>
              Dengan mengakses dan menggunakan layanan kami, Anda menyetujui
              pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.
              Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
              menggunakan layanan kami.
            </p>
          </section>

          <section id="informasi" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              2. Informasi yang Kami Kumpulkan
            </h2>

            <h3 className="text-lg font-sans font-bold text-slate-800 mt-8 mb-4">
              a. Data Pribadi
            </h3>
            <p>
              Informasi yang Anda berikan secara langsung kepada kami, termasuk:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nama lengkap dan alamat email saat mendaftar akun</li>
              <li>Nomor telepon untuk keperluan komunikasi pesanan</li>
              <li>Alamat pengiriman untuk proses pengiriman produk</li>
              <li>
                Informasi pembayaran yang diproses melalui payment gateway
              </li>
            </ul>

            <h3 className="text-lg font-sans font-bold text-slate-800 mt-8 mb-4">
              b. Data Transaksi
            </h3>
            <p>Informasi terkait aktivitas belanja Anda, meliputi:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Riwayat pembelian dan detail pesanan</li>
              <li>Produk yang ditambahkan ke keranjang belanja</li>
              <li>Preferensi produk dan wishlist</li>
              <li>Interaksi dengan fitur rekomendasi produk</li>
            </ul>

            <h3 className="text-lg font-sans font-bold text-slate-800 mt-8 mb-4">
              c. Data Perangkat & Teknis
            </h3>
            <p>
              Informasi yang dikumpulkan secara otomatis saat Anda mengunjungi
              website kami:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Alamat IP dan informasi browser</li>
              <li>Jenis perangkat dan sistem operasi</li>
              <li>Halaman yang dikunjungi dan durasi kunjungan</li>
              <li>Sumber referral dan interaksi dengan website</li>
            </ul>
          </section>

          <section id="penggunaan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              3. Penggunaan Informasi
            </h2>
            <p>
              Kami menggunakan informasi yang dikumpulkan untuk tujuan berikut:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Pemrosesan Pesanan</strong>: Memproses, mengirimkan, dan
                mengelola pesanan Anda
              </li>
              <li>
                <strong>Komunikasi</strong>: Mengirimkan konfirmasi pesanan,
                update pengiriman, dan notifikasi penting
              </li>
              <li>
                <strong>Personalisasi</strong>: Memberikan rekomendasi produk
                yang relevan berdasarkan preferensi Anda
              </li>
              <li>
                <strong>Peningkatan Layanan</strong>: Menganalisis pola
                penggunaan website untuk meningkatkan pengalaman berbelanja
              </li>
              <li>
                <strong>Keamanan</strong>: Mendeteksi dan mencegah aktivitas
                penipuan atau penyalahgunaan
              </li>
              <li>
                <strong>Pemasaran</strong>: Mengirimkan newsletter, penawaran
                khusus, dan informasi promo (dengan persetujuan Anda)
              </li>
            </ul>
          </section>

          <section id="perlindungan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              4. Perlindungan Data
            </h2>
            <p>
              Kami menerapkan langkah-langkah keamanan teknis dan organisasi
              yang sesuai untuk melindungi data pribadi Anda, termasuk:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enkripsi data saat transmisi menggunakan SSL/TLS</li>
              <li>
                Penyimpanan password menggunakan algoritma hashing yang aman
              </li>
              <li>
                Pembatasan akses data hanya kepada karyawan yang membutuhkan
              </li>
              <li>
                Pemrosesan pembayaran melalui gateway yang tersertifikasi PCI
                DSS (Midtrans)
              </li>
              <li>Pemantauan keamanan sistem secara berkala</li>
            </ul>
            <p>
              Meskipun kami berusaha melindungi data Anda, tidak ada metode
              transmisi data melalui internet yang 100% aman. Kami tidak dapat
              menjamin keamanan absolut data yang ditransmisikan ke website
              kami.
            </p>
          </section>

          <section id="pihak-ketiga" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              5. Berbagi Informasi dengan Pihak Ketiga
            </h2>
            <p>
              Kami tidak menjual, memperdagangkan, atau menyewakan data pribadi
              Anda kepada pihak ketiga. Kami hanya membagikan informasi dalam
              situasi berikut:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Payment Gateway</strong>: Data pembayaran diproses oleh
                Midtrans untuk memfasilitasi transaksi
              </li>
              <li>
                <strong>Jasa Pengiriman</strong>: Nama dan alamat pengiriman
                diberikan kepada kurir (JNE, J&T, SiCepat, dll.) untuk
                mengirimkan pesanan Anda
              </li>
              <li>
                <strong>Kewajiban Hukum</strong>: Jika diwajibkan oleh hukum,
                regulasi, atau perintah pengadilan yang berlaku di Indonesia
              </li>
              <li>
                <strong>Perlindungan Hak</strong>: Untuk melindungi hak,
                keamanan, atau properti kami, pengguna kami, atau publik
              </li>
            </ul>
          </section>

          <section id="hak-pengguna" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              6. Hak Pengguna
            </h2>
            <p>Anda memiliki hak-hak berikut terkait data pribadi Anda:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Hak Akses</strong>: Anda dapat mengakses dan meninjau
                data pribadi yang kami simpan tentang Anda melalui halaman akun
                Anda
              </li>
              <li>
                <strong>Hak Koreksi</strong>: Anda dapat memperbarui atau
                memperbaiki data yang tidak akurat melalui pengaturan profil
              </li>
              <li>
                <strong>Hak Penghapusan</strong>: Anda dapat meminta penghapusan
                akun dan data pribadi Anda dengan menghubungi kami
              </li>
              <li>
                <strong>Hak Penarikan Persetujuan</strong>: Anda dapat berhenti
                berlangganan newsletter kapan saja melalui link unsubscribe
              </li>
            </ul>
            <p>
              Untuk menggunakan hak-hak Anda, silakan hubungi kami melalui email
              di mitologiclothing@gmail.com.
            </p>
          </section>

          <section id="cookie" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              7. Kebijakan Cookie
            </h2>
            <p>
              Website kami menggunakan cookie dan teknologi penyimpanan lokal
              untuk meningkatkan pengalaman Anda. Cookie yang kami gunakan
              meliputi:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Cookie Esensial</strong>: Diperlukan untuk fungsi dasar
                website seperti autentikasi dan keranjang belanja
              </li>
              <li>
                <strong>Cookie Preferensi</strong>: Menyimpan preferensi sesi
                Anda untuk pengalaman yang lebih personal
              </li>
              <li>
                <strong>Cookie Analitik</strong>: Membantu kami memahami
                bagaimana pengunjung berinteraksi dengan website
              </li>
            </ul>
            <p>
              Anda dapat mengelola pengaturan cookie melalui pengaturan browser
              Anda. Perlu diketahui bahwa menonaktifkan cookie tertentu dapat
              memengaruhi fungsionalitas website.
            </p>
          </section>

          <section id="perubahan" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              8. Perubahan Kebijakan
            </h2>
            <p>
              Kami berhak untuk memperbarui Kebijakan Privasi ini dari waktu ke
              waktu. Perubahan signifikan akan diumumkan melalui website kami
              dan/atau melalui email. Kami menyarankan Anda untuk meninjau
              kebijakan ini secara berkala.
            </p>
            <p>
              Penggunaan berkelanjutan atas layanan kami setelah perubahan
              diposting berarti Anda menerima kebijakan yang telah diperbarui.
            </p>
          </section>

          <section id="kontak" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-6">
              9. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan, keluhan, atau permintaan terkait
              Kebijakan Privasi ini atau pengelolaan data pribadi Anda, silakan
              hubungi kami:
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
              href="/shop/syarat-ketentuan"
              className="inline-flex items-center text-sm font-sans font-bold text-slate-600 hover:text-mitologi-navy transition-colors"
            >
              Syarat & Ketentuan &rarr;
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

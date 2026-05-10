import { getLandingPageData } from "lib/api";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  return {
    title: `Kebijakan Privasi - ${siteName}`,
    description: `Kebijakan Privasi ${siteName}. Kami berkomitmen melindungi data pribadi Anda.`,
  };
}

export default async function PrivacyPolicyPage() {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  const email =
    data?.siteSettings?.contact?.contactEmail || "mitologiclothing@gmail.com";

  const sections = [
    {
      title: "Informasi yang Kami Kumpulkan",
      content:
        "Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk:",
      list: [
        "Nama lengkap dan informasi kontak (email, nomor telepon, alamat)",
        "Informasi akun (username, password terenkripsi)",
        "Data transaksi dan riwayat pemesanan",
        "Preferensi produk dan ukuran",
        "Data desain yang Anda upload untuk pesanan custom",
        "Informasi pengiriman dan alamat tujuan",
      ],
    },
    {
      title: "Penggunaan Informasi",
      content: "Informasi yang kami kumpulkan digunakan untuk:",
      list: [
        "Memproses dan mengirimkan pesanan Anda",
        "Menghubungi Anda terkait pesanan, termasuk konfirmasi dan update status",
        "Memberikan layanan pelanggan dan dukungan teknis",
        "Mengirimkan informasi promosi dan produk terbaru (dengan persetujuan Anda)",
        "Meningkatkan kualitas produk dan layanan kami",
        "Memenuhi kewajiban hukum dan regulasi yang berlaku",
      ],
    },
    {
      title: "Perlindungan Data",
      content:
        "Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data pribadi Anda:",
      list: [
        "Enkripsi data sensitif menggunakan standar SSL/TLS",
        "Akses terbatas hanya untuk personel yang berwenang",
        "Sistem monitoring keamanan secara berkala",
        "Penyimpanan password menggunakan algoritma hashing yang aman",
        "Backup data secara rutin untuk mencegah kehilangan data",
      ],
    },
    {
      title: "Berbagi Informasi dengan Pihak Ketiga",
      content:
        "Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Informasi Anda hanya dapat dibagikan dalam kondisi berikut:",
      list: [
        "Kepada mitra pengiriman untuk proses pengantaran pesanan",
        "Kepada penyedia layanan pembayaran untuk memproses transaksi",
        "Jika diwajibkan oleh hukum, peraturan, atau proses hukum yang berlaku",
        "Untuk melindungi hak, properti, atau keselamatan kami dan pengguna lain",
      ],
    },
    {
      title: "Cookie dan Teknologi Pelacakan",
      content: "Website kami menggunakan cookie dan teknologi serupa untuk:",
      list: [
        "Menyimpan preferensi dan pengaturan Anda",
        "Menganalisis lalu lintas dan pola penggunaan website",
        "Meningkatkan pengalaman browsing Anda",
        "Mengingat item dalam keranjang belanja Anda",
      ],
      extra:
        "Anda dapat mengatur pengaturan cookie melalui browser Anda. Namun, menonaktifkan cookie tertentu dapat memengaruhi fungsionalitas website.",
    },
    {
      title: "Hak Anda",
      content: "Sebagai pengguna, Anda memiliki hak untuk:",
      list: [
        "Mengakses dan mendapatkan salinan data pribadi Anda",
        "Memperbarui atau memperbaiki informasi yang tidak akurat",
        "Meminta penghapusan data pribadi Anda (dengan batasan tertentu)",
        "Menolak penggunaan data untuk tujuan pemasaran",
        "Menarik persetujuan yang telah diberikan sebelumnya",
      ],
    },
    {
      title: "Penyimpanan Data",
      content:
        "Kami menyimpan data pribadi Anda selama diperlukan untuk memenuhi tujuan pengumpulan, termasuk untuk memenuhi kewajiban hukum, perpajakan, akuntansi, atau pelaporan. Data transaksi disimpan minimal selama 5 tahun sesuai ketentuan perundang-undangan yang berlaku.",
    },
    {
      title: "Perubahan Kebijakan",
      content:
        "Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui email atau pemberitahuan di website. Tanggal pembaruan terakhir akan selalu tercantum di halaman ini.",
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Kebijakan Privasi
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Terakhir diperbarui: 18 Februari 2026
        </p>

        <div className="prose prose-slate prose-base max-w-none">
          <p className="text-slate-600 leading-relaxed">
            <strong>{siteName}</strong> menghargai privasi Anda. Kebijakan
            Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
            menyimpan, dan melindungi informasi pribadi Anda saat menggunakan
            website dan layanan kami.
          </p>

          {sections.map((section, idx) => (
            <div key={idx} className="mt-10">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                {idx + 1}. {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                {section.content}
              </p>
              {section.list && (
                <ul className="space-y-2 text-slate-600">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.extra && (
                <p className="text-sm text-slate-500 mt-3 pl-3 border-l-2 border-slate-200">
                  {section.extra}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-2">
            Pertanyaan tentang kebijakan privasi?
          </p>
          <a
            href={`mailto:${email}`}
            className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
          >
            {email}
          </a>
        </div>

        <div className="mt-8 text-sm text-slate-400">
          <Link href="/terms-of-service" className="hover:text-slate-600 underline underline-offset-4">
            Baca juga: Syarat & Ketentuan
          </Link>
        </div>
      </div>
    </main>
  );
}

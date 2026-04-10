import { getLandingPageData } from "lib/api";
import { Metadata } from "next";

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
  const phone =
    data?.siteSettings?.contact?.contactPhone || "+62 813-2217-0902";
  const address =
    data?.siteSettings?.contact?.contactAddress ||
    "Desa Leuwigede Kec. Widasari Kab. Indramayu 45271";

  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      content: [
        "Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk:",
      ],
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
      title: "2. Penggunaan Informasi",
      content: ["Informasi yang kami kumpulkan digunakan untuk:"],
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
      title: "3. Perlindungan Data",
      content: [
        "Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data pribadi Anda:",
      ],
      list: [
        "Enkripsi data sensitif menggunakan standar SSL/TLS",
        "Akses terbatas hanya untuk personel yang berwenang",
        "Sistem monitoring keamanan secara berkala",
        "Penyimpanan password menggunakan algoritma hashing yang aman",
        "Backup data secara rutin untuk mencegah kehilangan data",
      ],
    },
    {
      title: "4. Berbagi Informasi dengan Pihak Ketiga",
      content: [
        "Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Informasi Anda hanya dapat dibagikan dalam kondisi berikut:",
      ],
      list: [
        "Kepada mitra pengiriman untuk proses pengantaran pesanan",
        "Kepada penyedia layanan pembayaran untuk memproses transaksi",
        "Jika diwajibkan oleh hukum, peraturan, atau proses hukum yang berlaku",
        "Untuk melindungi hak, properti, atau keselamatan kami dan pengguna lain",
      ],
    },
    {
      title: "5. Cookie dan Teknologi Pelacakan",
      content: ["Website kami menggunakan cookie dan teknologi serupa untuk:"],
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
      title: "6. Hak Anda",
      content: ["Sebagai pengguna, Anda memiliki hak untuk:"],
      list: [
        "Mengakses dan mendapatkan salinan data pribadi Anda",
        "Memperbarui atau memperbaiki informasi yang tidak akurat",
        "Meminta penghapusan data pribadi Anda (dengan batasan tertentu)",
        "Menolak penggunaan data untuk tujuan pemasaran",
        "Menarik persetujuan yang telah diberikan sebelumnya",
      ],
    },
    {
      title: "7. Penyimpanan Data",
      content: [
        "Kami menyimpan data pribadi Anda selama diperlukan untuk memenuhi tujuan pengumpulan, termasuk untuk memenuhi kewajiban hukum, perpajakan, akuntansi, atau pelaporan. Data transaksi disimpan minimal selama 5 tahun sesuai ketentuan perundang-undangan yang berlaku.",
      ],
    },
    {
      title: "8. Perubahan Kebijakan",
      content: [
        "Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui email atau pemberitahuan di website. Tanggal pembaruan terakhir akan selalu tercantum di halaman ini.",
      ],
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-mitologi-navy pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mitologi-gold/30 to-transparent" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-mitologi-gold/10 border border-mitologi-gold/20 rounded-full text-xs font-semibold tracking-widest text-mitologi-gold uppercase mb-6">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Komitmen kami dalam melindungi data pribadi dan privasi Anda
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="flex items-center gap-3 mb-12 pb-8 border-b border-slate-100">
              <div className="w-1 h-8 bg-mitologi-gold rounded-full" />
              <p className="text-sm text-slate-500">
                Terakhir diperbarui:{" "}
                <span className="font-semibold text-slate-800">
                  18 Februari 2026
                </span>
              </p>
            </div>

            {/* Intro */}
            <div className="mb-12">
              <p className="text-slate-600 leading-relaxed text-lg">
                <span className="font-semibold text-mitologi-navy">
                  {siteName}
                </span>{" "}
                menghargai privasi Anda. Kebijakan Privasi ini menjelaskan
                bagaimana kami mengumpulkan, menggunakan, menyimpan, dan
                melindungi informasi pribadi Anda saat menggunakan website dan
                layanan kami. Dengan menggunakan layanan kami, Anda menyetujui
                praktik yang dijelaskan dalam kebijakan ini.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <article key={idx} className="group">
                  <h2 className="text-xl md:text-2xl font-bold text-mitologi-navy mb-4 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-mitologi-gold mt-3 flex-shrink-0" />
                    {section.title}
                  </h2>
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-slate-600 leading-relaxed mb-4 pl-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-3 pl-4">
                      {section.list.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mitologi-gold/60 flex-shrink-0" />
                          <span className="text-slate-600 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.extra && (
                    <p className="text-slate-500 text-sm mt-4 pl-4 border-l-2 border-mitologi-gold/20 italic">
                      {section.extra}
                    </p>
                  )}
                </article>
              ))}
            </div>

            {/* Contact Box */}
            <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-mitologi-navy to-[#1a1a3e] text-white shadow-2xl shadow-mitologi-navy/20">
              <h3 className="text-2xl font-bold mb-4">Hubungi Kami</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini
                atau ingin menggunakan hak Anda terkait data pribadi, silakan
                hubungi kami:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-mitologi-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="font-medium text-white">{email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-mitologi-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Telepon</p>
                    <p className="font-medium text-white">{phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2 mt-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-mitologi-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Alamat</p>
                    <p className="font-medium text-white">{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { getLandingPageData } from "lib/api";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  return {
    title: `Syarat & Ketentuan - ${siteName}`,
    description: `Syarat dan Ketentuan penggunaan layanan ${siteName}. Ketahui hak dan kewajiban Anda.`,
  };
}

export default async function TermsOfServicePage() {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  const email =
    data?.siteSettings?.contact?.contactEmail || "mitologiclothing@gmail.com";
  const phone =
    data?.siteSettings?.contact?.contactPhone || "+62 813-2217-0902";
  const address =
    data?.siteSettings?.contact?.contactAddress ||
    "Desa Leuwigede Kec. Widasari Kab. Indramayu 45271";
  const whatsapp =
    data?.siteSettings?.contact?.whatsappNumber || "6281322170902";

  const sections = [
    {
      title: "1. Ketentuan Umum",
      content: [
        `Dengan mengakses dan menggunakan website ${siteName}, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.`,
        `${siteName} berhak mengubah, memodifikasi, menambah, atau menghapus bagian dari Syarat & Ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan berlaku efektif sejak dipublikasikan di website.`,
      ],
    },
    {
      title: "2. Layanan Kami",
      content: [
        `${siteName} menyediakan layanan produksi pakaian custom dan merchandise, termasuk namun tidak terbatas pada:`,
      ],
      list: [
        "Produksi kaos custom dengan berbagai teknik sablon (plastisol, DTF, sublimasi)",
        "Jersey printing untuk tim olahraga, komunitas, dan acara",
        "Kemeja, PDH, dan seragam resmi",
        "Hoodie, jaket, dan outerwear",
        "Merchandise dan produk promosi lainnya",
        "Penjualan produk ready-stock melalui toko online",
      ],
    },
    {
      title: "3. Pemesanan dan Pembayaran",
      content: [],
      subsections: [
        {
          subtitle: "Proses Pemesanan",
          list: [
            "Minimum order untuk pesanan custom adalah 12 pcs per desain",
            "Pesanan dianggap valid setelah konfirmasi desain dan pembayaran DP diterima",
            "Spesifikasi produk (ukuran, warna, material, desain) harus dikonfirmasi sebelum produksi dimulai",
            "Perubahan desain atau spesifikasi setelah produksi dimulai dapat dikenakan biaya tambahan",
          ],
        },
        {
          subtitle: "Pembayaran",
          list: [
            "DP (Down Payment) minimal 50% dari total pesanan untuk memulai produksi",
            "Pelunasan dilakukan sebelum pengiriman atau pengambilan barang",
            "Pembayaran dapat dilakukan melalui transfer bank atau metode pembayaran yang tersedia",
            "Harga yang tertera sudah termasuk biaya produksi dan belum termasuk ongkos kirim (kecuali dinyatakan lain)",
          ],
        },
      ],
    },
    {
      title: "4. Produksi dan Pengiriman",
      content: [],
      subsections: [
        {
          subtitle: "Waktu Produksi",
          list: [
            "Estimasi waktu produksi adalah 7-14 hari kerja terhitung sejak desain final disetujui dan DP diterima",
            "Waktu produksi dapat berubah tergantung jumlah pesanan dan tingkat kesulitan",
            "Kami akan menginformasikan jika terjadi keterlambatan produksi",
          ],
        },
        {
          subtitle: "Pengiriman",
          list: [
            "Pengiriman dilakukan melalui jasa ekspedisi terpercaya",
            "Biaya pengiriman ditanggung oleh pembeli kecuali ada kesepakatan lain",
            "Risiko kerusakan selama pengiriman menjadi tanggung jawab jasa ekspedisi",
            "Pembeli dapat memilih untuk mengambil barang langsung di workshop kami",
          ],
        },
      ],
    },
    {
      title: "5. Quality Control dan Garansi",
      content: [
        "Setiap produk melalui proses Quality Control (QC) sebelum dikirim. Kami memberikan garansi untuk:",
      ],
      list: [
        "Kesesuaian produk dengan desain yang telah disetujui",
        "Kualitas jahitan dan konstruksi pakaian",
        "Kualitas sablon dan printing sesuai standar produksi",
      ],
      extra:
        "Klaim garansi harus diajukan maksimal 3 hari setelah barang diterima, disertai foto dan video bukti kerusakan/ketidaksesuaian.",
    },
    {
      title: "6. Kebijakan Pengembalian",
      content: [
        "Pengembalian atau penukaran produk dapat dilakukan dengan ketentuan berikut:",
      ],
      subsections: [
        {
          subtitle: "Dapat Dikembalikan",
          list: [
            "Produk cacat produksi (jahitan rusak, sablon tidak sesuai)",
            "Produk tidak sesuai dengan spesifikasi pesanan yang disepakati",
            "Jumlah produk tidak sesuai dengan pesanan",
          ],
        },
        {
          subtitle: "Tidak Dapat Dikembalikan",
          list: [
            "Perbedaan warna minor akibat perbedaan tampilan layar monitor",
            "Kerusakan akibat pemakaian atau pencucian yang tidak sesuai petunjuk",
            "Produk custom yang sudah sesuai dengan desain yang disetujui pelanggan",
            "Produk yang sudah dipakai atau dicuci",
          ],
        },
      ],
    },
    {
      title: "7. Hak Kekayaan Intelektual",
      content: [
        `Seluruh konten di website ${siteName}, termasuk namun tidak terbatas pada teks, gambar, logo, desain, dan elemen visual lainnya, dilindungi oleh hak cipta dan merupakan milik ${siteName}.`,
        "Pelanggan bertanggung jawab atas desain yang diberikan untuk produksi. Kami tidak bertanggung jawab atas pelanggaran hak cipta yang timbul dari desain yang disediakan oleh pelanggan.",
      ],
    },
    {
      title: "8. Akun Pengguna",
      content: [
        "Untuk melakukan pembelian di toko online kami, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk:",
      ],
      list: [
        "Menjaga kerahasiaan informasi akun dan password Anda",
        "Semua aktivitas yang terjadi di bawah akun Anda",
        "Memberikan informasi yang akurat dan terkini",
        "Memberitahu kami segera jika ada penggunaan tidak sah pada akun Anda",
      ],
    },
    {
      title: "9. Batasan Tanggung Jawab",
      content: [`${siteName} tidak bertanggung jawab atas:`],
      list: [
        "Kerusakan atau kehilangan barang yang terjadi selama proses pengiriman oleh pihak ekspedisi",
        "Keterlambatan pengiriman yang disebabkan oleh force majeure (bencana alam, pandemi, dll)",
        "Perbedaan warna atau tampilan produk yang disebabkan oleh perbedaan pengaturan layar monitor",
        "Kerugian tidak langsung yang timbul dari penggunaan layanan kami",
      ],
    },
    {
      title: "10. Hukum yang Berlaku",
      content: [
        "Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul akan diselesaikan secara musyawarah. Apabila tidak tercapai kesepakatan, maka akan diselesaikan melalui pengadilan yang berwenang di wilayah Kabupaten Indramayu, Jawa Barat.",
      ],
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-mitologi-navy pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mitologi-gold/30 to-transparent" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-mitologi-gold/10 border border-mitologi-gold/20 rounded-full text-xs font-semibold tracking-widest text-mitologi-gold uppercase mb-6">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Syarat & Ketentuan
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ketentuan penggunaan layanan dan transaksi di {siteName}
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
                Selamat datang di{" "}
                <span className="font-semibold text-mitologi-navy">
                  {siteName}
                </span>
                . Syarat & Ketentuan berikut mengatur penggunaan website,
                pemesanan produk, dan semua layanan yang kami sediakan. Mohon
                baca dengan seksama sebelum melakukan transaksi.
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

                  {section.subsections &&
                    section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="mt-6 ml-4">
                        <h3 className="text-lg font-semibold text-mitologi-navy/80 mb-3">
                          {sub.subtitle}
                        </h3>
                        <ul className="space-y-3">
                          {sub.list.map((item, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-3">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mitologi-gold/60 flex-shrink-0" />
                              <span className="text-slate-600 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

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
              <h3 className="text-2xl font-bold mb-4">Ada Pertanyaan?</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini,
                jangan ragu untuk menghubungi kami:
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
                    <p className="text-sm text-slate-400">Telepon / WhatsApp</p>
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
                    <p className="text-sm text-slate-400">Alamat Workshop</p>
                    <p className="font-medium text-white">{address}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={`${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-mitologi-gold px-6 py-3 text-sm font-bold text-mitologi-navy shadow-lg shadow-mitologi-gold/20 hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

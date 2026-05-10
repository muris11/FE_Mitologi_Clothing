import { getLandingPageData } from "lib/api";
import { Metadata } from "next";
import Link from "next/link";

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

  const sections = [
    {
      title: "Ketentuan Umum",
      content: `Dengan mengakses dan menggunakan website ${siteName}, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini. ${siteName} berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.`,
    },
    {
      title: "Layanan Kami",
      content: `${siteName} menyediakan layanan produksi pakaian custom dan merchandise, termasuk:`,
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
      title: "Pemesanan dan Pembayaran",
      content: "Ketentuan pemesanan dan pembayaran yang berlaku:",
      list: [
        "Minimum order untuk pesanan custom adalah 12 pcs per desain",
        "Pesanan dianggap valid setelah konfirmasi desain dan pembayaran DP diterima",
        "DP (Down Payment) minimal 50% dari total pesanan untuk memulai produksi",
        "Pelunasan dilakukan sebelum pengiriman atau pengambilan barang",
        "Pembayaran dapat dilakukan melalui transfer bank atau metode pembayaran yang tersedia",
        "Harga yang tertera sudah termasuk biaya produksi dan belum termasuk ongkos kirim (kecuali dinyatakan lain)",
        "Perubahan desain atau spesifikasi setelah produksi dimulai dapat dikenakan biaya tambahan",
      ],
    },
    {
      title: "Produksi dan Pengiriman",
      content: "Ketentuan terkait waktu produksi dan pengiriman:",
      list: [
        "Estimasi waktu produksi adalah 7-14 hari kerja terhitung sejak desain final disetujui dan DP diterima",
        "Waktu produksi dapat berubah tergantung jumlah pesanan dan tingkat kesulitan",
        "Pengiriman dilakukan melalui jasa ekspedisi terpercaya",
        "Biaya pengiriman ditanggung oleh pembeli kecuali ada kesepakatan lain",
        "Risiko kerusakan selama pengiriman menjadi tanggung jawab jasa ekspedisi",
        "Pembeli dapat memilih untuk mengambil barang langsung di workshop kami",
      ],
    },
    {
      title: "Quality Control dan Garansi",
      content:
        "Setiap produk melalui proses Quality Control (QC) sebelum dikirim. Kami memberikan garansi untuk:",
      list: [
        "Kesesuaian produk dengan desain yang telah disetujui",
        "Kualitas jahitan dan konstruksi pakaian",
        "Kualitas sablon dan printing sesuai standar produksi",
      ],
      extra:
        "Klaim garansi harus diajukan maksimal 3 hari setelah barang diterima, disertai foto dan video bukti kerusakan/ketidaksesuaian.",
    },
    {
      title: "Kebijakan Pengembalian",
      content:
        "Pengembalian atau penukaran produk dapat dilakukan jika produk cacat produksi, tidak sesuai spesifikasi pesanan, atau jumlah tidak sesuai. Pengembalian tidak berlaku untuk perbedaan warna minor akibat layar monitor, kerusakan akibat pemakaian/pencucian, produk custom yang sudah sesuai desain yang disetujui, atau produk yang sudah dipakai/dicuci.",
    },
    {
      title: "Hak Kekayaan Intelektual",
      content: `Seluruh konten di website ${siteName} dilindungi oleh hak cipta. Pelanggan bertanggung jawab atas desain yang diberikan untuk produksi. Kami tidak bertanggung jawab atas pelanggaran hak cipta yang timbul dari desain yang disediakan oleh pelanggan.`,
    },
    {
      title: "Akun Pengguna",
      content:
        "Untuk melakukan pembelian di toko online kami, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk:",
      list: [
        "Menjaga kerahasiaan informasi akun dan password Anda",
        "Semua aktivitas yang terjadi di bawah akun Anda",
        "Memberikan informasi yang akurat dan terkini",
        "Memberitahu kami segera jika ada penggunaan tidak sah pada akun Anda",
      ],
    },
    {
      title: "Batasan Tanggung Jawab",
      content: `${siteName} tidak bertanggung jawab atas:`,
      list: [
        "Kerusakan atau kehilangan barang selama proses pengiriman oleh pihak ekspedisi",
        "Keterlambatan pengiriman yang disebabkan oleh force majeure",
        "Perbedaan warna atau tampilan produk akibat perbedaan pengaturan layar",
        "Kerugian tidak langsung yang timbul dari penggunaan layanan kami",
      ],
    },
    {
      title: "Hukum yang Berlaku",
      content:
        "Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul akan diselesaikan secara musyawarah. Apabila tidak tercapai kesepakatan, maka akan diselesaikan melalui pengadilan yang berwenang di wilayah Kabupaten Indramayu, Jawa Barat.",
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Syarat & Ketentuan
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Terakhir diperbarui: 18 Februari 2026
        </p>

        <div className="prose prose-slate prose-base max-w-none">
          <p className="text-slate-600 leading-relaxed">
            Selamat datang di <strong>{siteName}</strong>. Syarat & Ketentuan
            berikut mengatur penggunaan website, pemesanan produk, dan semua
            layanan yang kami sediakan. Mohon baca dengan seksama sebelum
            melakukan transaksi.
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
            Pertanyaan tentang syarat & ketentuan?
          </p>
          <a
            href={`mailto:${email}`}
            className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
          >
            {email}
          </a>
        </div>

        <div className="mt-8 text-sm text-slate-400">
          <Link href="/privacy-policy" className="hover:text-slate-600 underline underline-offset-4">
            Baca juga: Kebijakan Privasi
          </Link>
        </div>
      </div>
    </main>
  );
}

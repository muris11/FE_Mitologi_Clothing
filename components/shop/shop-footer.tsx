import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { SiteSettings } from "lib/api/types";
import { createSocialUrl } from "lib/utils";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { SiShopee } from "react-icons/si";

export function ShopFooter({ settings }: { settings?: SiteSettings }) {
  const currentYear = new Date().getFullYear();
  const siteName = settings?.general?.siteName || "Mitologi Clothing";
  const siteDescription =
    settings?.general?.siteDescription ||
    "Koleksi pakaian premium dengan sentuhan budaya dan desain modern. Tampil percaya diri dengan kualitas terbaik.";

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: createSocialUrl("Instagram", settings?.contact?.socialInstagram),
      enabled: settings?.contact?.socialInstagramEnabled,
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      href: createSocialUrl("TikTok", settings?.contact?.socialTiktok),
      enabled: settings?.contact?.socialTiktokEnabled,
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: createSocialUrl("Facebook", settings?.contact?.socialFacebook),
      enabled: settings?.contact?.socialFacebookEnabled,
    },
    {
      name: "Shopee",
      icon: SiShopee,
      href: createSocialUrl("Shopee", settings?.contact?.socialShopee),
      enabled: settings?.contact?.socialShopeeEnabled,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: createSocialUrl("Twitter", settings?.contact?.socialTwitter),
      enabled: settings?.contact?.socialTwitterEnabled,
    },
  ].filter(
    (link) =>
      link.href &&
      link.href !== "#" &&
      (link.enabled === undefined || link.enabled === "1"),
  );

  const footerLinks = {
    belanja: [
      { label: "Semua Produk", href: "/shop" },
      { label: "Koleksi Terbaru", href: "/shop?sort=trending-desc" },
      { label: "Kategori", href: "/shop" },
      { label: "Promo", href: "/shop/promo" },
    ],
    bantuan: [
      { label: "Hubungi Kami", href: "/kontak" },
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "FAQ", href: "/shop/faq" },
    ],
    legal: [
      { label: "Kebijakan Privasi", href: "/shop/kebijakan-privasi" },
      { label: "Syarat & Ketentuan", href: "/shop/syarat-ketentuan" },
      { label: "Kebijakan Pengembalian", href: "/shop/kebijakan-pengembalian" },
    ],
  };

  return (
    <footer className="bg-mitologi-navy border-t border-mitologi-navy-light font-sans relative overflow-hidden">
      <div className="relative">
        <div className="border-b border-mitologi-navy-light relative z-10">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[rgba(255,255,255,0.04)] p-8 md:p-10 rounded-[28px] border border-white/10 shadow-soft">
              <div className="text-center md:text-left">
                <h3 className="font-display text-3xl md:text-[2.5rem] font-semibold text-white tracking-tight mb-2">
                  Ikuti rilisan terbaru
                </h3>
                <p className="text-slate-300 text-sm md:text-[15px] max-w-md leading-relaxed">
                  Dapatkan kabar koleksi baru, restok, dan penawaran musiman
                  dengan ritme yang ringkas dan relevan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                <label htmlFor="newsletter-email" className="sr-only">
                  Alamat email untuk newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Masukkan email Anda..."
                  className="w-full md:w-72 h-12 px-5 bg-white border border-white/10 rounded-[14px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-mitologi-gold focus:ring-1 focus:ring-mitologi-gold transition-colors duration-200"
                  autoComplete="email"
                />
                <button className="w-full sm:w-auto h-12 px-8 bg-mitologi-gold inline-flex items-center justify-center text-mitologi-navy rounded-[14px] hover:bg-mitologi-gold-light transition-colors duration-200 text-sm font-bold whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4 pr-0 lg:pr-8">
              <Link href="/" className="flex flex-col mb-8 group">
                <span className="font-display text-4xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-app-cream">
                  {siteName}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-mitologi-gold mt-1">
                  Busana Nusantara
                </span>
              </Link>

              <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm font-medium">
                {siteDescription}
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 hover:text-mitologi-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                  Belanja
                </h3>
                <ul className="space-y-4">
                  {footerLinks.belanja.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-mitologi-gold transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold inline-block rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                  Bantuan
                </h3>
                <ul className="space-y-4">
                  {footerLinks.bantuan.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-mitologi-gold transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold inline-block rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                  Legal
                </h3>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-mitologi-gold transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold inline-block rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                Kontak
              </h3>
              <ul className="space-y-4 text-sm text-slate-400">
                {settings?.contact?.contactPhone && (
                  <li className="flex items-center gap-3">
                    <PhoneIcon className="w-4 h-4 flex-shrink-0 text-mitologi-gold" />
                    <span className="font-medium">
                      {settings.contact.contactPhone}
                    </span>
                  </li>
                )}
                {settings?.contact?.contactEmail && (
                  <li className="flex items-center gap-3">
                    <EnvelopeIcon className="w-4 h-4 flex-shrink-0 text-mitologi-gold" />
                    <span className="font-medium">
                      {settings.contact.contactEmail}
                    </span>
                  </li>
                )}
                {settings?.contact?.contactAddress && (
                  <li className="flex items-start gap-3 group">
                    <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-mitologi-gold" />
                    <span className="leading-relaxed">
                      {settings.contact.contactAddress}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 relative z-10">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-center gap-6">
              <p className="text-center text-sm text-slate-400">
                &copy; {currentYear} {siteName}. Hak Cipta Dilindungi.
              </p>
              <div className="h-px w-24 bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

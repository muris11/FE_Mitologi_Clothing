import { SiteSettings } from "lib/api/types";
import { createSocialUrl } from "lib/utils";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { MotionDiv } from "components/ui/motion";

export default function LandingFooter({
  settings,
}: {
  settings?: SiteSettings;
}) {
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

  const footerLinks = [
    {
      title: "Perusahaan",
      links: [
        { name: "Tentang Kami", href: "/tentang-kami" },
        { name: "Portofolio", href: "/portofolio" },
        { name: "Layanan", href: "/layanan" },
        { name: "Kontak", href: "/kontak" },
      ],
    },
    {
      title: "Produk",
      links: [
        { name: "Kaos Custom", href: "/produk?category=kaos" },
        { name: "Jersey Printing", href: "/produk?category=jersey" },
        { name: "Kemeja & PDL", href: "/produk?category=kemeja" },
        { name: "Merchandise", href: "/produk?category=merchandise" },
      ],
    },
  ];

  return (
    <footer className="bg-mitologi-navy text-slate-300 pt-24 pb-12 font-sans border-t border-slate-800/50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mitologi-gold/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mitologi-navy-light/20 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <MotionDiv className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex flex-col mb-8 group">
              <span className="text-3xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 group-hover:from-mitologi-gold group-hover:to-mitologi-gold/80 transition-all duration-300">
                {settings?.general?.siteName || "Mitologi"}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mt-1 drop-shadow-sm">
                Premium Clothing
              </span>
            </Link>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-sm font-medium">
              {settings?.general?.siteDescription ||
                "Mitologi Clothing Premium."}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-mitologi-gold hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-mitologi-gold hover:translate-x-1 transition-all duration-300 inline-block text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="w-5 h-5 flex-shrink-0 mt-0.5 text-mitologi-gold group-hover:-translate-y-1 transition-transform duration-300" />
                <span className="leading-relaxed">
                  {settings?.contact?.contactAddress || ""}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-4 h-4 flex-shrink-0 text-mitologi-gold" />
                <span className="font-medium">
                  {settings?.contact?.contactPhone || ""}
                </span>
              </li>
              {settings?.contact?.contactEmail && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 flex-shrink-0 text-mitologi-gold" />
                  <span className="font-medium">
                    {settings.contact.contactEmail}
                  </span>
                </li>
              )}
            </ul>
            <div className="mt-8">
              {process.env.NEXT_PUBLIC_WHATSAPP_URL && (
                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-mitologi-gold px-6 py-3 text-sm font-bold text-mitologi-navy shadow-lg shadow-mitologi-gold/20 hover:bg-white hover:text-mitologi-navy hover:-translate-y-0.5 transition-all duration-300 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold focus-visible:ring-offset-2 focus-visible:ring-offset-mitologi-navy"
                >
                  Chat via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400 text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            {settings?.general?.siteName || "Mitologi Clothing"}. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-slate-400">
            <Link
              href="/privacy-policy"
              className="hover:text-mitologi-gold hover:underline underline-offset-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold rounded-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-mitologi-gold hover:underline underline-offset-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold rounded-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </MotionDiv>
    </footer>
  );
}

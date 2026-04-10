"use client";

import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { SiteSettings } from "lib/api/types";
import { MotionDiv, MotionSection } from "components/ui/motion";

interface KontakSectionProps {
  settings?: SiteSettings;
}

const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    tiktok: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    shopee: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 4.5c1.822 0 3.3 1.478 3.3 3.3 0 .314-.047.617-.12.909H8.82c-.073-.292-.12-.595-.12-.909C8.7 5.978 10.178 4.5 12 4.5zm5.7 14.4H6.3c-.746 0-1.35-.604-1.35-1.35l.675-7.65h12.45l.675 7.65c0 .746-.604 1.35-1.35 1.35z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  };
  return <>{icons[type] || null}</>;
};

function parseMapsEmbed(rawValue?: string): string {
  const defaultEmbed = "";
  if (!rawValue) return defaultEmbed;

  // Extract src from iframe HTML if present
  const srcMatch = rawValue.match(/src=["']([^"']+)["']/);
  let url = srcMatch?.[1] || rawValue;

  const mapsBase =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL ||
    "https://www.google.com/maps";

  // Handle coordinates (e.g., -6.438597, 108.287315)
  if (/^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/.test(url.trim())) {
    return `${mapsBase}?q=${url.replace(/\s/g, "")}&output=embed`;
  }

  // Convert old Google Maps embed URL format to new format
  const mapsOrigin =
    process.env.NEXT_PUBLIC_MAPS_GOOGLE_ORIGIN || "https://maps.google.com";
  if (url.includes(mapsOrigin) && url.includes("maps?")) {
    // Extract parameters from old format (handle &amp; encoding)
    const qMatch = url.match(/[?&](?:amp;)?q=([^&]+)/);
    const query = qMatch && qMatch[1] ? decodeURIComponent(qMatch[1]) : "";
    if (query) {
      return `${mapsBase}?q=${encodeURIComponent(query)}&output=embed`;
    }
  }

  // If already new format or other valid URL
  if (url.includes("://")) {
    return url;
  }

  return defaultEmbed;
}

export function KontakSection({ settings }: KontakSectionProps) {
  const contact = settings?.contact;

  const address =
    contact?.contactAddress ||
    settings?.legality?.legalAddress ||
    "Jl. Raya Lelea, Indramayu, Jawa Barat";
  const phone =
    contact?.contactPhone || contact?.whatsappNumber || "+62 812-3456-7890";
  const email = contact?.contactEmail || "mitologiclothing@gmail.com";
  const weekdayLabel = contact?.operatingHoursWeekdayLabel || "Senin - Sabtu";
  const weekdayHours = contact?.operatingHoursWeekday || "08.00 - 16.00 WIB";
  const weekendLabel = contact?.operatingHoursWeekendLabel || "Minggu";
  const weekendHours =
    contact?.operatingHoursWeekend || "Tutup (Online Chat Only)";
  const mapsEmbed = parseMapsEmbed(contact?.contactMapsEmbed);

  // Social media links from DB (only show if enabled)
  const socials = [
    {
      type: "instagram",
      url: contact?.socialInstagram,
      enabled: contact?.socialInstagramEnabled !== "0",
      label: "Instagram",
    },
    {
      type: "tiktok",
      url: contact?.socialTiktok,
      enabled: contact?.socialTiktokEnabled !== "0",
      label: "TikTok",
    },
    {
      type: "facebook",
      url: contact?.socialFacebook,
      enabled: contact?.socialFacebookEnabled !== "0",
      label: "Facebook",
    },
    {
      type: "shopee",
      url: contact?.socialShopee,
      enabled: contact?.socialShopeeEnabled !== "0",
      label: "Shopee",
    },
    {
      type: "whatsapp",
      url: contact?.whatsappNumber
        ? `${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/${contact.whatsappNumber.replace(/\D/g, "")}`
        : undefined,
      enabled: true,
      label: "WhatsApp",
    },
  ].filter((s) => s.url && s.enabled);

  const contactItems = [
    {
      icon: <MapPinIcon className="w-7 h-7" />,
      title: "Alamat Workshop",
      value: address,
    },
    {
      icon: <PhoneIcon className="w-7 h-7" />,
      title: "Telepon / WhatsApp",
      value: phone,
    },
    {
      icon: <EnvelopeIcon className="w-7 h-7" />,
      title: "Email",
      value: email,
    },
  ];

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
      {/* Background Decorative Graphic matching History Section */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left: Info Content */}
          <MotionDiv
            delay={0.1}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5 w-fit">
              {/* <span className="w-2 h-2 rounded-full bg-mitologi-gold animate-pulse" /> */}
              <span className="text-mitologi-navy font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs">
                Layanan Pelanggan
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black mb-8 leading-[1.15] tracking-tight text-mitologi-navy">
              Mari <span className="text-mitologi-gold">Terhubung</span>
            </h2>

            <div className="relative mb-12">
              <div className="absolute top-2 bottom-0 left-[11px] w-px bg-gradient-to-b from-mitologi-gold via-slate-200 to-transparent" />
              <div className="pl-8 sm:pl-10 relative">
                <div className="absolute left-[7px] top-[6px] w-[9px] h-[9px] rounded-full bg-mitologi-gold ring-4 ring-white" />
                <p className="text-slate-600 leading-[1.7] font-sans font-medium text-sm sm:text-[15px] lg:text-base text-justify">
                  Hubungi kami untuk konsultasi, pemesanan, atau sekadar
                  bertanya seputar layanan produksi kami. Tim kami dengan senang
                  hati akan membantu Anda.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Details Card (Matches Makna Logo Card) */}
              <div className="relative group bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-mitologi-gold/30 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-mitologi-navy/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  {contactItems.map((item, i) => (
                    <div key={i} className="flex gap-5 group/item items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-mitologi-navy text-white flex items-center justify-center font-sans font-black shadow-md group-hover/item:scale-110 group-hover/item:bg-mitologi-gold group-hover/item:text-mitologi-navy transition-all duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-[11px] sm:text-xs font-sans font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-mitologi-navy font-sans font-black text-[13px] sm:text-[15px] leading-relaxed tracking-tight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="relative group bg-mitologi-navy rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm border border-transparent hover:shadow-xl hover:border-mitologi-gold/30 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute -right-6 -top-6 text-white/5 group-hover:scale-110 transition-transform duration-700">
                  <ClockIcon className="w-32 h-32 transform rotate-12" />
                </div>

                <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-mitologi-gold text-mitologi-navy flex items-center justify-center font-sans font-black shadow-md">
                    <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                    Jam Operasional
                  </h3>
                </div>
                <ul className="space-y-4 font-sans text-slate-300 relative z-10 pl-2">
                  <li className="flex justify-between items-center group/time">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/time:bg-mitologi-gold transition-colors"></span>
                      <span className="font-medium text-[13px] sm:text-[15px]">
                        {weekdayLabel}
                      </span>
                    </div>
                    <span className="font-bold text-white tracking-tight">
                      {weekdayHours}
                    </span>
                  </li>
                  <li className="flex justify-between items-center group/time pt-1">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/time:bg-mitologi-gold transition-colors"></span>
                      <span className="font-medium text-[13px] sm:text-[15px]">
                        {weekendLabel}
                      </span>
                    </div>
                    <span className="font-bold text-mitologi-gold tracking-tight">
                      {weekendHours}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </MotionDiv>

          {/* Right: Map Presentation */}
          <MotionDiv
            delay={0.3}
            className="lg:col-span-7 h-full min-h-[400px] mt-10 lg:mt-0 lg:pl-4"
          >
            <div className="relative w-full h-full group flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-mitologi-gold/20 to-mitologi-navy/5 rounded-[2.5rem] transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4 pointer-events-none" />
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] transform -translate-x-3 -translate-y-3 sm:-translate-x-6 sm:-translate-y-6 transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4 bg-white/50 backdrop-blur-sm pointer-events-none" />

              <div className="relative w-full rounded-[2rem] overflow-hidden bg-white shadow-xl flex flex-col p-2 z-10 border border-slate-100 flex-1 min-h-[400px]">
                {/* Header Peta (matches image display in history) */}
                <div className="flex items-center gap-3 mb-4 mt-2 px-4 sm:px-6">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
                    <MapPinIcon className="w-4 h-4 text-mitologi-gold" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-mitologi-navy font-sans tracking-tight">
                    Lokasi Workshop
                  </h2>
                </div>

                <div className="flex-1 w-full rounded-[1.5rem] overflow-hidden relative">
                  <iframe
                    src={mapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full filter opacity-95 grayscale-[20%] contrast-[95%] hover:opacity-100 hover:grayscale-0 hover:contrast-100 transition-all duration-500 absolute inset-0"
                  />
                </div>
              </div>

              {/* Social Media floating below map like the info badge */}
              {socials.length > 0 && (
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-white/95 backdrop-blur shadow-xl border border-slate-100 p-4 sm:p-5 rounded-3xl flex gap-3 group-hover:-translate-y-2 transition-transform duration-500 z-20">
                  {socials.map((s) => (
                    <a
                      key={s.type}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 text-mitologi-navy rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-mitologi-gold/50 hover:bg-mitologi-gold hover:text-mitologi-navy hover:-translate-y-1 transition-all duration-300 group/soc"
                    >
                      <SocialIcon type={s.type} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

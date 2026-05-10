"use client";

import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { SiteSettings } from "lib/api/types";

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

  const srcMatch = rawValue.match(/src=["']([^"']+)["']/);
  let url = srcMatch?.[1] || rawValue;

  const mapsBase =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL ||
    "https://www.google.com/maps";

  if (/^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/.test(url.trim())) {
    return `${mapsBase}?q=${url.replace(/\s/g, "")}&output=embed`;
  }

  const mapsOrigin =
    process.env.NEXT_PUBLIC_MAPS_GOOGLE_ORIGIN || "https://maps.google.com";
  if (url.includes(mapsOrigin) && url.includes("maps?")) {
    const qMatch = url.match(/[?&](?:amp;)?q=([^&]+)/);
    const query = qMatch && qMatch[1] ? decodeURIComponent(qMatch[1]) : "";
    if (query) {
      return `${mapsBase}?q=${encodeURIComponent(query)}&output=embed`;
    }
  }

  if (url.includes("://")) {
    return url;
  }

  return defaultEmbed;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

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

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-mitologi-gold/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mx-auto max-w-6xl px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-3">
            Kontak
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mitologi-navy tracking-tight mb-4">
            Hubungi kami kapan saja
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Kami siap membantu kebutuhan clothing Anda. Pilih cara yang paling
            nyaman untuk terhubung dengan tim kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <motion.a
            variants={itemVariants}
            href={`mailto:${email}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-mitologi-gold/40 hover:shadow-lg hover:shadow-mitologi-gold/5"
          >
            <div>
              <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-mitologi-navy/5 text-mitologi-navy group-hover:bg-mitologi-gold/10 group-hover:text-mitologi-gold transition-colors duration-300">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                Email
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Kami merespon dalam 24 jam.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-mitologi-navy">
                {email}
              </span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400 group-hover:text-mitologi-gold transition-colors" />
            </div>
          </motion.a>

          <motion.a
            variants={itemVariants}
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-mitologi-gold/40 hover:shadow-lg hover:shadow-mitologi-gold/5"
          >
            <div>
              <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-mitologi-navy/5 text-mitologi-navy group-hover:bg-mitologi-gold/10 group-hover:text-mitologi-gold transition-colors duration-300">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                Telepon / WhatsApp
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Langsung terhubung dengan admin.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-mitologi-navy">
                {phone}
              </span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400 group-hover:text-mitologi-gold transition-colors" />
            </div>
          </motion.a>

          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-mitologi-gold/40 hover:shadow-lg hover:shadow-mitologi-gold/5"
          >
            <div>
              <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-mitologi-navy/5 text-mitologi-navy group-hover:bg-mitologi-gold/10 group-hover:text-mitologi-gold transition-colors duration-300">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                Workshop
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Kunjungi workshop kami langsung.
              </p>
            </div>
            <span className="text-sm font-medium text-mitologi-navy leading-snug">
              {address}
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col rounded-2xl border border-slate-200 bg-mitologi-navy p-7 transition-all duration-300 hover:shadow-lg md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-mitologi-gold/20 text-mitologi-gold">
                <ClockIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Jam Operasional
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4">
                <span className="text-sm text-slate-300">{weekdayLabel}</span>
                <span className="text-sm font-semibold text-white">
                  {weekdayHours}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4">
                <span className="text-sm text-slate-300">{weekendLabel}</span>
                <span className="text-sm font-semibold text-mitologi-gold">
                  {weekendHours}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:border-mitologi-gold/40"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Temukan Kami
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.type}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white text-slate-600 border border-slate-200 shadow-sm hover:border-mitologi-gold/50 hover:text-mitologi-gold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <SocialIcon type={s.type} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {mapsEmbed && (
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <div className="flex items-center gap-2.5 px-6 py-4 bg-slate-50 border-b border-slate-200">
              <MapPinIcon className="w-4 h-4 text-mitologi-gold" />
              <span className="text-sm font-semibold text-mitologi-navy">
                Lokasi Workshop
              </span>
            </div>
            <div className="relative w-full h-[320px] sm:h-[400px]">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

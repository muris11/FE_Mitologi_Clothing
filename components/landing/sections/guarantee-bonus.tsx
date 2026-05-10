"use client";

import {
  ClockIcon,
  GiftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { SiteSettings } from "lib/api/types";
import { motion, useReducedMotion } from "framer-motion";

function AnimatedContainer({ className, delay = 0.1, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GuaranteeBonusProps {
  settings?: SiteSettings;
}

export function GuaranteeBonus({ settings }: GuaranteeBonusProps) {
  const icons = [ClockIcon, ShieldCheckIcon, GiftIcon];

  const garansiData = Array.isArray(settings?.beranda?.garansiBonusData)
    ? settings.beranda.garansiBonusData
    : [];

  const fallbackFeatures = [
    {
      title: "Garansi Tepat Waktu",
      description:
        "Jaminan pengerjaan tepat waktu sesuai deadline yang disepakati. Jika terlambat, kami berikan voucher diskon untuk order selanjutnya.",
      icon: ClockIcon,
    },
    {
      title: "Garansi Kualitas",
      description:
        "Perbaikan atau refund 100% jika produk cacat, sablon luntur, atau spesifikasi tidak sesuai dengan kesepakatan order.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Bonus Order > 100 pcs",
      description:
        "Gratis 1 pcs kaos sablon eksklusif, free stickers premium, dan special packaging box untuk setiap pemesanan di atas 100 pcs.",
      icon: GiftIcon,
    },
  ];

  const features =
    garansiData.length > 0
      ? garansiData.map((item: any, i: number) => ({
          title: item.title,
          description: item.description,
          icon: icons[i % icons.length],
        }))
      : fallbackFeatures;

  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(202,138,4,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-5xl space-y-10 px-5 sm:px-8 z-10">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Keuntungan Memilih Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-mitologi-navy text-balance">
            Garansi & Bonus Eksklusif
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base tracking-wide text-balance">
            Kami tidak hanya berkomitmen pada kualitas, tapi juga memberikan apresiasi lebih untuk setiap pesanan Anda.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.4} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon as React.ElementType;
            return (
              <div
                key={i}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-mitologi-gold/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-mitologi-navy text-mitologi-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-mitologi-navy tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </AnimatedContainer>
      </div>
    </section>
  );
}

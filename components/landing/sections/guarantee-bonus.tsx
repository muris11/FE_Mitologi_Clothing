"use client";

import {
  ClockIcon,
  GiftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "components/ui/section-heading";
import { SiteSettings } from "lib/api/types";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

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
    <MotionSection className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Keuntungan Memilih Kami"
            title="Garansi & Bonus Eksklusif"
            subtitle="Kami tidak hanya berkomitmen pada kualitas, tapi juga memberikan apresiasi lebih untuk setiap pesanan Anda."
            className="items-center"
          />
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon as React.ElementType;

            return (
              <StaggerGridItem
                key={index}
                className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
              >
                {/* Gold accent top border on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mitologi-gold to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="w-16 h-16 rounded-2xl bg-mitologi-navy text-mitologi-gold flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-8 h-8" />}
                </div>

                <h3 className="text-xl font-bold font-sans text-mitologi-navy mb-3 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-slate-600 font-medium leading-relaxed font-sans text-sm">
                  {feature.description}
                </p>
              </StaggerGridItem>
            );
          })}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

"use client";

import {
    ArrowPathIcon,
    ClockIcon,
    HandThumbUpIcon,
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

function FeatureCard({ feature }: { feature: { title: string; desc: string; icon: React.ElementType } }) {
  const Icon = feature.icon;
  return (
    <div className="group p-6 sm:p-8 flex flex-col gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors duration-200">
      <div className="w-10 h-10 rounded-xl bg-mitologi-navy/5 text-mitologi-navy flex items-center justify-center group-hover:bg-mitologi-navy group-hover:text-mitologi-gold transition-colors duration-200">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-bold text-mitologi-navy tracking-tight mb-1.5">
          {feature.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </div>
  );
}

export function WhyChooseUs({ settings }: { settings?: SiteSettings }) {
  const guarantees =
    settings?.guaranteesData && settings.guaranteesData.length > 0
      ? settings.guaranteesData.map((g, i) => ({
          title: g.title,
          desc: g.description || g.desc || "",
          icon: [ClockIcon, HandThumbUpIcon, ArrowPathIcon, ClockIcon, HandThumbUpIcon, ArrowPathIcon, ClockIcon][i % 7] || ClockIcon,
        }))
      : [];

  if (guarantees.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-5 sm:px-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Kenapa Memilih Kami?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-mitologi-navy text-balance">
            Standar Kualitas Terbaik
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base tracking-wide text-balance">
            Komitmen kami adalah memberikan hasil terbaik dengan standar produksi profesional. Kepuasan Anda adalah prioritas utama kami.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed border-slate-200 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden"
        >
          {guarantees.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

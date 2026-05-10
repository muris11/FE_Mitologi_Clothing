"use client";

import { Material } from "lib/api/types";
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

const COLOR_THEMES: Record<string, string> = {
  "bg-gray-100 text-gray-800": "bg-gray-100 text-gray-800",
  "bg-green-100 text-green-800": "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800": "bg-blue-100 text-blue-800",
  "bg-red-100 text-red-800": "bg-red-100 text-red-800",
  "bg-amber-100 text-amber-800": "bg-amber-100 text-amber-800",
  "bg-indigo-100 text-indigo-800": "bg-indigo-100 text-indigo-800",
  "bg-teal-100 text-teal-800": "bg-teal-100 text-teal-800",
};

function MaterialCard({ material }: { material: Material }) {
  const themeClass =
    material.colorTheme && COLOR_THEMES[material.colorTheme]
      ? COLOR_THEMES[material.colorTheme]
      : "bg-mitologi-navy/5 text-mitologi-navy";

  return (
    <div className="group p-6 sm:p-8 flex flex-col gap-3 cursor-pointer hover:bg-mitologi-navy/[0.02] transition-colors duration-200">
      <span className={`inline-flex items-center self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${themeClass}`}>
        {material.name}
      </span>
      <h3 className="text-base sm:text-lg font-bold text-mitologi-navy tracking-tight group-hover:text-mitologi-gold transition-colors duration-200">
        {material.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {material.description}
      </p>
    </div>
  );
}

export function MaterialShowcase({
  materials = [],
}: {
  materials?: Material[];
}) {
  if (materials.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-5 sm:px-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Pilihan Material
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-mitologi-navy text-balance">
            Bahan Kualitas Premium
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base tracking-wide text-balance">
            Kami menyediakan berbagai jenis kain sesuai kebutuhan produk Anda, mulai dari kaos santai hingga seragam formal.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed border-slate-200 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden"
        >
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

"use client";

import { SizeCalculator } from "components/shop/size-calculator";
import { StaticPageShell } from "components/shop/static-page-shell";
import Link from "next/link";
import { useState } from "react";

/* ──────────────────── Data from reference images ──────────────────── */

// Page 29: Kaos & Jersey — S to 4XL
const kaosJerseyData = {
  title: "Kaos & Jersey",
  description:
    "Ukuran standar untuk kaos polos, kaos sablon, dan jersey olahraga.",
  measurements: ["Panjang (P)", "Lebar Dada (LD)"],
  sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
  values: {
    "Panjang (P)": ["69", "71", "74", "77", "79", "82", "84"],
    "Lebar Dada (LD)": ["48", "51", "54", "56", "59", "62", "64"],
  },
};

// Page 30: Kemeja — multiple categories (TK, SD, SMP, Dewasa)
const kemejaCategories = [
  {
    title: "TK",
    sizes: ["S", "M", "L", "XL", "XXL"],
    lebar: ["41", "43", "45", "47", "49"],
    tinggi: ["48", "50", "52", "54", "56"],
  },
  {
    title: "SD Kls 1-3",
    sizes: ["S", "M", "L", "XL", "XXL"],
    lebar: ["43", "45", "47", "49", "51"],
    tinggi: ["52", "54", "56", "58", "60"],
  },
  {
    title: "SD Kls 4-6",
    sizes: ["S", "M", "L", "XL", "XXL"],
    lebar: ["45", "47", "49", "51", "53"],
    tinggi: ["56", "58", "60", "62", "64"],
  },
  {
    title: "SMP",
    sizes: ["S", "M", "L", "XL", "XXL"],
    lebar: ["48", "51", "53", "55", "57"],
    tinggi: ["66", "68", "70", "72", "74"],
  },
  {
    title: "Dewasa",
    sizes: ["S", "M", "L", "XL", "XXL"],
    lebar: ["51", "53", "55", "57", "60"],
    tinggi: ["68", "70", "72", "74", "76"],
  },
];

const tabs = [
  { key: "kaos", label: "Kaos & Jersey" },
  { key: "kemeja", label: "Kemeja" },
];

const measureGuide = [
  {
    title: "Lebar Dada",
    desc: "Ukur bagian terlebar dari dada secara horizontal, dari sisi kiri ke kanan.",
    icon: "↔️",
  },
  {
    title: "Panjang Badan",
    desc: "Ukur dari bahu paling tinggi hingga ujung bawah pakaian.",
    icon: "↕️",
  },
  {
    title: "Lebar (Kemeja)",
    desc: "Ukur secara horizontal pada bagian terlebar badan kemeja.",
    icon: "📏",
  },
  {
    title: "Tinggi (Kemeja)",
    desc: "Ukur dari bahu sampai ujung bawah kemeja secara vertikal.",
    icon: "📐",
  },
];

const tips = [
  "Gunakan pita ukur (meteran kain) untuk hasil yang akurat.",
  "Ukurlah dalam posisi berdiri tegak dan rileks.",
  "Jika ukuran Anda berada di antara dua ukuran, pilih ukuran yang lebih besar.",
  "Bahan katun combed bisa menyusut ±2-3% setelah pencucian pertama.",
];

/* ──────────────────── Component ──────────────────── */

export default function PanduanUkuranPage() {
  const [activeTab, setActiveTab] = useState("kaos");

  return (
    <StaticPageShell
      title="Panduan Ukuran"
      subtitle="Temukan ukuran yang tepat untuk Anda. Pastikan kenyamanan dan kecocokan sempurna."
      breadcrumbs={[{ label: "Panduan Ukuran" }]}
      maxWidth="wide"
    >
      {/* ── Size Calculator ── */}
      <SizeCalculator />

      {/* ── Tab Switcher ── */}
      <div className="flex gap-3 mb-10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-7 py-3 rounded-full text-sm font-bold transition-all border ${
              activeTab === t.key
                ? "bg-mitologi-navy text-white border-mitologi-navy shadow-lg shadow-mitologi-navy/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-mitologi-navy/30 hover:text-mitologi-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── KAOS & JERSEY Tab ── */}
      {activeTab === "kaos" && (
        <section className="mb-16 animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* T-shirt illustration area */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 flex items-center justify-center aspect-square border border-slate-200/60">
                <div className="relative">
                  {/* Stylised T-shirt SVG */}
                  <svg
                    viewBox="0 0 200 220"
                    className="w-48 h-48 text-slate-300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60 30 L30 60 L50 70 L50 200 L150 200 L150 70 L170 60 L140 30 L120 50 C110 58 90 58 80 50 L60 30Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="white"
                    />
                    {/* Lebar Dada arrow */}
                    <line
                      x1="55"
                      y1="95"
                      x2="145"
                      y2="95"
                      stroke="#1e3a5f"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <polygon points="55,95 60,92 60,98" fill="#1e3a5f" />
                    <polygon points="145,95 140,92 140,98" fill="#1e3a5f" />
                    {/* Panjang arrow */}
                    <line
                      x1="100"
                      y1="40"
                      x2="100"
                      y2="195"
                      stroke="#1e3a5f"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <polygon points="100,40 97,45 103,45" fill="#1e3a5f" />
                    <polygon points="100,195 97,190 103,190" fill="#1e3a5f" />
                  </svg>
                  {/* Labels */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-mitologi-navy whitespace-nowrap shadow-sm border border-slate-100">
                    Lebar Dada
                  </span>
                  <span
                    className="absolute top-1/2 right-[-38px] -translate-y-1/2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-mitologi-navy writing-mode-vertical shadow-sm border border-slate-100"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Panjang
                  </span>
                </div>
              </div>
            </div>

            {/* Size table */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-mitologi-navy mb-2">
                Size Chart — {kaosJerseyData.title}
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-6">
                {kaosJerseyData.description}
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-mitologi-navy text-white">
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-left border-r border-white/10">
                        Size Chart
                      </th>
                      {kaosJerseyData.sizes.map((s) => (
                        <th
                          key={s}
                          className="px-5 py-4 text-center text-sm font-bold border-r border-white/10 last:border-r-0"
                        >
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {kaosJerseyData.measurements.map((m, i) => (
                      <tr
                        key={m}
                        className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                      >
                        <td className="px-5 py-4 text-sm font-bold text-slate-700 border-r border-slate-100 whitespace-nowrap">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-mitologi-navy/10 text-mitologi-navy font-extrabold text-xs flex items-center justify-center">
                              {m.includes("Panjang") ? "P" : "LD"}
                            </span>
                            {m}
                          </span>
                        </td>
                        {kaosJerseyData.values[
                          m as keyof typeof kaosJerseyData.values
                        ]!.map((v, j) => (
                          <td
                            key={j}
                            className="px-5 py-4 text-center text-sm font-semibold text-slate-600 border-r border-slate-100 last:border-r-0"
                          >
                            {v}{" "}
                            <span className="text-slate-400 text-xs">cm</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs font-medium text-slate-400 mt-3 px-1">
                * Toleransi ukuran ±1-2 cm. Semua ukuran dalam centimeter (cm).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── KEMEJA Tab ── */}
      {activeTab === "kemeja" && (
        <section className="mb-16 animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Kemeja illustration area */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 flex items-center justify-center aspect-square border border-slate-200/60">
                <div className="relative">
                  <svg
                    viewBox="0 0 200 240"
                    className="w-48 h-48 text-slate-300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Kemeja outline */}
                    <path
                      d="M70 25 L40 45 L25 110 L55 100 L55 220 L145 220 L145 100 L175 110 L160 45 L130 25 L115 45 C108 55 92 55 85 45 L70 25Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="white"
                    />
                    {/* Placket line */}
                    <line
                      x1="100"
                      y1="45"
                      x2="100"
                      y2="220"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    {/* Buttons */}
                    <circle cx="100" cy="70" r="2.5" fill="currentColor" />
                    <circle cx="100" cy="100" r="2.5" fill="currentColor" />
                    <circle cx="100" cy="130" r="2.5" fill="currentColor" />
                    <circle cx="100" cy="160" r="2.5" fill="currentColor" />
                    {/* Lebar arrow */}
                    <line
                      x1="58"
                      y1="110"
                      x2="142"
                      y2="110"
                      stroke="var(--color-mitologi-gold)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="58,110 63,107 63,113"
                      fill="var(--color-mitologi-gold)"
                    />
                    <polygon
                      points="142,110 137,107 137,113"
                      fill="var(--color-mitologi-gold)"
                    />
                    {/* Tinggi arrow */}
                    <line
                      x1="155"
                      y1="30"
                      x2="155"
                      y2="216"
                      stroke="var(--color-mitologi-gold)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="155,30 152,35 158,35"
                      fill="var(--color-mitologi-gold)"
                    />
                    <polygon
                      points="155,216 152,211 158,211"
                      fill="var(--color-mitologi-gold)"
                    />
                  </svg>
                  <span className="absolute top-[42%] left-1/2 -translate-x-1/2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-mitologi-navy shadow-sm border border-slate-100">
                    Lebar
                  </span>
                  <span
                    className="absolute top-1/2 right-[-24px] -translate-y-1/2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-mitologi-navy shadow-sm border border-slate-100"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Tinggi
                  </span>
                </div>
              </div>
            </div>

            {/* Tables */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-mitologi-navy mb-2">
                Size Chart — Kemeja
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-6">
                Ukuran untuk kemeja seragam dari TK hingga Dewasa.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {kemejaCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-mitologi-navy px-5 py-3">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        {cat.title}
                      </h3>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600">
                          <th className="px-4 py-2.5 text-xs font-bold uppercase text-left border-b border-r border-slate-200">
                            Size
                          </th>
                          <th className="px-4 py-2.5 text-xs font-bold uppercase text-center border-b border-r border-slate-200">
                            Lebar
                          </th>
                          <th className="px-4 py-2.5 text-xs font-bold uppercase text-center border-b border-slate-200">
                            Tinggi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.sizes.map((size, i) => (
                          <tr
                            key={size}
                            className={`border-b border-slate-100 last:border-0 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}
                          >
                            <td className="px-4 py-2.5 text-sm font-bold text-slate-800 border-r border-slate-100">
                              {size}
                            </td>
                            <td className="px-4 py-2.5 text-sm font-medium text-slate-600 text-center border-r border-slate-100">
                              {cat.lebar[i]} cm
                            </td>
                            <td className="px-4 py-2.5 text-sm font-medium text-slate-600 text-center">
                              {cat.tinggi[i]} cm
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-slate-400 mt-4 px-1">
                * Toleransi ukuran ±1-2 cm. Semua ukuran dalam centimeter (cm).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 my-10" />

      {/* ── Cara Mengukur ── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-mitologi-navy mb-3">
          Cara Mengukur
        </h2>
        <p className="text-sm font-medium text-slate-500 mb-8">
          Ikuti panduan berikut agar ukuran yang dipilih sesuai.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {measureGuide.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-100 bg-white p-6 text-center hover:border-mitologi-navy/30 hover:shadow-lg hover:-translate-y-1 transition-all shadow-sm"
            >
              <span className="absolute top-4 left-4 text-xs font-bold text-slate-400 bg-slate-50 w-6 h-6 rounded-full flex items-center justify-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="text-3xl mb-4 mt-2">{step.icon}</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-gray-100 my-10" />

      {/* ── Tips ── */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-mitologi-navy mb-3">
          Tips Memilih Ukuran
        </h2>
        <p className="text-sm font-medium text-slate-500 mb-8">
          Beberapa hal penting yang perlu diperhatikan.
        </p>
        <div className="space-y-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-mitologi-navy/20 transition-colors"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-slate-50 text-mitologi-navy text-sm font-bold flex items-center justify-center border border-slate-200">
                {i + 1}
              </span>
              <p className="text-sm font-medium text-slate-700 leading-relaxed pt-2.5">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mt-16 p-10 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl text-center shadow-xl shadow-mitologi-navy/5">
        <h3 className="text-2xl font-bold text-mitologi-navy mb-3">
          Masih ragu dengan ukuran?
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-8 max-w-md mx-auto">
          Konsultasikan langsung dengan tim kami untuk rekomendasi ukuran yang
          tepat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/6281322170902?text=Halo%2C%20saya%20ingin%20konsultasi%20ukuran`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-wa-green text-white hover:bg-wa-green-dark rounded-full text-sm font-bold transition-all shadow-lg shadow-wa-green/20"
          >
            Konsultasi via WhatsApp
          </a>
          <Link
            href="/kontak"
            className="px-6 py-3 bg-mitologi-navy text-white hover:bg-mitologi-navy-light rounded-full text-sm font-bold transition-all shadow-lg shadow-mitologi-navy/20 hover:shadow-mitologi-gold/20"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </StaticPageShell>
  );
}

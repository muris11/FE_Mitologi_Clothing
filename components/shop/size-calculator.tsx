"use client";

import { CalculatorIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function SizeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const calculateSize = (w: number, h: number) => {
    let sizeByWeight = "S";
    if (w < 50) sizeByWeight = "S";
    else if (w >= 50 && w < 60) sizeByWeight = "M";
    else if (w >= 60 && w < 75) sizeByWeight = "L";
    else if (w >= 75 && w < 85) sizeByWeight = "XL";
    else if (w >= 85 && w < 95) sizeByWeight = "XXL";
    else if (w >= 95 && w < 105) sizeByWeight = "3XL";
    else sizeByWeight = "4XL";

    let sizeByHeight = "S";
    if (h < 155) sizeByHeight = "S";
    else if (h >= 155 && h < 165) sizeByHeight = "M";
    else if (h >= 165 && h < 175) sizeByHeight = "L";
    else if (h >= 175 && h < 180) sizeByHeight = "XL";
    else if (h >= 180 && h < 185) sizeByHeight = "XXL";
    else if (h >= 185 && h < 190) sizeByHeight = "3XL";
    else sizeByHeight = "4XL";

    // A simple mapping to determine the larger size
    const sizeRank: Record<string, number> = {
      S: 1,
      M: 2,
      L: 3,
      XL: 4,
      XXL: 5,
      "3XL": 6,
      "4XL": 7,
    };

    const rankW = sizeRank[sizeByWeight] ?? 1;
    const rankH = sizeRank[sizeByHeight] ?? 1;

    // Pick the larger recommended size to ensure it fits
    const finalRank = Math.max(rankW, rankH);
    const finalSize = Object.keys(sizeRank).find(
      (key) => sizeRank[key] === finalRank,
    );

    return finalSize || "L";
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setRecommendation(null);
      return;
    }

    const rec = calculateSize(w, h);
    setRecommendation(rec);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-mitologi-navy/10 rounded-xl text-mitologi-navy">
          <CalculatorIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-mitologi-navy">
            Kalkulator Ukuran
          </h2>
          <p className="text-sm text-slate-500">
            Masukkan tinggi dan berat badan Anda untuk rekomendasi ukuran
            instan.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1">
          <form onSubmit={handleCalculate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="calc-height"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Tinggi Badan (cm)
                </label>
                <div className="relative">
                  <input
                    id="calc-height"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={height}
                    onChange={(e) =>
                      setHeight(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="Contoh: 170"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-slate-800 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] transition-all placeholder:text-slate-400 focus:border-mitologi-navy focus:bg-white focus:ring-2 focus:ring-mitologi-navy/10"
                    required
                    autoComplete="off"
                    aria-describedby="height-unit"
                  />
                  <span
                    id="height-unit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400"
                    aria-hidden="true"
                  >
                    cm
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="calc-weight"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Berat Badan (kg)
                </label>
                <div className="relative">
                  <input
                    id="calc-weight"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={weight}
                    onChange={(e) =>
                      setWeight(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="Contoh: 65"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-slate-800 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] transition-all placeholder:text-slate-400 focus:border-mitologi-navy focus:bg-white focus:ring-2 focus:ring-mitologi-navy/10"
                    required
                    autoComplete="off"
                    aria-describedby="weight-unit"
                  />
                  <span
                    id="weight-unit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400"
                    aria-hidden="true"
                  >
                    kg
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full sm:w-auto px-8 py-3.5 bg-mitologi-navy hover:bg-mitologi-navy-light text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
            >
              Hitung Rekomendasi
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="flex-1">
          {recommendation ? (
            <div className="h-full bg-gradient-to-br from-mitologi-navy to-mitologi-navy-light rounded-2xl p-6 text-white flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 shrink-0 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <span className="text-3xl font-black">{recommendation}</span>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold mb-1">
                  Rekomendasi Kami: Ukuran {recommendation}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Berdasarkan profil Anda ({height}cm, {weight}kg), kami
                  merekomendasikan ukuran{" "}
                  <strong className="text-white">{recommendation}</strong> agar
                  pakaian pas dan nyaman di badan Anda.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl text-slate-400">?</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Isi form di samping untuk mendapatkan rekomendasi ukuran Anda.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-slate-100">
        * Ini adalah estimasi ukuran standar. Bentuk tubuh setiap orang
        berbeda-beda. Pastikan Anda juga mengecek panduan ukuran lengkap pakaian
        di bawah.
      </p>
    </div>
  );
}

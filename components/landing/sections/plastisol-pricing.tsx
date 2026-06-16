"use client";

import { motion } from "framer-motion";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";

type PricingSettings = SiteSettings & {
  beranda?: {
    pricingPlastisolData?: any;
    pricingAddonsData?: any;
    pricingFeaturesData?: any[];
    pricingMinOrder?: string;
    pricingPlastisolSubtitle?: string;
    pricingExtraData?: any;
  };
};

function parseJson(raw: any, fallback: any[] = []) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return fallback; }
  }
  return fallback;
}

function CircularPricingCarousel({ items }: { items: any[] }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const animationFrameRef = useRef<number | null>(null);
  const lastMouseXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  
  // Responsive radius calculation
  const radius = isMobile 
    ? (items.length <= 4 ? 180 : items.length <= 6 ? 220 : 260)
    : (items.length <= 4 ? 320 : items.length <= 6 ? 380 : 440);
    
  const anglePerItem = 360 / items.length;

  useEffect(() => {
    const autoRotate = () => {
      if (!isDragging && !isHovered) {
        setRotation(prev => prev + 0.05);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDragging, isHovered]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseXRef.current = e.clientX;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - lastMouseXRef.current;
    setRotation(prev => prev + delta * 0.3);
    lastMouseXRef.current = e.clientX;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    lastMouseXRef.current = e.touches[0]!.clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0]!.clientX - lastMouseXRef.current;
    setRotation(prev => prev + delta * 0.3);
    lastMouseXRef.current = e.touches[0]!.clientX;
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[480px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing mt-4 sm:mt-0"
      style={{ perspective: isMobile ? "800px" : "1200px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setIsDragging(false); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
          transition: isDragging ? "none" : "transform 0.1s linear",
        }}
      >
        {items.map((pkg, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = ((rotation % 360) + 360) % 360;
          const relativeAngle = ((itemAngle + totalRotation) % 360);
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.15, 1 - (normalizedAngle / 180));
          const scale = isMobile ? (0.6 + (1 - normalizedAngle / 180) * 0.4) : (0.7 + (1 - normalizedAngle / 180) * 0.3);

          return (
            <div
              key={i}
              className="absolute w-[180px] sm:w-[240px] h-[280px] sm:h-[360px]"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                left: "50%",
                top: "50%",
                // Fix centering logic: use dynamic offsets or translate
                marginLeft: isMobile ? "-90px" : "-120px",
                marginTop: isMobile ? "-140px" : "-180px",
                opacity,
                transition: "opacity 0.3s linear, transform 0.3s ease-out",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="relative w-full h-full rounded-3xl shadow-xl overflow-hidden bg-white group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Image - full cover */}
                <div className="absolute inset-0 overflow-hidden">
                  {pkg.image ? (
                    <Image
                      src={storageUrl(pkg.image)}
                      alt={pkg.title || "Paket sablon"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-50">
                      <Image
                        src="/images/logo.png"
                        alt="Placeholder"
                        width={48}
                        height={48}
                        className="opacity-10 grayscale"
                      />
                    </div>
                  )}
                  {pkg.popular && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-mitologi-gold text-mitologi-navy px-3 py-1 rounded-full shadow-lg">
                        Populer
                      </span>
                    </div>
                  )}
                </div>

                {/* Content overlay - Clean & Clear */}
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-mitologi-navy/90 via-mitologi-navy/40 to-transparent backdrop-blur-[2px]">
                  <h3 className="text-xs sm:text-sm font-black text-white leading-tight mb-2 tracking-tight">
                    {pkg.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {pkg.short && (
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Pendek</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-mitologi-gold">Rp</span>
                          <span className="text-xs sm:text-sm font-black text-mitologi-gold">{pkg.short}K</span>
                        </div>
                      </div>
                    )}
                    {pkg.long && (
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Panjang</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-mitologi-gold">Rp</span>
                          <span className="text-xs sm:text-sm font-black text-mitologi-gold">{pkg.long}K</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PlastisolPricing({ settings }: { settings?: PricingSettings }) {
  const plastisolData = parseJson(settings?.beranda?.pricingPlastisolData).map(
    (item: any) => ({ ...item, minOrder: item.minOrder || item.min_order })
  );
  const addonsData = parseJson(settings?.beranda?.pricingAddonsData);
  const extraOptionsData = parseJson(settings?.beranda?.pricingExtraData);
  const features = parseJson(settings?.beranda?.pricingFeaturesData)
    .map((f: any) => f.text)
    .filter(Boolean);

  return (
    <section className="py-20 sm:py-28 bg-[#fafaf9] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mitologi-gold mb-3">
            Pricelist
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-mitologi-navy tracking-tight leading-tight mb-4">
            Sablon Plastisol
          </h2>
          <p className="text-base text-stone-500 leading-relaxed">
            {settings?.beranda?.pricingPlastisolSubtitle ||
              "Harga terbaik untuk kualitas premium. Garansi detailing dan ketepatan waktu."}
          </p>
        </div>

        {/* Feature tags - Clean & Natural */}
        {features.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-12">
            {features.map((feature: string, idx: number) => (
              <div key={idx} className="group">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-mitologi-navy/70 group-hover:text-mitologi-navy transition-colors duration-300 border-b border-transparent group-hover:border-mitologi-gold/30 pb-0.5">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 3D Circular Pricing Carousel */}
        {plastisolData.length > 0 && (
          <CircularPricingCarousel items={plastisolData} />
        )}

        {/* Add-ons & Catatan - More Natural Layout */}
        {(addonsData.length > 0 || extraOptionsData.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: Addons */}
              <div className="lg:col-span-8">
                <div className="flex flex-col items-center lg:items-start mb-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-mitologi-gold mb-2">
                    Layanan Tambahan
                  </p>
                  <h3 className="text-xl font-black text-mitologi-navy">
                    Add-ons & Ketentuan
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {addonsData.map((addon: any, idx: number) => {
                    const priceStr = addon.price?.toString().trim() || "";
                    const cleanPrice = priceStr.replace(/^\+\s*/i, "").replace(/\/pcs$/i, "").trim();
                    if (!addon.name) return null;
                    return (
                      <div key={idx} className="flex items-center justify-between group py-1">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-4 bg-mitologi-gold/20 group-hover:bg-mitologi-gold transition-all duration-300 rounded-full" />
                          <span className="text-sm font-bold text-mitologi-navy/80 group-hover:text-mitologi-navy transition-colors">{addon.name}</span>
                        </div>
                        {cleanPrice && (
                          <div className="flex items-baseline gap-1">
                            <span className="text-[10px] font-bold text-stone-400">Rp</span>
                            <span className="text-sm font-black text-mitologi-gold">{cleanPrice}</span>
                            <span className="text-[10px] font-bold text-stone-400">/pcs</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Extra Size & Notes */}
              <div className="lg:col-span-4 bg-stone-100/50 rounded-2xl p-6 sm:p-8">
                <div className="mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4">
                    Info Penting
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-mitologi-navy">
                      <span>Harga UK Dewasa</span>
                      <span className="text-mitologi-gold">Standard</span>
                    </div>
                    {extraOptionsData.map((opt: any, idx: number) => {
                      if (!opt.title) return null;
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs font-bold text-mitologi-navy pt-2">
                          <span>{opt.title}</span>
                          {opt.price && (
                            <span className="text-mitologi-gold">+{opt.price}K</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <p className="text-[10px] text-stone-400 leading-relaxed font-medium">
                  * Harga yang tertera adalah estimasi dasar. Final pricing dapat berubah sesuai tingkat kerumitan desain.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

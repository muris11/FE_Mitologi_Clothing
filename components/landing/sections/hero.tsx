"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroSlide } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero({ slides = [] }: { slides?: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Parallax effect for decorative orbs
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 500], [0, 100]);
  const orb2Y = useTransform(scrollY, [0, 500], [0, -100]);

  if (!slides || slides.length === 0) return null;

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  return (
    <div
      className="relative h-[95vh] min-h-[700px] w-full overflow-hidden bg-mitologi-navy"
      role="region"
      aria-label="Hero slideshow"
    >
      {/* Decorative Orbs with Parallax */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mitologi-gold/20 blur-[120px] rounded-full pointer-events-none z-10"
        style={{ y: orb1Y }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mitologi-navy-light/30 blur-[120px] rounded-full pointer-events-none z-10"
        style={{ y: orb2Y }}
      />

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0,
            visibility: index === currentSlide ? "visible" : "hidden",
          }}
        >
          {/* Background - Image or Navy Fallback */}
          <div
            className="absolute inset-0 transition-transform duration-[10000ms] ease-linear overflow-hidden"
            style={{
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
            }}
          >
            {slide.imageUrl ? (
              <>
                <Image
                  src={storageUrl(slide.imageUrl)}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Gradient Overlay for image readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-mitologi-navy/95 via-mitologi-navy/70 to-mitologi-navy/20" />
              </>
            ) : (
              /* Navy Blue Background Fallback */
              <div className="absolute inset-0 bg-mitologi-navy" />
            )}
          </div>

          <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center z-20">
            <motion.div
              className="max-w-2xl pt-24"
              initial={{ opacity: 0, y: 40 }}
              animate={
                index === currentSlide
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {/* Brand Badge */}
              <motion.div
                className="inline-flex items-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 backdrop-blur-md shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  index === currentSlide
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-xs font-bold font-sans tracking-widest text-white uppercase">
                  Mitologi Premium
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-[1.05] mb-6 drop-shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  index === currentSlide
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle / Description */}
              {slide.subtitle && (
                <motion.p
                  className="text-base md:text-lg text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    index === currentSlide
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slide.subtitle}
                </motion.p>
              )}

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-row items-center gap-3 w-full max-w-sm sm:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  index === currentSlide
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {slide.ctaText && (
                  <Button
                    asChild
                    size="lg"
                    variant="gold"
                    className="shadow-lg shadow-mitologi-gold/20 flex-1 sm:flex-none px-2 sm:px-6 text-xs sm:text-sm"
                  >
                    <Link href={slide.ctaLink || "/produk"}>
                      {slide.ctaText}
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/20 border-transparent shadow-none backdrop-blur-sm flex-1 sm:flex-none px-2 sm:px-6 text-xs sm:text-sm"
                >
                  <Link href="/tentang-kami">
                    <span className="mr-1 sm:mr-2">Tentang Kami</span>
                    <ArrowRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold ${
                  idx === currentSlide
                    ? "w-8 bg-mitologi-gold"
                    : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

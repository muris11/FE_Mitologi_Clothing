"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PrintingMethod } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { cn } from "lib/utils";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

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

export function PrintingMethods({ methods }: { methods?: PrintingMethod[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!methods || methods.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <AnimatedContainer className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-mitologi-gold mb-3">
            Eksplorasi Teknik Sablon
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-mitologi-navy text-balance">
            Pilih Sesuai Kebutuhan Anda
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Kami menyediakan berbagai teknik printing berkualitas tinggi, dari sablon manual legendaris hingga digital printing modern.
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3} className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Left: Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {methods.map((method, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={method.id}
                  className={cn(
                    "rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer",
                    isOpen
                      ? "border-mitologi-gold/30 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                  onClick={() => setOpenIndex(index)}
                >
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "flex-none w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300",
                        isOpen ? "bg-mitologi-navy text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className={cn(
                          "font-bold text-base transition-colors duration-300",
                          isOpen ? "text-mitologi-navy" : "text-slate-700"
                        )}>
                          {method.name}
                        </h3>
                        {method.priceRange && (
                          <span className="text-xs text-mitologi-gold font-medium">{method.priceRange}</span>
                        )}
                      </div>
                    </div>
                    <ChevronDownIcon className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180 text-mitologi-gold"
                    )} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          {/* Image inside accordion - mobile only */}
                          {method.image && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 mb-4 lg:hidden">
                              <Image
                                src={storageUrl(method.image)}
                                alt={method.name}
                                fill
                                sizes="100vw"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            {method.description}
                          </p>
                          {method.pros && method.pros.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-mitologi-gold mb-2">Keunggulan</p>
                              <ul className="space-y-1.5">
                                {method.pros.map((pro, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <CheckIcon className="w-3.5 h-3.5 text-mitologi-navy flex-shrink-0 mt-0.5" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky image - desktop only */}
          <div className="lg:col-span-2 sticky top-32 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200"
              >
                {methods[openIndex]?.image ? (
                  <Image
                    src={storageUrl(methods[openIndex].image)}
                    alt={methods[openIndex].name}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-300 text-sm">No image</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-sm font-bold text-white">{methods[openIndex]?.name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

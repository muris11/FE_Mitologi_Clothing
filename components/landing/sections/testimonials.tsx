"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import { SectionHeading } from "components/ui/section-heading";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";
import { Testimonial } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { motion } from "framer-motion";

export function Testimonials({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  if (!testimonials || testimonials.length === 0) return null;

  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <MotionSection className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Testimoni"
            title="Kata Mereka Tentang Mitologi"
            className="items-center"
          />
        </div>

        <div
          className="flex justify-center gap-5 overflow-hidden"
          style={{
            maxHeight: "740px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        >
          <TestimonialColumn testimonials={col1} duration={22} />
          <TestimonialColumn
            testimonials={col2}
            duration={28}
            className="hidden md:block"
          />
          <TestimonialColumn
            testimonials={col3}
            duration={25}
            className="hidden lg:block"
          />
        </div>
      </div>
    </MotionSection>
  );
}

function TestimonialColumn({
  testimonials,
  duration = 20,
  className = "",
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden flex-1 max-w-[320px] ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5"
      >
        {doubled.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.id}-${i}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Stars + content */}
      <div>
        <div className="flex gap-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "text-mitologi-gold" : "text-slate-200"}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <blockquote className="text-slate-700 font-sans font-medium text-[15px] leading-relaxed min-h-[80px]">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>
      </div>

      {/* Author */}
      <div className="mt-5 flex items-center gap-x-3 pt-4 border-t border-slate-100">
        {testimonial.avatarUrl ? (
          <Image
            src={storageUrl(testimonial.avatarUrl)}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-slate-50 border-2 border-slate-100 object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-mitologi-navy text-white flex items-center justify-center font-bold font-sans tracking-wide text-sm border-2 border-white shadow-sm">
            {testimonial.name[0]}
          </div>
        )}
        <div>
          <div className="font-sans font-bold text-sm text-mitologi-navy tracking-tight">
            {testimonial.name}
          </div>
          <div className="text-slate-500 text-xs font-sans font-medium mt-0.5">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

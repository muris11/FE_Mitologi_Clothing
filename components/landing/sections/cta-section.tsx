import { CtaData } from "lib/api/types";
import Link from "next/link";
import { MotionSection } from "components/ui/motion";

export function CTASection({ cta }: { cta?: CtaData }) {
  // Default fallback if no CTA data
  const title = cta?.title || "";
  const subtitle = cta?.subtitle || "";
  const buttonText = cta?.buttonText || "";
  const buttonLink = cta?.buttonLink || "#";

  return (
    <MotionSection className="bg-white relative overflow-hidden py-24 sm:py-32">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-mitologi-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-mitologi-navy/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center">
        <div className="mx-auto max-w-3xl text-center bg-white border border-slate-100/50 rounded-3xl p-10 md:p-16 shadow-soft hover:shadow-hover transition-shadow duration-500 relative overflow-hidden group">
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-50/50 pointer-events-none" />

          <h2 className="relative z-10 text-4xl lg:text-5xl font-sans font-extrabold text-mitologi-navy tracking-tight leading-tight group-hover:text-mitologi-gold transition-colors duration-500">
            {title}
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-slate-500 font-medium font-sans">
            {subtitle}
          </p>
          <div className="relative z-10 mt-10 flex items-center justify-center gap-x-6">
            {buttonText && (
              <Link
                href={buttonLink}
                className="inline-flex items-center justify-center rounded-full bg-mitologi-gold px-8 py-4 text-sm font-bold font-sans tracking-wide text-mitologi-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#E5AA28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mitologi-gold"
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

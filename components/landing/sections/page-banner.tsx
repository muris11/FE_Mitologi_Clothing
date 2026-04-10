"use client";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageBanner({ title, subtitle, image }: PageBannerProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] max-h-[400px] w-full bg-mitologi-navy flex items-center justify-center overflow-hidden border-b border-slate-200/20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

      {/* Background Image (Optional) */}
      {image && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mitologi-navy/80 to-mitologi-navy z-0" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6 tracking-tight drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto drop-shadow-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

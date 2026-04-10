"use client";

export function SubpageHero({
  title,
  subtitle,
  badge,
  badgeText,
}: {
  title: string;
  subtitle?: string;
  badge?: boolean;
  badgeText?: string;
}) {
  return (
    <section className="relative h-[40vh] min-h-[380px] max-h-[480px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-200/20">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

      <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {badge && (
            <div className="inline-flex items-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-md shadow-sm">
              <span className="text-xs font-bold font-sans tracking-widest text-mitologi-gold uppercase">
                {badgeText || title}
              </span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-sans font-extrabold text-white tracking-tight mb-4 drop-shadow-sm leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-sans font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

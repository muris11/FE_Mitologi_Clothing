import { Skeleton } from "components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-mitologi-navy"
      role="region"
      aria-label="Loading hero"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mitologi-gold/20 blur-[120px] rounded-full pointer-events-none z-10" />

      {/* Background/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-mitologi-navy/95 via-mitologi-navy/70 to-mitologi-navy/20" />

      {/* Content Container */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-8 flex items-center z-20">
        <div className="max-w-3xl pt-24">
          {/* Brand Badge */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 backdrop-blur-md shadow-lg">
            <Skeleton className="h-4 w-32 bg-white/10 rounded-full" />
          </div>

          {/* Main Title */}
          <div className="mb-6 space-y-3">
            <Skeleton className="h-10 md:h-14 lg:h-16 w-[95%] max-w-3xl bg-white/10 rounded-xl" />
            <Skeleton className="h-10 md:h-14 lg:h-16 w-3/4 max-w-2xl bg-white/10 rounded-xl" />
          </div>

          {/* Subtitle / Description */}
          <div className="mb-10 max-w-2xl space-y-2.5">
            <Skeleton className="h-5 md:h-6 w-full bg-white/10 rounded-md" />
            <Skeleton className="h-5 md:h-6 w-5/6 bg-white/10 rounded-md" />
            <Skeleton className="h-5 md:h-6 w-2/3 bg-white/10 rounded-md" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-3 w-full max-w-sm sm:max-w-none">
            <Skeleton className="h-14 flex-1 sm:flex-none sm:w-[150px] rounded-full bg-mitologi-gold/30" />
            <Skeleton className="h-14 flex-1 sm:flex-none sm:w-[180px] rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

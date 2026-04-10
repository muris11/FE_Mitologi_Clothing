import { Skeleton } from "components/ui/skeleton";

export function SubpageHeroSkeleton({
  badge,
  titleLines = 1,
  subtitleLines = 1,
}: {
  badge?: boolean;
  titleLines?: number;
  subtitleLines?: number;
} = {}) {
  return (
    <section className="relative h-[40vh] min-h-[380px] max-h-[480px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-200/20">
      {/* Decorative Blur Orbs - Match exact design */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

      <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {/* Badge Skeleton - Match exact design */}
          {badge && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-md shadow-sm">
                <Skeleton className="h-4 w-32 bg-white/10 rounded-full" />
              </div>
            </div>
          )}

          {/* Title Skeleton - Match exact font sizes */}
          <div className="space-y-3">
            <Skeleton className="mx-auto h-9 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-3/4 max-w-3xl bg-white/10 rounded-xl" />
          </div>

          {/* Subtitle Skeleton - Match exact font sizes */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="mx-auto h-4 sm:h-5 md:h-6 w-full bg-white/10 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}

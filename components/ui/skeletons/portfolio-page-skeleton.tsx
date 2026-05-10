import { Skeleton } from "components/ui/skeleton";
import { SubpageHeaderSkeleton } from "./subpage-header-skeleton";

export function PortfolioPageSkeleton() {
  return (
    <>
      <SubpageHeaderSkeleton />

      <section className="relative bg-slate-50 py-24 sm:py-32">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] z-10">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden mx-4 lg:mx-8">
            {/* Desktop 3D overlapping layout */}
            <div className="hidden md:block relative overflow-visible h-[500px]">
              <div className="flex -space-x-24 md:-space-x-32 pb-8 pt-16 items-end justify-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const middle = 2;
                  const dist = Math.abs(i - middle);
                  const height = 120 - dist * 20;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 w-[260px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100"
                      style={{
                        height: `${280 + height}px`,
                        marginBottom: `${height}px`,
                        zIndex: 5 - dist,
                      }}
                    >
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile grid fallback */}
            <div className="md:hidden grid grid-cols-2 gap-3 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100"
                >
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

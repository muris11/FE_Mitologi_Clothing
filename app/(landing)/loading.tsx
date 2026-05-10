import { Skeleton } from "components/ui/skeleton";
import { HeroSkeleton } from "components/ui/skeletons/hero-skeleton";
import { NewArrivalsSkeleton } from "components/landing/sections/new-arrivals";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />

      {/* About Section - lg:grid-cols-12, left image col-5, right content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <Skeleton className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl" />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-8 sm:h-10 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plastisol Pricing placeholder */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto mb-4" />
            <Skeleton className="h-4 w-2/3 rounded mx-auto" />
          </div>
          <Skeleton className="h-64 w-full max-w-4xl mx-auto rounded-2xl" />
        </div>
      </section>

      {/* Category Pricelist */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto" />
          </div>
          <Skeleton className="h-80 w-full max-w-4xl mx-auto rounded-2xl" />
        </div>
      </section>

      {/* New Arrivals x2 */}
      <NewArrivalsSkeleton />
      <NewArrivalsSkeleton />

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto mb-4" />
            <Skeleton className="h-4 w-2/3 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Material Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Order Flow */}
      <section className="py-16 sm:py-24 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="relative bg-slate-50 py-24 sm:py-32">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-[1440px] z-10">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden mx-4 lg:mx-8">
            <div className="text-center pt-16 pb-8 px-8">
              <Skeleton className="h-3 w-20 rounded-full mx-auto mb-3" />
              <Skeleton className="h-8 sm:h-10 w-2/3 rounded mx-auto mb-4" />
              <Skeleton className="h-4 w-1/2 rounded mx-auto" />
            </div>
            <div className="hidden md:block relative h-[500px]">
              <div className="flex -space-x-24 md:-space-x-32 pb-8 pt-16 items-end justify-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const dist = Math.abs(i - 2);
                  const height = 120 - dist * 20;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 w-[260px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200"
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
            <div className="md:hidden grid grid-cols-2 gap-3 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-3 w-28 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-1/2 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-mitologi-navy">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Skeleton className="h-8 sm:h-10 w-3/4 rounded mx-auto mb-4 bg-white/10" />
          <Skeleton className="h-4 w-2/3 rounded mx-auto mb-8 bg-white/10" />
          <Skeleton className="h-12 w-40 rounded-full mx-auto bg-white/10" />
        </div>
      </section>
    </>
  );
}

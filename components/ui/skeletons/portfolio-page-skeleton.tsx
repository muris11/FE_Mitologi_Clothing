import { Skeleton } from "components/ui/skeleton";

export function PortfolioPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton - Portofolio Kami */}
      <section className="relative h-[40vh] min-h-[380px] max-h-[480px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-200/20">
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

        <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex justify-center">
              <Skeleton className="h-4 w-32 bg-white/10 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="mx-auto h-9 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-3/4 max-w-3xl bg-white/10 rounded-xl" />

            {/* Subtitle */}
            <Skeleton className="mx-auto h-4 sm:h-5 md:h-6 w-5/6 max-w-2xl bg-white/10 rounded-md" />
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Skeleton */}
      <section className="relative bg-slate-50 py-24 sm:py-32 border-t border-slate-200/50 overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-mitologi-navy/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-slate-100 group shadow-sm border border-slate-200 aspect-square sm:aspect-[4/3]"
              >
                {/* Image Placeholder */}
                <Skeleton className="absolute inset-0 w-full h-full bg-slate-200" />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <Skeleton className="h-6 sm:h-8 w-3/4 bg-slate-300/50 rounded mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-slate-300/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

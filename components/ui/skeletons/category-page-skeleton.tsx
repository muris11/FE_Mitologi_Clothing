import { Skeleton } from "components/ui/skeleton";

export function CategoryPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton - Kategori Produk */}
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

      {/* Category Grid Skeleton */}
      <section className="relative bg-slate-50 overflow-hidden border-t border-slate-200/50 py-8">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-soft"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-slate-100">
                  {/* Fallback Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-16 h-16 bg-slate-200 rounded" />
                  </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/95 via-mitologi-navy/40 to-black/10 opacity-90" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <Skeleton className="h-6 sm:h-8 w-3/4 bg-slate-300/50 rounded mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-slate-300/50 rounded mb-4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20 bg-slate-400/50 rounded" />
                    <Skeleton className="w-4 h-4 bg-slate-400/50 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { Skeleton } from "components/ui/skeleton";

export function TentangKamiPageSkeleton() {
  return (
    <>
      {/* AboutPageHero Skeleton - matches flex items-end layout */}
      <section className="relative flex items-end overflow-hidden bg-white pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full text-center">
          <Skeleton className="h-3 w-28 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4 mx-auto mb-4 rounded-xl" />
          <Skeleton className="h-4 sm:h-5 w-2/3 mx-auto rounded-md max-w-xl" />
        </div>
      </section>

      {/* History Section - flex row layout */}
      <section className="relative overflow-hidden">
        <div className="relative pb-24 sm:pb-32 bg-slate-50">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-24">
              {/* Text Side */}
              <div className="max-w-lg text-center md:text-left">
                <Skeleton className="h-5 w-48 rounded mb-2 mx-auto md:mx-0" />
                <Skeleton className="h-[3px] w-24 rounded-full mb-8 mx-auto md:mx-0" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-4/6 rounded" />
                </div>
              </div>

              {/* Image Side */}
              <Skeleton className="max-w-md w-full aspect-square rounded-2xl shrink-0" />
            </div>

            {/* Logo Meanings Grid */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Skeleton className="h-3 w-32 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 sm:h-10 w-3/4 rounded mx-auto mb-6" />
              <Skeleton className="h-4 w-full rounded max-w-md mx-auto" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm border border-slate-200"
                >
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-5/6 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="relative py-24 sm:py-32 bg-mitologi-cream overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Skeleton className="w-full aspect-[4/5] max-w-xs sm:max-w-sm mx-auto lg:mx-0 rounded-[2rem]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-1 w-12 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
              <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 rounded mb-8" />
              <div className="space-y-4 mb-10">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-4/6 rounded" />
              </div>
              <div className="pt-8 border-t border-slate-200/60">
                <Skeleton className="h-6 w-32 rounded mb-1" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Skeleton className="h-7 w-28 rounded-full mx-auto mb-6" />
            <Skeleton className="h-6 sm:h-8 md:h-10 w-full rounded mb-4 mx-auto" />
            <Skeleton className="h-6 sm:h-8 md:h-10 w-5/6 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 p-8 sm:p-10 lg:p-12 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <Skeleton className="h-6 w-32 rounded" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Facilities */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-slate-200/50">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Skeleton className="h-3 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mx-auto mb-6" />
            <Skeleton className="h-4 w-full rounded max-w-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-[300px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-200 ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
              >
                <Skeleton className="absolute inset-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Legality */}
      <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-3 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mx-auto mb-6" />
            <Skeleton className="h-4 w-full rounded max-w-md mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-slate-200/50">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-3 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mx-auto mb-6" />
            <Skeleton className="h-4 w-full rounded max-w-md mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-24 h-24 md:w-40 md:h-40 rounded-2xl" />
                <div className="mt-4 text-center">
                  <Skeleton className="h-5 w-24 rounded mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

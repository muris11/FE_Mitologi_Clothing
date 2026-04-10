import { Skeleton } from "components/ui/skeleton";

export function LayananPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton - Layanan Produksi */}
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

      {/* Services Detail Section Skeleton */}
      <section className="relative py-24 sm:py-32 bg-slate-50 border-y border-slate-200/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="space-y-24">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Text Side */}
                <div className="flex-1 space-y-6">
                  <Skeleton className="inline-block px-4 py-1.5 bg-white border border-slate-100 rounded-full h-8 w-32" />
                  <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 bg-slate-200 rounded" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                    {/* Materials */}
                    <div>
                      <Skeleton className="h-3 w-20 bg-slate-200 rounded mb-4" />
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full bg-slate-100 rounded flex items-center gap-3" />
                        <Skeleton className="h-4 w-5/6 bg-slate-100 rounded flex items-center gap-3" />
                        <Skeleton className="h-4 w-4/6 bg-slate-100 rounded flex items-center gap-3" />
                      </div>
                    </div>
                    {/* Features */}
                    <div>
                      <Skeleton className="h-3 w-20 bg-slate-200 rounded mb-4" />
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full bg-slate-100 rounded flex items-center gap-3" />
                        <Skeleton className="h-4 w-5/6 bg-slate-100 rounded flex items-center gap-3" />
                        <Skeleton className="h-4 w-3/4 bg-slate-100 rounded flex items-center gap-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-200 border border-slate-100 shadow-lg">
                    <Skeleton className="w-full h-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricelist Skeleton */}
      <section className="relative py-24 sm:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-mitologi-navy/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-32 bg-slate-200 rounded-full mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mb-6" />
            <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-xl" />
          </div>

          {/* Tabs Container */}
          <div className="group max-w-4xl mx-auto bg-white rounded-2xl md:rounded-[2rem] shadow-sm overflow-hidden border border-slate-200">
            {/* Tabs Header */}
            <div className="relative border-b border-slate-100 bg-slate-50/50">
              <div className="flex overflow-x-auto scrollbar-hide">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-4 md:py-5 px-6 md:px-8 min-h-[56px] text-[13px] sm:text-base font-bold uppercase tracking-wider whitespace-nowrap border-b-2 flex-shrink-0 sm:flex-1 text-center"
                  >
                    <Skeleton className="h-5 w-24 md:w-32 bg-slate-200 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-10">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
                  >
                    <Skeleton className="h-5 w-1/3 bg-slate-200 rounded" />
                    <Skeleton className="h-6 w-24 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printing Methods Skeleton */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-mitologi-gold/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-40 bg-slate-200 rounded-full mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mb-6" />
            <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-[1440px] mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="group flex flex-col bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm relative"
              >
                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-slate-200 border border-white/10" />

                {/* Image Header */}
                <div className="relative w-full aspect-square sm:aspect-auto sm:h-64 bg-slate-100 overflow-hidden">
                  <Skeleton className="w-full h-full bg-slate-200" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4 bg-slate-200 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                    <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                    <Skeleton className="h-4 w-4/6 bg-slate-100 rounded" />
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

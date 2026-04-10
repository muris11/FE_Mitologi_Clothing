import { Skeleton } from "components/ui/skeleton";

export function TentangKamiPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton - Tentang Kami */}
      <section className="relative h-[40vh] min-h-[380px] max-h-[480px] flex items-center justify-center overflow-hidden bg-mitologi-navy border-b border-slate-200/20">
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mitologi-gold/20 rounded-full blur-[100px] -translate-y-1/2 -z-0" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-mitologi-navy-light/50 rounded-full blur-[100px] translate-y-1/2 -z-0" />

        <div className="relative z-10 text-center px-4 pt-20 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex justify-center">
              <Skeleton className="h-4 w-40 bg-white/10 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="mx-auto h-9 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-3/4 max-w-3xl bg-white/10 rounded-xl" />

            {/* Subtitle */}
            <Skeleton className="mx-auto h-4 sm:h-5 md:h-6 w-5/6 max-w-2xl bg-white/10 rounded-md" />
          </div>
        </div>
      </section>

      {/* History Section Skeleton */}
      <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Content Side */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5 w-fit">
                <Skeleton className="h-3 w-32 bg-slate-200 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 bg-slate-200 rounded mb-8" />

              {/* Timeline with dots */}
              <div className="relative space-y-8 pl-8 sm:pl-10">
                <div className="absolute top-2 bottom-0 left-[11px] w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent" />

                {/* Descriptions */}
                <div className="space-y-5">
                  <div className="absolute left-[7px] top-[6px] w-[9px] h-[9px] rounded-full bg-slate-300 ring-4 ring-white" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>

                {/* History */}
                <div className="space-y-5 pt-4">
                  <div className="absolute left-[7px] mt-[6px] w-[9px] h-[9px] rounded-full bg-slate-300 ring-4 ring-white" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-4/6 bg-slate-100 rounded" />
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 xl:col-span-6 mt-10 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                {/* Accent Backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-100/5 rounded-[2.5rem] transform translate-x-3 translate-y-3 sm:translate-x-6 sm:translate-y-6" />
                <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] transform -translate-x-3 -translate-y-3 sm:-translate-x-6 sm:-translate-y-6 bg-white/50" />

                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl flex items-center justify-center z-10 border border-slate-100">
                  <Skeleton className="w-3/4 h-3/4 bg-slate-200 rounded" />

                  {/* Floating Badge */}
                  <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 bg-white/95 backdrop-blur shadow-lg border border-slate-100 px-5 sm:px-6 py-3 sm:py-4 rounded-2xl">
                    <Skeleton className="h-3 w-20 bg-slate-200 rounded mb-1" />
                    <Skeleton className="h-5 w-12 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Meanings Grid */}
          <div className="mt-24 sm:mt-32 pt-20 border-t border-slate-200/60">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Skeleton className="h-3 w-32 bg-slate-200 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mx-auto mb-6" />
              <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-md mx-auto" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm border border-slate-200 overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-200" />
                    <Skeleton className="h-6 w-8 bg-slate-100 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full bg-slate-100 rounded" />
                    <Skeleton className="h-3 w-5/6 bg-slate-100 rounded" />
                    <Skeleton className="h-3 w-4/6 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Skeleton */}
      <section className="relative py-24 sm:py-32 bg-mitologi-cream overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-white rounded-full opacity-50 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo Side */}
            <div className="relative">
              <div className="relative w-full aspect-[4/5] max-w-xs sm:max-w-sm mx-auto lg:max-w-sm lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 translate-x-4 translate-y-4 bg-slate-200">
                <Skeleton className="w-full h-full bg-slate-200" />
              </div>
              <div className="absolute inset-0 bg-slate-300 rounded-[2rem] translate-x-0 translate-y-0 z-0" />

              {/* Floating Badge */}
              <div className="absolute bottom-12 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 transform -rotate-3">
                <Skeleton className="h-8 w-12 bg-slate-200 rounded mb-1" />
                <Skeleton className="h-3 w-20 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-1 w-12 bg-slate-300 rounded" />
                <Skeleton className="h-3 w-24 bg-slate-200 rounded" />
              </div>

              <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 bg-slate-200 rounded mb-8" />

              <div className="relative mb-10">
                <div className="absolute -top-6 -left-4 text-7xl text-slate-200 font-serif leading-none italic pointer-events-none opacity-50 z-0">
                  "
                </div>
                <div className="relative z-10 space-y-4">
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-4/6 bg-slate-100 rounded" />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200/60 flex items-center gap-6">
                <div>
                  <Skeleton className="h-6 w-32 bg-slate-200 rounded mb-1" />
                  <Skeleton className="h-3 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Skeleton */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-mitologi-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          {/* Vision */}
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-24">
            <div className="inline-flex items-center gap-3 mb-6 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5">
              <Skeleton className="h-3 w-24 bg-slate-200 rounded-full" />
            </div>

            <blockquote className="relative px-10 sm:px-16">
              <span className="absolute top-0 left-0 text-7xl sm:text-8xl font-serif text-slate-200 leading-[0.8] select-none">
                "
              </span>
              <Skeleton className="h-6 sm:h-8 md:h-10 w-full bg-slate-100 rounded mb-4" />
              <Skeleton className="h-6 sm:h-8 md:h-10 w-5/6 bg-slate-100 rounded mx-auto" />
            </blockquote>
          </div>

          {/* Mission & Values Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 p-8 sm:p-10 lg:p-12 shadow-soft border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="w-12 h-12 rounded-2xl bg-slate-200" />
                  <Skeleton className="h-6 w-32 bg-slate-200 rounded" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                  <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Facilities Skeleton */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-slate-200/50">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-32 bg-slate-200 rounded-full mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mb-6" />
            <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto auto-rows-[300px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl bg-slate-100 shadow-soft border border-slate-200 ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
              >
                <Skeleton className="absolute inset-0 bg-slate-200" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <Skeleton className="h-6 w-3/4 bg-slate-300/50 rounded mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-slate-300/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Legality Skeleton */}
      <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-mitologi-navy/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-3 w-32 bg-slate-200 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mx-auto mb-6" />
            <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-slate-200 rounded" />
                    <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                    <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Structure Skeleton */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-slate-200/50">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-3 w-32 bg-slate-200 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-slate-200 rounded mx-auto mb-6" />
            <Skeleton className="h-4 w-full bg-slate-100 rounded max-w-md mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton
                  className={`rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white ${i === 0 ? "w-32 md:w-64 h-32 md:h-64" : "w-24 md:w-48 h-24 md:h-48"}`}
                />
                <div className="mt-4 text-center">
                  <Skeleton className="h-5 w-24 bg-slate-200 rounded mx-auto mb-1" />
                  <Skeleton className="h-3 w-16 bg-slate-100 rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

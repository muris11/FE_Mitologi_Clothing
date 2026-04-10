import { Skeleton } from "components/ui/skeleton";

export function KontakPageSkeleton() {
  return (
    <>
      {/* Hero Skeleton - Hubungi Kami */}
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

      {/* Contact Section Skeleton */}
      <section className="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            {/* Left: Info Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-white border border-slate-200 shadow-sm rounded-full py-2 px-5 w-fit">
                <Skeleton className="h-3 w-32 bg-slate-200 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 bg-slate-200 rounded mb-8" />

              {/* Timeline Description */}
              <div className="relative mb-12">
                <div className="absolute top-2 bottom-0 left-[11px] w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent" />
                <div className="pl-8 sm:pl-10 relative">
                  <div className="absolute left-[7px] top-[6px] w-[9px] h-[9px] rounded-full bg-slate-300 ring-4 ring-white" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full bg-slate-100 rounded" />
                    <Skeleton className="h-4 w-5/6 bg-slate-100 rounded" />
                    <Skeleton className="h-4 w-4/6 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="relative group bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="relative z-10 space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-5 items-start">
                      <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-200 shrink-0" />
                      <div className="pt-0.5 space-y-2">
                        <Skeleton className="h-3 w-24 bg-slate-200 rounded" />
                        <Skeleton className="h-4 w-40 bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jam Operasional Card */}
              <div className="relative group bg-mitologi-navy rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 shadow-sm border border-transparent overflow-hidden mt-6">
                <div className="absolute -right-6 -top-6 text-white/5">
                  <Skeleton className="w-32 h-32 rounded-full bg-white/5" />
                </div>

                <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-600" />
                  <Skeleton className="h-6 w-32 bg-slate-600 rounded" />
                </div>

                <ul className="space-y-4 relative z-10 pl-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <Skeleton className="h-4 w-24 bg-slate-600 rounded" />
                      </div>
                      <Skeleton className="h-5 w-32 bg-slate-600 rounded" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="flex gap-3 mt-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-10 h-10 rounded-full bg-slate-200 border border-slate-100"
                  />
                ))}
              </div>
            </div>

            {/* Right: Form & Map */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="w-10 h-10 rounded-xl bg-slate-200" />
                  <Skeleton className="h-6 w-40 bg-slate-200 rounded" />
                </div>

                <div className="space-y-5">
                  <div>
                    <Skeleton className="h-4 w-20 bg-slate-200 rounded mb-2" />
                    <Skeleton className="h-11 w-full bg-slate-100 rounded-xl" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 bg-slate-200 rounded mb-2" />
                    <Skeleton className="h-11 w-full bg-slate-100 rounded-xl" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 bg-slate-200 rounded mb-2" />
                    <Skeleton className="h-28 w-full bg-slate-100 rounded-xl" />
                  </div>
                  <Skeleton className="h-12 w-full sm:w-auto px-8 bg-mitologi-navy rounded-full" />
                </div>
              </div>

              {/* Maps Embed */}
              <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-slate-200 border border-slate-100 shadow-lg">
                <Skeleton className="w-full h-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

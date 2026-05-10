import { Skeleton } from "components/ui/skeleton";
import { SubpageHeaderSkeleton } from "./subpage-header-skeleton";

export function LayananPageSkeleton() {
  return (
    <>
      <SubpageHeaderSkeleton />

      {/* Services Detail */}
      <section className="relative py-24 sm:py-32 bg-slate-50 border-y border-slate-200/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="space-y-24">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 space-y-6">
                  <Skeleton className="h-8 w-32 rounded-full" />
                  <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                    <div className="space-y-3">
                      <Skeleton className="h-3 w-20 rounded mb-4" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded" />
                      <Skeleton className="h-4 w-4/6 rounded" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-3 w-20 rounded mb-4" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <Skeleton className="w-full aspect-video rounded-[2rem]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricelist */}
      <section className="relative py-24 sm:py-32 bg-slate-50 border-t border-slate-200/50 overflow-hidden">
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-32 rounded-full mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mb-6" />
            <Skeleton className="h-4 w-full rounded max-w-xl" />
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-[2rem] shadow-sm overflow-hidden border border-slate-200">
            <div className="border-b border-slate-100 bg-slate-50/50">
              <div className="flex overflow-x-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-4 md:py-5 px-6 md:px-8 flex-shrink-0 sm:flex-1 text-center"
                  >
                    <Skeleton className="h-5 w-24 md:w-32 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-10 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
                >
                  <Skeleton className="h-5 w-1/3 rounded" />
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Printing Methods */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-40 rounded-full mb-4" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mb-6" />
            <Skeleton className="h-4 w-full rounded max-w-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm"
              >
                <Skeleton className="w-full aspect-square sm:h-64" />
                <div className="flex-1 p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-4/6 rounded" />
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

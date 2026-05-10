import { Skeleton } from "components/ui/skeleton";
import { SubpageHeaderSkeleton } from "./subpage-header-skeleton";

export function KontakPageSkeleton() {
  return (
    <>
      <SubpageHeaderSkeleton />

      <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <Skeleton className="h-3 w-16 rounded-full mb-3" />
            <Skeleton className="h-8 sm:h-10 w-3/4 rounded mb-4" />
            <Skeleton className="h-4 w-full rounded max-w-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div>
                  <Skeleton className="w-11 h-11 rounded-xl mb-5" />
                  <Skeleton className="h-4 w-24 rounded mb-1.5" />
                  <Skeleton className="h-3.5 w-40 rounded mb-4" />
                </div>
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            ))}

            <div className="flex flex-col rounded-2xl border border-slate-200 bg-mitologi-navy p-7 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <Skeleton className="w-11 h-11 rounded-xl bg-white/10" />
                <Skeleton className="h-4 w-28 rounded bg-white/10" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4">
                  <Skeleton className="h-4 w-24 rounded bg-white/10" />
                  <Skeleton className="h-4 w-32 rounded bg-white/10" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4">
                  <Skeleton className="h-4 w-20 rounded bg-white/10" />
                  <Skeleton className="h-4 w-36 rounded bg-white/10" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <Skeleton className="h-3 w-24 rounded mb-4" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-11 h-11 rounded-xl"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 bg-slate-50 border-b border-slate-200">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
            <Skeleton className="w-full h-[320px] sm:h-[400px]" />
          </div>
        </div>
      </section>
    </>
  );
}

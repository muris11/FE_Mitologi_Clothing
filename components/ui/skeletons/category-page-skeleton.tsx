import { Skeleton } from "components/ui/skeleton";
import { SubpageHeaderSkeleton } from "./subpage-header-skeleton";

export function CategoryPageSkeleton() {
  return (
    <>
      <SubpageHeaderSkeleton />

      <section className="relative bg-white overflow-hidden py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100"
              >
                <Skeleton className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-10">
                  <Skeleton className="h-4 sm:h-5 w-3/4 bg-white/30 rounded mb-1.5" />
                  <Skeleton className="h-3 w-1/2 bg-white/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

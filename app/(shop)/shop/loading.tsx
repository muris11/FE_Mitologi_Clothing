import { Skeleton } from "components/ui/skeleton";
import { ProductGridSkeleton } from "components/shop/product-card-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <Skeleton className="h-8 w-48 rounded mb-2" />
            <Skeleton className="h-4 w-72 rounded" />
          </div>
          <Skeleton className="h-10 w-full lg:w-[360px] rounded-lg" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="flex gap-10">
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-3 w-16 rounded mb-3" />
                <div className="space-y-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-md" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-3 w-12 rounded mb-3" />
                <div className="space-y-3">
                  <Skeleton className="h-9 w-full rounded-lg" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="hidden lg:block h-8 w-40 rounded" />
            </div>
            <ProductGridSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

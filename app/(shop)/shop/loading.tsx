import { ProductGridSkeleton } from "components/shop/product-card-skeleton";

export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-8 pb-4">
        <div className="h-10 w-64 bg-slate-200 animate-pulse rounded mb-2"></div>
        <div className="h-5 w-48 bg-slate-200 animate-pulse rounded"></div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pb-24 pt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Skeleton */}
          <div className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-slate-200 animate-pulse rounded mb-6"></div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-slate-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div className="w-32 h-5 bg-slate-200 animate-pulse rounded"></div>
              <div className="hidden lg:block w-48 h-8 bg-slate-200 animate-pulse rounded"></div>
            </div>
            <ProductGridSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

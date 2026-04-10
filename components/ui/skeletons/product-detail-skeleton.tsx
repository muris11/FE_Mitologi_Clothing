import { Skeleton } from "components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <>
      {/* Breadcrumb Section Skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 bg-slate-200 rounded-full" />
            <Skeleton className="h-4 w-4 bg-slate-200 rounded-full" />
            <Skeleton className="h-4 w-16 bg-slate-200 rounded-full" />
            <Skeleton className="h-4 w-4 bg-slate-200 rounded-full" />
            <Skeleton className="h-4 w-32 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-slate-50 min-h-screen pb-16 pt-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Product Section Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Image Gallery Skeleton (5 cols) */}
              <div className="md:col-span-5">
                <div className="space-y-4">
                  <Skeleton className="relative aspect-square w-full rounded-2xl bg-slate-200/60" />
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="aspect-square w-full rounded-xl bg-slate-200/60"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info Skeleton (7 cols) */}
              <div className="md:col-span-7">
                <div className="space-y-6">
                  <Skeleton className="h-8 md:h-10 w-3/4 rounded-full bg-slate-200" />
                  <Skeleton className="h-4 w-1/4 rounded-full bg-slate-200" />
                  <Skeleton className="h-10 md:h-12 w-1/3 rounded-full mt-6 bg-slate-200" />

                  <div className="space-y-4 pt-6">
                    <Skeleton className="h-5 w-1/2 bg-slate-200 rounded-full" />
                    <div className="flex gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          className="h-10 w-16 rounded-xl bg-slate-200"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 mt-auto">
                    <Skeleton className="h-12 w-full rounded-full bg-slate-200" />
                    <Skeleton className="h-12 w-full rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop/Toko Info Card Skeleton */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-2xl bg-slate-200" />
            <div className="space-y-3 w-full sm:w-1/3">
              <Skeleton className="h-6 w-3/4 bg-slate-200 rounded-full" />
              <Skeleton className="h-4 w-1/2 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Product Details & Description Row Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Specs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <Skeleton className="h-6 w-40 mb-6 bg-slate-200 rounded-full" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-slate-200 rounded-md" />
                  <Skeleton className="h-12 w-full bg-slate-200 rounded-md" />
                  <Skeleton className="h-12 w-full bg-slate-200 rounded-md" />
                  <Skeleton className="h-12 w-full bg-slate-200 rounded-md" />
                </div>
              </div>
            </div>

            {/* Desc */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8 h-full">
                <Skeleton className="h-6 w-48 mb-6 bg-slate-200 rounded-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full bg-slate-200 rounded-full" />
                  <Skeleton className="h-4 w-full bg-slate-200 rounded-full" />
                  <Skeleton className="h-4 w-5/6 bg-slate-200 rounded-full" />
                  <Skeleton className="h-4 w-4/5 bg-slate-200 rounded-full" />
                  <Skeleton className="h-4 w-2/3 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

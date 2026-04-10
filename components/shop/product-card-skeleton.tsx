import { Skeleton } from "components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden group">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Skeleton className="absolute inset-0 rounded-none bg-slate-200/60" />
      </div>

      {/* Body Area */}
      <div className="flex flex-col flex-grow p-3 bg-white relative">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Skeleton className="h-[18px] w-16 rounded-sm bg-slate-200" />
        </div>

        {/* Title */}
        <div className="mb-2 space-y-1.5">
          <Skeleton className="h-3.5 w-[90%] bg-slate-200 rounded-full" />
          <Skeleton className="h-3.5 w-2/3 bg-slate-200 rounded-full" />
        </div>

        {/* Price */}
        <div className="mt-auto mb-2 text-left">
          <Skeleton className="h-5 w-24 bg-slate-200 rounded-full" />
        </div>

        {/* Rating & Sold Info */}
        <div className="flex items-center gap-1.5 mt-1">
          <Skeleton className="h-3 w-8 bg-slate-200 rounded-full" />
          <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
          <Skeleton className="h-3 w-16 bg-slate-200 rounded-full" />
        </div>

        {/* Location */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full bg-slate-200" />
            <Skeleton className="h-3 w-16 bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* Subtle Cart Button bottom right */}
        <div className="absolute bottom-3 right-3 p-1.5 bg-slate-50 rounded-full border border-slate-200">
          <Skeleton className="w-4 h-4 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

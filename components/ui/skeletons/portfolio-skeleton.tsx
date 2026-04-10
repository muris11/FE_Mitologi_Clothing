import { Skeleton } from "components/ui/skeleton";

export function PortfolioGallerySkeleton({
  showHeading = true,
  showViewAll = true,
}: {
  showHeading?: boolean;
  showViewAll?: boolean;
}) {
  return (
    <section className="relative bg-slate-50 py-24 sm:py-32 border-t border-slate-200/50 overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-mitologi-navy/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8 z-10">
        {showHeading && (
          <div className="mx-auto max-w-2xl text-center mb-16 flex flex-col items-center">
            <Skeleton className="h-3 w-24 mb-6 bg-slate-200 rounded-full" />
            <Skeleton className="h-6 sm:h-8 w-3/4 max-w-lg mb-5 bg-slate-200 rounded-md" />
            <Skeleton className="h-4 w-full max-w-2xl bg-slate-200 rounded-md" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-slate-100 shadow-sm border border-slate-200 aspect-square sm:aspect-[4/3]"
            >
              <Skeleton className="absolute inset-0 rounded-none bg-slate-200/60" />

              {/* Gradients to match the real item */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none opacity-90" />
              <div className="absolute inset-0 bg-mitologi-navy/10 z-10 mix-blend-multiply" />

              {/* Badge Skeleton */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                <Skeleton className="w-16 h-6 sm:h-7 rounded-full bg-white/40" />
              </div>

              {/* Text Overlay Skeleton */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-6 z-20">
                <Skeleton className="h-5 sm:h-6 w-3/4 bg-white/30 rounded-md mb-1" />
                <Skeleton className="h-2.5 sm:h-3 w-1/2 bg-white/30 rounded-full mt-3" />
              </div>
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-16 text-center flex justify-center">
            <Skeleton className="h-[52px] w-[210px] rounded-full bg-slate-200" />
          </div>
        )}
      </div>
    </section>
  );
}

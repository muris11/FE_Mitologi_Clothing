import { Skeleton } from "components/ui/skeleton";
import clsx from "clsx";

export function CategoryGridSkeleton({
  hideHeader = false,
}: {
  hideHeader?: boolean;
}) {
  return (
    <section
      className={clsx(
        "relative bg-slate-50 overflow-hidden border-t border-slate-200/50",
        hideHeader ? "py-8" : "py-16 sm:py-24 scroll-mt-24",
      )}
    >
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-mitologi-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 z-10">
        {!hideHeader && (
          <div className="text-center mb-16 flex flex-col items-center">
            {/* Subtitle / Badge line */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-1 w-8 bg-slate-200 rounded-full" />
              <Skeleton className="h-4 w-32 bg-slate-200" />
              <span className="h-1 w-8 bg-slate-200 rounded-full" />
            </div>
            {/* Title */}
            <Skeleton
              className="h-6 sm:h-8 w-3/4 sm:w-1/2 max-w-md bg-slate-200"
              style={{ borderRadius: "6px" }}
            />
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="group relative block aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-soft"
            >
              {/* Image Placeholder */}
              <Skeleton className="absolute inset-0 rounded-none bg-slate-200/50" />

              {/* Overlay (Matches original layout context) */}
              <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/95 via-mitologi-navy/40 to-black/10 opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <Skeleton className="h-6 sm:h-7 w-2/3 bg-white/30 mb-2 rounded-md" />
                <Skeleton className="h-3.5 w-1/2 bg-white/30 mt-2 rounded-full" />
                {/* Fake CTA text */}
                <div className="mt-4">
                  <Skeleton className="h-2.5 sm:h-3 w-24 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button Skeleton */}
        {!hideHeader && (
          <div className="mt-12 flex justify-center">
            <Skeleton className="h-[52px] w-[220px] rounded-full bg-slate-200" />
          </div>
        )}
      </div>
    </section>
  );
}

import { Skeleton } from "components/ui/skeleton";

export default function Loading() {
  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">
        <Skeleton className="h-4 w-20 rounded mb-8" />

        <Skeleton className="h-3 w-16 rounded mb-4" />
        <Skeleton className="h-9 sm:h-10 w-3/4 rounded mb-8" />

        <Skeleton className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg mb-10" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100">
          <Skeleton className="h-4 w-40 rounded mb-4" />
          <Skeleton className="h-10 w-44 rounded-lg" />
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100">
          <Skeleton className="h-5 w-36 rounded mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/3] rounded-lg mb-3" />
                <Skeleton className="h-4 w-3/4 rounded mb-1" />
                <Skeleton className="h-3 w-1/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

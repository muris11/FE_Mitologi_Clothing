import { Skeleton } from "components/ui/skeleton";

export function SubpageHeaderSkeleton() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 sm:pt-40 pb-12 sm:pb-16">
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 w-full text-center">
        <Skeleton className="h-3 w-28 mx-auto mb-4 rounded-full" />
        <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4 mx-auto mb-4 rounded-xl" />
        <Skeleton className="h-4 sm:h-5 w-2/3 mx-auto rounded-md max-w-xl" />
      </div>
    </section>
  );
}

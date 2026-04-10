import { CategoryGridSkeleton } from "components/ui/skeletons/category-skeleton";
import { HeroSkeleton } from "components/ui/skeletons/hero-skeleton";
import { PortfolioGallerySkeleton } from "components/ui/skeletons/portfolio-skeleton";
import { NewArrivalsSkeleton } from "components/landing/sections/new-arrivals";
import { Skeleton } from "components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <HeroSkeleton />

      {/* Fake About Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-slate-200 rounded-md" />
              <Skeleton className="h-4 w-full bg-slate-200 rounded-full" />
              <Skeleton className="h-4 w-full bg-slate-200 rounded-full" />
              <Skeleton className="h-4 w-5/6 bg-slate-200 rounded-full" />
            </div>
            <div className="aspect-square bg-slate-100 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGridSkeleton hideHeader={false} />

      {/* New Arrivals (represented twice for New Release and Best Sellers) */}
      <NewArrivalsSkeleton />
      <NewArrivalsSkeleton />

      {/* Basic structural block representing Why Choose Us / Material Showcase / Order Flow */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          <div className="mx-auto max-w-2xl text-center">
            <Skeleton className="h-10 w-1/2 mx-auto bg-slate-200 rounded-md mb-4" />
            <Skeleton className="h-4 w-2/3 mx-auto bg-slate-200 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-64 w-full bg-slate-200 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <PortfolioGallerySkeleton showHeading={true} />
    </>
  );
}

import { GridTileImage } from "components/shared/grid/tile";
import { getRecommendations } from "lib/api/recommendations";
import { getUser } from "lib/api/server-auth";
import Link from "next/link";
import { MotionDiv } from "components/ui/motion";

export async function PersonalizedRecommendations() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const recommendations = await getRecommendations();

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <MotionDiv className="mx-auto max-w-[1440px] px-4 py-12">
      <h2 className="mb-8 text-2xl md:text-3xl font-sans font-bold text-mitologi-navy tracking-tight">
        Recommended for You
      </h2>
      <ul className="flex w-full gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recommendations.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group"
          >
            <Link
              className="relative h-full w-full block rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-slate-100 bg-white"
              href={`/shop/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </MotionDiv>
  );
}

import { GridTileImage } from "components/shared/grid/tile";
import { getRecommendations } from "lib/api/recommendations";
import { getUser } from "lib/api/server-auth";
import Link from "next/link";

export async function RecommendedCarousel() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  // Fetch recommendations
  const products = await getRecommendations();

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <h2 className="mb-6 text-3xl font-sans font-extrabold tracking-tight text-mitologi-navy px-4">
        Recommended For You
      </h2>
      <ul className="flex gap-6 px-4 overflow-x-auto pb-4 snap-x">
        {products.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/shop/product/${product.handle}`}
              className="relative h-full w-full block"
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
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

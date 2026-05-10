import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "components/shop/product-card";
import { getBestSellers } from "lib/api/catalog";
import { getRecommendations } from "lib/api/recommendations";
import { getUser } from "lib/api/server-auth";
import { Product } from "lib/api/types";
import Link from "next/link";

export async function RecommendationsSection() {
  const user = await getUser();
  let products: Product[] = [];
  let isPersonalized = false;

  if (user) {
    try {
      products = await getRecommendations();
      isPersonalized = products.length > 0;
    } catch (e) {
    }
  }

  if (products.length === 0) {
    try {
      products = await getBestSellers(8);
    } catch (e) {
    }
  }

  if (products.length === 0) {
    return null;
  }

  const title = isPersonalized ? "Untuk Anda" : "Populer";

  return (
    <section className="py-8 border-b border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          Lihat semua
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-1 px-1 lg:mx-0 lg:px-0">
        {products.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[200px] sm:w-[220px] lg:w-auto snap-start"
          >
            <ProductCard
              product={product}
              index={index}
              isRecommended={isPersonalized}
              isBestSeller={!isPersonalized}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

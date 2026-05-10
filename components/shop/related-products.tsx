import { ProductCard } from "components/shop/product-card";
import { getRelatedProducts } from "lib/api";

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts(id);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Produk Terkait
      </h2>

      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {relatedProducts.slice(0, 4).map((product, index) => (
          <div
            key={product.handle}
            className="flex-shrink-0 w-[160px] sm:w-auto snap-start"
          >
            <ProductCard
              product={product}
              index={index}
              isRecommended={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

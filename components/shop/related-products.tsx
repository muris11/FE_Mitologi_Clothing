import { LinkIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "components/shop/product-card";
import { SectionHeading } from "components/ui/section-heading";
import { MotionSection } from "components/ui/motion";
import { getRelatedProducts } from "lib/api";

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts(id);

  if (!relatedProducts.length) return null;

  return (
    <MotionSection className="py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-mitologi-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-mitologi-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mitologi-navy text-white">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-mitologi-navy tracking-tight">
              Produk Terkait
            </h2>
            <p className="text-sm font-sans text-slate-500 font-medium mt-1">
              Rekomendasi berdasarkan produk yang Anda lihat
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {relatedProducts.slice(0, 4).map((product, index) => (
            <ProductCard 
              key={product.handle} 
              product={product} 
              index={index}
              isRecommended={true}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

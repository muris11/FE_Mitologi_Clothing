import { StarIcon, ChevronRightIcon, FireIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "components/shop/product-card";
import { MotionSection } from "components/ui/motion";
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
    // Logged-in user: get AI-powered personalized recommendations
    try {
      products = await getRecommendations();
      isPersonalized = products.length > 0;
    } catch (e) {
      // Silent fail, will fallback to best sellers
    }
  }

  // Fallback: show best sellers for guests or if no personalized recommendations
  if (products.length === 0) {
    try {
      products = await getBestSellers(8);
    } catch (e) {
      // Silent fail
    }
  }

  // If still no products, don't render the section
  if (products.length === 0) {
    return null;
  }

  const title = isPersonalized ? "Rekomendasi Untuk Anda" : "Produk Populer";
  const subtitle = isPersonalized 
    ? "Dipilih khusus berdasarkan selera dan riwayat Anda" 
    : "Produk paling diminati pelanggan kami";
  const Icon = isPersonalized ? StarIcon : FireIcon;
  const iconBgClass = isPersonalized 
    ? "bg-mitologi-gold/10 border-mitologi-gold/20 text-mitologi-gold-dark"
    : "bg-orange-50 border-orange-200 text-orange-600";

  return (
    <MotionSection className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-mitologi-cream/30 to-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-mitologi-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mitologi-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-premium border border-slate-100 p-6 lg:p-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-mitologi-navy tracking-tight">
                  {title}
                </h2>
                <p className="text-sm font-sans text-slate-500 font-medium mt-1">
                  {subtitle}
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-sans font-bold text-mitologi-navy hover:text-mitologi-gold transition-colors group px-4 py-2 rounded-full hover:bg-slate-50"
            >
              Lihat Semua
              <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                isRecommended={isPersonalized}
                isBestSeller={!isPersonalized}
              />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-sans font-bold text-sm hover:bg-slate-50 hover:text-mitologi-navy hover:border-mitologi-navy/30 transition-all shadow-sm"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

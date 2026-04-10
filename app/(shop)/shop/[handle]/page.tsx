import {
  MobileFilters,
  Pagination,
  ProductCard,
  ProductFilters,
  ProductGridSkeleton,
  SearchBar,
  SortSelect,
} from "components/shop";
import { RecommendationsSection } from "components/shop/recommendations-section";
import {
  getBestSellers,
  getCollection,
  getCollections,
  getProducts,
} from "lib/api/catalog";
import { getRecommendations } from "lib/api/recommendations";
import { getUser } from "lib/api/server-auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const collection = await getCollection(params.handle);

  if (!collection) return notFound();

  return {
    title: `${collection.title} - Mitologi Clothing`,
    description:
      collection.description ||
      `Koleksi ${collection.title} dari Mitologi Clothing.`,
  };
}

interface CategoryPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductList({
  sort,
  categoryHandle,
  minPrice,
  maxPrice,
  page,
  limit,
}: {
  sort: string;
  categoryHandle: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
}) {
  const user = await getUser();

  const [productsData, bestSellers, recommendations] = await Promise.all([
    getProducts({
      sortKey: sort.includes("price")
        ? "PRICE"
        : sort === "trending-desc"
          ? "BEST_SELLING"
          : "CREATED_AT",
      reverse:
        sort === "price-desc" ||
        sort === "trending-desc" ||
        sort === "latest" ||
        sort === "",
      category: categoryHandle,
      minPrice: minPrice,
      maxPrice: maxPrice,
      page: page,
      limit: limit,
    }),
    getBestSellers(10),
    user ? getRecommendations() : Promise.resolve([]),
  ]);

  const { products, pagination } = productsData;
  const totalPages = pagination.lastPage;

  const bestSellerIds = new Set(bestSellers.map((p) => p.id));
  const recommendedIds = new Set(recommendations.map((p) => p.id));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div className="text-sm text-slate-500 font-sans font-medium">
          Menampilkan{" "}
          <span className="text-mitologi-navy font-bold">
            {products.length}
          </span>{" "}
          produk
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block w-56">
            <SortSelect />
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-mitologi-navy font-sans font-bold text-xl mb-2">
            Produk tidak ditemukan
          </p>
          <p className="text-slate-500 font-sans text-sm max-w-md mx-auto">
            Belum ada produk aktif pada kategori ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isBestSeller={bestSellerIds.has(product.id)}
              isRecommended={recommendedIds.has(product.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-12">
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </>
  );
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "latest";
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? parseInt(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? parseInt(searchParams.maxPrice)
      : undefined;
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 20;

  const collection = await getCollection(params.handle);
  if (!collection) return notFound();

  const categories = await getCollections();
  const collections = categories;

  return (
    <div className="bg-app-background min-h-screen">
      {/* Compact Header */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-app pb-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-mitologi-gold-dark mb-3">
              Curated shop
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-mitologi-navy leading-none">
              {collection.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-3 font-sans max-w-2xl leading-relaxed">
              {collection.description ||
                `Temukan koleksi terbaik dalam kategori ${collection.title}.`}
            </p>
          </div>

          <div className="w-full md:w-[420px] lg:pb-1">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <Suspense fallback={null}>
          <RecommendationsSection />
        </Suspense>
      </div>

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pb-24 pt-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28 rounded-[24px] border border-app bg-white p-5 shadow-soft">
              <ProductFilters
                categories={collections}
                activeCategory={params.handle}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <MobileFilters
                categories={collections}
                activeCategory={params.handle}
              />
            </div>

            <Suspense
              key={`${sort}-${params.handle}-${page}`}
              fallback={
                <>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                    <div className="w-32 h-5 bg-slate-200 animate-pulse rounded"></div>
                    <div className="hidden lg:block w-48 h-8 bg-slate-200 animate-pulse rounded"></div>
                  </div>
                  <ProductGridSkeleton />
                </>
              }
            >
              <ProductList
                sort={sort}
                categoryHandle={params.handle}
                minPrice={minPrice}
                maxPrice={maxPrice}
                page={page}
                limit={limit}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

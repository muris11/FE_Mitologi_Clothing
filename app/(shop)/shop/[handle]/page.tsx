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
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-800">{products.length}</span>{" "}
          produk
        </p>
        <div className="hidden lg:block w-48">
          <SortSelect />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-slate-400"
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
          <p className="text-slate-800 font-semibold text-lg mb-1">
            Produk tidak ditemukan
          </p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Belum ada produk aktif pada kategori ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
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

      <div className="mt-14">
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
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-slate-500 text-sm mt-1.5 max-w-lg">
                {collection.description}
              </p>
            )}
          </div>
          <div className="w-full lg:w-[360px]">
            <SearchBar />
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendationsSection />
        </div>
      </Suspense>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        <div className="flex gap-10">
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28">
              <ProductFilters
                categories={collections}
                activeCategory={params.handle}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <MobileFilters
                categories={collections}
                activeCategory={params.handle}
              />
            </div>

            <Suspense
              key={`${sort}-${params.handle}-${page}`}
              fallback={
                <>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
                    <div className="w-24 h-4 bg-slate-100 animate-pulse rounded" />
                    <div className="hidden lg:block w-40 h-8 bg-slate-100 animate-pulse rounded" />
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

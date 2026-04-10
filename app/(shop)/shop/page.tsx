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
import { getBestSellers, getCollections, getProducts } from "lib/api/catalog";
import { getRecommendations } from "lib/api/recommendations";
import { getUser } from "lib/api/server-auth";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const { q: searchValue, category: categoryHandle } = resolvedParams;

  let title = "Katalog Produk";
  if (searchValue) {
    title = `Pencarian: ${searchValue}`;
  } else if (categoryHandle) {
    // We'd ideally fetch the category name here, but handle is a decent fallback
    // Proper way: fetch category details. For now, capitalizing handle.
    const catName =
      typeof categoryHandle === "string"
        ? categoryHandle.charAt(0).toUpperCase() + categoryHandle.slice(1)
        : "Kategori";
    title = `Kategori: ${catName}`;
  }

  return {
    title: `${title} - Mitologi Clothing`,
    description:
      "Temukan koleksi kain dan pakaian premium dari Mitologi Clothing.",
    openGraph: {
      title: `${title} - Mitologi Clothing`,
      images: [
        {
          url: "/images/og-shop.jpg", // Ensure this exists or use a default
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductList({
  sort,
  searchValue,
  categoryHandle,
  minPrice,
  maxPrice,
  page,
  limit,
}: {
  sort: string;
  searchValue?: string;
  categoryHandle?: string;
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
      query: searchValue,
      category: categoryHandle,
      minPrice: minPrice,
      maxPrice: maxPrice,
      page: page,
      limit: limit,
    }),
    getBestSellers(10), // global best sellers
    user ? getRecommendations() : Promise.resolve([]),
  ]);

  // Fallback if API fails
  const safeProductsData = productsData || {
    products: [],
    pagination: { total: 0, perPage: limit, currentPage: page, lastPage: 1 },
  };
  const { products, pagination } = safeProductsData;
  const totalPages = pagination?.lastPage || 1;

  const safeBestSellers = bestSellers || [];
  const safeRecommendations = recommendations || [];

  const bestSellerIds = new Set(safeBestSellers.map((p) => p.id));
  const recommendedIds = new Set(safeRecommendations.map((p) => p.id));

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
            Maaf, kami tidak dapat menemukan produk yang sesuai dengan pencarian
            atau filter Anda. Coba kata kunci lain.
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

export default async function ShopPage(props: ShopPageProps) {
  const searchParams = await props.searchParams;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "latest";
  const searchValue =
    typeof searchParams.q === "string" ? searchParams.q : undefined;
  const categoryHandle =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;

  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? parseInt(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? parseInt(searchParams.maxPrice)
      : undefined;
  const limit = 20;

  const categories = await getCollections();
  const collections = categories || [];

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
              {searchValue
                ? `Pencarian: ${searchValue}`
                : categoryHandle
                  ? `Kategori: ${categoryHandle}`
                  : "Katalog Koleksi"}
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-3 font-sans max-w-2xl leading-relaxed">
              Pilihan produk Mitologi yang ditata lebih tenang, lebih fokus, dan
              nyaman dijelajahi di layar besar maupun kecil.
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
          <div
            className="flex-shrink-0 hidden lg:block"
            style={{ width: "288px" }}
          >
            <div className="sticky top-28 rounded-[24px] border border-app bg-white p-5 shadow-soft">
              <ProductFilters
                categories={collections}
                activeCategory={categoryHandle || null}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5 lg:hidden">
              <MobileFilters
                categories={collections}
                activeCategory={categoryHandle || null}
              />
            </div>

            <Suspense
              key={`${sort}-${searchValue}-${categoryHandle}-${page}`}
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
                searchValue={searchValue}
                categoryHandle={categoryHandle}
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

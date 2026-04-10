import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Gallery } from "components/shop/product/gallery";
import { ProductDescription } from "components/shop/product/product-description";
import { ProductReviews } from "components/shop/product/product-reviews";
import { RelatedProducts } from "components/shop/related-products";
import { getCollections, getProduct } from "lib/api";
import { Image } from "lib/api/types";
import { sanitizeHtml } from "lib/sanitize";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// export const runtime = "edge"; // Disabled to avoid connection issues with local PHP backend

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  // Normalize tags to always be an array
  const tags = Array.isArray(product.tags) ? product.tags : [];
  const indexable = !tags.includes("hidden");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const productUrl = `${baseUrl}/shop/product/${params.handle}`;
  const productTitle = product.seo.title || product.title;
  const productDescription = product.seo.description || product.description;

  return {
    title: productTitle,
    description: productDescription,
    alternates: {
      canonical: productUrl,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title: productTitle,
      description: productDescription,
      type: "website",
      url: productUrl,
      ...(url
        ? {
            images: [
              {
                url,
                width,
                height,
                alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      ...(url ? { images: [url] } : {}),
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const [product, categories] = await Promise.all([
    getProduct(params.handle),
    getCollections(),
  ]);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Katalog",
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
      },
    ],
  };

  // Find category name for breadcrumb
  const productTags = Array.isArray(product.tags) ? product.tags : [];
  const categoryName =
    categories.find((c) =>
      productTags.some((tag) => tag.toLowerCase() === c.handle.toLowerCase()),
    )?.title || "Produk";

  // Prepare gallery images
  const images = Array.isArray(product.images) ? product.images : [];
  const galleryImages =
    images.length > 0
      ? images.map((image: Image) => ({
          src: image.url,
          altText: image.altText || product.title,
        }))
      : product.featuredImage?.url
        ? [
            {
              src: product.featuredImage.url,
              altText: product.title,
            },
          ]
        : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Breadcrumb Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500 font-sans font-medium">
            <Link
              href="/"
              className="hover:text-mitologi-navy transition-colors"
            >
              Beranda
            </Link>
            <ChevronRightIcon className="w-4 h-4" />
            <Link
              href="/shop"
              className="hover:text-mitologi-navy transition-colors"
            >
              Katalog
            </Link>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-slate-900 font-bold truncate">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-50 min-h-screen pb-16 pt-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Product Section Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Image Gallery (5 cols) */}
              <div className="md:col-span-5">
                <Suspense
                  fallback={
                    <div className="relative aspect-square w-full bg-slate-100 rounded-2xl animate-pulse" />
                  }
                >
                  <Gallery images={galleryImages} />
                </Suspense>
              </div>

              {/* Product Info (7 cols) */}
              <div className="md:col-span-7">
                <Suspense fallback={<ProductInfoSkeleton />}>
                  <ProductDescription product={product} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Shop/Toko Info Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-md overflow-hidden flex items-center justify-center p-1.5">
                <img
                  src="/images/logo.png"
                  alt="Mitologi Clothing"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-mitologi-navy">
                  Mitologi Clothing
                </h3>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-slate-500 font-sans font-medium mt-1">
                  <span>Produk Premium</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details & Description Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Product Specifications (Left/Top) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-sans font-extrabold text-mitologi-navy mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-mitologi-gold rounded-full"></div>
                  Spesifikasi Produk
                </h2>

                <div className="flex flex-col gap-4 text-sm font-sans">
                  <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Kategori</span>
                    <span className="text-mitologi-navy font-bold">
                      {categoryName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Stok</span>
                    <span className="text-slate-900 font-semibold">
                      Sisa Kuantitas: Tersedia{" "}
                      {product.totalStock !== undefined
                        ? product.totalStock
                        : product.variants[0]?.stock || 0}{" "}
                      buah
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">
                      Dikirim Dari
                    </span>
                    <span className="text-slate-900 font-semibold">
                      {process.env.NEXT_PUBLIC_SHIPPING_ORIGIN ||
                        "Cirebon, Jawa Barat"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-medium">SKU</span>
                    <span className="font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded w-fit">
                      {product.variants[0]?.sku || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description (Right/Bottom) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8 h-full">
                <h2 className="text-lg font-sans font-extrabold text-mitologi-navy mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-mitologi-navy rounded-full"></div>
                  Deskripsi Produk
                </h2>
                <div
                  className="prose prose-slate prose-sm sm:prose-base max-w-none text-slate-600 font-sans leading-relaxed whitespace-pre-line prose-headings:text-mitologi-navy prose-a:text-mitologi-navy hover:prose-a:text-mitologi-gold prose-strong:text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(
                      product.descriptionHtml || product.description,
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="mb-16">
            <ProductReviews handle={product.handle} />
          </div>

          {/* Related Products - Now has its own styled header */}
          <Suspense fallback={null}>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

// Skeleton Loading for Product Info
function ProductInfoSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
      <div className="h-4 w-1/4 bg-slate-200 rounded-md animate-pulse" />
      <div className="h-12 w-1/3 bg-slate-200 rounded-xl animate-pulse" />
      <div className="space-y-4 pt-4">
        <div className="h-12 w-full bg-slate-200 rounded-full animate-pulse" />
        <div className="h-12 w-1/2 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

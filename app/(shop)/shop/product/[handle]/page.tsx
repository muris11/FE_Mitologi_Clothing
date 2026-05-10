import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Gallery } from "components/shop/product/gallery";
import { ProductDescription } from "components/shop/product/product-description";
import { ProductReviews } from "components/shop/product/product-reviews";
import { RelatedProducts } from "components/shop/related-products";
import { getCollections, getProduct } from "lib/api";
import { getSiteSettings } from "lib/api/content";
import { Image } from "lib/api/types";
import { sanitizeHtml } from "lib/sanitize";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
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
  const [product, categories, settings] = await Promise.all([
    getProduct(params.handle),
    getCollections(),
    getSiteSettings(),
  ]);

  if (!product) return notFound();

  const address =
    settings?.contact?.contactAddress ||
    settings?.legality?.legalAddress ||
    "Jl. Raya Lelea, Indramayu, Jawa Barat";

  const addressParts = address.split(",").map((p: string) => p.trim());
  let shippingLocation = "Indramayu, Jawa Barat";

  if (addressParts.length >= 2) {
    const lastTwoParts = addressParts.slice(-2);
    if (lastTwoParts.length === 2) {
      shippingLocation = `${lastTwoParts[0]}, ${lastTwoParts[1]}`;
    }
  }

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

  const productTags = Array.isArray(product.tags) ? product.tags : [];
  const categoryName =
    categories.find((c) =>
      productTags.some((tag) => tag.toLowerCase() === c.handle.toLowerCase()),
    )?.title || "Produk";

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

      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 py-4 text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-slate-900 transition-colors flex-shrink-0">
              Beranda
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href="/shop"
              className="hover:text-slate-900 transition-colors flex-shrink-0"
            >
              Katalog
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-900 font-medium truncate sm:max-w-[300px]">
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 pb-12 sm:pb-16 pt-2">
            <div>
              <Suspense
                fallback={
                  <div className="aspect-[4/5] w-full bg-slate-100 rounded-lg animate-pulse" />
                }
              >
                <Gallery images={galleryImages} />
              </Suspense>
            </div>

            <div className="lg:pt-2">
              <Suspense fallback={<ProductInfoSkeleton />}>
                <ProductDescription product={product} />
              </Suspense>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Detail
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  <dt className="text-slate-500">Kategori</dt>
                  <dd className="text-slate-900 font-medium">{categoryName}</dd>
                  <dt className="text-slate-500">Stok</dt>
                  <dd className="text-slate-900 font-medium">
                    {product.totalStock !== undefined
                      ? product.totalStock
                      : product.variants[0]?.stock || 0}{" "}
                    tersedia
                  </dd>
                  <dt className="text-slate-500">Dikirim dari</dt>
                  <dd className="text-slate-900 font-medium">
                    {process.env.NEXT_PUBLIC_SHIPPING_ORIGIN || shippingLocation}
                  </dd>
                  {product.variants[0]?.sku && (
                    <>
                      <dt className="text-slate-500">SKU</dt>
                      <dd className="text-slate-900 font-mono text-xs">
                        {product.variants[0].sku}
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>

          {product.descriptionHtml || product.description ? (
            <div className="border-t border-slate-100 py-12 max-w-3xl">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Deskripsi
              </h2>
              <div
                className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed prose-headings:text-slate-900 prose-a:text-slate-900 prose-strong:text-slate-800"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    product.descriptionHtml || product.description,
                  ),
                }}
              />
            </div>
          ) : null}

          <div className="border-t border-slate-100 py-12">
            <ProductReviews handle={product.handle} />
          </div>

          <div className="border-t border-slate-100 py-12">
            <Suspense fallback={null}>
              <RelatedProducts id={product.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
      <div className="h-4 w-1/4 bg-slate-100 rounded animate-pulse" />
      <div className="h-8 w-1/3 bg-slate-100 rounded animate-pulse mt-4" />
      <div className="space-y-3 pt-6">
        <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-10 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

import { CategoryGrid } from "components/landing/sections/category-grid";
import { SubpageHero } from "components/landing/shared/subpage-hero";
import { getLandingPageData } from "lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  return {
    title: `Kategori Produk | ${siteName}`,
    description: `Jelajahi semua kategori produksi ${siteName}: kaos, kemeja, jaket, jersey, dan merchandise.`,
    openGraph: {
      title: `Kategori Produk | ${siteName}`,
      description: `Jelajahi semua kategori produksi ${siteName}.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/kategori`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Kategori Produk | ${siteName}`,
      description: `Jelajahi semua kategori produksi ${siteName}.`,
    },
  };
}

export default async function KategoriPage() {
  const data = await getLandingPageData();

  return (
    <>
      <SubpageHero
        title="Kategori Produk"
        subtitle="Temukan koleksi pilihan dengan material premium dan desain eksklusif yang dirancang khusus untuk Anda."
        badge={true}
        badgeText="Koleksi Kami"
      />
      <CategoryGrid categories={data?.categories || []} hideHeader={true} />
    </>
  );
}

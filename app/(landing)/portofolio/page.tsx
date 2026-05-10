import { PortfolioGallery } from "components/landing/sections/portfolio-gallery";
import { getLandingPageData } from "lib/api";
import { getPortfolios } from "lib/api/content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  return {
    title: `Portofolio — ${siteName}`,
    description: `Galeri hasil karya produksi ${siteName}. Lihat project kaos, kemeja, jaket, dan merchandise yang telah kami kerjakan.`,
    openGraph: {
      title: `Portofolio — ${siteName}`,
      description: `Galeri hasil karya produksi ${siteName}.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/portofolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Portofolio — ${siteName}`,
      description: `Galeri hasil karya produksi ${siteName}.`,
    },
  };
}

export default async function PortofolioPage() {
  const portfolios = await getPortfolios();

  return (
    <>
      <PortfolioGallery
        items={portfolios}
        showViewAll={false}
        showHeading={true}
        overline="Hasil Karya"
        title="Portofolio Kami"
        subtitle="Lihat hasil karya nyata yang telah kami kerjakan untuk klien-klien hebat kami."
      />
    </>
  );
}

import { AboutServicesDetail as ServicesDetail } from "components/landing/about/services-detail";
import { CategoryPricelist } from "components/landing/sections/category-pricelist";
import { PrintingMethods } from "components/landing/sections/printing-methods";
import { SubpageHeader } from "components/landing/shared/subpage-header";
import { getLandingPageData } from "lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const siteName = data?.siteSettings?.general?.siteName || "Mitologi Clothing";
  const title = `Layanan Produksi — ${siteName}`;
  const description = `Layanan produksi dari ${siteName}: kemeja, jersey, sablon kaos, dan lainnya.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/layanan`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LayananPage() {
  const data = await getLandingPageData();

  return (
    <main>
      <SubpageHeader
        overline="Program Kerja"
        title="Layanan Produksi"
        subtitle="Solusi lengkap untuk kebutuhan produksi pakaian Anda dengan kualitas terbaik."
      />
      <ServicesDetail settings={data?.siteSettings} />
      <CategoryPricelist pricings={data?.productPricings || []} />
      <PrintingMethods methods={data?.printingMethods || []} />
    </main>
  );
}

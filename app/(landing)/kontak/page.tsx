import { KontakSection } from "components/landing/kontak/kontak-section";
import { SubpageHero } from "components/landing/shared/subpage-hero";
import { getLandingPageData } from "lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const settings = data?.siteSettings;
  const siteName = settings?.general?.siteName || "Mitologi Clothing";
  const title = `Kontak — ${siteName}`;
  const description = `Hubungi ${siteName} untuk konsultasi dan pemesanan clothing.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/kontak`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function KontakPage() {
  const data = await getLandingPageData();

  return (
    <>
      <SubpageHero
        title="Hubungi Kami"
        subtitle="Siap mendiskusikan kebutuhan clothing Anda. Konsultasi gratis!"
        badge={true}
        badgeText="Hubungi Admin"
      />
      <KontakSection settings={data?.siteSettings} />
    </>
  );
}

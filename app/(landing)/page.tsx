import { AboutSection } from "components/landing/sections/about-section";
import { CategoryPricelist } from "components/landing/sections/category-pricelist";
import { CTASection } from "components/landing/sections/cta-section";
import { GuaranteeBonus } from "components/landing/sections/guarantee-bonus";
import { Hero } from "components/landing/sections/hero";
import { MaterialShowcase } from "components/landing/sections/material-showcase";
import {
  NewArrivals,
  NewArrivalsSkeleton,
} from "components/landing/sections/new-arrivals";
import { OrderFlow } from "components/landing/sections/order-flow";
import { PartnerClients } from "components/landing/sections/partner-clients";
import { PlastisolPricing } from "components/landing/sections/plastisol-pricing";
import { PortfolioGallery } from "components/landing/sections/portfolio-gallery";
import { Testimonials } from "components/landing/sections/testimonials";
import { WhyChooseUs } from "components/landing/sections/why-choose-us";
import { getLandingPageData } from "lib/api";
import { storageUrl } from "lib/utils/storage-url";
import { Suspense } from "react";

import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLandingPageData();
  const settings = data?.siteSettings;

  return {
    title: settings?.seo?.seoMetaTitle || "Mitologi Clothing",
    description:
      settings?.seo?.seoMetaDescription ||
      "Mitologi Clothing - Vendor Clothing Terpercaya Asal Indramayu. Spesialis Kaos, Jersey, Kemeja, dan Merchandise.",
    openGraph: {
      type: "website",
      images: settings?.seo?.seoOgImage
        ? [storageUrl(settings.seo.seoOgImage)]
        : [],
    },
  };
}

export default async function HomePage() {
  const data = await getLandingPageData();

  return (
    <>
      <Suspense fallback={null}>
        <Hero slides={data?.heroSlides} />

        {/* Company Profile Integration */}
        <AboutSection settings={data?.siteSettings} />

        {/* <ServicesOverview settings={data.siteSettings} /> */}

        <PlastisolPricing settings={data?.siteSettings} />
        <CategoryPricelist pricings={data?.productPricings} />

        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivals
            products={data?.newArrivals}
            title="New Release"
            subtitle="Koleksi Terbaru"
            description="Jelajahi produk terbaru kami dengan material premium dan desain eksklusif."
          />
        </Suspense>

        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivals
            products={data?.bestSellers}
            title="Best Sellers"
            subtitle="Produk Terlaris"
            description="Pilihan favorit pelanggan kami yang paling banyak dicari dan diminati."
          />
        </Suspense>

        <WhyChooseUs settings={data?.siteSettings} />
        <GuaranteeBonus settings={data?.siteSettings} />
        <MaterialShowcase materials={data?.materials} />

        <div className="bg-slate-50/50">
          <OrderFlow orderSteps={data?.orderSteps} />
        </div>

        <PortfolioGallery items={data?.portfolioItems} />
        <PartnerClients partners={data?.partners} />
        <Testimonials testimonials={data?.testimonials} />
        <CTASection cta={data?.cta} />
      </Suspense>
    </>
  );
}

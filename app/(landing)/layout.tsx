import LandingFooter from "components/landing/sections/landing-footer";
import { LandingNavbar } from "components/landing/sections/landing-navbar";
import { getLandingPageData } from "lib/api";
import { ReactNode, Suspense } from "react";
import { CategoryPageSkeleton } from "components/ui/skeletons/category-page-skeleton";
import { LayananPageSkeleton } from "components/ui/skeletons/layanan-page-skeleton";
import { PortfolioPageSkeleton } from "components/ui/skeletons/portfolio-page-skeleton";
import { KontakPageSkeleton } from "components/ui/skeletons/kontak-page-skeleton";
import { TentangKamiPageSkeleton } from "components/ui/skeletons/tentang-kami-page-skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await getLandingPageData();
  const settings = data?.siteSettings;

  return (
    <>
      <Suspense
        fallback={
          <div className="h-20 w-full bg-white border-b border-slate-100" />
        }
      >
        <LandingNavbar settings={settings} />
      </Suspense>
      <Suspense
        fallback={
          <div className="min-h-screen">
            {/* Check children type and render appropriate skeleton */}
            {children}
          </div>
        }
      >
        <main className="min-h-screen">{children}</main>
      </Suspense>
      <LandingFooter settings={settings} />
    </>
  );
}

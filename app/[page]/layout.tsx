import { LandingNavbar } from "components/landing/sections/landing-navbar";
import Footer from "components/shared/layout/footer";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-16 w-full bg-slate-50 border-b border-slate-100" />
        }
      >
        <LandingNavbar />
      </Suspense>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}

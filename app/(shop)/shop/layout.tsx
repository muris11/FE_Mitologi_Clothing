import LazyChatbot from "components/shop/lazy-chatbot";
import { ShopFooter } from "components/shop/shop-footer";
import { ShopNavbar } from "components/shop/shop-navbar";
import { ClientProviders } from "components/providers/client-providers";
import { getLandingPageData } from "lib/api";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await getLandingPageData();
  const settings = data?.siteSettings;

  return (
    <ClientProviders>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <header role="banner">
          <ShopNavbar />
        </header>
        <main className="flex-grow">{children}</main>
        <LazyChatbot />
        <ShopFooter settings={settings} />
      </div>
    </ClientProviders>
  );
}

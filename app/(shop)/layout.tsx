import { ClientProviders } from "components/providers/client-providers";
import { ShopFooter } from "components/shop/shop-footer";
import { ShopNavbar } from "components/shop/shop-navbar";
import { getSiteSettings } from "lib/api/content";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <ClientProviders>
      <div className="min-h-screen flex flex-col">
        <ShopNavbar />
        <main className="flex-1 pt-28">{children}</main>
        <ShopFooter settings={settings} />
      </div>
    </ClientProviders>
  );
}

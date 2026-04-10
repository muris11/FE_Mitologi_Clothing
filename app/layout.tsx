import { baseUrl } from "lib/utils";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import { ToastProvider } from "components/ui/ultra-quality-toast";
import "./globals.css";

const SITE_NAME =
  process.env.SITE_NAME || process.env.COMPANY_NAME || "Mitologi Clothing";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
});

export const metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mitologi Clothing — brand fashion lokal premium terinspirasi mitologi Nusantara. Temukan koleksi pakaian berkualitas yang memadukan seni budaya dengan gaya modern.",
  keywords: [
    "mitologi clothing",
    "fashion indonesia",
    "baju mitologi",
    "clothing brand lokal",
    "fashion nusantara",
  ],
  authors: [{ name: "Mitologi Clothing" }],
  creator: "Mitologi Clothing",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME!,
    title: SITE_NAME!,
    description: "Brand fashion lokal premium terinspirasi mitologi Nusantara.",
  },
  instagram: {
    card: "summary_large_image",
    title: SITE_NAME!,
    description: "Brand fashion lokal premium terinspirasi mitologi Nusantara.",
  },
  robots: {
    follow: true,
    index: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${jakarta.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-slate-50 text-slate-900 selection:bg-mitologi-navy selection:text-white flex flex-col min-h-screen overflow-x-hidden"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:px-8 focus:py-4 focus:bg-mitologi-navy focus:text-white font-sans font-bold tracking-wide text-sm rounded-br-xl shadow-lg"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 flex flex-col">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </body>
    </html>
  );
}

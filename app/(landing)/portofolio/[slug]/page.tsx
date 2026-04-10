import { PortfolioClient } from "components/landing/portofolio/portfolio-client";
import { getPortfolio } from "lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// export const runtime = 'edge'; // Disabled: incompatible with local PHP backend

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const portfolio = await getPortfolio(slug);
    if (!portfolio)
      return { title: "Portofolio Tidak Ditemukan | Mitologi Clothing" };

    return {
      title: `${portfolio.title} | Portofolio Mitologi Clothing`,
      description:
        portfolio.description ||
        `Detail proyek ${portfolio.title} oleh Mitologi Clothing.`,
    };
  } catch {
    return { title: "Portofolio Tidak Ditemukan | Mitologi Clothing" };
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let portfolio;
  try {
    portfolio = await getPortfolio(slug);
  } catch {
    notFound();
  }

  if (!portfolio) {
    notFound();
  }

  return <PortfolioClient portfolio={portfolio} />;
}

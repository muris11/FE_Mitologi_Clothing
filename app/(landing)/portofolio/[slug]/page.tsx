import { PortfolioClient } from "components/landing/portofolio/portfolio-client";
import { getPortfolio } from "lib/api";
import { getPortfolios } from "lib/api/content";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  const allPortfolios = await getPortfolios();
  const relatedPortfolios = allPortfolios
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === portfolio.category || !portfolio.category),
    )
    .slice(0, 3);

  return (
    <PortfolioClient portfolio={portfolio} relatedItems={relatedPortfolios} />
  );
}

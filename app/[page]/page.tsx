import type { Metadata } from "next";

import Prose from "components/shared/ui/prose";
import { getPage } from "lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <div className="min-h-screen bg-muted">
      {/* Premium Hero Section */}
      <div className="bg-mitologi-navy text-white py-16 md:py-20 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-mitologi-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-mitologi-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 hidden md:block"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-wide text-white mb-4 leading-tight">
            {page.title}
          </h1>
          <div className="w-20 h-1 bg-mitologi-gold mx-auto mb-6 rounded-full opacity-80"></div>
          {page.bodySummary && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {page.bodySummary}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10 pb-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-8 md:p-12 overflow-hidden">
          <Prose
            className="max-w-none text-gray-700 leading-relaxed font-sans"
            html={page.body}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 italic text-center">
            Terakhir diperbarui pada:{" "}
            {new Intl.DateTimeFormat("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(page.updatedAt))}
          </div>
        </div>
      </div>
    </div>
  );
}

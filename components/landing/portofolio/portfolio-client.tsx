"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PortfolioItem } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";

interface PortfolioClientProps {
  portfolio: PortfolioItem;
  relatedItems?: PortfolioItem[];
}

export function PortfolioClient({
  portfolio,
  relatedItems = [],
}: PortfolioClientProps) {
  const hasImage = portfolio.imageUrl && portfolio.imageUrl.length > 0;
  const imageUrl = hasImage ? storageUrl(portfolio.imageUrl) : null;

  return (
    <main className="bg-white min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">
        <Link
          href="/portofolio"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Kembali
        </Link>

        <div className="mb-4">
          {portfolio.category && (
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {portfolio.category}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-8">
          {portfolio.title}
        </h1>

        {imageUrl && (
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-10">
            <Image
              src={imageUrl}
              alt={portfolio.title}
              fill
              unoptimized
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          </div>
        )}

        {portfolio.description ? (
          <div
            className="prose prose-slate prose-base max-w-none text-slate-600 leading-relaxed prose-headings:text-slate-900 prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-a:text-slate-900 prose-a:underline prose-strong:text-slate-800 prose-ul:my-4 prose-li:my-1"
            dangerouslySetInnerHTML={{
              __html: portfolio.description,
            }}
          />
        ) : (
          <p className="text-slate-500 text-sm italic">
            Belum ada deskripsi untuk proyek ini.
          </p>
        )}

        <div className="mt-16 pt-10 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-4">
            Tertarik dengan proyek serupa?
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Diskusikan Proyek Anda
          </Link>
        </div>

        {relatedItems.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Portofolio Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedItems.map((item) => {
                const itemImage = item.imageUrl
                  ? storageUrl(item.imageUrl)
                  : null;
                return (
                  <Link
                    key={item.slug}
                    href={`/portofolio/${item.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-3">
                      {itemImage ? (
                        <Image
                          src={itemImage}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.category}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

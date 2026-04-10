"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import WishlistButton from "components/shop/wishlist-button";
import { Button } from "components/ui/button";
import { getWishlist } from "lib/api";
import { Product } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";

export function WishlistTab() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { addToast } = useToast();
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

  useEffect(() => {
    setIsLoadingWishlist(true);
    getWishlist()
      .then(setWishlist)
      .catch(() =>
        addToast({ variant: "error", title: "Gagal memuat wishlist" }),
      )
      .finally(() => setIsLoadingWishlist(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-sans font-bold text-mitologi-navy mb-2">
          Wishlist Saya
        </h2>
        <p className="text-sm font-sans text-slate-500">
          Produk yang Anda simpan untuk dibeli nanti.
        </p>
      </div>

      {isLoadingWishlist ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-100 rounded-3xl h-64 w-full mb-4 shadow-sm" />
              <div className="h-4 bg-slate-200 rounded-full w-3/4 mb-3" />
              <div className="h-4 bg-slate-200 rounded-full w-1/2" />
            </div>
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 shadow-sm">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto border border-slate-100 mb-5 shadow-sm">
            <HeartIcon className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-sans font-bold text-mitologi-navy mb-2">
            Wishlist kosong
          </h3>
          <p className="text-sm font-sans text-slate-500 max-w-xs mx-auto mb-8">
            Simpan produk favorit Anda di sini agar mudah ditemukan.
          </p>
          <Button
            asChild
            variant="primary"
            size="lg"
            className="rounded-full shadow-md font-sans font-bold"
          >
            <Link href="/shop">Jelajahi Produk</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => {
            const imageUrl = storageUrl(
              product.featuredImage?.url,
              "/images/placeholder.jpg",
            );

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 border-b border-slate-100">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    unoptimized={true}
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <WishlistButton
                      productId={product.id}
                      className="bg-white/90 backdrop-blur-md border border-slate-200 p-2 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all hover:scale-110"
                    />
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between h-36">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-mitologi-navy line-clamp-1 mb-1 group-hover:text-mitologi-gold transition-colors">
                      <Link
                        href={`/shop/product/${product.handle}`}
                        className="absolute inset-0 z-0"
                        aria-label={`View ${product.title}`}
                      ></Link>
                      {product.title}
                    </h3>
                    <p className="font-sans font-medium text-slate-500 text-sm">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(
                        Number(product.priceRange.minVariantPrice.amount),
                      )}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4">
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full shadow-sm"
                      size="sm"
                    >
                      <Link href={`/shop/product/${product.handle}`}>
                        Lihat Produk
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

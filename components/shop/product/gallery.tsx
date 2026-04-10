"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  // Default image if none provided
  const currentImage = images[imageIndex] || {
    src: "",
    altText: "Product image",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-soft group">
        {currentImage.src && currentImage.src !== "" ? (
          <>
            <Image
              className="h-full w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={currentImage.altText || "Product image"}
              src={storageUrl(currentImage.src)}
              priority={true}
              unoptimized={true}
            />

            {/* Navigation Arrows (visible on hover or mobile) */}
            {images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => updateImage(previousImageIndex.toString())}
                  aria-label="Previous product image"
                  className="rounded-full bg-white/90 backdrop-blur-sm p-3 text-mitologi-navy shadow-sm hover:bg-mitologi-navy hover:text-white hover:scale-110 transition-all border border-slate-200"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => updateImage(nextImageIndex.toString())}
                  aria-label="Next product image"
                  className="rounded-full bg-white/90 backdrop-blur-sm p-3 text-mitologi-navy shadow-sm hover:bg-mitologi-navy hover:text-white hover:scale-110 transition-all border border-slate-200"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-sans font-medium text-slate-400">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails - Horizontal Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-hide">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <button
                key={`${image.src}-${index}`}
                onClick={() => updateImage(index.toString())}
                aria-label={`Select product image ${index + 1}`}
                className={`relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-200 ease-out bg-slate-50 ${
                  isActive
                    ? "border-mitologi-gold shadow-md scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <Image
                  src={storageUrl(image.src)}
                  alt={image.altText || `Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

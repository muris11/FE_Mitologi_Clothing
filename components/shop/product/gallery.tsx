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

  const currentImage = images[imageIndex] || {
    src: "",
    altText: "Product image",
  };

  return (
    <div className="flex flex-col gap-3">
      <div 
        className="relative aspect-[4/5] w-full rounded-lg bg-slate-100 overflow-hidden group min-h-[300px]"
        style={{ aspectRatio: '4/5' }}
      >
        {currentImage.src && currentImage.src !== "" ? (
          <>
            <Image
              className="h-full w-full object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={currentImage.altText || "Product image"}
              src={storageUrl(currentImage.src)}
              priority={true}
              unoptimized={true}
            />

            {images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
                <button
                  onClick={() => updateImage(previousImageIndex.toString())}
                  aria-label="Previous product image"
                  className="rounded-full bg-white/90 backdrop-blur-sm p-2 text-slate-700 shadow-sm hover:bg-white transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => updateImage(nextImageIndex.toString())}
                  aria-label="Next product image"
                  className="rounded-full bg-white/90 backdrop-blur-sm p-2 text-slate-700 shadow-sm hover:bg-white transition-colors"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-slate-400">No Image</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <button
                key={`${image.src}-${index}`}
                onClick={() => updateImage(index.toString())}
                aria-label={`Select product image ${index + 1}`}
                className={`relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                  isActive
                    ? "border-slate-900 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100"
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

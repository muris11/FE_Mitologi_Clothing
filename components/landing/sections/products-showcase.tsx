import { Category } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function ProductsShowcase({
  categories = [],
}: {
  categories?: Category[];
}) {
  if (!categories || categories.length === 0) return null;

  return (
    <MotionSection className="bg-slate-50 py-24 sm:py-32 border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
            <h2 className="font-sans tracking-widest uppercase text-sm text-mitologi-gold font-bold">
              PRODUK UNGGULAN
            </h2>
            <span className="h-1 w-8 bg-mitologi-gold rounded-full" />
          </div>
          <h3 className="text-4xl lg:text-5xl font-sans font-extrabold text-mitologi-navy mb-6 tracking-tight">
            Apa yang Kami Buat?
          </h3>
          <p className="mt-4 text-lg leading-8 text-slate-500 font-medium font-sans">
            Berbagai macam kebutuhan sandang dan merchandise kustom kualitas
            premium untuk Anda.
          </p>
        </div>

        <StaggerGrid className="mx-auto mt-10 sm:mt-16 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <StaggerGridItem key={category.name}>
              <Link
                href={`/produk?category=${category.handle}`}
                className="group relative block overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-soft hover:shadow-hover transition-all duration-500"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-white relative">
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/90 via-mitologi-navy/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Image with subtle zoom effect */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: category.image
                        ? `url(${storageUrl(category.image)})`
                        : "none",
                    }}
                  >
                    {!category.image && (
                      <div className="absolute inset-0 flex items-center justify-center p-8 opacity-20 transition-all duration-500 group-hover:opacity-40">
                        <Image
                          src="/images/logo.png"
                          alt={category.name}
                          width={200}
                          height={200}
                          className="w-2/3 h-auto object-contain brightness-0 flex-shrink-0"
                        />
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-x-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="h-0.5 w-4 bg-mitologi-gold rounded-full"></span>
                      <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <h3 className="text-2xl font-sans font-bold text-white tracking-tight absolute bottom-6 group-hover:opacity-0 transition-opacity duration-300">
                      {category.name}
                    </h3>

                    <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 font-sans font-medium mt-1">
                      {category.description || "Lihat koleksi lengkap"}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerGridItem>
          ))}
        </StaggerGrid>
        <div className="mt-12 text-center">
          <Link
            href="/produk"
            className="inline-flex items-center justify-center rounded-full bg-mitologi-navy px-8 py-3.5 text-sm font-bold font-sans tracking-wide text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-mitologi-navy-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mitologi-navy"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </div>
    </MotionSection>
  );
}

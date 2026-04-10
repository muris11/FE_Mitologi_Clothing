"use client";

import { SectionHeading } from "components/ui/section-heading";
import { Facility } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import {
  MotionSection,
  StaggerGrid,
  StaggerGridItem,
} from "components/ui/motion";

export function ProductionFacilities({
  facilities,
}: {
  facilities?: Facility[];
}) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-slate-200/50">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 flex flex-col items-center">
          <SectionHeading
            overline="Bengkel Kreativitas"
            title="Fasilitas Produksi Terpadu"
            subtitle="Pusat dari setiap mahakarya. Didukung mesin berteknologi mutakhir dan tenaga ahli berpengalaman untuk memastikan setiap produk memenuhi standar tertinggi."
            className="items-center"
          />
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto auto-rows-[300px]">
          {facilities.map((facility, index) => {
            // Create a varied grid layout: some items might span 2 columns if conditions match
            const isLarge = index === 0 || index === 3;

            return (
              <StaggerGridItem
                key={facility.id}
                className={`group relative overflow-hidden rounded-3xl bg-slate-100 shadow-soft border border-slate-200 hover:shadow-hover transition-all duration-500 ${isLarge ? "md:col-span-2" : ""}`}
              >
                {facility.image ? (
                  <>
                    <img
                      src={storageUrl(facility.image)}
                      alt={facility.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mitologi-navy/90 via-mitologi-navy/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-mitologi-navy/10 flex items-center justify-center">
                    <span className="text-slate-400 font-sans tracking-widest uppercase text-xs">
                      No Image
                    </span>
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="w-8 h-px bg-mitologi-gold"></span>
                    <span className="text-mitologi-gold text-[10px] uppercase tracking-widest font-bold">
                      Mitologi
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mb-2 tracking-tight group-hover:text-mitologi-gold transition-colors duration-300">
                    {facility.name}
                  </h3>
                  <p className="text-slate-200 font-sans text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    {facility.description}
                  </p>
                </div>
              </StaggerGridItem>
            );
          })}
        </StaggerGrid>
      </div>
    </MotionSection>
  );
}

"use client";

import { Partner } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import { MotionSection } from "components/ui/motion";

export function PartnerClients({ partners }: { partners?: Partner[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <MotionSection className="relative py-20 bg-mitologi-cream overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-bold font-sans text-mitologi-navy uppercase tracking-widest">
            Klien & Partner Kami
          </h2>
          <div className="w-16 h-1 bg-mitologi-gold mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap group">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-mitologi-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-mitologi-cream to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-scroll w-[200%] md:w-[150%]">
          {/* Double the list to create infinite loop effect */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="px-6 md:px-12 flex items-center justify-center min-w-max"
            >
              <div className="relative w-32 h-16 md:w-48 md:h-24">
                {partner.logo ? (
                  <Image
                    src={storageUrl(partner.logo)}
                    alt={partner.name || "Partner logo"}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 128px, 192px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 font-sans text-lg md:text-xl bg-slate-100/50 rounded-lg whitespace-normal leading-tight text-center px-4">
                    {partner.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

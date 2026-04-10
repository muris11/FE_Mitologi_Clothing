"use client";

import { Button } from "components/ui/button";
import { SiteSettings } from "lib/api/types";
import { MotionSection, MotionDiv } from "components/ui/motion";

export function AboutContactCTA({ settings }: { settings?: SiteSettings }) {
  return (
    <MotionSection className="py-24 sm:py-32 bg-mitologi-navy border-y border-mitologi-navy-light/20 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-mitologi-gold/10 rounded-full blur-[120px] -translate-x-1/2 -z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-mitologi-navy-light/40 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 -z-0" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
        <MotionDiv className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-glass overflow-hidden">
          <div className="px-6 py-20 md:px-20 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-sm">
              Siap Mewujudkan <br className="hidden md:inline" />
              <span className="text-mitologi-gold font-bold">
                Ide Clothing Anda?
              </span>
            </h2>

            <p className="text-slate-200 font-sans font-medium text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-sm">
              Diskusikan kebutuhan Anda dengan tim kami. Gratis konsultasi
              desain dan estimasi biaya tanpa syarat.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              {settings?.contact?.whatsappNumber && (
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="text-base font-bold shadow-soft hover:shadow-hover"
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL}/${settings.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat via WhatsApp
                  </a>
                </Button>
              )}
              {settings?.contact?.socialInstagram &&
                settings?.contact?.socialInstagramEnabled !== "0" && (
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm shadow-soft text-base font-bold"
                  >
                    <a
                      href={settings.contact.socialInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kunjungi Instagram
                    </a>
                  </Button>
                )}
            </div>

            {settings?.contact?.contactAddress && (
              <div className="mt-16 pt-8 border-t border-white/10 text-slate-400 font-sans font-medium text-sm max-w-2xl mx-auto">
                <p>{settings.contact.contactAddress}</p>
              </div>
            )}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}

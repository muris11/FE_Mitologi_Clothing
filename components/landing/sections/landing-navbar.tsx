"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { MenuToggleIcon } from "components/ui/menu-toggle-icon";
import { SiteSettings } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { title: "Beranda", path: "/" },
  { title: "Tentang Kami", path: "/tentang-kami" },
  { title: "Kategori", path: "/kategori" },
  { title: "Layanan", path: "/layanan" },
  { title: "Portofolio", path: "/portofolio" },
  { title: "Kontak", path: "/kontak" },
];

const transparentDesktopRoutes = [
  "/",
];

export function LandingNavbar({ settings }: { settings?: SiteSettings }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isTransparentRoute = transparentDesktopRoutes.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`),
  );
  const isHeroState = isTransparentRoute && !isScrolled;
  const logoSrc = storageUrl(settings?.general?.siteLogo, "/images/logo.png");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", handleDesktop);
    return () => mq.removeEventListener("change", handleDesktop);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isScrolled ? "py-0" : "py-0"
        )}
      >
        <div
          className={cn(
            "flex h-20 sm:h-[88px] items-center justify-between px-5 sm:px-8 lg:px-12 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            isHeroState
              ? "bg-transparent border-b border-white/[0.06]"
              : isMobileMenuOpen
                ? "bg-white border-b border-transparent"
                : "bg-white/80 border-b border-slate-200/60 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          )}
        >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 cursor-pointer">
              <Image
                src={logoSrc}
                alt="Mitologi Clothing"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.png';
                }}
              />
              <span
                className={cn(
                  "block text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isHeroState ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" : "text-mitologi-navy",
                )}
              >
                Mitologi Clothing
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center">
              <div
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-1.5 py-1.5 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isHeroState
                    ? "bg-white/[0.06] border border-white/[0.1]"
                    : "bg-slate-50/80 border border-slate-100",
                )}
              >
                {menuItems.map((item) => {
                  const isActive =
                    item.path === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold focus-visible:ring-offset-1",
                        isActive
                          ? isHeroState
                            ? "bg-white/20 text-white shadow-sm"
                            : "bg-mitologi-navy text-white"
                          : isHeroState
                            ? "text-white hover:text-white hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                            : "text-slate-600 hover:text-mitologi-navy hover:bg-white",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant={isHeroState ? "gold" : "primary"}
                className={cn(
                  "hidden lg:inline-flex h-10 rounded-full px-5 text-xs font-bold transition-all duration-300 ease-out cursor-pointer hover:-translate-y-0.5 shadow-lg",
                  isHeroState
                    ? "shadow-mitologi-gold/20"
                    : "shadow-mitologi-navy/20",
                )}
              >
                <Link href="/shop" className="flex items-center">
                  <ShoppingBagIcon className="mr-2 h-4 w-4" />
                  Mulai Belanja
                </Link>
              </Button>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 lg:hidden cursor-pointer",
                  isHeroState
                    ? "text-white hover:bg-white/10 focus-visible:ring-white"
                    : "text-mitologi-navy hover:bg-slate-100 focus-visible:ring-mitologi-navy",
                )}
              >
                <MenuToggleIcon
                  open={isMobileMenuOpen}
                  className="h-8 w-8"
                  duration={400}
                />
              </button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu - dropdown from navbar */}
      <div
        className={cn(
          "fixed inset-x-0 top-[80px] sm:top-[88px] z-30 lg:hidden transition-all duration-300 ease-out bg-white border-b border-slate-200 overflow-hidden",
          isMobileMenuOpen
            ? "max-h-[80vh] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="px-6 py-5">
          <nav className="flex flex-col">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block text-lg font-semibold py-3 transition-colors cursor-pointer",
                    isActive
                      ? "text-mitologi-navy"
                      : "text-slate-600 hover:text-mitologi-navy"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4">
            <Button
              asChild
              className="h-12 w-full rounded-xl text-sm font-bold bg-mitologi-navy text-white hover:bg-mitologi-navy-light transition-colors cursor-pointer"
            >
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Mulai Belanja
              </Link>
            </Button>
          </div>
        </div>
      </div>

    </>
  );
}

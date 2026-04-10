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
  "/tentang-kami",
  "/kategori",
  "/layanan",
  "/portofolio",
  "/kontak",
  "/privacy-policy",
  "/terms-of-service",
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
    const onScroll = () => setIsScrolled(window.scrollY > 24);
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
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };
    mq.addEventListener("change", handleDesktop);
    return () => mq.removeEventListener("change", handleDesktop);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const shellClassName = cn(
    "w-full rounded-[28px] border px-3 sm:px-4 transition-all duration-500 ease-out motion-reduce:transition-none",
    isHeroState
      ? "border-transparent bg-transparent shadow-none"
      : "border-app bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(10,20,35,0.09)]",
  );

  const desktopMenuShellClassName = cn(
    "inline-flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ease-out motion-reduce:transition-none",
    isHeroState
      ? "border border-white/12 bg-white/10 backdrop-blur-lg shadow-[0_12px_30px_rgba(10,20,35,0.12)]"
      : "border border-app/70 bg-white/75 backdrop-blur-md shadow-[0_10px_24px_rgba(10,20,35,0.06)]",
  );

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-24">
        <div className="mx-auto flex h-full w-full max-w-[1500px] items-center px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className={shellClassName}>
            <div className="flex h-[72px] w-full items-center justify-between gap-3 xl:gap-4">
              {/* Logo */}
              <div className="flex min-w-0 items-center gap-2 lg:min-w-[180px]">
                <Link href="/" className="group flex items-center gap-2 py-2">
                  <Image
                    src={logoSrc}
                    alt="Mitologi Clothing"
                    width={64}
                    height={64}
                    className="h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] drop-shadow-[0_8px_18px_rgba(10,20,35,0.32)] lg:h-[52px] lg:w-[52px]"
                    priority
                  />
                  <span
                    className={cn(
                      "block max-w-[120px] truncate text-[0.85rem] font-semibold tracking-[0.01em] transition-colors duration-300 sm:max-w-none sm:text-[0.92rem] xl:text-[1rem]",
                      isHeroState
                        ? "text-white drop-shadow-[0_6px_18px_rgba(10,20,35,0.45)]"
                        : "text-mitologi-navy",
                    )}
                  >
                    Mitologi Clothing
                  </span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden flex-1 justify-center lg:flex">
                <div className={desktopMenuShellClassName}>
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
                          "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1ea] xl:px-4",
                          isActive
                            ? isHeroState
                              ? "bg-white/10 text-white"
                              : "bg-mitologi-navy/[0.08] text-mitologi-navy"
                            : isHeroState
                              ? "text-slate-100 hover:bg-white/10 hover:text-white"
                              : "text-slate-600 hover:bg-white hover:text-mitologi-navy",
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* CTA & Mobile Toggle */}
              <div className="flex min-w-0 items-center justify-end gap-2 lg:min-w-[180px]">
                <div className="hidden lg:flex">
                  <Button
                    asChild
                    className="inline-flex h-12 shrink-0 rounded-full px-5 text-sm font-bold text-mitologi-navy shadow-[0_12px_28px_rgba(185,149,91,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(185,149,91,0.34)] group"
                    variant="gold"
                  >
                    <Link
                      href="/shop"
                      className="text-mitologi-navy hover:text-mitologi-navy flex items-center"
                    >
                      <ShoppingBagIcon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      Mulai Belanja
                    </Link>
                  </Button>
                </div>

                {/* Hamburger Button */}
                <button
                  type="button"
                  aria-label={
                    isMobileMenuOpen
                      ? "Tutup menu navigasi"
                      : "Buka menu navigasi"
                  }
                  aria-expanded={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 lg:hidden",
                    isHeroState
                      ? "border-transparent bg-transparent text-white hover:bg-white/10 focus-visible:ring-white"
                      : "border-app bg-white text-slate-600 hover:bg-app-cream hover:text-mitologi-navy focus-visible:ring-mitologi-navy",
                  )}
                >
                  <MenuToggleIcon
                    open={isMobileMenuOpen}
                    className="h-7 w-7"
                    duration={300}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Simple Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-24 z-40 lg:hidden">
          <div className="mx-4 rounded-[28px] border border-app bg-white shadow-[0_20px_60px_rgba(10,20,35,0.24)]">
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-6">
              <nav className="flex flex-col gap-1">
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
                        "group relative flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy",
                        isActive
                          ? "bg-mitologi-navy/5 text-mitologi-navy"
                          : "text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy",
                      )}
                    >
                      {/* Active Dot Indicator */}
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300 ease-out",
                          isActive
                            ? "bg-mitologi-gold scale-100"
                            : "bg-slate-300 scale-0 group-hover:scale-100 group-hover:bg-mitologi-navy/30",
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <Button
                  asChild
                  className="h-12 w-full rounded-full text-sm font-bold shadow-[0_12px_28px_rgba(15,33,58,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,33,58,0.18)]"
                  variant="primary"
                >
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingBagIcon className="mr-2 h-4 w-4" />
                    Mulai Belanja
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

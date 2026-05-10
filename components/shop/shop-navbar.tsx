"use client";

import {
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import CartModal from "components/shop/cart/modal";
import { Button } from "components/ui/button";
import { MenuToggleIcon } from "components/ui/menu-toggle-icon";
import { useAuth } from "lib/hooks/useAuth";
import { useCart } from "lib/hooks/useCart";
import { cn } from "lib/utils";
import { storageUrl } from "lib/utils/storage-url";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { title: "Beranda", path: "/" },
  { title: "Katalog", path: "/shop" },
  { title: "Panduan Ukuran", path: "/shop/panduan-ukuran" },
];

export function ShopNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart, openCart } = useCart();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [user?.avatarUrl]);

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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CartModal />
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isScrolled ? "py-0" : "py-0"
        )}
      >
        <div
          className={cn(
            "flex h-20 sm:h-[88px] items-center justify-between px-5 sm:px-8 lg:px-12 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            isMobileMenuOpen
              ? "bg-white border-b border-transparent"
              : isScrolled
                ? "bg-white/80 border-b border-slate-200/60 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                : "bg-white/80 border-b border-slate-200/60 shadow-none",
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 cursor-pointer">
            <Image
              src="/images/logo.png"
              alt="Mitologi Clothing"
              width={64}
              height={64}
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              priority
            />
            <span className="block text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-mitologi-navy">
              Mitologi Clothing
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-0.5 rounded-full px-1.5 py-1.5 bg-slate-50/80 border border-slate-100">
              {menuItems.map((item) => {
                const isActive =
                  item.path === "/shop"
                    ? pathname.startsWith("/shop") &&
                      !pathname.startsWith("/shop/panduan-ukuran") &&
                      !pathname.startsWith("/shop/account")
                    : pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-gold focus-visible:ring-offset-1",
                      isActive
                        ? "bg-mitologi-navy text-white"
                        : "text-slate-600 hover:text-mitologi-navy hover:bg-white",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={openCart}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full text-mitologi-navy hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {(cart?.totalQuantity || 0) > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mitologi-gold text-[10px] font-bold text-mitologi-navy">
                  {cart?.totalQuantity}
                </span>
              )}
            </button>

            {/* User Menu Desktop */}
            {user ? (
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="group flex items-center gap-2 rounded-full p-1.5 pr-3 text-slate-700 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
                >
                  {user.avatarUrl && !avatarLoadError ? (
                    <Image
                      src={storageUrl(user.avatarUrl)}
                      alt={user.name || "Foto profil"}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover border border-slate-200"
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-slate-500" />
                    </div>
                  )}
                  <span className="font-bold text-sm text-mitologi-navy">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="font-bold text-sm text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/shop/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy transition-colors duration-200 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        Akun Saya
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors duration-200 text-left cursor-pointer"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                asChild
                className={cn(
                  "hidden lg:inline-flex h-10 rounded-full px-5 text-xs font-bold transition-all duration-300 ease-out cursor-pointer hover:-translate-y-0.5",
                  "bg-mitologi-navy text-white hover:bg-mitologi-navy-light shadow-[0_4px_16px_rgba(12,26,46,0.2)]",
                )}
              >
                <Link href="/shop/login" className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Masuk
                </Link>
              </Button>
            )}

            {/* Hamburger */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 lg:hidden cursor-pointer text-mitologi-navy hover:bg-slate-100 focus-visible:ring-mitologi-navy"
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

      {/* Mobile Menu - Full screen slide down */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-30 lg:hidden transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none bg-white",
          isMobileMenuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none overflow-hidden",
        )}
      >
        <div className={cn(
          "flex flex-col h-full pt-28 pb-8 px-6 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}>
          {/* User Info */}
          {user && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              {user.avatarUrl && !avatarLoadError ? (
                <Image
                  src={storageUrl(user.avatarUrl)}
                  alt={user.name || "Foto profil"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  onError={() => setAvatarLoadError(true)}
                />
              ) : (
                <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-mitologi-navy truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full p-2 text-rose-600 hover:bg-rose-50 transition-colors duration-200 cursor-pointer"
                aria-label="Keluar"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item, idx) => {
              const isActive =
                item.path === "/shop"
                  ? pathname.startsWith("/shop") &&
                    !pathname.startsWith("/shop/panduan-ukuran") &&
                    !pathname.startsWith("/shop/account")
                  : pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block text-2xl sm:text-3xl font-bold tracking-tight py-3 transition-all duration-300 ease-out cursor-pointer",
                    isActive
                      ? "text-mitologi-gold"
                      : "text-mitologi-navy hover:text-mitologi-gold active:text-mitologi-gold"
                  )}
                  style={{ transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : "0ms" }}
                >
                  {item.title}
                </Link>
              );
            })}

            {user && (
              <Link
                href="/shop/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block text-2xl sm:text-3xl font-bold tracking-tight py-3 transition-all duration-300 ease-out cursor-pointer",
                  pathname.startsWith("/shop/account")
                    ? "text-mitologi-gold"
                    : "text-mitologi-navy hover:text-mitologi-gold"
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${menuItems.length * 50}ms` : "0ms" }}
              >
                Akun Saya
              </Link>
            )}
          </nav>

          {/* Bottom CTA */}
          <div className="mt-auto">
            {!user ? (
              <Button
                asChild
                className="h-14 w-full rounded-2xl text-base font-bold bg-mitologi-navy text-white hover:bg-mitologi-navy-light transition-all duration-300 cursor-pointer"
              >
                <Link href="/shop/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <UserIcon className="mr-2 h-5 w-5" />
                  Masuk / Daftar
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="h-14 w-full rounded-2xl text-base font-bold bg-mitologi-navy text-white hover:bg-mitologi-navy-light transition-all duration-300 cursor-pointer"
              >
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBagIcon className="mr-2 h-5 w-5" />
                  Mulai Belanja
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

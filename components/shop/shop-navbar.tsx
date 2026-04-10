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
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mq.addEventListener("change", handleDesktop);
    return () => mq.removeEventListener("change", handleDesktop);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shellClassName = cn(
    "w-full rounded-[28px] border px-3 sm:px-4 transition-all duration-500 ease-out motion-reduce:transition-none",
    isScrolled
      ? "border-app bg-white/92 backdrop-blur-xl shadow-[0_8px_30px_rgba(10,20,35,0.09)]"
      : "border-app/70 bg-white/75 backdrop-blur-md shadow-[0_10px_24px_rgba(10,20,35,0.06)]",
  );

  const desktopMenuShellClassName = cn(
    "inline-flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ease-out motion-reduce:transition-none",
    isScrolled
      ? "border border-app/70 bg-white/75 backdrop-blur-md shadow-[0_10px_24px_rgba(10,20,35,0.06)]"
      : "border border-app/70 bg-white/75 backdrop-blur-md shadow-[0_10px_24px_rgba(10,20,35,0.06)]",
  );

  return (
    <>
      <CartModal />
      <nav className="fixed inset-x-0 top-0 z-50 h-24">
        <div className="mx-auto flex h-full w-full max-w-[1500px] items-center px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className={shellClassName}>
            <div className="flex h-[72px] w-full items-center justify-between gap-3 xl:gap-4">
              {/* Left: Logo */}
              <div className="flex min-w-0 items-center gap-2 lg:min-w-[180px]">
                <Link href="/" className="group flex items-center gap-2 py-2">
                  <Image
                    src="/images/logo.png"
                    alt="Mitologi Clothing Logo"
                    width={64}
                    height={64}
                    className="h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03] drop-shadow-[0_8px_18px_rgba(10,20,35,0.32)] lg:h-[52px] lg:w-[52px]"
                    priority
                  />
                  <span className="block max-w-[120px] truncate text-[0.85rem] font-semibold tracking-[0.01em] text-mitologi-navy sm:max-w-none sm:text-[0.92rem] xl:text-[1rem]">
                    Mitologi Clothing
                  </span>
                </Link>
              </div>

              {/* Center: Desktop Menu */}
              <div className="hidden flex-1 justify-center lg:flex">
                <div className={desktopMenuShellClassName}>
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
                          "relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1ea] xl:px-4",
                          isActive
                            ? "bg-mitologi-navy/[0.08] text-mitologi-navy"
                            : "text-slate-600 hover:bg-white hover:text-mitologi-navy",
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex min-w-0 items-center justify-end gap-2 lg:min-w-[180px]">
                {/* Cart Button */}
                <button
                  onClick={openCart}
                  className="group relative rounded-full border border-app bg-white p-2.5 text-slate-600 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(10,20,35,0.08)] hover:text-mitologi-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  {(cart?.totalQuantity || 0) > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-mitologi-gold text-[10px] font-bold text-mitologi-navy shadow-sm">
                      {cart?.totalQuantity}
                    </span>
                  )}
                </button>

                {/* User Menu Desktop */}
                {user ? (
                  <div className="relative hidden lg:block" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="group flex items-center gap-2 rounded-full border border-app bg-white p-1.5 pr-3 text-slate-700 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(10,20,35,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy"
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
                        <div className="h-8 w-8 rounded-full border border-slate-200 bg-app-cream flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-slate-500 group-hover:text-mitologi-navy transition-colors duration-300" />
                        </div>
                      )}
                      <span className="font-sans font-bold text-sm text-mitologi-navy">
                        {user.name?.split(" ")[0]}
                      </span>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                          <p className="font-sans font-bold text-sm text-slate-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs font-sans text-slate-500 truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/shop/account"
                            className="flex items-center gap-3 px-4 py-2 font-sans font-medium text-sm text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy transition-colors duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserIcon className="h-4 w-4" />
                            Akun Saya
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2 font-sans font-medium text-sm text-rose-600 hover:bg-rose-50 transition-colors duration-200 text-left"
                          >
                            <UserIcon className="h-4 w-4" />
                            Keluar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    asChild
                    variant="primary"
                    className="hidden lg:inline-flex h-10 shrink-0 rounded-full px-4 text-xs font-bold shadow-[0_12px_28px_rgba(185,149,91,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(185,149,91,0.34)]"
                  >
                    <Link
                      href="/shop/login"
                      className="flex items-center text-inherit"
                    >
                      <UserIcon className="mr-1.5 h-3.5 w-3.5" />
                      Masuk
                    </Link>
                  </Button>
                )}

                {/* Hamburger Button */}
                <button
                  type="button"
                  aria-label={
                    isMobileMenuOpen
                      ? "Tutup menu navigasi"
                      : "Buka menu navigasi"
                  }
                  aria-expanded={isMobileMenuOpen}
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 lg:hidden",
                    isScrolled
                      ? "border-app bg-white text-slate-600 hover:bg-app-cream hover:text-mitologi-navy focus-visible:ring-mitologi-navy"
                      : "border-app/70 bg-white/75 text-slate-600 hover:bg-white hover:text-mitologi-navy focus-visible:ring-mitologi-navy",
                  )}
                  onClick={() => setIsMobileMenuOpen((value) => !value)}
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

      {/* Mobile Menu - Clean Dropdown (No Background Overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed top-24 left-0 right-0 z-40 lg:hidden">
          <div className="mx-4 rounded-[28px] border border-app bg-white shadow-[0_20px_60px_rgba(10,20,35,0.24)]">
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-6">
              {/* User Info (Mobile) */}
              {user && (
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
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
                    <div className="h-10 w-10 rounded-full border border-slate-200 bg-app-cream flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-slate-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-bold text-sm text-mitologi-navy truncate">
                      {user.name}
                    </p>
                    <p className="text-xs font-sans text-slate-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-full p-2 text-rose-600 hover:bg-rose-50 transition-colors duration-200"
                    aria-label="Keluar"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              )}

              <nav className="flex flex-col gap-1">
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

                {/* Link Akun Saya untuk user yang sudah login */}
                {user && (
                  <Link
                    href="/shop/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy",
                      pathname.startsWith("/shop/account")
                        ? "bg-mitologi-navy/5 text-mitologi-navy"
                        : "text-slate-700 hover:bg-slate-50 hover:text-mitologi-navy",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-all duration-300 ease-out",
                        pathname.startsWith("/shop/account")
                          ? "bg-mitologi-gold scale-100"
                          : "bg-slate-300 scale-0 group-hover:scale-100 group-hover:bg-mitologi-navy/30",
                      )}
                    />
                    <span>Akun Saya</span>
                  </Link>
                )}
              </nav>

              {/* User Section (Mobile) */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                {!user && (
                  <Button
                    asChild
                    className="h-12 w-full rounded-full text-sm font-bold shadow-[0_12px_28px_rgba(15,33,58,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,33,58,0.18)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                  >
                    <Link href="/shop/login">Masuk / Daftar</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

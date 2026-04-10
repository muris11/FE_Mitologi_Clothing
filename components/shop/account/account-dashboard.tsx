"use client";

import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Order, User } from "lib/api/types";
import { useAuth } from "lib/hooks/useAuth";
import { storageUrl } from "lib/utils/storage-url";
import { useEffect, useState } from "react";
import { OrdersTab } from "./orders-tab";
import { ProfileTab } from "./profile-tab";
import { SettingsTab } from "./settings-tab";
import { WishlistTab } from "./wishlist-tab";

export function AccountDashboard({
  user,
  orders,
}: {
  user: User;
  orders: Order[];
}) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "wishlist" | "settings"
  >("profile");
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [user.avatarUrl]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    window.location.href = "/shop/login";
  };

  const tabs = [
    { id: "profile" as const, label: "Profil Saya", icon: UserCircleIcon },
    { id: "orders" as const, label: "Pesanan Saya", icon: ShoppingBagIcon },
    { id: "wishlist" as const, label: "Wishlist", icon: HeartIcon },
    { id: "settings" as const, label: "Pengaturan", icon: Cog6ToothIcon },
  ];

  // Calculate Stats
  const totalOrders = orders.length;
  const totalSpend = orders
    .filter((o) =>
      ["processing", "completed", "shipped", "paid"].includes(o.status),
    )
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  const userSince = new Date(user.createdAt || Date.now()).getFullYear();

  return (
    <div className="lg:grid lg:grid-cols-12 min-h-[700px] bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 border-b border-slate-200 flex justify-between items-center bg-white">
        <span className="font-sans font-bold text-mitologi-navy text-sm">
          Menu Akun
        </span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:bg-slate-50 hover:text-mitologi-navy rounded-xl border border-slate-200 transition-colors shadow-sm"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "lg:col-span-3 border-r border-slate-200 bg-slate-50 p-6 relative overflow-hidden",
          "lg:block", // Always visible on desktop
          isMobileMenuOpen ? "block border-b border-slate-200" : "hidden", // Toggle on mobile
        )}
      >
        <div className="relative z-10 space-y-2">
          <div className="mb-6 px-2 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-sans font-bold text-xl overflow-hidden shrink-0 shadow-sm text-mitologi-navy">
              {user.avatarUrl && !avatarLoadError ? (
                <img
                  src={storageUrl(user.avatarUrl)}
                  alt={user.name || "Foto profil"}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarLoadError(true)}
                />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="font-sans font-bold text-sm text-mitologi-navy truncate">
                {user.name}
              </p>
              <p className="text-sm text-slate-500 font-sans truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mb-4 px-3">
            <h3 className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wider mb-2">
              Menu Utama
            </h3>
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={clsx(
                  "group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-sans font-semibold transition-all relative mt-1",
                  isActive
                    ? "text-mitologi-navy bg-white shadow-sm border border-slate-200"
                    : "text-slate-600 bg-transparent hover:bg-slate-100/50 hover:text-mitologi-navy border border-transparent",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={clsx(
                      "h-5 w-5 transition-colors",
                      isActive
                        ? "text-mitologi-gold"
                        : "text-slate-400 group-hover:text-mitologi-navy",
                    )}
                  />
                  <span>{tab.label}</span>
                </div>
                {isActive && (
                  <ChevronRightIcon className="w-4 h-4 text-slate-400 stroke-[2px]" />
                )}
              </button>
            );
          })}

          <div className="pt-6 mt-6 border-t border-slate-200 px-2">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-sans font-semibold text-red-600 bg-transparent hover:bg-red-50 hover:text-red-700 border border-transparent transition-colors"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-red-600" />
              <span className="truncate">
                {isLoggingOut ? "Keluar…" : "Keluar Aplikasi"}
              </span>
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-9 bg-white p-6 lg:p-10 relative">
        <div className="h-full">
          {activeTab === "profile" && (
            <ProfileTab
              user={user}
              totalOrders={totalOrders}
              totalSpend={totalSpend}
              userSince={userSince}
            />
          )}
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "wishlist" && <WishlistTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { id: "profile" as const, label: "Profil", icon: UserCircleIcon },
    { id: "orders" as const, label: "Pesanan", icon: ShoppingBagIcon },
    { id: "wishlist" as const, label: "Wishlist", icon: HeartIcon },
    { id: "settings" as const, label: "Pengaturan", icon: Cog6ToothIcon },
  ];

  const totalOrders = orders.length;
  const totalSpend = orders
    .filter((o) =>
      ["processing", "completed", "shipped", "paid"].includes(o.status),
    )
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  const userSince = new Date(user.createdAt || Date.now()).getFullYear();

  return (
    <div>
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex-1 py-2 text-xs font-medium rounded-md transition-colors text-center",
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-8 space-y-6">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-sm font-medium text-white overflow-hidden shrink-0">
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
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <nav className="space-y-0.5">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "text-slate-900 bg-slate-100 font-medium"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && (
                      <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>{isLoggingOut ? "Keluar…" : "Keluar"}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9">
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

      {/* Mobile Logout */}
      <div className="lg:hidden mt-10 pt-6 border-t border-slate-100">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-sm text-red-600 hover:text-red-700"
        >
          {isLoggingOut ? "Keluar…" : "Keluar dari akun"}
        </button>
      </div>
    </div>
  );
}

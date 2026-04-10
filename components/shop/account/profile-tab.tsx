"use client";

import {
  CalendarDaysIcon,
  CreditCardIcon,
  EnvelopeIcon,
  HomeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PlusIcon,
  ShoppingBagIcon,
  StarIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "components/shared/ui/modal";
import { Button } from "components/ui/button";
import { updateAvatar } from "lib/api";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "lib/api/addresses";
import { updateProfile } from "lib/api/account";
import clsx from "clsx";
import { UnknownError, User, Address } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { useAuth } from "lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";

interface ProfileTabProps {
  user: User;
  totalOrders: number;
  totalSpend: number;
  userSince: number;
}

export function ProfileTab({
  user,
  totalOrders,
  totalSpend,
  userSince,
}: ProfileTabProps) {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const { addToast } = useToast();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  // Load addresses on mount
  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [user.avatarUrl]);

  const loadAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data || []);
    } catch {
      setAddresses([]);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const [profileForm, setProfileForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const [addressForm, setAddressForm] = useState({
    label: "",
    recipientName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Indonesia",
    isPrimary: false,
  });

  const resetAddressForm = () => {
    setAddressForm({
      label: "",
      recipientName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      province: "",
      postalCode: "",
      country: "Indonesia",
      isPrimary: false,
    });
    setEditingAddress(null);
  };

  const openAddAddress = () => {
    resetAddressForm();
    setIsAddressModalOpen(true);
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      label: address.label || "",
      recipientName: address.recipientName || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      province: address.province || "",
      postalCode: address.postalCode || "",
      country: address.country || "Indonesia",
      isPrimary: address.isPrimary || false,
    });
    setIsAddressModalOpen(true);
  };

  const getReadableError = (error: unknown, fallback: string) => {
    const err = error as UnknownError & {
      errors?: Record<string, string[]>;
      response?: {
        data?: {
          errors?: Record<string, string[]>;
          message?: string;
          error?: string;
        };
      };
    };

    const avatarFieldError =
      err?.errors?.avatar?.[0] ?? err?.response?.data?.errors?.avatar?.[0];

    if (avatarFieldError) return avatarFieldError;

    const genericMessage =
      err?.message ||
      err?.response?.data?.message ||
      err?.response?.data?.error;

    return genericMessage || fallback;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(profileForm);
      await refreshProfile();
      addToast({ variant: "success", title: "Profil berhasil diperbarui" });
      setIsProfileModalOpen(false);
      router.refresh();
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Gagal memperbarui profil",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, addressForm);
        addToast({ variant: "success", title: "Alamat berhasil diperbarui" });
      } else {
        await createAddress(addressForm);
        addToast({ variant: "success", title: "Alamat berhasil ditambahkan" });
      }
      await loadAddresses();
      await refreshProfile();
      router.refresh();
      setIsAddressModalOpen(false);
      resetAddressForm();
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Gagal menyimpan alamat",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) return;

    try {
      await deleteAddress(addressId);
      await loadAddresses();
      router.refresh();
      addToast({ variant: "success", title: "Alamat berhasil dihapus" });
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Gagal menghapus alamat",
      });
    }
  };

  const handleSetPrimary = async (addressId: number) => {
    try {
      await updateAddress(addressId, { isPrimary: true });
      await loadAddresses();
      router.refresh();
      addToast({ variant: "success", title: "Alamat utama diperbarui" });
    } catch (error: unknown) {
      const err = error as UnknownError;
      addToast({
        variant: "error",
        title: err?.message || "Gagal memperbarui alamat utama",
      });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError(null);

    if (file.size > 2 * 1024 * 1024) {
      const message = "Ukuran file maksimum adalah 2MB";
      setAvatarError(message);
      addToast({ variant: "error", title: message });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploadingAvatar(true);
    try {
      await updateAvatar(file);
      await refreshProfile();
      setAvatarError(null);
      addToast({
        variant: "success",
        title: "Foto profil berhasil diperbarui",
      });
      router.refresh();
    } catch (error: unknown) {
      const message = getReadableError(error, "Gagal mengunggah foto profil");
      setAvatarError(message);
      addToast({ variant: "error", title: message });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const statsCards = [
    {
      label: "Total Pesanan",
      value: totalOrders.toString(),
      icon: ShoppingBagIcon,
      gradient: "from-slate-100 to-slate-50",
      iconBg: "bg-white text-slate-500 border border-slate-200",
    },
    {
      label: "Total Pengeluaran",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(totalSpend),
      icon: CreditCardIcon,
      gradient: "from-stone-100 to-stone-50",
      iconBg: "bg-white text-slate-500 border border-slate-200",
    },
    {
      label: "Anggota Sejak",
      value: userSince.toString(),
      icon: CalendarDaysIcon,
      gradient: "from-zinc-100 to-zinc-50",
      iconBg: "bg-white text-slate-500 border border-slate-200",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 shrink-0">
            <UserCircleIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-slate-400">
              Profil Akun
            </p>
            <h2 className="text-2xl font-sans font-bold text-mitologi-navy">
              Informasi Pribadi
            </h2>
          </div>
        </div>
        <p className="text-sm font-sans text-slate-500 ml-13">
          Kelola profil, alamat pengiriman, dan pantau statistik belanja Anda.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-slate-200 shadow-sm transition-colors duration-300 hover:border-slate-300`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${stat.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-sans text-slate-500 uppercase tracking-[0.14em] font-bold">
                    {stat.label}
                  </p>
                </div>
                <p className="text-2xl font-sans font-extrabold text-mitologi-navy">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden group hover:shadow-lg hover:border-slate-300/80 transition-all duration-300">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-mitologi-gold/[0.02] z-0" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-mitologi-gold/5 -mr-32 -mt-32 blur-3xl z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="relative group/avatar cursor-pointer"
              onClick={() =>
                !isUploadingAvatar && fileInputRef.current?.click()
              }
            >
              <div className="h-28 w-28 rounded-2xl p-1 bg-gradient-to-br from-mitologi-navy/10 to-mitologi-gold/20 shrink-0 relative overflow-hidden shadow-sm group-hover/avatar:shadow-lg transition-all duration-300">
                <div className="h-full w-full rounded-xl bg-white flex items-center justify-center text-4xl font-sans font-bold text-mitologi-navy overflow-hidden">
                  {user.avatarUrl && !avatarLoadError ? (
                    <img
                      src={storageUrl(user.avatarUrl)}
                      alt={user.name || "Foto profil"}
                      className="w-full h-full object-cover"
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    <span className="bg-gradient-to-br from-mitologi-navy to-mitologi-navy/70 bg-clip-text text-transparent">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-1 rounded-xl bg-mitologi-navy/70 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  {isUploadingAvatar ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <PencilSquareIcon className="h-5 w-5 text-white mb-1" />
                      <span className="text-[10px] font-sans font-bold text-white/90">
                        Perbarui Foto
                      </span>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                />
              </div>
            </div>
            <p className="mt-2 max-w-[170px] text-[11px] leading-relaxed text-slate-500">
              JPG, PNG, WEBP. Maksimum 2MB.
            </p>
            {avatarError && (
              <p className="mt-1 max-w-[170px] text-[11px] leading-relaxed text-red-600">
                {avatarError}
              </p>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h3 className="font-sans font-bold text-2xl text-mitologi-navy truncate">
                {user.name}
              </h3>
              <span className="inline-flex items-center text-xs font-sans font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                Akun Aktif
              </span>
            </div>
            <p className="text-sm font-sans text-slate-400 mb-4">
              Bergabung sejak {userSince}
            </p>

            <div className="flex flex-wrap gap-3 text-sm font-sans font-medium text-slate-600">
              <div className="flex items-center gap-2.5 bg-slate-50/80 py-2 px-4 rounded-xl border border-slate-100 max-w-full overflow-hidden hover:bg-slate-100/60 transition-colors">
                <EnvelopeIcon className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            variant="secondary"
            onClick={() => setIsProfileModalOpen(true)}
            className="shrink-0 shadow-sm mt-2 md:mt-0 rounded-xl"
          >
            <PencilSquareIcon className="h-4 w-4 mr-2" />
            Edit Profil
          </Button>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="p-6 md:p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-slate-300/80 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.03] rounded-full -mr-24 -mt-24 blur-2xl z-0 group-hover:scale-110 transition-transform duration-500" />

        <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-mitologi-navy text-white shadow-md">
              <MapPinIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-mitologi-navy">
                Alamat Pengiriman
              </h3>
              <p className="text-xs font-sans text-slate-400 mt-0.5">
                Kelola alamat pengiriman Anda untuk pengiriman lokal dan internasional
              </p>
            </div>
          </div>
          <Button
            onClick={openAddAddress}
            variant="secondary"
            className="text-sm shadow-sm rounded-xl border-slate-200 hover:bg-slate-50 hover:border-slate-300"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Tambah Alamat
          </Button>
        </div>

        {/* Address List */}
        <div className="relative z-10">
          {isLoadingAddresses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-44 bg-slate-50 rounded-3xl animate-pulse ring-1 ring-slate-100"></div>
              <div className="h-44 bg-slate-50 rounded-3xl animate-pulse ring-1 ring-slate-100"></div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200/60 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-soft flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-slate-100">
                  <HomeIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-lg font-sans font-bold text-mitologi-navy mb-2">Tidak ada alamat</h4>
                <p className="text-sm text-slate-400 font-sans mb-8 max-w-xs mx-auto leading-relaxed">
                  Mulai dengan menambahkan alamat pengiriman pertama Anda untuk pengalaman checkout yang lebih cepat.
                </p>
                <Button
                  onClick={openAddAddress}
                  variant="primary"
                  className="rounded-2xl px-8 py-6 shadow-xl shadow-mitologi-navy/10"
                >
                  <PlusIcon className="h-5 w-5 mr-3" />
                  Tambah Alamat Baru
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={clsx(
                    "group/card p-6 rounded-[32px] border-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full hover:-translate-y-1",
                    address.isPrimary
                      ? "border-mitologi-navy/10 bg-white shadow-soft ring-1 ring-mitologi-navy/5"
                      : "border-slate-100 bg-white hover:border-mitologi-gold/30 hover:shadow-xl hover:shadow-slate-200/50"
                  )}
                >
                  {/* Decorative element */}
                  <div className={clsx(
                    "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br transition-all duration-700 -mr-12 -mt-12 blur-2xl opacity-40 group-hover/card:scale-150",
                    address.isPrimary ? "from-mitologi-navy opacity-20" : "from-mitologi-gold"
                  )} />

                  <div>
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        {address.isPrimary ? (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-mitologi-navy text-white shadow-lg shadow-mitologi-navy/20">
                            <StarIcon className="w-3.5 h-3.5 fill-white" />
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em]">Utama</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 group-hover/card:border-mitologi-gold/40 group-hover/card:bg-mitologi-gold/5 transition-colors">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] truncate max-w-[100px]">{address.label}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 group-hover/card:translate-x-0">
                        <button
                          onClick={() => openEditAddress(address)}
                          className="p-3 text-slate-400 hover:text-mitologi-navy hover:bg-slate-50 hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-200"
                          title="Edit Alamat"
                        >
                          <PencilSquareIcon className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-red-100"
                          title="Hapus Alamat"
                        >
                          <TrashIcon className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 group-hover/card:translate-x-1 transition-transform duration-500">
                      <h4 className="font-sans font-extrabold text-xl text-mitologi-navy leading-none mb-2">
                        {address.recipientName}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-400 font-sans text-sm mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span>{address.phone}</span>
                      </div>
                      
                      <div className="flex items-start gap-3 pt-4 mt-4 border-t border-slate-50 group-hover/card:border-slate-100 transition-colors">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover/card:bg-white group-hover/card:shadow-sm transition-all">
                          <MapPinIcon className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-sans text-slate-500 leading-relaxed pt-0.5">
                          <p className="font-medium text-slate-700">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p>
                            {address.city}, {address.province}
                          </p>
                          <p className="text-slate-400 text-xs font-bold mt-1 tracking-wider uppercase">
                            {address.postalCode} • {address.country || "Indonesia"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!address.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(address.id)}
                      className="mt-8 w-full py-4 rounded-2xl text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-400 border border-dashed border-slate-200 hover:border-mitologi-navy hover:text-mitologi-navy hover:bg-slate-50 transition-all duration-300 active:scale-[0.98]"
                    >
                      Jadikan Alamat Utama
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ——— Modals ——— */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Edit Profil"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
              autoComplete="name"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Email
            </label>
            <input
              type="email"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              autoComplete="email"
              placeholder="nama@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={profileForm.phone}
              autoComplete="tel"
              placeholder="+62xxxxxxxx"
              onChange={(e) =>
                setProfileForm({ ...profileForm, phone: e.target.value })
              }
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="shadow-sm rounded-xl"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              variant="primary"
              className="shadow-md rounded-xl"
            >
              {isUpdating ? "Menyimpan…" : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          resetAddressForm();
        }}
        title={editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
      >
        <form
          onSubmit={handleSaveAddress}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Label Alamat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.label}
                placeholder="Rumah, Kantor, dll"
                onChange={(e) =>
                  setAddressForm({ ...addressForm, label: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Nama Penerima <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.recipientName}
                placeholder="Nama lengkap penerima"
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    recipientName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={addressForm.phone}
              placeholder="+62xxxxxxxx"
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Alamat Lengkap (Baris 1) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={addressForm.addressLine1}
              placeholder="Nama jalan, gedung, no. rumah"
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine1: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
              Detail Alamat (Baris 2)
            </label>
            <input
              type="text"
              className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
              value={addressForm.addressLine2}
              placeholder="Blok, Lantai, Patokan (opsional)"
              onChange={(e) =>
                setAddressForm({ ...addressForm, addressLine2: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Kota <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.city}
                placeholder="Contoh: Jakarta"
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.province}
                placeholder="Contoh: DKI Jakarta"
                onChange={(e) =>
                  setAddressForm({ ...addressForm, province: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Kode Pos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.postalCode}
                placeholder="12345"
                onChange={(e) =>
                  setAddressForm({ ...addressForm, postalCode: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-bold text-mitologi-navy mb-2">
                Negara
              </label>
              <input
                type="text"
                className="block w-full rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm focus:border-mitologi-navy focus:ring-2 focus:ring-mitologi-navy/10 sm:text-sm py-3 px-4 font-sans transition-all placeholder:text-slate-400"
                value={addressForm.country}
                placeholder="Indonesia"
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="isPrimary"
              checked={addressForm.isPrimary}
              onChange={(e) =>
                setAddressForm({ ...addressForm, isPrimary: e.target.checked })
              }
              className="w-5 h-5 rounded border-slate-300 text-mitologi-navy focus:ring-mitologi-navy"
            />
            <label
              htmlFor="isPrimary"
              className="text-sm font-sans font-medium text-slate-700 cursor-pointer"
            >
              Jadikan alamat utama
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setIsAddressModalOpen(false);
                resetAddressForm();
              }}
              className="shadow-sm rounded-xl"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              variant="primary"
              className="shadow-md rounded-xl"
            >
              {isUpdating
                ? "Menyimpan…"
                : editingAddress
                  ? "Simpan Perubahan"
                  : "Tambah Alamat"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

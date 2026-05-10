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
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-slate-400" />
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
              <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Profile Card */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div
            className="relative cursor-pointer group/avatar"
            onClick={() => !isUploadingAvatar && fileInputRef.current?.click()}
          >
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-700 overflow-hidden">
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
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
              {isUploadingAvatar ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <PencilSquareIcon className="h-4 w-4 text-white" />
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

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-xs text-slate-400 mt-1">Bergabung sejak {userSince}</p>
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsProfileModalOpen(true)}
            className="text-sm border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50"
          >
            Edit Profil
          </Button>
        </div>
        {avatarError && (
          <p className="mt-3 text-xs text-red-600">{avatarError}</p>
        )}
      </div>

      {/* Addresses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900">Alamat Pengiriman</h3>
          <button
            onClick={openAddAddress}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            + Tambah
          </button>
        </div>

        {isLoadingAddresses ? (
          <div className="space-y-3">
            <div className="h-24 bg-slate-50 rounded-lg animate-pulse" />
            <div className="h-24 bg-slate-50 rounded-lg animate-pulse" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
            <MapPinIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-600 font-medium mb-1">Belum ada alamat</p>
            <p className="text-xs text-slate-400 mb-4">Tambahkan alamat untuk checkout lebih cepat</p>
            <button
              onClick={openAddAddress}
              className="text-sm font-medium text-slate-900 underline underline-offset-4"
            >
              Tambah Alamat
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-5 rounded-xl border border-slate-200 bg-white group hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-900">
                        {address.recipientName}
                      </span>
                      {address.isPrimary && (
                        <span className="text-[10px] font-medium bg-slate-900 text-white px-1.5 py-0.5 rounded">
                          Utama
                        </span>
                      )}
                      {!address.isPrimary && address.label && (
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {address.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-1.5">{address.phone}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                      , {address.city}, {address.province} {address.postalCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!address.isPrimary && (
                      <button
                        onClick={() => handleSetPrimary(address.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded transition-colors"
                        title="Jadikan Utama"
                      >
                        <StarIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openEditAddress(address)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 rounded transition-colors"
                      title="Edit"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="Hapus"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
        maxWidth="max-w-xl"
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

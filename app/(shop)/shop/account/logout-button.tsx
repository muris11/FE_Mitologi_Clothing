"use client";

import { useAuth } from "lib/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      aria-label="Keluar dari akun"
      className="rounded bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy focus-visible:ring-offset-2"
    >
      Log Out
    </button>
  );
}

import { Metadata } from "next";
import AccountClient from "./account-client";

export const metadata: Metadata = {
  title: "Akun Saya - Mitologi Clothing",
  description: "Kelola akun dan pesanan Anda.",
};

export default function AccountPage() {
  return <AccountClient />;
}

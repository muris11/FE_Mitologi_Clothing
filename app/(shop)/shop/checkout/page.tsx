import { Metadata } from "next";
import CheckoutClient from "./checkout-client";

export const metadata: Metadata = {
  title: "Pembayaran | Mitologi Clothing",
  description: "Selesaikan pesanan Anda di Mitologi Clothing.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}

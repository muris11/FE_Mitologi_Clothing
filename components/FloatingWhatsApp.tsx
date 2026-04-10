"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FloatingWhatsApp() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;

  if (!whatsappUrl) return null;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}

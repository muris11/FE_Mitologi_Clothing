"use client";

import dynamic from "next/dynamic";

const ShopChatbot = dynamic(() => import("./shop-chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function LazyChatbot() {
  return <ShopChatbot />;
}

"use client";

import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { UnknownError } from "lib/api/types";
import { useEffect, useRef, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ShopChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isGreetingDismissed, setIsGreetingDismissed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { sendChatMessage } = await import("lib/api/chatbot");
      const reply = await sendChatMessage(userMessage, messages.slice(-5));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error: unknown) {
      const err = error as UnknownError;
      const errorMessage =
        err.message === "Chatbot service is currently unavailable."
          ? "Maaf, layanan chatbot sedang offline. Silakan hubungi kami via WhatsApp."
          : "Gagal mengirim pesan. Silakan coba lagi nanti.";

      addToast({ variant: "error", title: errorMessage });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-3xl shadow-xl shadow-mitologi-navy/15 border border-slate-100 z-[100] overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-8rem)] animate-in slide-in-from-bottom-6 fade-in duration-500">
          {/* Header */}
          <div className="bg-mitologi-navy border-b border-white/10 p-5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mitologi-gold/15 blur-[50px] rounded-full pointer-events-none translate-x-10 -translate-y-10"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-mitologi-gold shadow-md flex items-center justify-center text-mitologi-navy p-2.5 overflow-hidden">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </div>
                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-300 shadow-[0_0_0_2px_rgba(74,222,128,0.12)]"></div>
              </div>
              <div>
                <h3 className="font-sans font-bold text-white text-base tracking-wide">
                  Asisten Mitologi
                </h3>
                <p className="text-xs text-slate-300 font-sans font-medium mt-0.5">
                  Bantuan produk dan pesanan
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-full p-2 relative z-10 backdrop-blur-sm"
              aria-label="Tutup Chat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 min-h-[350px]">
            {messages.length === 0 && (
              <div className="text-center text-slate-600 text-sm mt-4 px-2 font-sans max-w-sm mx-auto animate-in slide-in-from-bottom-4 fade-in duration-700">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mitologi-gold to-amber-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-mitologi-gold/20 p-3">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-mitologi-navy" />
                </div>
                <div className="inline-block relative">
                  <h4 className="font-sans font-bold text-mitologi-navy text-2xl tracking-tight z-10 relative">
                    Halo, ada yang bisa kami bantu?
                  </h4>
                </div>

                <p className="leading-relaxed text-slate-500 font-medium mt-3 text-[13px]">
                  Ada yang bisa kami bantu? Anda dapat menanyakan produk,
                  ukuran, atau info lainnya.
                </p>

                <div
                  className="flex flex-col gap-2.5 mt-8"
                  role="group"
                  aria-label="Pertanyaan cepat"
                >
                  <button
                    onClick={() => setInput("Apa produk yang paling laris?")}
                    aria-label="Tanya produk terlaris"
                    className="text-[13px] font-sans font-bold bg-mitologi-navy/5 text-mitologi-navy px-4 py-3 rounded-2xl hover:bg-mitologi-gold/90 hover:text-mitologi-navy hover:shadow-sm text-left transition-colors"
                  >
                    Tampilkan produk terlaris
                  </button>
                  <button
                    onClick={() => setInput("Bisa jelaskan panduan ukuran?")}
                    aria-label="Tanya panduan ukuran"
                    className="text-[13px] font-sans font-bold bg-mitologi-navy/5 text-mitologi-navy px-4 py-3 rounded-2xl hover:bg-mitologi-gold/90 hover:text-mitologi-navy hover:shadow-sm text-left transition-colors"
                  >
                    Panduan Ukuran
                  </button>
                  <button
                    onClick={() =>
                      setInput("Bagaimana kebijakan retur/pengembalian barang?")
                    }
                    aria-label="Tanya kebijakan retur"
                    className="text-[13px] font-sans font-bold bg-mitologi-navy/5 text-mitologi-navy px-4 py-3 rounded-2xl hover:bg-mitologi-gold/90 hover:text-mitologi-navy hover:shadow-sm text-left transition-colors"
                  >
                    Kebijakan Retur
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Atau ketik pesan
                  </span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mitologi-gold to-amber-500 shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-mitologi-navy" />
                  </div>
                )}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div
                    className={`px-5 py-3.5 text-sm shadow-sm font-medium ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-mitologi-gold to-amber-400 text-mitologi-navy rounded-2xl rounded-tr-sm border border-mitologi-gold/20"
                        : "bg-white text-slate-700 border border-slate-100/50 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    <div
                      className={`prose prose-sm font-sans max-w-none leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:font-bold prose-headings:text-inherit prose-ul:my-1 prose-ol:my-1 prose-li:my-0 ${
                        msg.role === "user"
                          ? "text-mitologi-navy prose-a:text-mitologi-navy hover:prose-a:underline"
                          : "text-slate-700 prose-a:text-mitologi-navy hover:prose-a:text-mitologi-gold prose-strong:text-mitologi-navy"
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] text-slate-400 font-medium px-1 ${msg.role === "user" ? "text-right" : "text-left"}`}
                  >
                    {new Date().toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start gap-3 animate-in fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mitologi-gold to-amber-500 shadow-sm flex items-center justify-center flex-shrink-0 mt-1">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-mitologi-navy" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 border border-slate-100/50 shadow-sm flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 bg-mitologi-gold rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-mitologi-gold rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-mitologi-gold rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100/80 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan Anda..."
                  disabled={isLoading}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-mitologi-gold focus:border-transparent focus:bg-white transition-all disabled:opacity-50 text-slate-700 font-sans shadow-inner placeholder:text-slate-400"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Kirim Pesan"
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center bg-gradient-to-br from-mitologi-gold to-amber-400 text-mitologi-navy rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
                >
                  <PaperAirplaneIcon className="w-4 h-4 -rotate-45 ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button Container */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-[60]">
        {/* Initial Greeting Bubble */}
        {!isOpen && messages.length === 0 && !isGreetingDismissed && (
          <div className="bg-white p-4 pr-10 rounded-2xl shadow-xl shadow-mitologi-navy/10 border border-mitologi-gold/30 max-w-[260px] mb-2 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500 relative group fill-mode-both">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsGreetingDismissed(true);
              }}
              className="absolute top-1 right-1 p-2 text-slate-400 hover:text-mitologi-navy hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Tutup notifikasi"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <div className="relative z-0 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-mitologi-gold/20 flex flex-shrink-0 items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-4 h-4 text-mitologi-navy" />
              </div>
              <p className="text-sm font-sans text-slate-700 leading-relaxed font-medium">
                Butuh bantuan? Buka{" "}
                <span className="font-bold text-mitologi-navy">
                  Asisten Mitologi
                </span>
              </p>
            </div>
            {/* Pointer tail */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-mitologi-gold/30 transform rotate-45"></div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup bantuan chat" : "Buka bantuan chat"}
          className={`w-14 h-14 rounded-full shadow-lg border-2 flex items-center justify-center transition-colors duration-300 relative group z-50 ${
            isOpen
              ? "bg-mitologi-navy text-white border-slate-700 shadow-mitologi-navy/30 hover:bg-slate-800"
              : "bg-mitologi-gold text-mitologi-navy shadow-mitologi-gold/20 hover:shadow-xl hover:shadow-mitologi-gold/40"
          }`}
        >
          <div className="relative z-10">
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
}

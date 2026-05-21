"use client";

import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CopyOrderId({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 mb-8">
      <span className="text-xs text-slate-500 uppercase tracking-wide">Order ID</span>
      <span className="font-mono text-sm font-semibold text-slate-900">{orderId}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-1 p-1 rounded hover:bg-slate-200 transition-colors"
        title="Salin Order ID"
      >
        {copied ? (
          <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-600" />
        ) : (
          <ClipboardDocumentIcon className="h-4 w-4 text-slate-400" />
        )}
      </button>
    </div>
  );
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  Fragment,
} from "react";
import { Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((arr) => arr.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, variant, duration = 4000 }: Omit<Toast, "id">) => {
      const id = Date.now().toString();
      setToasts((arr) => [
        ...arr,
        { id, title, description, variant, duration },
      ]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-6 right-6 space-y-3 z-[100] pointer-events-none flex flex-col items-end">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function variantStyles(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return "bg-emerald-50 border-emerald-400 text-emerald-800";
    case "error":
      return "bg-red-50 border-red-400 text-red-800";
    case "warning":
      return "bg-amber-50 border-amber-400 text-amber-800";
    case "info":
    default:
      return "bg-sky-50 border-sky-400 text-sky-800";
  }
}

function VariantIcon({
  variant,
  className,
}: {
  variant: ToastVariant;
  className?: string;
}) {
  switch (variant) {
    case "success":
      return (
        <CheckCircleIcon className={clsx("text-emerald-500", className)} />
      );
    case "error":
      return (
        <ExclamationCircleIcon className={clsx("text-red-500", className)} />
      );
    case "warning":
      return (
        <ExclamationTriangleIcon
          className={clsx("text-amber-500", className)}
        />
      );
    case "info":
    default:
      return (
        <InformationCircleIcon className={clsx("text-sky-500", className)} />
      );
  }
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <Transition
      appear
      show
      as={Fragment}
      enter="transform transition duration-300 ease-out"
      enterFrom="opacity-0 translate-y-2 translate-x-4 scale-95"
      enterTo="opacity-100 translate-y-0 translate-x-0 scale-100"
      leave="transform transition duration-200 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        className={clsx(
          "max-w-md w-full border-l-4 shadow-soft rounded-xl p-4 flex items-start pointer-events-auto",
          variantStyles(toast.variant),
        )}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex-shrink-0">
          <VariantIcon variant={toast.variant} className="h-6 w-6" />
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className="text-sm font-semibold leading-5">{toast.title}</p>
          {toast.description && (
            <p className="text-xs mt-1 opacity-90 leading-normal">
              {toast.description}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:bg-black/5"
            aria-label="Close notification"
          >
            <XMarkIcon className="h-5 w-5 opacity-50 hover:opacity-100" />
          </button>
        </div>
      </div>
    </Transition>
  );
}

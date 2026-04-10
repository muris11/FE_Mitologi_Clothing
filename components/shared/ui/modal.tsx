import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "lib/utils";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}: ModalProps) {
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-slate-900/60 transition-opacity backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel
            className={cn(
              "w-full overflow-hidden rounded-2xl bg-white p-6 lg:p-8 text-left align-middle shadow-hover border border-slate-100 transition-all",
              maxWidth,
            )}
          >
            <div className="flex items-center justify-between mb-4">
              {title && (
                <Dialog.Title
                  as="h3"
                  className="font-sans font-bold text-2xl tracking-tight text-mitologi-navy"
                >
                  {title}
                </Dialog.Title>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 hover:text-mitologi-navy hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-2 text-slate-600">{children}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

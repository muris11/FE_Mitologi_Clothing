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
  maxWidth = "max-w-lg",
}: ModalProps) {
  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel
            className={cn(
              "w-full rounded-xl bg-white p-8 sm:p-10 text-left shadow-xl transition-all",
              maxWidth,
            )}
          >
            <div className="flex items-center justify-between mb-6">
              {title && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-slate-900"
                >
                  {title}
                </Dialog.Title>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div>{children}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

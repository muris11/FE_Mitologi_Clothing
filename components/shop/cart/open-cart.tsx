import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-none border-2 border-mitologi-navy text-mitologi-navy transition-none shadow-none">
      <ShoppingCartIcon className={clsx("h-4 transition-none", className)} />

      {quantity ? (
        <div className="absolute -right-1.5 -top-1.5 min-h-6 min-w-6 h-6 w-6 rounded-none bg-mitologi-navy text-[11px] font-mono tracking-widest font-bold text-mitologi-cream flex items-center justify-center border-2 border-mitologi-cream shadow-none px-1">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

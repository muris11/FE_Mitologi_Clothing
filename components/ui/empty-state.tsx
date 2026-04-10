import { cn } from "lib/utils";
import { ShoppingBag } from "lucide-react";
import * as React from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-mitologi-navy mb-6">
        {icon || <ShoppingBag className="h-8 w-8 stroke-[1.5]" />}
      </div>
      <h3 className="font-sans font-bold text-2xl tracking-tight text-mitologi-navy">
        {title}
      </h3>
      {description && (
        <p className="mt-2 font-sans font-medium text-slate-500 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export { EmptyState };

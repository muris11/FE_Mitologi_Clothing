import { cn } from "lib/utils";
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "primary"
    | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200",
    primary:
      "bg-mitologi-navy/10 text-mitologi-navy border-transparent hover:bg-mitologi-navy/20",
    success: "bg-emerald-100 text-emerald-800 border-transparent",
    warning: "bg-amber-100 text-amber-800 border-transparent",
    error: "bg-red-100 text-red-800 border-transparent",
    info: "bg-blue-100 text-blue-800 border-transparent",
    outline: "text-slate-700 border-slate-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-mitologi-navy focus:ring-offset-2",
        variants[variant as keyof typeof variants] || variants.default,
        className,
      )}
      {...props}
    />
  );
}

export { Badge };

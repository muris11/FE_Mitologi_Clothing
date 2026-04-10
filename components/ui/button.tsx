import { Slot } from "@radix-ui/react-slot";
import { cn } from "lib/utils";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading,
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Base styles: Corporate Trust
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold text-sm transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mitologi-navy focus-visible:ring-offset-2";

    const variants = {
      primary:
        "bg-mitologi-navy text-mitologi-cream shadow-btn hover:bg-mitologi-gold hover:text-white hover:-translate-y-0.5 hover:shadow-hover",
      secondary:
        "bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
      danger: "bg-red-600 text-white shadow-sm hover:bg-red-700",
      gold: "bg-mitologi-gold text-mitologi-navy shadow-btn hover:bg-white hover:text-mitologi-navy hover:-translate-y-0.5 hover:shadow-hover",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-8",
      lg: "h-14 px-10 text-base",
    };

    if (asChild) {
      return (
        <Slot
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 animate-pulse">Memuat...</span>
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };

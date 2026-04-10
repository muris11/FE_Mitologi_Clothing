import { cn } from "lib/utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-mitologi-navy focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-slate-500 mt-1">{hint}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

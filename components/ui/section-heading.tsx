import { cn } from "lib/utils";
import * as React from "react";

export interface SectionHeadingProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  overline?: React.ReactNode;
  description?: React.ReactNode;
}

function SectionHeading({
  title,
  subtitle,
  overline,
  description,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {overline && (
        <p className="font-sans font-bold text-xs text-mitologi-gold uppercase tracking-[0.2em] mb-3">
          {overline}
        </p>
      )}
      <h2 className="font-sans font-bold text-3xl tracking-tight text-mitologi-navy sm:text-4xl md:text-5xl leading-[1.15]">
        {title}
      </h2>
      {(subtitle || description) && (
        <p className="font-sans font-medium text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mt-4">
          {subtitle || description}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };

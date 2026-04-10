import Link from "next/link";
import { MotionDiv } from "components/ui/motion";
import { ReactNode } from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface StaticPageShellProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children: ReactNode;
  maxWidth?: "narrow" | "wide";
}

export function StaticPageShell({
  title,
  subtitle,
  breadcrumbs = [],
  children,
  maxWidth = "narrow",
}: StaticPageShellProps) {
  const containerClass = maxWidth === "wide" ? "max-w-[1440px]" : "max-w-5xl";

  return (
    <div className="min-h-screen bg-app-background pt-10">
      <div
        className={`mx-auto ${containerClass} px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 md:pb-24`}
      >
        {/* Minimalist Header */}
        <MotionDiv delay={0} className="mb-10 border-b border-app pb-6">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-4 flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Link
                href="/shop"
                className="hover:text-mitologi-navy transition-colors"
              >
                Beranda
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-slate-300">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-mitologi-navy transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-mitologi-navy font-bold">
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-mitologi-navy mb-3 leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-500 text-sm md:text-base font-sans max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </MotionDiv>

        {/* Content Card */}
        <MotionDiv
          delay={0.1}
          className="bg-white rounded-[28px] border border-app p-6 sm:p-8 md:p-12 shadow-soft"
        >
          {children}
        </MotionDiv>
      </div>
    </div>
  );
}

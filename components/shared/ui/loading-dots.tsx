import { cn } from "lib/utils";

const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center text-sm font-sans font-medium text-slate-500 animate-pulse",
        className,
      )}
    >
      Memuat...
    </span>
  );
};

export default LoadingDots;

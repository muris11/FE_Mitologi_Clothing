import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => (
  <p
    suppressHydrationWarning={true}
    className={clsx(
      "font-sans font-semibold text-mitologi-navy tracking-tight",
      className,
    )}
  >
    {`${new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount))}`}
    <span
      className={clsx(
        "ml-1 inline text-sm font-medium text-slate-500",
        currencyCodeClassName,
      )}
    >{`${currencyCode}`}</span>
  </p>
);

export default Price;

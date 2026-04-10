import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex w-full items-center rounded-full border border-slate-200/50 bg-white/90 backdrop-blur-md p-1 shadow-sm text-xs font-sans font-semibold text-mitologi-navy transition-all hover:bg-white">
        <h3 className="mr-4 line-clamp-2 grow pl-3 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-mitologi-navy px-3 py-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline text-white/80"
        />
      </div>
    </div>
  );
};

export default Label;

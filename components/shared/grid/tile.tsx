import clsx from "clsx";
import Image from "next/image";
import Label from "../ui/label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50 relative",
        {
          "border-2 border-mitologi-navy ring-4 ring-mitologi-navy/20": active,
          "border border-slate-100 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300":
            !active,
        },
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-contain p-4", {
            "transition duration-500 ease-out group-hover:scale-110":
              isInteractive,
          })}
          {...props}
          unoptimized={
            typeof props.src === "string" &&
            (props.src.includes(
              process.env.NEXT_PUBLIC_PLACEHOLD_ORIGIN?.replace("https://", "") || "",
            ) ||
              (process.env.NEXT_PUBLIC_SITE_URL &&
                props.src.includes(
                  new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname,
                )))
          }
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}

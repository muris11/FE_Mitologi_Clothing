"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/api/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
  onVariantSelect,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  onVariantSelect?: (variant: ProductVariant) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => {
    const selectedOptions = Array.isArray(variant.selectedOptions)
      ? variant.selectedOptions
      : [];
    return {
      id: variant.id,
      availableForSale: variant.availableForSale,
      ...selectedOptions.reduce(
        (accumulator, option) => ({
          ...accumulator,
          [option.name.toLowerCase()]: option.value,
        }),
        {},
      ),
    };
  });

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });

    // Find and notify the selected variant
    if (onVariantSelect) {
      const selectedVariant = variants.find((variant) => {
        const options = Array.isArray(variant.selectedOptions)
          ? variant.selectedOptions
          : [];
        return options.some(
          (option) =>
            option.name.toLowerCase() === name && option.value === value,
        );
      });
      if (selectedVariant) {
        onVariantSelect(selectedVariant);
      }
    }
  };

  const getTranslatedName = (name: string) => {
    const lower = name.toLowerCase();
    if (lower === "size") return "Ukuran";
    if (lower === "color") return "Warna";
    return name;
  };

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-6">
        <dt className="mb-3 text-sm font-sans font-bold text-mitologi-navy">
          {getTranslatedName(option.name)}
        </dt>
        <dd className="flex flex-wrap gap-2.5">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current searchParams so we can preserve any other param state.
            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            // The option is active if it's in the selected options.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${getTranslatedName(option.name)} ${value}${!isAvailableForSale ? " (Stok Habis)" : ""}`}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center rounded-xl border-2 px-4 py-2 text-sm font-sans font-semibold transition-all shadow-sm",
                  {
                    "cursor-default border-mitologi-navy bg-mitologi-navy text-white shadow-md scale-105":
                      isActive,
                    "border-slate-200 bg-white text-slate-700 hover:border-mitologi-navy hover:text-mitologi-navy":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 opacity-50":
                      !isAvailableForSale,
                  },
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}

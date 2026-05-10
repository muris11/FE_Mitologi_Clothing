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
    <fieldset key={option.id} className="mb-5 last:mb-0">
      <legend className="text-sm font-medium text-slate-700 mb-2.5">
        {getTranslatedName(option.name)}
      </legend>
      <div className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          const optionParams: Record<string, string> = {};
          searchParams.forEach((v, k) => (optionParams[k] = v));
          optionParams[optionNameLowerCase] = value;

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

          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              formAction={() => updateOption(optionNameLowerCase, value)}
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              title={`${getTranslatedName(option.name)} ${value}${!isAvailableForSale ? " (Stok Habis)" : ""}`}
              className={clsx(
                "min-w-[40px] px-4 py-2 text-sm border rounded-lg transition-colors",
                {
                  "border-slate-900 bg-slate-900 text-white": isActive,
                  "border-slate-200 bg-white text-slate-700 hover:border-slate-400":
                    !isActive && isAvailableForSale,
                  "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through":
                    !isAvailableForSale,
                },
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </fieldset>
  ));
}

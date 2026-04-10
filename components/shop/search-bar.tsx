"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    // Reset page when searching
    params.delete("page");

    startTransition(() => {
      router.replace(`/shop?${params.toString()}`);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(searchValue);
  }

  return (
    <div className="w-full px-4 sm:px-0 relative group">
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-white rounded-3xl shadow-sm border border-slate-200 p-2 transition-shadow group-focus-within:shadow-md group-focus-within:border-mitologi-navy"
        >
          <div className="relative flex-grow flex items-center gap-2 pl-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 min-w-5 shrink-0" />
            <Input
              key={searchParams?.get("q")}
              type="text"
              name="search"
              placeholder="Cari produk eksklusif kami..."
              autoComplete="off"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border-0 focus-visible:ring-0 shadow-none bg-transparent font-sans text-slate-700 placeholder:text-slate-400 px-0"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="px-6 rounded-2xl font-sans font-bold shadow-sm shrink-0 hidden sm:flex"
              aria-label="Search"
            >
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Cari"
              )}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="px-4 py-2 rounded-2xl font-sans font-bold shadow-sm shrink-0 sm:hidden"
              aria-label="Search"
            >
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

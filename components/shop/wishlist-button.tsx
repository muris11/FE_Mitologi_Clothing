"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { addToWishlist, checkWishlist, removeFromWishlist } from "lib/api";
import { useAuth } from "lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "components/ui/ultra-quality-toast";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  iconClassName?: string;
}

export default function WishlistButton({
  productId,
  className,
  iconClassName = "h-5 w-5",
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    if (isAuthenticated && productId) {
      checkWishlist(productId).then(setIsWishlisted);
    }
  }, [isAuthenticated, productId]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      addToast({
        variant: "error",
        title: "Silakan login untuk menambahkan ke wishlist",
      });
      router.push("/shop/login");
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(productId);
        setIsWishlisted(false);
        addToast({ variant: "success", title: "Dihapus dari wishlist" });
      } else {
        await addToWishlist(productId);
        setIsWishlisted(true);
        addToast({ variant: "success", title: "Ditambahkan ke wishlist" });
      }
      router.refresh();
    } catch (error) {
      addToast({ variant: "error", title: "Gagal mengubah status wishlist" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={clsx(
        "group transition-colors p-2 rounded-full hover:bg-slate-50",
        className,
      )}
      aria-label={
        isWishlisted ? "Hapus dari wishlist" : "Tambahkan ke wishlist"
      }
    >
      {isWishlisted ? (
        <HeartIconSolid
          className={clsx(
            "text-red-500 group-hover:text-red-600 transition-colors",
            iconClassName,
          )}
        />
      ) : (
        <HeartIcon
          className={clsx(
            "text-slate-400 group-hover:text-mitologi-navy transition-colors",
            iconClassName,
          )}
        />
      )}
    </button>
  );
}

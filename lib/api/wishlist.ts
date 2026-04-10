import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import { Product } from "./types";

export async function getWishlist(): Promise<Product[]> {
  try {
    return await apiFetch<Product[]>(ENDPOINTS.WISHLIST, {}, ["wishlist"]);
  } catch (error) {
    return [];
  }
}

export async function addToWishlist(
  productId: string | number,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await apiFetch<{ message: string }>(
      ENDPOINTS.WISHLIST_ADD(productId),
      {
        method: "POST",
      },
    );
    return { success: true, message: res.message };
  } catch (error) {
    return { success: false, message: "Failed to add to wishlist" };
  }
}

export async function removeFromWishlist(
  productId: string | number,
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await apiFetch<{ message: string }>(
      ENDPOINTS.WISHLIST_REMOVE(productId),
      {
        method: "DELETE",
      },
    );
    return { success: true, message: res.message };
  } catch (error) {
    return { success: false, message: "Failed to remove from wishlist" };
  }
}

export async function checkWishlist(
  productId: string | number,
): Promise<boolean> {
  try {
    const res = await apiFetch<{ isWishlisted: boolean }>(
      ENDPOINTS.WISHLIST_CHECK(productId),
      {},
      [`wishlist-check-${productId}`],
    );
    return res.isWishlisted;
  } catch (error) {
    // Silently fail - return false if endpoint doesn't exist or network error
    return false;
  }
}

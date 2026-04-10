import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import { Cart } from "./types";
import { ensureSanctumCsrfCookie } from "./auth";

export async function createCart(): Promise<Cart> {
  await ensureSanctumCsrfCookie();
  return await apiFetch<Cart>(ENDPOINTS.CART, { method: "POST" });
}

export async function getCart(cartId?: string): Promise<Cart | undefined> {
  if (!cartId) return undefined;
  try {
    return await apiFetch<Cart>(
      ENDPOINTS.CART,
      {
        headers: {
          "X-Cart-Id": cartId,
        },
      },
      ["cart"],
    );
  } catch (error) {
    return undefined;
  }
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  await ensureSanctumCsrfCookie();
  return await apiFetch<Cart>(ENDPOINTS.CART_ITEMS, {
    method: "POST",
    headers: {
      "X-Cart-Id": cartId,
    },
    body: JSON.stringify({
      merchandiseId: lines[0]?.merchandiseId,
      quantity: lines[0]?.quantity,
    }),
  });
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart | undefined> {
  if (!lineIds.length) return undefined;
  await ensureSanctumCsrfCookie();
  return await apiFetch<Cart>(
    ENDPOINTS.CART_ITEM_DETAIL(lineIds[0] as string),
    {
      method: "DELETE",
      headers: {
        "X-Cart-Id": cartId,
      },
    },
  );
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart | undefined> {
  if (!lines.length) return undefined;
  await ensureSanctumCsrfCookie();
  return await apiFetch<Cart>(ENDPOINTS.CART_ITEM_DETAIL(lines[0]!.id), {
    method: "PUT",
    headers: {
      "X-Cart-Id": cartId,
    },
    body: JSON.stringify({ quantity: lines[0]!.quantity }),
  });
}

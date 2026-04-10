import { apiFetch } from "./index";
import { ENDPOINTS } from "./endpoints";
import { CheckoutPayload, CheckoutResponse } from "./types";

/**
 * Creates a new checkout/order.
 */
export async function createCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  return await apiFetch<CheckoutResponse>(ENDPOINTS.CHECKOUT_PROCESS, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

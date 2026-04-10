import { ENDPOINTS } from "./endpoints";
import { apiFetch, Pagination } from "./index";
import { Order } from "./types";

export async function getOrders(
  options?: RequestInit,
): Promise<{ orders: Order[]; pagination: Pagination }> {
  try {
    const response = await apiFetch<{
      orders: Order[];
      pagination: Pagination;
    }>(ENDPOINTS.ORDERS, options || {}, ["orders"]);
    return (
      response || {
        orders: [],
        pagination: { total: 0, perPage: 10, currentPage: 1, lastPage: 1 },
      }
    );
  } catch (error) {
    return {
      orders: [],
      pagination: { total: 0, perPage: 10, currentPage: 1, lastPage: 1 },
    };
  }
}

export async function getOrderDetail(
  orderNumber: string,
): Promise<Order | undefined> {
  try {
    return await apiFetch<Order>(ENDPOINTS.ORDER_DETAIL(orderNumber), {}, [
      `order-${orderNumber}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

// Previously checkCheckout existed, but we implement confirmOrderPayment instead
export async function confirmOrderPayment(
  orderNumber: string,
): Promise<{ success: boolean; order?: Order }> {
  try {
    const order = await apiFetch<Order>(
      ENDPOINTS.ORDER_CONFIRM_PAYMENT(orderNumber),
      {
        method: "POST",
      },
    );
    return { success: true, order };
  } catch (error) {
    return { success: false };
  }
}

export async function requestOrderRefund(
  orderNumber: string,
  reason: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await apiFetch<{ message: string }>(
      ENDPOINTS.ORDER_REQUEST_REFUND(orderNumber),
      {
        method: "POST",
        body: JSON.stringify({ reason }),
      },
    );
    return { success: true, message: response.message };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Failed to request refund",
    };
  }
}

export async function payOrder(orderNumber: string): Promise<unknown> {
  return await apiFetch(ENDPOINTS.ORDER_PAY(orderNumber), {
    method: "POST",
    cache: "no-store",
  });
}

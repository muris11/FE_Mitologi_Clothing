import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import { Product } from "./types";

/**
 * Gets personalized recommendations for the current user via the backend gateway.
 * The backend handles the auth validation and the proxy to the AI service.
 */
export async function getRecommendations(): Promise<Product[]> {
  try {
    const response = await apiFetch<Product[]>(ENDPOINTS.USER_RECOMMENDATIONS, {
      method: "GET",
      cache: "no-store",
    });
    return response || [];
  } catch (error) {
    return [];
  }
}

/**
 * Gets related products for a specific product.
 */
export async function getProductRecommendations(
  productId: string | number,
): Promise<Product[]> {
  try {
    return await apiFetch<Product[]>(
      ENDPOINTS.PRODUCT_RECOMMENDATIONS(productId),
    );
  } catch (error) {
    return [];
  }
}

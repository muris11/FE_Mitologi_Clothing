import { ENDPOINTS } from "./endpoints";
import { apiFetch, Pagination } from "./index";
import { Category, Collection, Material, OrderStep, Product } from "./types";

export async function getProducts(
  {
    query,
    reverse,
    sortKey,
    category,
    minPrice,
    maxPrice,
    page,
    limit,
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  },
  requestOptions?: RequestInit,
): Promise<{ products: Product[]; pagination: Pagination }> {
  try {
    const searchParams = new URLSearchParams();

    if (query) searchParams.append("q", query);
    if (sortKey) searchParams.append("sortKey", sortKey);
    if (reverse) searchParams.append("reverse", "true");
    if (category) searchParams.append("category", category);
    if (minPrice !== undefined)
      searchParams.append("minPrice", minPrice.toString());
    if (maxPrice !== undefined)
      searchParams.append("maxPrice", maxPrice.toString());
    if (page !== undefined) searchParams.append("page", page.toString());
    if (limit !== undefined) searchParams.append("limit", limit.toString());

    return await apiFetch<{ products: Product[]; pagination: Pagination }>(
      `${ENDPOINTS.PRODUCTS}?${searchParams.toString()}`,
      requestOptions || {},
      ["products"],
    );
  } catch (error) {
    return {
      products: [],
      pagination: { total: 0, perPage: 0, currentPage: 1, lastPage: 1 },
    };
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    return await apiFetch<Product>(ENDPOINTS.PRODUCT_DETAIL(handle), {}, [
      `product-${handle}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getCollections(
  requestOptions?: RequestInit,
): Promise<Collection[]> {
  try {
    return await apiFetch<Collection[]>(
      ENDPOINTS.COLLECTIONS,
      requestOptions || {},
      ["collections"],
    );
  } catch (error) {
    return [];
  }
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  try {
    return await apiFetch<Collection>(ENDPOINTS.COLLECTION_DETAIL(handle), {}, [
      `collection-${handle}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams();
    if (sortKey) searchParams.append("sort", sortKey);
    if (reverse) searchParams.append("order", "desc");

    return await apiFetch<Product[]>(
      `${ENDPOINTS.COLLECTION_PRODUCTS(collection)}?${searchParams.toString()}`,
      {},
      [`collection-products-${collection}`],
    );
  } catch (error) {
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await apiFetch<Category[]>(ENDPOINTS.CATEGORIES, {}, ["categories"]);
  } catch (error) {
    return [];
  }
}

export async function getCategory(
  handle: string,
): Promise<Category | undefined> {
  try {
    return await apiFetch<Category>(ENDPOINTS.CATEGORY_DETAIL(handle), {}, [
      `category-${handle}`,
    ]);
  } catch (error) {
    return undefined;
  }
}

export async function getBestSellers(limit?: number): Promise<Product[]> {
  try {
    const url = limit
      ? `${ENDPOINTS.PRODUCTS_BEST_SELLERS}?limit=${limit}`
      : ENDPOINTS.PRODUCTS_BEST_SELLERS;
    return await apiFetch<Product[]>(url, {}, ["best-sellers", "products"]);
  } catch (error) {
    return [];
  }
}

export async function getNewArrivals(limit?: number): Promise<Product[]> {
  try {
    const url = limit
      ? `${ENDPOINTS.PRODUCTS_NEW_ARRIVALS}?limit=${limit}`
      : ENDPOINTS.PRODUCTS_NEW_ARRIVALS;
    return await apiFetch<Product[]>(url, {}, ["new-arrivals", "products"]);
  } catch (error) {
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { products } = await getProducts({ query, limit: 10 });
    return products;
  } catch (error) {
    return [];
  }
}

export async function getRelatedProducts(
  productId: string,
): Promise<Product[]> {
  try {
    const recommended = await apiFetch<Product[]>(
      ENDPOINTS.PRODUCT_RECOMMENDATIONS(productId),
      {},
      [`recommendations-${productId}`],
    );
    if (recommended && recommended.length > 0) {
      return recommended.slice(0, 4);
    }
  } catch {
    // Fallback to random products if recommendation API fails
  }

  try {
    const { products } = await getProducts({ limit: 4 });
    return products.filter((p) => String(p.id) !== String(productId));
  } catch {
    return [];
  }
}

export async function getOrderSteps(): Promise<OrderStep[]> {
  try {
    return await apiFetch<OrderStep[]>(ENDPOINTS.ORDER_STEPS, {}, [
      "order-steps",
    ]);
  } catch (error) {
    return [];
  }
}

export async function getMaterials(): Promise<Material[]> {
  try {
    return await apiFetch<Material[]>(ENDPOINTS.MATERIALS, {}, ["materials"]);
  } catch (error) {
    return [];
  }
}

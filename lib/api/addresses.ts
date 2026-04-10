// Direct imports to avoid circular dependency
// DO NOT import from './index' because index.ts exports from this file
import { apiFetch } from "./index";
import { ENDPOINTS } from "./endpoints";
import type { Address } from "./types";

export async function getAddresses(): Promise<Address[]> {
  const result = await apiFetch<Address[]>(ENDPOINTS.ADDRESSES);
  return result || [];
}

export async function createAddress(
  data: Omit<Address, "id" | "createdAt">,
): Promise<Address> {
  return await apiFetch<Address>(ENDPOINTS.ADDRESSES, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAddress(
  id: number,
  data: Partial<Address>,
): Promise<Address> {
  return await apiFetch<Address>(`${ENDPOINTS.ADDRESSES}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAddress(id: number): Promise<void> {
  await apiFetch(`${ENDPOINTS.ADDRESSES}/${id}`, {
    method: "DELETE",
  });
}

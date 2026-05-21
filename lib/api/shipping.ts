import { City, Province, ShippingOption, Subdistrict, OrderTracking } from "./types";

export async function getProvinces(): Promise<Province[]> {
  const res = await fetch("/api/v1/shipping/provinces", {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to fetch provinces");
  }

  const data = await res.json();
  return data.data.results || [];
}

export async function getCities(provinceId: number): Promise<City[]> {
  const res = await fetch(`/api/v1/shipping/cities?province_id=${provinceId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to fetch cities");
  }

  const data = await res.json();
  return data.data.results || [];
}

export async function getSubdistricts(cityId: number): Promise<Subdistrict[]> {
  const res = await fetch(`/api/v1/shipping/subdistricts?city_id=${cityId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to fetch subdistricts");
  }

  const data = await res.json();
  return data.data.results || [];
}

export async function calculateShippingCost(
  destination: number,
  weight: number,
  courier?: string
): Promise<ShippingOption[]> {
  const res = await fetch("/api/v1/shipping/cost", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      destination: String(destination),
      weight: String(weight),
      courier: courier || "",
    }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to calculate shipping cost");
  }

  const data = await res.json();
  return data.data.results || [];
}

export async function getOrderTracking(orderNumber: string): Promise<OrderTracking> {
  const res = await fetch(`/api/v1/orders/${orderNumber}/tracking`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to fetch order tracking");
  }

  const data = await res.json();
  return data.data;
}
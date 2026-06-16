/**
 * Resolves an image path from the backend API to a usable URL.
 *
 * This function handles:
 * - Local assets (/images/*) - returned as-is
 * - Backend storage URLs (/storage/*) - resolved to backend URL
 * - Absolute URLs - returned as-is
 * - Network access from mobile devices - uses NEXT_PUBLIC_APP_URL
 *
 * @param path - The image path from the API (could be absolute URL, relative path, or null)
 * @param fallback - Optional fallback URL if path is empty
 */
export function storageUrl(
  path: string | null | undefined,
  fallback = "",
): string {
  if (!path) return fallback;
  const normalizedPath = path.trim().replace(/\\/g, "/");
  if (!normalizedPath) return fallback;

  // Local assets - return as-is
  if (
    normalizedPath.startsWith("/") &&
    !normalizedPath.startsWith("/storage/")
  ) {
    return normalizedPath;
  }

  // Handle absolute URLs
  if (/^https?:\/\//i.test(normalizedPath)) {
    // Return absolute URLs as-is (e.g., Cloudflare R2 URLs)
    return normalizedPath;
  }

  // Relative path - ensure it starts with /storage/
  const withoutLeadingSlash = normalizedPath.replace(/^\/+/, "");
  const withoutStoragePrefix = withoutLeadingSlash.replace(/^storage\/+/, "");

  const backendUrl = process.env.NEXT_PUBLIC_STORAGE_ORIGIN || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (backendUrl) {
    return `${backendUrl.replace(/\/+$/, "")}/${withoutStoragePrefix}`;
  }

  return `/${withoutStoragePrefix}`;
}

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

  // Keep app-local public assets untouched (e.g. /images/logo.png).
  if (
    normalizedPath.startsWith("/") &&
    !normalizedPath.startsWith("/storage/")
  ) {
    return normalizedPath;
  }

  // Keep non-storage absolute URLs untouched (e.g. CDN links)
  if (/^https?:\/\//i.test(normalizedPath)) {
    try {
      const parsed = new URL(normalizedPath);

      // Handle backend /storage/ URLs - convert to Next.js proxy path
      if (parsed.pathname.startsWith("/storage/")) {
        const canonicalStoragePath = parsed.pathname
          .replace(/^\/+/, "")
          .replace(/^storage\/+/, "");
        return `/storage/${canonicalStoragePath}`;
      }

      // Handle backend API image URLs (e.g. /api/team-members/*/photo)
      if (parsed.pathname.startsWith("/api/")) {
        return parsed.pathname;
      }

      // Return other absolute URLs as-is
      return normalizedPath;
    } catch {
      return normalizedPath;
    }
  }

  // Handle relative storage paths
  const withoutLeadingSlash = normalizedPath.replace(/^\/+/, "");
  const withoutStoragePrefix = withoutLeadingSlash.replace(/^storage\/+/, "");

  // For SSR/ISP that need to resolve images on network access,
  // use NEXT_PUBLIC_BACKEND_URL if available, otherwise use proxy path
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (backendUrl && typeof window === "undefined") {
    // Server-side rendering - use backend URL directly for network access
    return `${backendUrl.replace(/\/+$/, "")}/storage/${withoutStoragePrefix}`;
  }

  // Client-side or no backend URL - use Next.js proxy path
  return `/storage/${withoutStoragePrefix}`;
}

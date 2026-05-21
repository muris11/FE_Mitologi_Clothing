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

  if (
    normalizedPath.startsWith("/") &&
    !normalizedPath.startsWith("/storage/")
  ) {
    return normalizedPath;
  }

  if (/^https?:\/\//i.test(normalizedPath)) {
    // If it's already an absolute URL with /storage/, return as-is
    if (normalizedPath.includes('/storage/')) {
      return normalizedPath;
    }
    
    try {
      const parsed = new URL(normalizedPath);

      if (parsed.pathname.startsWith("/storage/")) {
        const canonicalStoragePath = parsed.pathname
          .replace(/^\/+/, "")
          .replace(/^storage\/+/, "");
        return `/storage/${canonicalStoragePath}`;
      }

      if (parsed.pathname.startsWith("/api/")) {
        return parsed.pathname;
      }

      return normalizedPath;
    } catch {
      return normalizedPath;
    }
  }

  // Relative path - convert to absolute URL using backend origin
  const withoutLeadingSlash = normalizedPath.replace(/^\/+/, "");
  const withoutStoragePrefix = withoutLeadingSlash.replace(/^storage\/+/, "");
  
  // In production, use the backend API URL as the storage origin
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const backendOrigin = backendUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");
  
  if (backendOrigin && !normalizedPath.startsWith("/images/")) {
    return `${backendOrigin}/storage/${withoutStoragePrefix}`;
  }

  return `/storage/${withoutStoragePrefix}`;
}

import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isProduction = process.env.NODE_ENV === "production";

// Single Source of Truth from .env
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || "";
const internalApiUrl = process.env.INTERNAL_API_URL || publicApiUrl;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Normalizes an API URL to a backend origin (removes /api suffix and trailing slashes)
 */
const toBackendOrigin = (apiUrl: string) =>
  apiUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");

const backendPublicOrigin = toBackendOrigin(publicApiUrl);
const backendInternalOrigin = toBackendOrigin(internalApiUrl);

// Unique set of backend origins for CSP and allowed origins
const backendOrigins = Array.from(
  new Set([backendPublicOrigin, backendInternalOrigin]),
).filter(Boolean);

/**
 * Converts an origin string to a Next.js RemotePattern object.
 */
const toRemotePattern = (origin: string) => {
  try {
    const parsed = new URL(origin);
    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
    };
  } catch (e) {
    return null;
  }
};

const backendRemotePatterns = backendOrigins
  .map(toRemotePattern)
  .filter((pattern): pattern is NonNullable<typeof pattern> => pattern !== null);

// Extract Midtrans origins dynamicly if available
const midtransSnapUrl = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || "";
const midtransOrigin = midtransSnapUrl ? new URL(midtransSnapUrl).origin : "";
const midtransApiOrigin = midtransOrigin.replace("app.", "api.");
const midtransProductionOrigin = process.env.NEXT_PUBLIC_MIDTRANS_PRODUCTION_ORIGIN || "";
const midtransProductionApiOrigin = process.env.NEXT_PUBLIC_MIDTRANS_PRODUCTION_API_ORIGIN || "";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.2.101", "0.0.0.0"],
  
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: !isProduction,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      ...backendRemotePatterns,
      ...(process.env.NEXT_PUBLIC_PLACEHOLD_ORIGIN ? [{
        protocol: "https" as const,
        hostname: process.env.NEXT_PUBLIC_PLACEHOLD_ORIGIN.replace("https://", ""),
      }] : []),
      ...(process.env.NEXT_PUBLIC_UNSPLASH_ORIGIN ? [{
        protocol: "https" as const,
        hostname: process.env.NEXT_PUBLIC_UNSPLASH_ORIGIN.replace("https://", ""),
      }] : []),
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
    ].filter(p => p.hostname !== ""),
  },

  // In Next.js 15+, turbopack can be at top level
  // @ts-ignore - Some versions of NextConfig types might not have this yet
  turbopack: {
    root: projectRoot,
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendInternalOrigin}/api/v1/:path*`,
      },
      {
        source: "/sanctum/:path*",
        destination: `${backendInternalOrigin}/sanctum/:path*`,
      },
      {
        source: "/storage/:path*",
        destination: `${backendInternalOrigin}/storage/:path*`,
      },
      {
        source: "/api/team-members/:path*",
        destination: `${backendInternalOrigin}/api/team-members/:path*`,
      },
    ];
  },

  async headers() {
    const safeEnv = (key: string, defaultValue: string = "") => {
      const val = process.env[key];
      return val && val !== "undefined" ? val : defaultValue;
    };

    const imgSources = [
      "'self'",
      "data:",
      "blob:",
      ...backendOrigins,
      safeEnv("NEXT_PUBLIC_UNSPLASH_ORIGIN"),
      safeEnv("NEXT_PUBLIC_PLACEHOLD_ORIGIN"),
      safeEnv("NEXT_PUBLIC_TRANSPARENT_TEXTURES_ORIGIN"),
      safeEnv("NEXT_PUBLIC_MIDTRANS_SNAP_ASSETS_ORIGIN"),
    ].filter(Boolean);

    const connectSources = [
      "'self'",
      ...backendOrigins,
      midtransOrigin,
      midtransApiOrigin,
      midtransProductionOrigin,
      midtransProductionApiOrigin,
      safeEnv("NEXT_PUBLIC_MIDTRANS_SNAP_ASSETS_ORIGIN"),
    ].filter(Boolean);

    const scriptSources = [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      midtransOrigin,
      midtransApiOrigin,
      midtransProductionOrigin,
      midtransProductionApiOrigin,
      safeEnv("NEXT_PUBLIC_MIDTRANS_SNAP_ASSETS_ORIGIN"),
      safeEnv("NEXT_PUBLIC_GOOGLE_PAY_ORIGIN"),
    ].filter(Boolean);

    const frameSources = [
      "'self'",
      midtransOrigin,
      midtransApiOrigin,
      midtransProductionOrigin,
      safeEnv("NEXT_PUBLIC_MIDTRANS_SNAP_ASSETS_ORIGIN"),
      safeEnv("NEXT_PUBLIC_GOOGLE_PAY_ORIGIN"),
      safeEnv("NEXT_PUBLIC_GOOGLE_MAPS_ORIGIN", "https://www.google.com"),
      safeEnv("NEXT_PUBLIC_MAPS_GOOGLE_ORIGIN", "https://maps.google.com"),
    ].filter(Boolean);

    if (!isProduction) {
      // Dev-only: allow dynamic LAN IP origins
      imgSources.push("http:");
      connectSources.push("http:");
    }

    const cspDirectives = [
      `default-src 'self'`,
      `script-src ${scriptSources.join(" ")}`,
      `style-src 'self' 'unsafe-inline' ${safeEnv("NEXT_PUBLIC_GOOGLE_FONTS_ORIGIN")}`,
      `img-src ${imgSources.join(" ")}`,
      `font-src 'self' data: ${safeEnv("NEXT_PUBLIC_GOOGLE_GSTATIC_ORIGIN")}`,
      `connect-src ${connectSources.join(" ")}`,
      `frame-src ${frameSources.join(" ")}`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'self'`,
    ];

    if (isProduction) {
      cspDirectives.push(`upgrade-insecure-requests`);
    }

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; ").replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=(self)",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: isProduction ? siteUrl : "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

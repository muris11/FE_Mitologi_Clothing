import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ["NEXT_PUBLIC_API_URL"];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    // Missing environment variables - check .env.example for reference
  }
};

export const createSocialUrl = (platform: string, username?: string | null) => {
  if (!username) return "#";
  if (username.startsWith("http")) return username;

  const cleanUsername = username.replace(/^@/, "");

  const socialBases = {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_BASE_URL,
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_BASE_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_BASE_URL,
    shopee: process.env.NEXT_PUBLIC_SHOPEE_BASE_URL,
    twitter: process.env.NEXT_PUBLIC_TWITTER_BASE_URL,
  };

  switch (platform.toLowerCase()) {
    case "instagram":
      return `${socialBases.instagram}/${cleanUsername}`;
    case "tiktok":
      return `${socialBases.tiktok}${cleanUsername}`;
    case "facebook":
      return `${socialBases.facebook}/${cleanUsername}`;
    case "shopee":
      return `${socialBases.shopee}/${cleanUsername}`;
    case "twitter":
    case "twitter/x":
    case "x":
      return `${socialBases.twitter}/${cleanUsername}`;
    case "whatsapp":
      return process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL || "#";
    default:
      return username;
  }
};
export const normalizeTags = (tags?: string[] | string | null): string[] => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    // Accept comma-separated strings (API sometimes returns a CSV string)
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
};

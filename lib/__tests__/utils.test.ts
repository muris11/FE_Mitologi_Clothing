import { describe, expect, it } from "vitest";
import {
  createSocialUrl,
  createUrl,
  ensureStartsWith,
  normalizeTags,
} from "../utils";

describe("createUrl", () => {
  it("creates URL with query string", () => {
    const params = new URLSearchParams({ q: "test", sort: "price" });
    expect(createUrl("/shop", params)).toBe("/shop?q=test&sort=price");
  });

  it("creates URL without query string when params empty", () => {
    const params = new URLSearchParams();
    expect(createUrl("/shop", params)).toBe("/shop");
  });

  it("handles special characters in params", () => {
    const params = new URLSearchParams({ q: "baju & celana" });
    expect(createUrl("/search", params)).toBe("/search?q=baju+%26+celana");
  });
});

describe("ensureStartsWith", () => {
  it("adds prefix when missing", () => {
    expect(ensureStartsWith("example.com", "https://")).toBe(
      "https://example.com",
    );
  });

  it("does not duplicate prefix", () => {
    expect(ensureStartsWith("https://example.com", "https://")).toBe(
      "https://example.com",
    );
  });

  it("handles empty string", () => {
    expect(ensureStartsWith("", "/")).toBe("/");
  });
});

describe("createSocialUrl", () => {
  it("returns correct Instagram URL", () => {
    expect(createSocialUrl("instagram", "mitologiclothing")).toBe(
      "https://instagram.com/mitologiclothing",
    );
  });

  it("strips @ prefix from username", () => {
    expect(createSocialUrl("instagram", "@mitologi")).toBe(
      "https://instagram.com/mitologi",
    );
  });

  it("returns full URL if username is already a URL", () => {
    expect(createSocialUrl("instagram", "https://instagram.com/custom")).toBe(
      "https://instagram.com/custom",
    );
  });

  it("returns # for null/empty username", () => {
    expect(createSocialUrl("instagram", null)).toBe("#");
    expect(createSocialUrl("instagram", "")).toBe("#");
  });

  it("returns correct TikTok URL with @", () => {
    expect(createSocialUrl("tiktok", "mitologi")).toBe(
      "https://tiktok.com/@mitologi",
    );
  });

  it("returns correct Facebook URL", () => {
    expect(createSocialUrl("facebook", "mitologi")).toBe(
      "https://facebook.com/mitologi",
    );
  });

  it("returns correct Shopee URL", () => {
    expect(createSocialUrl("shopee", "mitologi")).toBe(
      "https://shopee.co.id/mitologi",
    );
  });

  it("returns correct Twitter/X URL", () => {
    expect(createSocialUrl("twitter", "mitologi")).toBe(
      "https://twitter.com/mitologi",
    );
    expect(createSocialUrl("x", "mitologi")).toBe(
      "https://twitter.com/mitologi",
    );
  });

  it("returns username for unknown platform", () => {
    expect(createSocialUrl("unknown", "mitologi")).toBe("mitologi");
  });
});

describe("normalizeTags", () => {
  it("returns empty array for null/undefined", () => {
    expect(normalizeTags(null)).toEqual([]);
    expect(normalizeTags(undefined)).toEqual([]);
  });

  it("returns array as-is", () => {
    expect(normalizeTags(["tag1", "tag2"])).toEqual(["tag1", "tag2"]);
  });

  it("splits comma-separated string", () => {
    expect(normalizeTags("tag1, tag2, tag3")).toEqual(["tag1", "tag2", "tag3"]);
  });

  it("filters empty strings from split", () => {
    expect(normalizeTags("tag1,,tag2,")).toEqual(["tag1", "tag2"]);
  });

  it("trims whitespace", () => {
    expect(normalizeTags("  tag1 , tag2  ")).toEqual(["tag1", "tag2"]);
  });
});

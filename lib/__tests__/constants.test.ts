import { describe, expect, it } from "vitest";
import {
  DEFAULT_OPTION,
  defaultSort,
  HIDDEN_PRODUCT_TAG,
  sorting,
  TAGS,
} from "../constants";

describe("constants", () => {
  it("defaultSort has RELEVANCE sortKey", () => {
    expect(defaultSort.sortKey).toBe("RELEVANCE");
    expect(defaultSort.reverse).toBe(false);
    expect(defaultSort.slug).toBeNull();
  });

  it("sorting array contains all sort options", () => {
    expect(sorting).toHaveLength(5);
    const slugs = sorting.map((s) => s.slug);
    expect(slugs).toContain(null); // default
    expect(slugs).toContain("trending-desc");
    expect(slugs).toContain("latest-desc");
    expect(slugs).toContain("price-asc");
    expect(slugs).toContain("price-desc");
  });

  it("each sort item has required properties", () => {
    sorting.forEach((item) => {
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("sortKey");
      expect(item).toHaveProperty("reverse");
    });
  });

  it("TAGS contains expected cache tag keys", () => {
    expect(TAGS.collections).toBe("collections");
    expect(TAGS.products).toBe("products");
    expect(TAGS.cart).toBe("cart");
  });

  it("HIDDEN_PRODUCT_TAG is defined", () => {
    expect(HIDDEN_PRODUCT_TAG).toBe("nextjs-frontend-hidden");
  });

  it("DEFAULT_OPTION is defined", () => {
    expect(DEFAULT_OPTION).toBe("Default Title");
  });
});

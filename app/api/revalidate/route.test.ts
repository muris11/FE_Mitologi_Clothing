import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePathMock = vi.fn();
const revalidateTagMock = vi.fn();

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
  revalidateTag: revalidateTagMock,
}));

describe("revalidate route", () => {
  const originalSecret = process.env.NEXTJS_REVALIDATION_SECRET;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.NEXTJS_REVALIDATION_SECRET = "secret-123";
  });

  it("authorizes requests using NEXTJS_REVALIDATION_SECRET", async () => {
    const { POST } = await import("./route");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) throw new Error("NEXT_PUBLIC_SITE_URL is required for tests");
    const response = await POST({
      nextUrl: new URL(`${siteUrl}/api/revalidate?secret=secret-123`),
      json: vi.fn().mockResolvedValue({ tags: ["products"] }),
    } as never);

    expect(response.status).toBe(200);
    expect(revalidateTagMock).toHaveBeenCalledWith("products", "max");
  });

  afterAll(() => {
    process.env.NEXTJS_REVALIDATION_SECRET = originalSecret;
  });
});

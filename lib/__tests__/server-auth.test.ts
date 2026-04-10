import { beforeEach, describe, expect, it, vi } from "vitest";

const cookiesMock = vi.fn();
const apiFetchMock = vi.fn();

vi.mock("next/headers", () => ({
  cookies: cookiesMock,
}));

vi.mock("../api/index", () => ({
  apiFetch: apiFetchMock,
}));

describe("server-auth getUser", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the user object from standardized auth response data", async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: "token-123" }),
    });
    apiFetchMock.mockResolvedValue({
      id: 7,
      name: "Rifqy",
      email: "rifqy@example.com",
    });

    const { getUser } = await import("../api/server-auth");
    const result = await getUser();

    expect(result).toEqual({
      id: 7,
      name: "Rifqy",
      email: "rifqy@example.com",
    });
    expect(apiFetchMock).toHaveBeenCalledWith("/v1/auth/user", {
      headers: {
        Authorization: "Bearer token-123",
      },
      cache: "no-store",
    });
  });
});

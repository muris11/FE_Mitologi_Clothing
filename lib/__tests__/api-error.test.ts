import { describe, expect, it } from "vitest";
import { ApiError } from "../api/index";

describe("ApiError", () => {
  it("creates error with message and status", () => {
    const error = new ApiError("Not found", 404);
    expect(error.message).toBe("Not found");
    expect(error.status).toBe(404);
    expect(error.name).toBe("ApiError");
  });

  it("stores validation errors", () => {
    const errors = {
      email: ["Email sudah terdaftar"],
      name: ["Nama wajib diisi"],
    };
    const error = new ApiError(
      "Validation failed",
      422,
      "validation_error",
      errors,
    );
    expect(error.errors).toEqual(errors);
  });

  it("getFieldError returns first error for field", () => {
    const errors = { email: ["Email sudah terdaftar", "Format email salah"] };
    const error = new ApiError("Validation", 422, "validation_error", errors);
    expect(error.getFieldError("email")).toBe("Email sudah terdaftar");
  });

  it("getFieldError returns undefined for missing field", () => {
    const error = new ApiError("Validation", 422, "validation_error", {});
    expect(error.getFieldError("phone")).toBeUndefined();
  });

  it("isValidationError returns true for 422", () => {
    expect(new ApiError("", 422).isValidationError()).toBe(true);
    expect(new ApiError("", 400).isValidationError()).toBe(false);
  });

  it("isAuthError returns true for 401", () => {
    expect(new ApiError("", 401).isAuthError()).toBe(true);
    expect(new ApiError("", 403).isAuthError()).toBe(false);
  });

  it("isEmailTaken detects taken email (English)", () => {
    const error = new ApiError("", 422, "validation_error", {
      email: ["The email has already been taken."],
    });
    expect(error.isEmailTaken()).toBe(true);
  });

  it("isEmailTaken detects taken email (Indonesian)", () => {
    const error = new ApiError("", 422, "validation_error", {
      email: ["Email sudah terdaftar"],
    });
    expect(error.isEmailTaken()).toBe(true);
  });

  it("isEmailTaken returns false for unrelated errors", () => {
    const error = new ApiError("", 422, "validation_error", {
      email: ["Format email salah"],
    });
    expect(error.isEmailTaken()).toBe(false);
  });

  it("isEmailTaken returns false when no email errors", () => {
    const error = new ApiError("", 422, "validation_error", {});
    expect(error.isEmailTaken()).toBe(false);
  });
});

"use server";

import { login } from "lib/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await login(email, password);

    // Set cookie
    // Note: The API might return token in response.
    if (response?.token) {
      (await cookies()).set("auth_token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        return "Invalid credentials.";
      }
    }
    return "Something went wrong.";
  }

  redirect("/");
}

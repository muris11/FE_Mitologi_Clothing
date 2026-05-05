"use server";

import { register } from "lib/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await register(name, email, password, password);

    if (response?.token) {
      (await cookies()).set("mitologi_auth_token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("422")) {
        return "Email is already taken or invalid data.";
      }
    }
    return "Something went wrong. Please try again.";
  }

  redirect("/");
}

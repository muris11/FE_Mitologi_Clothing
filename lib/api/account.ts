import { ENDPOINTS } from "./endpoints";
import { apiFetch } from "./index";
import { User } from "./types";

export async function getProfile(): Promise<User | undefined> {
  try {
    return await apiFetch<User>(ENDPOINTS.PROFILE);
  } catch {
    return undefined;
  }
}

export async function updateProfile(
  data: Partial<User> & {
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  },
): Promise<User> {
  const { postalCode, ...otherData } = data;
  const payload = {
    ...otherData,
    ...(postalCode ? { postal_code: postalCode } : {}),
  };
  return await apiFetch<User>(ENDPOINTS.PROFILE, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function updateAvatar(
  file: File,
): Promise<{ message: string; avatarUrl: string; avatar: string }> {
  const formData = new FormData();
  formData.append("avatar", file);
  return await apiFetch<{ message: string; avatarUrl: string; avatar: string }>(
    ENDPOINTS.PROFILE_AVATAR,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function updatePassword(data: {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}): Promise<{ message: string }> {
  return await apiFetch<{ message: string }>(ENDPOINTS.PROFILE_PASSWORD, {
    method: "PUT",
    body: JSON.stringify({
      current_password: data.currentPassword,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    }),
  });
}

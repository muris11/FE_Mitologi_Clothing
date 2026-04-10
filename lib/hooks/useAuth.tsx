"use client";

import Cookies from "js-cookie";
import { getCart, ApiError } from "lib/api";
import { getProfile } from "lib/api/account";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  AuthResponse,
} from "lib/api/auth";
import { User } from "lib/api/types";
import { useToast } from "components/ui/ultra-quality-toast";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Handle post-auth success: set user, sync cart, dispatch event.
 * Shared by both login and register flows.
 */
async function handleAuthSuccess(
  result: AuthResponse,
  setUser: (u: User) => void,
  router: ReturnType<typeof useRouter>,
) {
  setUser(result.user);

  // Store the Bearer token for Next.js Server Components
  if (result.token) {
    Cookies.set("auth_token", result.token, {
      expires: 30,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // Native fallback: ensure cookie is always set even if js-cookie fails
    if (!Cookies.get("auth_token")) {
      const expires = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toUTCString();
      const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
      document.cookie = `auth_token=${encodeURIComponent(result.token)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
    }
  }

  // Update cart cookie if backend returned a merged/new cart ID
  if (result.cartId) {
    Cookies.set("cartSessionId", result.cartId, {
      expires: 7,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  // Notify cart and other components to refresh their state
  // CartProvider listens to this and will call refreshCart()
  window.dispatchEvent(new Event("auth:changed"));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { addToast } = useToast();

  const refreshProfile = async () => {
    try {
      const userData = await getProfile();
      setUser(userData || null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const currentCartId = Cookies.get("cartSessionId");
      const result = await apiLogin(email, password, currentCartId);
      await handleAuthSuccess(result, setUser, router);
      addToast({
        title: "Berhasil",
        description: `Selamat datang, ${result.user.name.split(" ")[0]}!`,
        variant: "success",
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    setIsLoading(true);
    try {
      const currentCartId = Cookies.get("cartSessionId");
      const result = await apiRegister(
        name,
        email,
        password,
        password_confirmation,
        currentCartId,
      );
      await handleAuthSuccess(result, setUser, router);
      addToast({
        title: "Berhasil",
        description: `Akun berhasil dibuat, ${name.split(" ")[0]}!`,
        variant: "success",
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      addToast({
        title: "Berhasil",
        description: "Anda telah logout.",
        variant: "success",
      });
    } catch (error) {
      // If it's a 401, they are already logged out on the server or the token is invalid,
      // so we don't need to show an error to the user.
      if (error instanceof ApiError && error.status === 401) {
        addToast({
          title: "Berhasil",
          description: "Anda telah logout.",
          variant: "success",
        });
      } else {
        addToast({
          title: "Gagal",
          description: "Gagal logout. Silakan coba lagi.",
          variant: "error",
        });
      }
    } finally {
      setUser(null);
      Cookies.remove("auth_token");
      Cookies.remove("cartSessionId");
      window.dispatchEvent(new Event("auth:changed"));
      router.push("/");
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to access auth context. Must be used within AuthProvider. */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

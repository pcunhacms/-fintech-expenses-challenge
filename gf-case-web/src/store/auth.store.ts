import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";

type AuthState = {
  token: string | null;
  user: User | null;
  hydrated: boolean;

  setHydrated: (value: boolean) => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,

      setHydrated: (value) =>
        set({ hydrated: value }),

      setAuth: (token, user) =>
        set({ token, user }),

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated(true);
        };
      },
    }
  )
);
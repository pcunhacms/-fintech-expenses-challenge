import { useEffect, useState } from "react";
import type { User } from "../types/auth";

 type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

let state = initialState;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const authStore = {
  getState() {
    return state;
  },

  setState(nextState: Partial<AuthState>) {
    state = { ...state, ...nextState };
    notify();
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useAuthStore<T>(selector: (state: AuthState) => T) {
  const [selected, setSelected] = useState(() =>
    selector(authStore.getState())
  );

  useEffect(() => {
    return authStore.subscribe(() => {
      setSelected(selector(authStore.getState()));
    });
  }, [selector]);

  return selected;
}
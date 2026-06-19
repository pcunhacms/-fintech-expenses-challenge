import { useAuthStore } from "../store/auth.store";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json(); 

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    }
  }

  return data as T;
}

const api = {
  get<T>(path: string) {
    return request<T>(path);
  },

  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(path: string) {
    return request<T>(path, {
      method: "DELETE",
    });
  },
};

export default api;
import api from "./axios";
import type { LoginResponse, User } from "../types/auth";

export async function loginRequest(email: string, password: string) {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response;
}

export async function meRequest() {
  return api.get<User>("/auth/me");
}
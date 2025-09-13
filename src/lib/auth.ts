// src/lib/auth.ts
import { apiFetch } from "./api";

export type User = {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
};

export async function signin(email: string, password: string): Promise<User> {
  return apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signout(): Promise<void> {
  await apiFetch("/auth/signout", { method: "POST" });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiFetch("/user/me");
  } catch {
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    return await apiFetch("/user");
  } catch {
    return [];
  }
}

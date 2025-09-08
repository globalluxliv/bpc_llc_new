// Small client helpers that talk to your Express API via Next rewrites

export type User = {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
};

export async function signin(email: string, password: string) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // old API usually returns {success:true, ...user}
}

export async function signout() {
  await fetch("/api/auth/signout", { method: "POST", credentials: "include" });
}

export async function getCurrentUser(): Promise<User | null> {
  const res = await fetch("/api/user/me", {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getAllUsers(): Promise<User[]> {
  const res = await fetch("/api/user", { credentials: "include", cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// src/lib/api.ts
const API_BASE =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8800";

function toApiUrl(path: string) {
  // allow passing full URLs too
  if (/^https?:\/\//i.test(path)) return path;
  const base = API_BASE.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiFetch<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = toApiUrl(path);

  const res = await fetch(url, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export { toApiUrl as apiUrl }; // handy if you need the URL string itself

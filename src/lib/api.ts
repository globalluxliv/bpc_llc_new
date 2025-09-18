// src/lib/api.ts
import { absUrl } from "./abs-url";

function toApiPath(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p.startsWith("/api/") ? p : `/api${p}`;
}

export async function apiFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const url = absUrl(toApiPath(path));

  const headers =
    init.body || (init.method && init.method !== "GET")
      ? { "Content-Type": "application/json", ...(init.headers || {}) }
      : init.headers || {};

  const res = await fetch(url, {
    cache: "no-store",
    credentials: "include",
    ...init,
    headers,
  } as RequestInit);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`apiFetch failed ${res.status} ${res.statusText}\nURL: ${url}\nBody: ${body.slice(0, 500)}`);
  }

  return res.json();
}

export { toApiPath };

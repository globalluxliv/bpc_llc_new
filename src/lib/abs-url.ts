// src/lib/abs-url.ts

export function absUrl(path: string) {
  // Server-side (SSR in Next.js) → must call the API service directly
  if (typeof window === "undefined") {
    const apiBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    const appBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (path.startsWith("/api/")) {
      if (!apiBase) throw new Error("❌ Missing API_BASE_URL in server environment");
      return new URL(path, apiBase).toString(); // ✅ https://bpc-api.onrender.com/api/...
    }
    return new URL(path, appBase).toString();
  }

  // Client-side → safe to use relative path so Next.js rewrite proxies /api → API
  return path;
}

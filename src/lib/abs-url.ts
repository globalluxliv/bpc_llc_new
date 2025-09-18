// src/lib/abs-url.ts
export function absUrl(path: string) {
  // SSR (server components / server actions)
  if (typeof window === "undefined") {
    const apiBase = (process.env.API_BASE_URL || "").replace(/\/+$/, "");
    const appBase = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");

    if (path.startsWith("/api/")) {
      if (!apiBase) throw new Error("❌ Missing API_BASE_URL in server environment");
      return new URL(path, apiBase + "/").toString(); // -> https://bpc-api.onrender.com/api/...
    }
    return new URL(path, appBase + "/").toString();
  }

  // CSR (browser) — let Next.js rewrites proxy /api → API
  return path;
}

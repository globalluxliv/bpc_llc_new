// src/lib/abs-url.ts
export function absUrl(path: string) {
  const base =
    process.env.NEXT_PUBLIC_APP_URL || // set in .env.local in dev/prod
    "http://localhost:3000";
  return new URL(path, base).toString();
}

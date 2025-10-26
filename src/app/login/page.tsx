// src/app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

export default function LoginPage() {
  const r = useRouter();
  const sp = useSearchParams();
  // if no ?next=... is present, fall back to your dashboard (or "/" if you prefer)
  const next = sp?.get("next") || "/dashboard/archived";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already signed in, bounce straight to `next`
  useEffect(() => {
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me) r.replace(next);
      } catch {
        // ignore; user not signed in
      }
    })();
  }, [next, r]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await apiFetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      // ⬇️ go to the page that requested login
      r.replace(next);
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Agent Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={loading} className="bg-[var(--brand)] text-white px-4 py-2 rounded">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-sm mt-4">
        Need an account?{" "}
        <a href={`/register?next=${encodeURIComponent(next)}`} className="text-[var(--brand)] underline">
          Register
        </a>
      </p>
    </div>
  );
}

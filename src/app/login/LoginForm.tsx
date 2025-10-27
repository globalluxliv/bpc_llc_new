// src/app/login/LoginForm.tsx  (CLIENT)
'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LoginForm() {
  const r = useRouter();
  const sp = useSearchParams();
  const next = sp?.get("next") || "/dashboard/archived";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await apiFetch("/auth/me", { method: "GET" });
        if (!ignore && res?.ok) r.replace(next);
      } catch {}
    })();
    return () => { ignore = true; };
  }, [next, r]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await apiFetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!res?.ok) throw new Error("Login failed");
      r.replace(next);
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Agent Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
               value={email} onChange={(e) => setEmail(e.target.value)}
               type="email" required />
        <input className="w-full border rounded px-3 py-2" placeholder="Password"
               value={password} onChange={(e) => setPassword(e.target.value)}
               type="password" required />
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

// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      r.push("/");      // back to home (header will now show New Listing)
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
        <input className="w-full border rounded px-3 py-2"
               placeholder="Email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               type="email" required />
        <input className="w-full border rounded px-3 py-2"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               type="password" required />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={loading}
                className="bg-[var(--brand)] text-white px-4 py-2 rounded">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-sm mt-4">
        Need an account? <a href="/register" className="text-[var(--brand)] underline">Register</a>
      </p>
    </div>
  );
}

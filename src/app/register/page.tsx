// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const r = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "", phone: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      // many backends also auto-sign-in on signup; if not, send to /login
      r.push("/login");
    } catch (e: any) {
      setErr(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Agent Registration</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2"
               placeholder="Full name"
               value={form.username}
               onChange={e => set("username", e.target.value)}
               required />
        <input className="w-full border rounded px-3 py-2"
               placeholder="Email"
               value={form.email}
               onChange={e => set("email", e.target.value)}
               type="email" required />
        <input className="w-full border rounded px-3 py-2"
               placeholder="Password"
               value={form.password}
               onChange={e => set("password", e.target.value)}
               type="password" required />
        <input className="w-full border rounded px-3 py-2"
               placeholder="Phone (optional)"
               value={form.phone}
               onChange={e => set("phone", e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={loading}
                className="bg-[var(--brand)] text-white px-4 py-2 rounded">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

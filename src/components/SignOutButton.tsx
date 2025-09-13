// src/app/components/SignOutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function SignOutButton() {
  const router = useRouter();
  async function handleSignOut() {
    try {
      await apiFetch("/auth/signout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }
  return (
    <button onClick={handleSignOut} className="px-3 py-1 text-xs font-semibold rounded hover:bg-[var(--brand-2)]">
      Sign out
    </button>
  );
}

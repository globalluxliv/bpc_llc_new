"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      // Kick user back to home and refresh cookies/server components
      router.push("/");
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 text-xs font-semibold rounded hover:bg-[var(--brand-2)]"
    >
      Sign out
    </button>
  );
}

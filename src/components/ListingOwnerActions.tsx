"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ListingOwnerActions({ id }: { id: string }) {
  const r = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onDelete() {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/listing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      r.push("/"); // or your dashboard
    } catch (e: any) {
      setErr(e.message || "Failed to delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => r.push(`/dashboard/edit-listing/${id}`)}
        className="px-3 py-1 rounded bg-[var(--brand)] text-white"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        disabled={busy}
        className="px-3 py-1 rounded bg-red-600 text-white"
      >
        {busy ? "Deleting…" : "Delete"}
      </button>
      {err && <span className="text-sm text-red-600">{err}</span>}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ListingOwnerActions({ id }: { id: string }) {
  const r = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function doAction(path: string, method: string, redirect = false) {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(path, {
        method,
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      if (redirect) r.push("/");
      else location.reload();
    } catch (e: any) {
      setErr(e.message || "Action failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-3 items-center flex-wrap">
      {/* Edit */}
      <button
        onClick={() => r.push(`/dashboard/edit-listing/${id}`)}
        className="px-3 py-1 rounded bg-[var(--brand)] text-white"
      >
        Edit
      </button>

      {/* Archive */}
      <button
        onClick={() => doAction(`/api/listing/archive/${id}`, "PATCH")}
        disabled={busy}
        className="px-3 py-1 rounded bg-gray-600 text-white"
      >
        {busy ? "Archiving…" : "Archive"}
      </button>

      {/* Unarchive */}
      <button
        onClick={() => doAction(`/api/listing/unarchive/${id}`, "PATCH")}
        disabled={busy}
        className="px-3 py-1 rounded bg-emerald-600 text-white"
      >
        {busy ? "Restoring…" : "Unarchive"}
      </button>

      {/* Delete */}
      <button
        onClick={() => doAction(`/api/listing/${id}`, "DELETE", true)}
        disabled={busy}
        className="px-3 py-1 rounded bg-red-600 text-white"
      >
        {busy ? "Deleting…" : "Delete"}
      </button>

      {err && <span className="text-sm text-red-600">{err}</span>}
    </div>
  );
}

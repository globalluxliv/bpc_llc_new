"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Listing = {
  _id: string;
  name?: string;
  address?: string;
  imageUrls?: string[];
  type?: "rent" | "sale" | "commercial_sale" | "commercial_lease" | string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  regularPrice?: number;
  discountPrice?: number;
  offer?: boolean;
  archived?: boolean;
};

export default function ArchivedListingsPage() {
  const r = useRouter();
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        // Single source of truth: backend auth
        const res = await fetch("/api/listing/me/mine?includeArchived=1", {
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401 || res.status === 403) {
          // not signed in / not allowed → send to login with return URL
          r.replace(`/login?next=${encodeURIComponent("/dashboard/archived")}`);
          return;
        }
        if (!res.ok) throw new Error(await res.text());

        const all: Listing[] = await res.json();
        if (!alive) return;
        setItems(all.filter((l) => l.archived === true));
      } catch (e: any) {
        if (!alive) return;
        setErr(e.message || "Failed to load archived listings");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [r]);

  async function unarchive(id: string) {
    try {
      const res = await fetch(`/api/listing/unarchive/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (res.status === 401 || res.status === 403) {
        r.replace(`/login?next=${encodeURIComponent("/dashboard/archived")}`);
        return;
      }
      if (!res.ok) throw new Error(await res.text());
      setItems((xs) => xs.filter((x) => x._id !== id));
    } catch (e: any) {
      alert(e.message || "Failed to unarchive");
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Archived Listings</h1>
        <Link href="/dashboard" className="underline text-[var(--brand)]">
          ← Back to My Listings
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">{err}</p>}
      {!loading && !err && items.length === 0 && <p>No archived listings.</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((l) => {
          const cover = l.imageUrls?.[0] || "/images/default.jpg";
          const priceNum =
            l.offer && typeof l.discountPrice === "number"
              ? l.discountPrice
              : typeof l.regularPrice === "number"
              ? l.regularPrice
              : undefined;

          const price =
            typeof priceNum === "number"
              ? `$${priceNum.toLocaleString()}${
                  l.type === "rent" ? " / month" : ""
                }`
              : "";

          return (
            <article key={l._id} className="bg-white shadow rounded overflow-hidden">
              <a href={`/apartments/listing/${l._id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={l.address || l.name || "Listing photo"}
                  className="w-full h-40 object-cover"
                />
              </a>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold truncate">
                    {l.address || l.name || "Untitled"}
                  </h2>
                  <span className="text-sm bg-gray-200 rounded px-2 py-0.5">
                    Archived
                  </span>
                </div>

                {price && <div className="font-bold">{price}</div>}

                <div className="text-sm text-gray-600">
                  BR: {l.bedrooms ?? "-"} / Bath: {l.bathrooms ?? "-"}
                  {l.sqft ? <> / SqFt: {l.sqft}</> : null}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => unarchive(l._id)}
                    className="px-3 py-1 rounded bg-emerald-600 text-white"
                  >
                    Unarchive
                  </button>
                  <a className="px-3 py-1 rounded bg-gray-200" href={`/apartments/listing/${l._id}`}>
                    View
                  </a>
                  <a className="px-3 py-1 rounded bg-[var(--brand)] text-white" href={`/dashboard/edit-listing/${l._id}`}>
                    Edit
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

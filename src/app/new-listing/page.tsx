// src/app/new-listing/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewListingPage() {
  const r = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    type: "sale" as "sale" | "rent",
    regularPrice: "",
    bedrooms: "1",
    bathrooms: "1",
    sqft: "",
    offer: false,
    furnished: false,
    parking: false,
    imageUrlsCsv: "", // comma-separated URLs
  });

  function set<K extends keyof typeof form>(k: K, v: any) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        address: form.address,
        description: form.description,
        type: form.type,
        regularPrice: Number(form.regularPrice),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        sqft: form.sqft ? Number(form.sqft) : undefined,
        offer: Boolean(form.offer),
        furnished: Boolean(form.furnished),
        parking: Boolean(form.parking),
        imageUrls: form.imageUrlsCsv.split(",").map(s => s.trim()).filter(Boolean),
      };

      const res = await fetch("/api/listing/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const created = await res.json();
      // go view it (Detail route expects Mongo _id)
      r.push(`/apartments/listing/${created._id || created.id}`);
    } catch (e: any) {
      setErr(e.message || "Create failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border rounded px-3 py-2" placeholder="Name" value={form.name}
               onChange={e => set("name", e.target.value)} required />
        <input className="border rounded px-3 py-2" placeholder="Address" value={form.address}
               onChange={e => set("address", e.target.value)} required />
        <select className="border rounded px-3 py-2" value={form.type}
                onChange={e => set("type", e.target.value as "sale"|"rent")}>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
        <input className="border rounded px-3 py-2" placeholder="Price"
               value={form.regularPrice}
               onChange={e => set("regularPrice", e.target.value)} required />
        <input className="border rounded px-3 py-2" placeholder="Bedrooms"
               value={form.bedrooms}
               onChange={e => set("bedrooms", e.target.value)} required />
        <input className="border rounded px-3 py-2" placeholder="Bathrooms"
               value={form.bathrooms}
               onChange={e => set("bathrooms", e.target.value)} required />
        <input className="border rounded px-3 py-2" placeholder="Sq Ft (optional)"
               value={form.sqft}
               onChange={e => set("sqft", e.target.value)} />

        <div className="col-span-full">
          <textarea className="w-full border rounded px-3 py-2" rows={5}
                    placeholder="Description"
                    value={form.description}
                    onChange={e => set("description", e.target.value)} required />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.offer}
                   onChange={e => set("offer", e.target.checked)} />
            Offer
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.furnished}
                   onChange={e => set("furnished", e.target.checked)} />
            Furnished
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.parking}
                   onChange={e => set("parking", e.target.checked)} />
            Parking
          </label>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium mb-1">Image URLs (comma-separated)</label>
          <input className="w-full border rounded px-3 py-2"
                 placeholder="https://... , https://..."
                 value={form.imageUrlsCsv}
                 onChange={e => set("imageUrlsCsv", e.target.value)} />
        </div>

        {err && <p className="text-red-600 text-sm col-span-full">{err}</p>}

        <div className="col-span-full">
          <button disabled={loading}
                  className="bg-[var(--brand)] text-white px-4 py-2 rounded">
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

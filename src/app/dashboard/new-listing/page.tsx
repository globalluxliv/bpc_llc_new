"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers, getCurrentUser } from "@/lib/auth";
import { agents as staticAgents } from "@/lib/agents"; // your file

type ListingForm = {
  name: string;
  description: string;
  address: string;
  mapUrl?: string;
  youtubeUrl?: string;
  type: "rent" | "sale" | "commercial_sale" | "commercial_lease";
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  regularPrice: number;
  discountPrice?: number;
  cc_tax?: number;
  offer?: boolean;
  parking?: boolean;
  furnished?: boolean;
  pet?: boolean;
  gym?: boolean;
  doorMan?: boolean;
  sold?: boolean;
  rented?: boolean;
  underContract?: boolean;
  tempOff?: boolean;
  date?: string;
  imageUrls: string[];
  userRef?: string;     // Mongo _id of the agent user
};

export default function NewListingPage() {
  const r = useRouter();
  const [me, setMe] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<ListingForm>({
    name: "",
    description: "",
    address: "",
    mapUrl: "",
    youtubeUrl: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 0,
    regularPrice: 0,
    discountPrice: 0,
    cc_tax: 0,
    offer: false,
    parking: false,
    furnished: false,
    pet: false,
    gym: false,
    doorMan: false,
    sold: false,
    rented: false,
    underContract: false,
    tempOff: false,
    date: "",
    imageUrls: [],
    userRef: "",
  });

  // load current user & agents
  useEffect(() => {
    (async () => {
      const current = await getCurrentUser();
      setMe(current);
      try {
        const list = await getAllUsers();
        setUsers(list);
        // default userRef = me if present in list
        if (current?._id) setForm((f) => ({ ...f, userRef: current._id }));
      } catch {
        // fallback to lib/agents.ts (no userRef though)
        setUsers([]);
      }
    })();
  }, []);

  const agentOptions = useMemo(() => {
    if (users.length) {
      return users.map((u) => ({ value: u._id, label: u.username || u.email }));
    }
    // fallback to static agents
    return staticAgents.map((a) => ({ value: a.email, label: a.name }));
  }, [users]);

  const update = (k: keyof ListingForm, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addImage = () => update("imageUrls", [...form.imageUrls, ""]);
  const updateImage = (i: number, v: string) => {
    const copy = [...form.imageUrls];
    copy[i] = v;
    update("imageUrls", copy);
  };
  const removeImage = (i: number) => {
    const copy = [...form.imageUrls];
    copy.splice(i, 1);
    update("imageUrls", copy);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json(); // expects { _id: "...", ... }
      r.push(`/apartments/listing/${data._id || data.id}`);
    } catch (e: any) {
      setErr(e?.message || "Failed to create listing");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Create a Listing</h1>

      {!me && (
        <p className="mb-6 text-sm text-orange-700">
          You’re not signed in. You can still try to submit—if the API rejects it,
          you’ll be redirected to <a className="underline" href="/login">Login</a>.
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Name"
          value={form.name} onChange={(e) => update("name", e.target.value)} required />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Description"
          rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} required />
        <input className="w-full border rounded px-3 py-2" placeholder="Address"
          value={form.address} onChange={(e) => update("address", e.target.value)} required />

        <div className="grid grid-cols-2 gap-3">
          <select className="border rounded px-3 py-2"
            value={form.type}
            onChange={(e) => update("type", e.target.value as ListingForm["type"])}>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="commercial_sale">Commercial Sale</option>
            <option value="commercial_lease">Commercial Lease</option>
          </select>

          <select
            className="border rounded px-3 py-2"
            value={form.userRef || ""}
            onChange={(e) => update("userRef", e.target.value)}
          >
            <option value="">Assign to agent</option>
            {agentOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* numbers */}
        <div className="grid grid-cols-3 gap-3">
          <input type="number" className="border rounded px-3 py-2" placeholder="Beds"
            value={form.bedrooms ?? 0}
            onChange={(e) => update("bedrooms", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="Baths"
            value={form.bathrooms ?? 0}
            onChange={(e) => update("bathrooms", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="SqFt"
            value={form.sqft ?? 0}
            onChange={(e) => update("sqft", +e.target.value)} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input type="number" className="border rounded px-3 py-2" placeholder="Price"
            value={form.regularPrice}
            onChange={(e) => update("regularPrice", +e.target.value)} required />
          <input type="number" className="border rounded px-3 py-2" placeholder="Discount price"
            value={form.discountPrice ?? 0}
            onChange={(e) => update("discountPrice", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="CC + Tax"
            value={form.cc_tax ?? 0}
            onChange={(e) => update("cc_tax", +e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Map URL"
            value={form.mapUrl ?? ""} onChange={(e) => update("mapUrl", e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="YouTube URL"
            value={form.youtubeUrl ?? ""} onChange={(e) => update("youtubeUrl", e.target.value)} />
        </div>

        {/* flags */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {[
            ["offer", "Offer"],
            ["parking", "Parking"],
            ["furnished", "Furnished"],
            ["pet", "Pet"],
            ["gym", "Gym"],
            ["doorMan", "Doorman"],
            ["sold", "Sold"],
            ["rented", "Rented"],
            ["underContract", "Under Contract"],
            ["tempOff", "Temporary Off"],
          ].map(([key, label]) => (
            <label key={key} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={(form as any)[key] || false}
                onChange={(e) => update(key as any, e.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>

        {/* image urls */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Images (paste URLs)</span>
            <button type="button" className="text-[var(--brand)] underline" onClick={addImage}>
              + Add image
            </button>
          </div>
          {form.imageUrls.map((u, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                placeholder="https://…"
                value={u}
                onChange={(e) => updateImage(i, e.target.value)}
              />
              <button type="button" className="text-red-600" onClick={() => removeImage(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button disabled={busy} className="bg-[var(--brand)] text-white rounded px-4 py-2">
          {busy ? "Creating…" : "Create listing"}
        </button>
      </form>
    </main>
  );
}

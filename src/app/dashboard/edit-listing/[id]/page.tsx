"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import UploadImages from "@/components/UploadImages";

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
  userRef?: string;
};

export default function EditListingPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const r = useRouter();
  const [form, setForm] = useState<ListingForm | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // load existing listing
  useEffect(() => {
    (async () => {
      setErr(null);
      try {
        const res = await fetch(`/api/listing/get/${id}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error(await res.text());
        const l = await res.json();

        const initial: ListingForm = {
          name: l.name ?? "",
          description: l.description ?? "",
          address: l.address ?? "",
          mapUrl: l.mapUrl ?? "",
          youtubeUrl: l.youtubeUrl ?? "",
          type:
            l.type === "sale" ||
            l.type === "rent" ||
            l.type === "commercial_sale" ||
            l.type === "commercial_lease"
              ? l.type
              : "rent",
          bedrooms: l.bedrooms ?? l.beds ?? 0,
          bathrooms: l.bathrooms ?? l.baths ?? 0,
          sqft: l.sqft ?? 0,
          regularPrice: l.regularPrice ?? l.price ?? 0,
          discountPrice: l.discountPrice ?? 0,
          cc_tax: l.cc_tax ?? 0,
          offer: !!l.offer,
          parking: !!l.parking,
          furnished: !!l.furnished,
          pet: !!l.pet,
          gym: !!l.gym,
          doorMan: !!l.doorMan,
          sold: !!l.sold,
          rented: !!l.rented,
          underContract: !!l.underContract,
          tempOff: !!l.tempOff,
          date: l.date ?? "",
          imageUrls: Array.isArray(l.imageUrls) ? l.imageUrls : [],
          userRef: l.userRef ?? "",
        };
        setForm(initial);
      } catch (e: any) {
        setErr(e.message || "Failed to load listing");
      }
    })();
  }, [id]);

  const update = (k: keyof ListingForm, v: any) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const addImage = () => form && update("imageUrls", [...form.imageUrls, ""]);
  const updateImage = (i: number, v: string) => {
    if (!form) return;
    const copy = [...form.imageUrls];
    copy[i] = v;
    update("imageUrls", copy);
  };
  const removeImage = (i: number) => {
    if (!form) return;
    const copy = [...form.imageUrls];
    copy.splice(i, 1);
    update("imageUrls", copy);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/listing/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      r.push(`/apartments/listing/${updated._id || id}`);
    } catch (e: any) {
      setErr(e.message || "Failed to update listing");
    } finally {
      setBusy(false);
    }
  }

  if (!form) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Edit Listing</h1>
        {err ? <p className="text-red-600">{err}</p> : <p>Loading…</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Edit Listing</h1>

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

          <input className="border rounded px-3 py-2" placeholder="Map URL"
            value={form.mapUrl ?? ""} onChange={(e) => update("mapUrl", e.target.value)} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input type="number" className="border rounded px-3 py-2" placeholder="Beds"
            value={form.bedrooms ?? 0} onChange={(e) => update("bedrooms", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="Baths"
            value={form.bathrooms ?? 0} onChange={(e) => update("bathrooms", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="SqFt"
            value={form.sqft ?? 0} onChange={(e) => update("sqft", +e.target.value)} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input type="number" className="border rounded px-3 py-2" placeholder="Price"
            value={form.regularPrice} onChange={(e) => update("regularPrice", +e.target.value)} required />
          <input type="number" className="border rounded px-3 py-2" placeholder="Discount price"
            value={form.discountPrice ?? 0} onChange={(e) => update("discountPrice", +e.target.value)} />
          <input type="number" className="border rounded px-3 py-2" placeholder="CC + Tax"
            value={form.cc_tax ?? 0} onChange={(e) => update("cc_tax", +e.target.value)} />
        </div>

        <input className="w-full border rounded px-3 py-2" placeholder="YouTube URL"
          value={form.youtubeUrl ?? ""} onChange={(e) => update("youtubeUrl", e.target.value)} />

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
          {/* Upload from computer (adds URLs to form.imageUrls) */}
<UploadImages
  listingId={id}  // if you have `const { id } = useParams()` or `params.id`
  onUploaded={(url) =>
    setForm((f) => (f ? { ...f, imageUrls: [...f.imageUrls, url] } : f))
  }
/>
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
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}

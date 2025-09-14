// src/app/dashboard/edit-listing/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditListingPage() {
  const r = useRouter();
  const params = useParams<{ id: string }>();   // ✅ get id from route
  const id = params.id;

  const [form, setForm] = useState<ListingForm | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
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

      {/* Upload from computer (adds URLs to form.imageUrls) */}
      <UploadImages
        listingId={id}
        onUploaded={(url) =>
          setForm((f) => (f ? { ...f, imageUrls: [...f.imageUrls, url] } : f))
        }
      />

      <form onSubmit={onSubmit} className="space-y-4">
        {/* …rest of your form unchanged… */}
      </form>
    </main>
  );
}

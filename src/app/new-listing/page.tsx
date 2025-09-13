// src/app/dashboard/new-listing/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers, getCurrentUser } from "@/lib/auth";
import { agents as staticAgents } from "@/lib/agents";
import { apiFetch } from "@/lib/api";

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

  useEffect(() => {
    (async () => {
      const current = await getCurrentUser();
      setMe(current);
      try {
        const list = await getAllUsers();
        setUsers(list);
        if (current?._id) setForm((f) => ({ ...f, userRef: current._id }));
      } catch {
        setUsers([]);
      }
    })();
  }, []);

  const agentOptions = useMemo(() => {
    if (users.length) {
      return users.map((u) => ({ value: u._id, label: u.username || u.email }));
    }
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
      const data = await apiFetch("/listing/create", {
  method: "POST",
  body: JSON.stringify(form),
});
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
          You’re not signed in. You can still try to submit—if the API rejects it, you’ll be redirected to{" "}
          <a className="underline" href="/login">
            Login
          </a>.
        </p>
      )}

      {/* form unchanged except for submit handler */}
      {/* ...existing JSX... */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* (rest of your inputs exactly as before) */}
        {/* ... */}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button disabled={busy} className="bg-[var(--brand)] text-white rounded px-4 py-2">
          {busy ? "Creating…" : "Create listing"}
        </button>
      </form>
    </main>
  );
}

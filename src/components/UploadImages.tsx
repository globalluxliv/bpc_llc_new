"use client";

import { useState } from "react";
import { storage, ensureFirebaseAnon } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type Props = {
  onUploaded: (url: string) => void;  // push URL into your form.imageUrls
  listingId?: string;                 // optional folder hint
};

export default function UploadImages({ onUploaded, listingId }: Props) {
  const [items, setItems] = useState<
    { key: string; name: string; progress: number; error?: string }[]
  >([]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;

    await ensureFirebaseAnon();

    Array.from(files).forEach((file) => {
      const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const safeName = file.name.replace(/\s+/g, "-");
      const path = `listings/${listingId || "unassigned"}/${stamp}-${safeName}`;
      const r = ref(storage, path);

      const key = `${stamp}-${safeName}`;
      setItems((s) => [...s, { key, name: file.name, progress: 0 }]);

      const task = uploadBytesResumable(r, file, { contentType: file.type });
      task.on(
        "state_changed",
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setItems((s) => s.map((it) => (it.key === key ? { ...it, progress: pct } : it)));
        },
        (err) => {
          setItems((s) => s.map((it) => (it.key === key ? { ...it, error: err.message } : it)));
        },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          onUploaded(url);
        }
      );
    });

    // allow selecting the same files again later
    e.currentTarget.value = "";
  }

  return (
    <div className="space-y-2">
      <label className="font-semibold">Upload from computer</label>
      <input type="file" accept="image/*" multiple onChange={onPick} />
      <div className="space-y-1 text-xs">
        {items.map((it) => (
          <div key={it.key}>
            {it.name} —{" "}
            {it.error ? <span className="text-red-600">{it.error}</span> : `${it.progress}%`}
          </div>
        ))}
      </div>
    </div>
  );
}

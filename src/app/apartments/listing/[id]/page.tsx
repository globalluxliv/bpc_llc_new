// src/app/apartments/listing/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

function absUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return new URL(path, base).toString();
}

type ParamsPromise = Promise<{ id: string }>;

export default async function ListingDetail({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params; // ✅ await params

  const res = await fetch(absUrl(`/api/listing/get/${id}`), {
    cache: "no-store",
    credentials: "include",
  } as RequestInit);

  if (!res.ok) return notFound();
  const l = await res.json();

  const cover = l.imageUrls?.[0] || "/images/default.jpg";
  const basePrice =
    Number(l.offer ? l.discountPrice ?? l.regularPrice : l.regularPrice ?? l.price) || 0;

  const price =
    basePrice > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(basePrice)
      : "";

  return (
    <main className="bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="relative w-full h-[420px] rounded-lg overflow-hidden shadow">
          <Image
            src={cover}
            alt={l.name || l.address || "Listing photo"}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-extrabold">
            {price} {l.type === "rent" ? "/ month" : ""}
          </h1>

          <div className="mt-1 text-lg font-semibold">
            {l.building ? `${l.building} — ` : null}
            {l.address} {l.unit ?? ""}
          </div>

          <div className="mt-2 text-[15px]">
            <span className="font-bold">BR:</span>{" "}
            {l.bedrooms === 0 ? "Studio" : l.bedrooms ?? l.beds} /{" "}
            <span className="font-bold">Bath:</span> {l.bathrooms ?? l.baths}
            {l.sqft ? (
              <> / <span className="font-bold">SqFt:</span> {l.sqft}</>
            ) : null}
          </div>

          {(l.cc || l.tax) && (
            <div className="text-[15px]">
              <span className="font-bold">CC:</span>{" "}
              {l.cc ? Number(l.cc).toLocaleString() : "-"} /{" "}
              <span className="font-bold">Tax:</span>{" "}
              {l.tax ? Number(l.tax).toLocaleString() : "-"}
            </div>
          )}

          {l.description && <p className="mt-4">{l.description}</p>}

          <a
            href="/contact"
            className="mt-6 inline-block px-4 py-2 rounded bg-[var(--brand)] text-white"
          >
            Request a showing
          </a>
        </div>
      </div>
    </main>
  );
}

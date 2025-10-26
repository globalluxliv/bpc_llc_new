// src/app/apartments/listing/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import ListingOwnerActions from "@/components/ListingOwnerActions";

function absUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return new URL(path, base).toString();
}

type ParamsPromise = Promise<{ id: string }>;

function formatUSD(n: unknown) {
  const x = Number(n);
  if (!Number.isFinite(x)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(x);
}

// Treat numeric "name" as legacy price
function nameAsPrice(name: unknown): number | null {
  if (typeof name !== "string") return null;
  return /^\d+(\.\d+)?$/.test(name) ? Number(name) : null;
}

export default async function ListingDetail({
  params,
}: {
  params: ParamsPromise;
}) {
  const { id } = await params;

  const res = await fetch(absUrl(`/api/listing/get/${id}`), {
    cache: "no-store",
    credentials: "include",
  } as RequestInit);

  if (!res.ok) return notFound();
  const l = await res.json();

  const cover = l.imageUrls?.[0] || "/images/default.jpg";

  // Prefer regularPrice; then legacy price; then numeric name (legacy docs)
  const basePrice =
    l.regularPrice ?? l.price ?? nameAsPrice(l.name);

  // If "offer" is true and discountPrice exists, show that; otherwise base
  const rawPrice =
    l.offer && Number.isFinite(Number(l.discountPrice))
      ? Number(l.discountPrice)
      : basePrice;

  const priceStr = formatUSD(rawPrice);

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
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">
                {priceStr} {l.type === "rent" ? "/ month" : ""}
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
              {(l.cc_tax || l.cc || l.tax) && (
                <div className="text-[15px]">
                  <span className="font-bold">CC + Tax:</span>{" "}
                  {Number.isFinite(Number(l.cc_tax ?? l.cc ?? l.tax))
                    ? Number(l.cc_tax ?? l.cc ?? l.tax).toLocaleString()
                    : "-"}
                </div>
              )}
            </div>

            <ListingOwnerActions id={id} />
          </div>

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

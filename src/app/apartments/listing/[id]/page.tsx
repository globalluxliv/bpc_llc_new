// src/app/apartments/listing/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/listings";

export default async function ListingDetail({
  params,
}: {
  params: { id: string };
}) {
  const l = await getListingById(params.id);
  if (!l) return notFound();

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(l.price);

  return (
    <main className="bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="relative w-full h-[420px] rounded-lg overflow-hidden shadow">
          <Image src={l.img} alt={`${l.building} ${l.unit ?? ""}`} fill className="object-cover" />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-extrabold">{price}</h1>

          <div className="mt-1 text-lg font-semibold">
            {l.building} — {l.address} {l.unit ?? ""}
          </div>

          <div className="mt-2 text-[15px]">
            <span className="font-bold">BR:</span> {l.beds === 0 ? "Studio" : l.beds}{" "}
            / <span className="font-bold">Bath:</span> {l.baths}
            {l.sqft ? (
              <>
                {" "}/ <span className="font-bold">SqFt:</span> {l.sqft}
              </>
            ) : null}
          </div>

          {(l.cc || l.tax) && (
            <div className="text-[15px]">
              <span className="font-bold">CC:</span> {l.cc?.toLocaleString() ?? "-"}{" "}
              / <span className="font-bold">Tax:</span> {l.tax?.toLocaleString() ?? "-"}
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

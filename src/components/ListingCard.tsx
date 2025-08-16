// src/components/ListingCard.tsx
export default function ListingCard({ listing }: { listing: any }) {
  return (
    <article className="bg-white rounded-lg shadow-md border border-[var(--border)] overflow-hidden">
      <div className="aspect-[4/3] bg-bgAlt">
        <img
          src={listing.images?.[0]?.url ?? "/placeholder.jpg"}
          alt={listing.images?.[0]?.alt ?? ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-xl font-extrabold">
          ${listing.price.toLocaleString()}
        </div>
        <div className="mt-1 font-semibold">{listing.title}</div>
        <div className="mt-1 text-sm text-muted">{listing.address}</div>
        <div className="mt-1 text-sm">
          <b>BR:</b> {listing.beds} / <b>Bath:</b> {listing.baths}
          {listing.sqft ? (
            <>
              {" "}
              / <b>SqFt:</b> {listing.sqft}
            </>
          ) : null}
        </div>
        <a
          href={`/apartments/${listing.slug}`}
          className="mt-4 inline-block px-4 py-2 rounded-full bg-[var(--brand)] text-white text-sm"
        >
          View Listing
        </a>
      </div>
    </article>
  );
}

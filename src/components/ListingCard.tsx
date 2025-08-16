import type { Listing } from "@/lib/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a
      href={`/apartments/${listing.slug}`}
      className="group border rounded-lg overflow-hidden bg-white"
    >
      <div className="aspect-[4/3] bg-bgAlt" />
      <div className="p-4">
        <div className="flex justify-between gap-3">
          <h3 className="font-medium group-hover:underline">{listing.title}</h3>
          <span className="font-semibold">
            ${listing.price.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {listing.beds} bd • {listing.baths} ba
          {listing.sqft ? ` • ${listing.sqft.toLocaleString()} sqft` : ""}
        </p>
        <p className="mt-1 text-sm">{listing.address}</p>
      </div>
    </a>
  );
}

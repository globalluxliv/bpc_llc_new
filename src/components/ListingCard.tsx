import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing }: { listing: any }) {
  const id = listing._id || listing.id;
  const cover =
    listing.imageUrls?.[0] ||
    listing.imageUrl ||
    "/images/default.jpg";

  const priceNumber =
  Number(
    listing.offer ? listing.discountPrice ?? listing.regularPrice : listing.regularPrice ?? listing.price
  ) || 0;

  const price = `$${priceNumber.toLocaleString()}${listing.type === "rent" ? " / month" : ""}`;


  return (
    <article className="bg-white shadow rounded-lg overflow-hidden">
      <Link href={`/apartments/listing/${id}`} className="block">
        <div className="relative w-full h-48">
          <Image
            src={cover}
            alt={listing.address || listing.name || "Listing photo"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4">
        {price && <p className="text-xl font-bold">{price}</p>}
        <p className="text-gray-700">{listing.address}</p>

        <p className="text-sm text-gray-600">
          BR: {listing.bedrooms ?? listing.beds ?? "Studio"} / Bath:{" "}
          {listing.bathrooms ?? listing.baths ?? "-"}
          {listing.sqft ? <> / SqFt: {listing.sqft}</> : null}
        </p>

        {(listing.cc || listing.tax) && (
          <p className="text-sm text-gray-600">
            CC: {listing.cc ?? "-"} / Tax: {listing.tax ?? "-"}
          </p>
        )}

        <Link
          href={`/apartments/listing/${id}`}
          className="mt-4 inline-block bg-[var(--brand)] text-white px-3 py-2 rounded"
        >
          View Listing
        </Link>
      </div>
    </article>
  );
}

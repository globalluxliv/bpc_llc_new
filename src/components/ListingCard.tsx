// src/components/ListingCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/lib/listings";

export default function ListingCard({ listing }: { listing: any }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={listing.imageUrl}
        alt={listing.address}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-xl font-bold">{listing.price}</p>
        <p className="text-gray-700">{listing.address}</p>
        <p className="text-sm text-gray-600">
          BR: {listing.bedrooms || "Studio"} / Bath: {listing.bathrooms} / SqFt:{" "}
          {listing.sqft}
        </p>
        <p className="text-sm text-gray-600">
          CC: {listing.cc} / Tax: {listing.tax}
        </p>
        <button className="mt-4 bg-[var(--brand)] text-white px-3 py-2 rounded">
          View Listing
        </button>
      </div>
    </div>
  );
}

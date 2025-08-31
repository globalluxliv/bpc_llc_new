// src/app/apartments/rentals/page.tsx
import { getListingsByType } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import Filters from "@/components/Filters";

type SearchParams = { [k: string]: string | string[] | undefined };

export default async function RentalsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // default to "rent", only allow known types
  const raw = (searchParams?.type as string) ?? "rent";
  const type = raw === "sale" ? "sale" : "rent";

  const listings = await getListingsByType(type);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        {type === "rent" ? "Apartment Rentals" : "Apartment Sales"}
      </h1>

      <div className="mb-4">
        <Filters />
      </div>

      {listings.length === 0 ? (
        <p className="text-sm text-gray-600">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}

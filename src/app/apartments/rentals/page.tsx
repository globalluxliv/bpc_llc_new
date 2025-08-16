import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import Filters from "@/components/Filters";

export default async function RentalsPage({
  searchParams,
}: {
  searchParams: { [k: string]: string };
}) {
  const listings = await getListings({
    type: (searchParams.type as any) ?? "rent",
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Apartment Rentals</h1>
      <div className="mb-4">
        <Filters />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}

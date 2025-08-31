import { fetchListingsFromSheet } from "@/lib/sheets";
import ListingCard from "@/components/ListingCard";

export default async function SalesPage() {
  const listings = await fetchListingsFromSheet();

  // Only sales
  const sales = listings.filter((l) => l.type === "sale");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Apartment Sales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}

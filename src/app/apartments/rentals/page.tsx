// src/app/apartments/rentals/page.tsx
import ListingCard from "@/components/ListingCard";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";

function absUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return new URL(path, base).toString();
}

async function getListings(type: "sale" | "rent", limit = 24) {
  const url = absUrl(`/api/listing/get?type=${encodeURIComponent(type)}&limit=${limit}`);
  const res = await fetch(url, { cache: "no-store", credentials: "include" } as RequestInit);
  if (!res.ok) return [];
  return res.json();
}

export default async function RentalsPage() {
  const rentals = await getListings("rent", 24);

  return (
    <div className="bg-[var(--bg-alt)]">
      <SectionTitle>
        <div className="flex items-baseline justify-between">
          <span>Apartment Rentals</span>
          <Link href="/" className="text-[var(--brand)] text-sm hover:underline">
            Back to Home
          </Link>
        </div>
      </SectionTitle>

      <div className="mx-auto max-w-6xl px-4 pb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rentals.length === 0 ? (
          <div className="col-span-full text-sm text-gray-500">No rentals available.</div>
        ) : (
          rentals.map((l: any) => <ListingCard key={l._id || l.id} listing={l} />)
        )}
      </div>
    </div>
  );
}

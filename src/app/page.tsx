// src/app/page.tsx
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import SectionTitle from "@/components/SectionTitle";
import AboutSection from "@/components/AboutSection";
import ListingCard from "@/components/ListingCard";
import { apiFetch } from "@/lib/api";

// Fetch listings from your Express API
async function getListings(type: "sale" | "rent", limit = 6) {
  return apiFetch(`/api/listing/get?type=${encodeURIComponent(type)}&limit=${limit}`);
}

export default async function Home() {
  const [sales, rentals] = await Promise.all([
    getListings("sale", 6),
    getListings("rent", 6),
  ]);

  return (
    <>
      <HeroCarousel />

      <div className="bg-[var(--bg-alt)]">
        {/* New Sales */}
        <SectionTitle>
          <div className="flex items-baseline justify-between">
            <span>New Sales</span>
            <Link href="/sales" className="text-[var(--brand)] text-sm hover:underline">
              Show more sales
            </Link>
          </div>
        </SectionTitle>
        <div className="mx-auto max-w-6xl px-4 pb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sales?.length ? (
            sales.map((l: any) => <ListingCard key={l._id || l.id} listing={l} />)
          ) : (
            <div className="col-span-full text-sm text-gray-500">No sales to show right now.</div>
          )}
        </div>

        {/* New Rentals */}
        <SectionTitle>
          <div className="flex items-baseline justify-between">
            <span>New Rentals</span>
            <Link
              href="/apartments/rentals"
              className="text-[var(--brand)] text-sm hover:underline"
            >
              Show more rentals
            </Link>
          </div>
        </SectionTitle>
        <div className="mx-auto max-w-6xl px-4 pb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rentals?.length ? (
            rentals.map((l: any) => <ListingCard key={l._id || l.id} listing={l} />)
          ) : (
            <div className="col-span-full text-sm text-gray-500">No rentals to show right now.</div>
          )}
        </div>
      </div>

      <AboutSection />
    </>
  );
}

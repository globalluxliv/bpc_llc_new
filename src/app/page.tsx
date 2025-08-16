import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ListingCard from "@/components/ListingCard";
import { getListings } from "@/lib/listings";

export default async function Home() {
  const featured = await getListings({ featured: true, limit: 6 });
  return (
    <>
      <Hero />
      <Section
        title="Featured Listings"
        subtitle="Hand‑picked rentals & sales in BPC."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </Section>
    </>
  );
}

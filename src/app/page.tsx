// src/app/page.tsx
import SectionTitle from "@/components/SectionTitle";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="bg-[var(--bg-alt)]">
        <SectionTitle>New Sales</SectionTitle>
        {/* cards grid here */}
        <SectionTitle>New Rentals</SectionTitle>
        {/* cards grid here */}
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h3 className="text-2xl font-bold border-t-4 border-[var(--brand)] pt-4">
          Welcome to Battery Park Residential
        </h3>
        <p className="mt-4 text-[17px] leading-7 text-[#374151]">
          {/* your owned copy */}
        </p>
      </section>
    </>
  );
}

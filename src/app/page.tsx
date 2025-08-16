// src/app/page.tsx
import HeroCarousel from "@/components/HeroCarousel";
import SectionTitle from "@/components/SectionTitle";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      {/* Hero slider */}
      <HeroCarousel />

      {/* Light gray content area with section titles */}
      <div className="bg-[var(--bg-alt)]">
        <SectionTitle>New Sales</SectionTitle>
        {/* TODO: cards grid here */}

        <SectionTitle>New Rentals</SectionTitle>
        {/* TODO: cards grid here */}
      </div>

      {/* Welcome / About block with teal rule, text, contact, and map */}
      <AboutSection />
    </>
  );
}

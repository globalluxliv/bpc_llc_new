// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative">
      <img
        src="/hero.jpg"
        alt="Battery Park City skyline"
        className="w-full h-[62vh] md:h-[70vh] object-cover"
      />
      {/* Gray title bar over image */}
      <div className="absolute left-0 right-0 top-8 md:top-10">
        <div className="mx-auto max-w-6xl px-4">
          <div
            className="bg-[#6b7280]/70 text-white text-center px-4 py-2 md:py-3
                          text-xl md:text-2xl font-semibold tracking-wide"
          >
            Battery Park City: Urban Green Living at its Finest
          </div>
        </div>
      </div>
      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-white/90" />
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-2 rounded-full bg-white/50" />
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type Slide = { src: string; alt?: string; title?: string };

export default function HeroCarousel() {
  const slides: Slide[] = [
    { src: "/skyline-1.png", alt: "Battery Park City skyline 1" },
    { src: "/skyline-2.png", alt: "Battery Park City skyline 2" },
    { src: "/skyline-3.png", alt: "Battery Park City skyline 3" },
  ];

  const [i, setI] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // autoplay (pause on hover)
  const start = () => {
    stop();
    timer.current = setInterval(
      () => setI((p) => (p + 1) % slides.length),
      6000
    );
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  const prev = () => setI((i - 1 + slides.length) % slides.length);
  const next = () => setI((i + 1) % slides.length);

  return (
    <section
      className="relative select-none"
      onMouseEnter={stop}
      onMouseLeave={start}
      aria-roledescription="carousel"
    >
      {/* slides */}
      <div className="relative w-full h-[62vh] md:h-[70vh] overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={idx !== i}
          >
            <Image
              src={s.src}
              alt={s.alt ?? ""}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* title bar overlay (optional) */}
      <div className="pointer-events-none absolute left-0 right-0 top-8 md:top-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="bg-[#6b7280]/70 text-white text-center px-4 py-2 md:py-3 text-xl md:text-2xl font-semibold tracking-wide">
            Battery Park City: Urban Green Living at its Finest
          </div>
        </div>
      </div>

      {/* controls (hidden on mobile if you want) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 grid place-items-center"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 grid place-items-center"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

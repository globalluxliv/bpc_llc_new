export default function Hero() {
  return (
    <section className="relative">
      <div className="h-[60svh] bg-bgAlt flex items-center border-b">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Battery Park City Homes
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Rentals & sales with local expertise in BPC.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="/apartments/rentals"
              className="px-4 py-2 rounded bg-brand text-white"
            >
              Browse Rentals
            </a>
            <a href="/sales" className="px-4 py-2 rounded border">
              Browse Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

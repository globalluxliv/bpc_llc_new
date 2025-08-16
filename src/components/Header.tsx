export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <img src="/logo.svg" alt="BPC Residential" className="h-6" />
          <span className="sr-only">BPC Residential</span>
        </a>
        <nav className="flex gap-6 text-sm">
          <a href="/apartments/rentals">Rentals</a>
          <a href="/sales">Sales</a>
          <a href="/about">About</a>
          <a
            href="/contact"
            className="px-3 py-1.5 rounded bg-brand text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

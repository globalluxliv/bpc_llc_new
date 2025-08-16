export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <img src="/logo.svg" alt="BPC Residential" className="h-7 mb-3" />
          <p className="text-muted">Battery Park City specialists.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Explore</div>
          <ul className="space-y-1">
            <li>
              <a href="/apartments/rentals">Rentals</a>
            </li>
            <li>
              <a href="/sales">Sales</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Contact</div>
          <p>Phone: (212) 555‑0000</p>
          <p>Email: hello@bpcresidential.com</p>
          <p>Address: 123 Rector Pl, New York, NY</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted pb-6">
        © {new Date().getFullYear()} BPC Residential
      </div>
    </footer>
  );
}

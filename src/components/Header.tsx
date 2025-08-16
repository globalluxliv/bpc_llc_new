// src/components/Header.tsx
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top logo row */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 h-24 flex items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Battery Park City Residential LLC"
              className="h-14 w-auto"
            />
            <span className="sr-only">Battery Park City Residential LLC</span>
          </a>

          {/* Social icons */}
          <div className="ml-auto flex items-center gap-4 text-[var(--brand)]">
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Thin teal line above nav */}
      <div className="h-1 bg-[var(--brand)]/85" />

      {/* Nav strip */}
      <nav className="bg-[var(--brand)] text-white">
        <div className="mx-auto max-w-6xl px-4 h-10 flex justify-center">
          {[
            { href: "/", label: "HOME" },
            { href: "/sales", label: "SALES" },
            { href: "/apartments/rentals", label: "RENTALS" },
            { href: "/commercial", label: "COMMERCIAL SPACES" },
            { href: "/agents", label: "OUR AGENTS" },
          ].map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="px-6 flex items-center text-xs font-bold tracking-wide uppercase hover:bg-[var(--brand-2)]"
            >
              {i.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

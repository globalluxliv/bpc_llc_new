// src/components/Header.tsx
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { cookies } from "next/headers";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function Header() {
  // ✅ await cookies() in your setup
  const cookieStore = await cookies();
  const isAgentLoggedIn = Boolean(cookieStore.get("access_token")?.value);

  return (
    <header className="w-full">
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 h-24 flex items-center">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Battery Park City Residential LLC" className="h-14 w-auto" />
            <span className="sr-only">Battery Park City Residential LLC</span>
          </a>

          <div className="ml-auto flex items-center gap-4 text-[var(--brand)]">
            <a href="#" aria-label="Facebook"><FaFacebookF size={18} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={18} /></a>

            {isAgentLoggedIn ? (
              <>
                <Link href="/dashboard/new-listing" className="text-xs font-bold uppercase ml-4 hover:underline">
                  New Listing
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link href="/login" className="text-xs font-bold uppercase ml-4 hover:underline">
                Agent Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="h-1 bg-[var(--brand)]/85" />

      <nav className="bg-[var(--brand)] text-white">
        <div className="mx-auto max-w-6xl px-4 h-10 flex justify-center">
          {[
            { href: "/", label: "HOME" },
            { href: "/sales", label: "SALES" },
            { href: "/apartments/rentals", label: "RENTALS" },
            { href: "/commercial", label: "COMMERCIAL SPACES" },
            { href: "/agents", label: "OUR AGENTS" },
          ].map(i => (
            <a key={i.href} href={i.href}
               className="px-6 flex items-center text-xs font-bold tracking-wide uppercase hover:bg-[var(--brand-2)]">
              {i.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

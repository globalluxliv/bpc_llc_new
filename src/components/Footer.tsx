// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#2d3f50] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-1 text-sm leading-6">
          <div className="font-semibold">
            Battery Park City Residential - © {new Date().getFullYear()}
          </div>
          <div>295 West Thames Street</div>
          <div>New York, NY 10280</div>
          <div>212.884.2211</div>
          <a className="underline" href="mailto:info@bpcresidential.com">
            info@bpcresidential.com
          </a>
        </div>
        <div className="md:justify-self-end flex items-end gap-4">
          {/* social icons if needed */}
        </div>
      </div>
    </footer>
  );
}

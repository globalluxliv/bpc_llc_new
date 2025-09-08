export default function AboutSection() {
  return (
    <section className="bg-[var(--bg-alt)] py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* teal rule across the container */}
        <div className="h-[3px] bg-[var(--brand)] mb-6" />

        {/* heading w/ underline */}
        <h2 className="text-2xl md:text-[28px] font-extrabold tracking-tight text-[#1f2937]">
          <span className="underline underline-offset-[6px] decoration-[var(--brand)]">
            Welcome to Battery Park Residential
          </span>
        </h2>

        {/* thin divider under heading */}
        <div className="mt-3 h-[2px] bg-[#2d4f5b33]" />

        {/* content: text + map */}
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {/* left: paragraphs */}
          <div className="text-[17px] leading-7 text-[#374151] space-y-5">
            <p>
              <em>
                <b>Your #1 Real Estate Agency in Battery Park City</b>
              </em>
            </p>
            <p>
              Since 1990, Battery Park City Residential has proudly served the
              vibrant community of Battery Park City, establishing a
              reputation—both nationally and internationally—as a leader in
              apartment sales and rentals. With a deep understanding of the New
              York real estate market and a hyperlocal focus, we are your go-to
              experts for finding the perfect home or investment in Battery Park
              City.
            </p>
            <p>
              What sets us apart is our unwavering commitment to{" "}
              <b>exceptional personal service.</b> We believe that real estate
              is more than just a transaction—it's a relationship that continues
              long after the listing or closing.
            </p>
            <p>
              Our roots run deep in the neighborhood. Beyond our real estate
              services, we are actively involved in the community—sponsoring
              local sports teams, supporting community gardens, food banks, and
              pet parks, and engaging in local civic initiatives. Our longevity
              and consistent presence have made us more than a real estate
              agency—we’re a true <b>community connection.</b>
            </p>
            {/* contact block */}
            <div className="pt-2">
              <div className="font-extrabold text-[var(--brand)]">
                Battery Park City Residential
              </div>
              <div>295 West Thames Street</div>
              <div>New York, NY 10280</div>
              <div>212.884.2211</div>
              <a href="https://bpcresidential.com" className="underline">
                www.bpcresidential.com
              </a>
              <br />
              <a href="mailto:info@bpcresidential.com" className="underline">
                info@bpcresidential.com
              </a>
            </div>
          </div>

          {/* right: map embed */}
          <div className="rounded-md overflow-hidden shadow-sm border border-[var(--border)] min-h-[320px]">
            <iframe
              title="Battery Park City Residential Map"
              width="100%"
              height="100%"
              style={{ minHeight: 320, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={
                "https://www.google.com/maps?q=295+W+Thames+St,+New+York,+NY+10280&output=embed"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

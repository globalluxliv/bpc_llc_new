import { getListingBySlug } from "@/lib/listings";

export default async function ListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const listing = await getListingBySlug(params.slug);
  if (!listing)
    return <div className="mx-auto max-w-6xl px-4 py-12">Not found</div>;
  return (
    <article className="mx-auto max-w-5xl px-4 py-8 grid gap-8 md:grid-cols-5">
      <div className="md:col-span-3 aspect-[4/3] bg-bgAlt rounded" />
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold">{listing.title}</h1>
        <div className="text-xl font-bold mt-1">
          ${listing.price.toLocaleString()}
        </div>
        <p className="text-muted mt-1">
          {listing.beds} bd • {listing.baths} ba
        </p>
        <p className="mt-4">{listing.description}</p>
        <a
          href="/contact"
          className="mt-6 inline-block px-4 py-2 rounded bg-brand text-white"
        >
          Request a showing
        </a>
      </div>
    </article>
  );
}

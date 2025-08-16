export type Listing = {
  id: string;
  slug: string;
  status: "rent" | "sale";
  featured?: boolean;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft?: number;
  address: string;
  images: { url: string; alt?: string }[];
  description?: string;
  amenities?: string[];
};

const SEED: Listing[] = [
  {
    id: "1",
    slug: "225-rector-pl-12a",
    status: "rent",
    featured: true,
    title: "225 Rector Pl #12A",
    price: 5895,
    beds: 2,
    baths: 2,
    sqft: 980,
    address: "225 Rector Pl, New York, NY",
    images: [{ url: "/placeholder.jpg", alt: "Living room" }],
    description: "Bright corner 2BR with Hudson views.",
  },
  // add more…
];

export async function getListings(
  params: Partial<{
    type: "rent" | "sale";
    featured: boolean;
    limit: number;
  }> = {}
) {
  let res = [...SEED];
  if (params.type)
    res = res.filter(
      (l) => l.status === (params.type === "rent" ? "rent" : "sale")
    );
  if (params.featured) res = res.filter((l) => l.featured);
  if (params.limit) res = res.slice(0, params.limit);
  return res;
}

export async function getListingBySlug(slug: string) {
  return SEED.find((l) => l.slug === slug) ?? null;
}

//lib/listings.ts
import raw from "@/data/listings.json";

// App-wide normalized type
export type Listing = {
  id: string;
  slug: string;
  title: string;
  building: string;
  address: string;
  unit?: string;
  type: "sale" | "rent" | "commercial_sale" | "commercial_lease";
  price: number;
  beds: number;
  baths: number;
  sqft?: number;
  cc?: number;
  tax?: number;
  img: string;
  description?: string;
};

// Match your JSON leniently (only what's guaranteed stays required)
type RawListing = {
  id: string;
  address: string;
  price: number | string;

  bedrooms: number | string;
  bathrooms: number | string;

  // everything else optional / loose
  slug?: string;
  title?: string;
  building?: string;
  unit?: string;
  type?: string;
  sqft?: number | string;
  cc?: number | string;
  tax?: number | string;
  imageUrl?: string;
  img?: string;
  description?: string;
};

// helpers
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

function normalize(r: RawListing): Listing {
  const title =
    r.title ?? [r.building, r.address, r.unit].filter(Boolean).join(", ");

  const slug =
    r.slug ?? slugify([r.building, r.address, r.unit].filter(Boolean).join(" "));

  // accept either "img" or "imageUrl", fallback to placeholder
  const img = r.img ?? r.imageUrl ?? "/images/placeholder.jpg";

  // coerce and validate "type"
  const allowed = ["sale", "rent", "commercial_sale", "commercial_lease"] as const;
  const t = (r.type ?? "sale").toLowerCase();
  const type = (allowed.includes(t as any) ? t : "sale") as Listing["type"];

  // number coercions
  const toNum = (v: unknown) =>
    v === undefined || v === null || v === "" ? undefined : Number(v);

  return {
    id: String(r.id),
    slug,
    title,
    building: r.building ?? "",
    address: r.address,
    unit: r.unit,
    type,
    price: Number(r.price),
    beds: Number(r.bedrooms),
    baths: Number(r.bathrooms),
    sqft: toNum(r.sqft),
    cc: toNum(r.cc),
    tax: toNum(r.tax),
    img,
    description: r.description,
  };
}

// ✅ now the cast is safe because RawListing is permissive
const listings: Listing[] = (raw as RawListing[]).map(normalize);

// APIs
export async function getAllListings() {
  return listings;
}
export async function getListingsByType(type: Listing["type"]) {
  return listings.filter((l) => l.type === type);
}
export async function getListingBySlug(slug: string) {
  return listings.find((l) => l.slug === slug);
}
export async function getListingById(id: string) {
  return listings.find((l) => l.id === id);
}

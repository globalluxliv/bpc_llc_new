// src/lib/sheets.ts
import { Listing } from "./listings"; // your type definition
import Papa from "papaparse"; // lightweight CSV parser

export async function fetchListingsFromSheet(): Promise<Listing[]> {
  if (!process.env.SHEET_CSV_URL) {
    throw new Error("Missing SHEET_CSV_URL in .env.local");
  }

  const res = await fetch(process.env.SHEET_CSV_URL);
  if (!res.ok) throw new Error("Failed to fetch Google Sheet");

  const csv = await res.text();

  // Parse CSV → JSON
  const parsed = Papa.parse(csv, { header: true });
  const rows = parsed.data as any[];

  // Map into your Listing type
  const listings: Listing[] = rows.map((row, i) => ({
    id: row.id ?? `listing-${i}`,
    slug: row.slug ?? row.address?.replace(/\s+/g, "-").toLowerCase(),
    title: row.title ?? row.building ?? "Untitled",
    building: row.building ?? "",
    address: row.address ?? "",
    price: Number(row.price) || 0,
    beds: Number(row.beds) || 0,
    baths: Number(row.baths) || 0,
    sqft: Number(row.sqft) || 0,
    cc: Number(row.cc) || 0,
    tax: Number(row.tax) || 0,
    description: row.description ?? "",
    img: row.img ?? "/images/default.jpg",
    type: row.type ?? "sale",
  }));

  return listings;
}

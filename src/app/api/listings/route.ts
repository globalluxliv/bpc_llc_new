import { NextResponse } from "next/server";
import { fetchListingsFromSheet } from "@/lib/sheets";

export async function GET() {
  try {
    const data = await fetchListingsFromSheet();
    return NextResponse.json({
      ok: true,
      count: data.length,
      sample: data.slice(0, 2), // peek at the first 2 rows
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}

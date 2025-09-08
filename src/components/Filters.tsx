"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") ?? "rent";

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        className="border rounded px-3 py-2"
        defaultValue={type}
        onChange={(e) =>
          router.push(`/apartments/rentals?type=${e.target.value}`)
        }
      >
        <option value="rent">Rentals</option>
        <option value="sale">Sales</option>
      </select>
      {/* add price/beds filters later */}
    </div>
  );
}

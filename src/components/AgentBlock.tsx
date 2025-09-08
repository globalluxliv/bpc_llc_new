// src/components/AgentBlock.tsx
import Image from "next/image";
import { Agent } from "@/lib/agents";

export default function AgentBlock({ a }: { a: Agent }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
      <Image
        src={a.image}
        alt={a.name}
        width={220}
        height={220}
        className="w-[220px] h-[220px] object-cover"
      />
      <div>
        <h2 className="text-xl font-bold text-[var(--brand)]">{a.name}</h2>
        <p className="font-semibold">{a.title}</p>
        <p>
          <span className="font-bold">Cell:</span> {a.cell}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {a.phone}
        </p>
        <p>
          <span className="font-bold">Email:</span>{" "}
          <a href={`mailto:${a.email}`} className="text-blue-600 underline">
            {a.email}
          </a>
        </p>
        <p className="mt-3 text-[15px] leading-6 text-gray-700">{a.bio}</p>
      </div>
    </div>
  );
}

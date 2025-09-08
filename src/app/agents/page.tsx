// src/app/agents/page.tsx
import { agents } from "@/lib/agents";
import AgentBlock from "@/components/AgentBlock";

export default function AgentsPage() {
  return (
    <main className="bg-[var(--bg-alt)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2937]">
          Our Agents
        </h1>
        <div className="mt-2 h-[3px] w-full bg-[var(--brand)]" />
        <div className="mt-6 space-y-10">
          {agents.map((a) => (
            <AgentBlock key={a.id} a={a} />
          ))}
        </div>
      </div>
    </main>
  );
}

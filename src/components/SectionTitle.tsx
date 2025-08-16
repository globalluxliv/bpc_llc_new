// src/components/SectionTitle.tsx
export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-2xl md:text-[28px] font-bold tracking-tight">
        {children}
      </h2>
      <div className="mt-2 h-[3px] w-full bg-[var(--brand)]" />
    </div>
  );
}

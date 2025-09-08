export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="text-muted mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

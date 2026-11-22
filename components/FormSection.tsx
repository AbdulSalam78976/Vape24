/** Numbered card section used on the checkout form. */
export function FormSection({ n, title, sub, children }: { n: number; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 transition focus-within:border-zinc-300 focus-within:shadow-[0_16px_40px_-24px_rgb(11_11_11/0.35)] sm:p-6">
      <header className="mb-5 flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-display text-white">{n}</span>
        <div>
          <h2 className="font-display text-xl uppercase leading-none">{title}</h2>
          {sub && <p className="mt-1 text-sm text-zinc-500">{sub}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

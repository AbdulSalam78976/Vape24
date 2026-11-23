import Link from "next/link";

export function Breadcrumbs({ trail, dark = false }: { trail: { label: string; href?: string }[]; dark?: boolean }) {
  const muted = dark ? "text-zinc-400" : "text-zinc-500";
  const current = dark ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${muted} ${dark ? "" : "container py-4"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className="transition hover:text-brand">Home</Link></li>
        {trail.map((t) => (
          <li key={t.label} className="flex min-w-0 items-center gap-2">
            <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden><path d="m9 6 6 6-6 6" /></svg>
            {t.href ? (
              <Link href={t.href} className="transition hover:text-brand">{t.label}</Link>
            ) : (
              <span aria-current="page" className={`line-clamp-1 ${current}`}>{t.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

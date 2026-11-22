import Link from "next/link";

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container py-4 text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-brand">Home</Link></li>
        {trail.map((t) => (
          <li key={t.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {t.href ? <Link href={t.href} className="hover:text-brand">{t.label}</Link> : <span aria-current="page" className="text-ink">{t.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

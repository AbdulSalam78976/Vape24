import Link from "next/link";

export function SectionHead({ title, sub, href, cta }: { title: string; sub?: string; href?: string; cta?: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-3xl uppercase leading-none md:text-4xl">{title}</h2>
        <span className="mt-2 block h-1 w-14 bg-brand" />
        {sub && <p className="mt-3 text-zinc-600">{sub}</p>}
      </div>
      {href && <Link href={href} className="font-bold text-brand hover:underline">{cta ?? "View all"} →</Link>}
    </div>
  );
}

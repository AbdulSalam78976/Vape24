import Link from "next/link";

type Props = { title: string; sub?: string; href?: string; cta?: string; eyebrow?: string; dark?: boolean };

export function SectionHead({ title, sub, href, cta, eyebrow, dark = false }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>}
        <h2 className={`font-display text-3xl uppercase leading-none sm:text-4xl ${dark ? "text-white" : ""}`}>{title}</h2>
        <span className="mt-3 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-brand-dark" />
        {sub && <p className={`mt-3 max-w-xl ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className={`group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
            dark ? "border-white/15 text-white hover:border-brand hover:bg-brand" : "border-zinc-300 hover:border-brand hover:bg-brand hover:text-white"
          }`}
        >
          {cta ?? "View all"}
          <span className="grid size-5 place-items-center rounded-full bg-brand text-white transition group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-brand">→</span>
        </Link>
      )}
    </div>
  );
}

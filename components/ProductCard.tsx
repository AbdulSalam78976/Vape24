import Image from "next/image";
import Link from "next/link";
import { QuickAdd } from "@/components/QuickAdd";
import { discount, money, type Product } from "@/lib/data";

export function ProductCard({ p, badge }: { p: Product; badge?: string }) {
  const off = discount(p);
  const img = p.images[0] ?? "/logo.jpg";
  return (
    <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <Link href={`/${p.slug}`} className="relative block aspect-square overflow-hidden bg-white">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgb(225_6_0/0.10),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Image src={img} alt={p.name} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" className="object-contain p-3 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.06]" />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {off > 0 && <span className="badge bg-brand text-white shadow-sm">-{off}%</span>}
          {badge && <span className="badge bg-ink text-white shadow-sm">{badge}</span>}
          {!p.inStock && <span className="badge bg-zinc-500 text-white">Sold Out</span>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{p.brand}</p>
        <Link href={`/${p.slug}`} className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-brand">{p.name}</Link>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-extrabold">{money(p.price)}</span>
          {off > 0 && <s className="text-sm text-zinc-400">{money(p.regularPrice)}</s>}
        </div>
        <QuickAdd slug={p.slug} name={p.name} image={img} price={p.price} disabled={!p.inStock} />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </article>
  );
}

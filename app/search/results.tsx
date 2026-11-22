"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuickAdd } from "@/components/QuickAdd";

type Item = { slug: string; name: string; brand: string; price: number; regularPrice: number; inStock: boolean; image: string };

export function SearchResults({ index }: { index: Item[] }) {
  const q = (useSearchParams().get("q") ?? "").trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = terms.length ? index.filter((p) => terms.every((t) => `${p.name} ${p.brand}`.toLowerCase().includes(t))) : [];
  return (
    <>
      <h1 className="font-display mb-6 text-4xl uppercase">{q ? <>Results for “{q}”</> : "Search"}</h1>
      <p className="mb-4 text-sm text-zinc-500">{q ? `${hits.length} products found` : "Type in the search box above to find products."}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {hits.map((p) => (
          <li key={p.slug} className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white hover:border-ink">
            <Link href={`/${p.slug}`} className="relative block aspect-square"><Image src={p.image} alt={p.name} fill sizes="20vw" className="object-contain p-3" /></Link>
            <div className="flex flex-1 flex-col gap-2 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{p.brand}</p>
              <Link href={`/${p.slug}`} className="line-clamp-2 text-sm font-semibold hover:text-brand">{p.name}</Link>
              <span className="mt-auto text-lg font-extrabold">${p.price.toFixed(2)}</span>
              <QuickAdd slug={p.slug} name={p.name} image={p.image} price={p.price} disabled={!p.inStock} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

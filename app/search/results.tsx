"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { QuickAdd } from "@/components/QuickAdd";
import { search, type SearchItem } from "@/lib/search";

const SUGGEST = ["RAZ", "Lost Mary", "Geek Bar", "50k", "Watermelon", "Mint", "Pouches", "Zero Nicotine"];

export function SearchResults({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQ = params.get("q") ?? "";
  const [q, setQ] = useState(urlQ);
  // keep the box in sync when the header search changes the URL while we're on this page
  const [seen, setSeen] = useState(urlQ);
  if (urlQ !== seen) {
    setSeen(urlQ);
    setQ(urlQ);
  }
  const query = useDeferredValue(q).trim();
  const hits = search(index, query);

  const update = (v: string) => {
    setQ(v);
    const sp = new URLSearchParams(params);
    if (v.trim()) sp.set("q", v);
    else sp.delete("q");
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  return (
    <>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mb-6 max-w-2xl">
        <label htmlFor="q-page" className="sr-only">Search products</label>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input
          id="q-page"
          type="search"
          value={q}
          onChange={(e) => update(e.target.value)}
          autoFocus={!urlQ}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search by product, brand, flavor or puff count…"
          className="h-14 w-full rounded-full border-2 border-zinc-200 bg-white pl-12 pr-12 text-base shadow-sm transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button type="button" onClick={() => update("")} aria-label="Clear search" className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-zinc-400 transition hover:bg-smoke hover:text-brand">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        )}
      </form>

      {query ? (
        <p aria-live="polite" className="mb-5 text-sm text-zinc-600">
          <b className="text-ink">{hits.length}</b> {hits.length === 1 ? "result" : "results"} for “<b className="text-ink">{query}</b>”
        </p>
      ) : (
        <p className="mb-5 text-sm text-zinc-600">Search by product name, brand, flavor or puff count.</p>
      )}

      {(!query || hits.length === 0) && (
        <div className="mb-8">
          {query && <p className="mb-3 font-semibold">No products match. Try one of these:</p>}
          <ul className="flex flex-wrap gap-2">
            {SUGGEST.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => update(s)} className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-semibold transition hover:border-brand hover:bg-brand hover:text-white active:scale-95">{s}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {hits.map(({ item: p, flavor }) => {
          const off = p.regularPrice > p.price ? Math.round((1 - p.price / p.regularPrice) * 100) : 0;
          return (
            <li key={p.slug} className="soft-card group flex flex-col overflow-hidden">
              <Link href={`/${p.slug}`} className="relative block aspect-square overflow-hidden">
                <Image src={p.image} alt={p.name} fill sizes="(min-width:1280px) 20vw, (min-width:640px) 33vw, 50vw" className="object-contain p-3 transition duration-500 group-hover:scale-105" />
                {off > 0 && <span className="badge absolute left-2 top-2 bg-brand text-white">-{off}%</span>}
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{p.brand}</p>
                <Link href={`/${p.slug}`} className="line-clamp-2 text-sm font-semibold leading-snug transition hover:text-brand">{p.name}</Link>
                {flavor && <span className="w-fit rounded-full bg-smoke px-2 py-0.5 text-[11px] font-medium text-zinc-700">Flavor: {flavor}</span>}
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="text-lg font-extrabold">${p.price.toFixed(2)}</span>
                  {off > 0 && <s className="text-sm text-zinc-400">${p.regularPrice.toFixed(2)}</s>}
                </div>
                <QuickAdd slug={p.slug} name={p.name} image={p.image} price={p.price} disabled={!p.inStock} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

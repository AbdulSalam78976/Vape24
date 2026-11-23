import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { categories, products } from "@/lib/data";
import type { SearchItem } from "@/lib/search";
import { SearchResults } from "./results";

export const metadata = { title: "Search" };

export default function Search() {
  const index: SearchItem[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    sku: p.sku,
    price: p.price,
    regularPrice: p.regularPrice,
    inStock: p.inStock,
    image: p.images[0] ?? "/logo.jpg",
    cats: categories.filter((c) => p.categories.includes(c.url)).map((c) => c.title),
    flavors: p.options.flatMap((o) => o.values),
  }));
  return (
    <>
      <PageHero title="Search" trail={[{ label: "Search" }]} />
      <section className="container">
        <Suspense fallback={<p className="text-zinc-500">Loading search…</p>}>
          <SearchResults index={index} />
        </Suspense>
      </section>
    </>
  );
}

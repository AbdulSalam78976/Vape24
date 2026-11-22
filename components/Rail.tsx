import { ProductCard } from "@/components/ProductCard";
import { type Product } from "@/lib/data";

export function Rail({ items, badge }: { items: Product[]; badge?: string }) {
  return (
    <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3">
      {items.map((p) => (
        <li key={p.slug} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[19%]"><ProductCard p={p} badge={badge} /></li>
      ))}
    </ul>
  );
}

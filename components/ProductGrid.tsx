import { ProductCard } from "@/components/ProductCard";
import { type Product } from "@/lib/data";

export function ProductGrid({ items, badge }: { items: Product[]; badge?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((p) => <li key={p.slug} className="reveal"><ProductCard p={p} badge={badge} /></li>)}
    </ul>
  );
}

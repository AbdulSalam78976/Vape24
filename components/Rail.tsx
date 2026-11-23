import { ProductCard } from "@/components/ProductCard";
import { type Product } from "@/lib/data";

export function Rail({ items, badge }: { items: Product[]; badge?: string }) {
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:mx-0 lg:px-0">
      {items.map((p) => (
        <li key={p.slug} className="w-[62%] shrink-0 snap-start min-[480px]:w-[44%] sm:w-[31%] lg:w-[23%] xl:w-[19%]"><ProductCard p={p} badge={badge} /></li>
      ))}
    </ul>
  );
}

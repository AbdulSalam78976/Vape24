import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { products } from "@/lib/data";
import { SearchResults } from "./results";

export const metadata = { title: "Search" };

export default function Search() {
  const index = products.map(({ slug, name, brand, price, regularPrice, inStock, images }) => ({ slug, name, brand, price, regularPrice, inStock, image: images[0] ?? "/logo.jpg" }));
  return (
    <>
      <Breadcrumbs trail={[{ label: "Search" }]} />
      <section className="container">
        <Suspense fallback={<p>Searching…</p>}>
          <SearchResults index={index} />
        </Suspense>
      </section>
    </>
  );
}

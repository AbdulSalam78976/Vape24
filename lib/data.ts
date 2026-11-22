import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import postsJson from "@/data/posts.json";
import pagesJson from "@/data/pages.json";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  brand: string;
  shortDescription: string;
  price: number;
  regularPrice: number;
  inStock: boolean;
  images: string[];
  options: { code: string; label: string; values: string[] }[];
  specs: { label: string; value: string }[];
  attributes: { label: string; value: string }[];
  description: string;
  faqs: { q: string; a: string }[];
  categories: string[];
};
export type Category = { url: string; title: string; description: string; products: string[] };
export type Post = { slug: string; title: string; date: string; image: string; excerpt: string; content: string };
export type Page = { slug: string; title: string; content: string };

export const products = productsJson as Product[];
export const categories = categoriesJson as Category[];
export const posts = (postsJson as Post[]).toSorted((a, b) => b.date.localeCompare(a.date));
export const pages = pagesJson as Record<string, Page>;

const bySlug = new Map(products.map((p) => [p.slug, p]));
export const getProduct = (slug: string) => bySlug.get(slug);
export const getCategory = (url: string) => categories.find((c) => c.url === url);

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Products for a listing url. Brand pages also pull in every product of that brand. */
export function productsFor(url: string): Product[] {
  const cat = getCategory(url);
  const list = (cat?.products ?? []).map((s) => bySlug.get(s)!).filter(Boolean);
  if (url.startsWith("/shop-by-brand/")) {
    const brand = url.split("/")[2].replace(/-e-liquid$/, "");
    for (const p of products) if (slugify(p.brand) === brand && !list.includes(p)) list.push(p);
  }
  return list;
}

export const money = (n: number) => `$${n.toFixed(2)}`;
export const discount = (p: Product) =>
  p.regularPrice > p.price ? Math.round((1 - p.price / p.regularPrice) * 100) : 0;
export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" });

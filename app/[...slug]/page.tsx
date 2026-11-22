import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { Gallery } from "@/components/Gallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { ProductGrid } from "@/components/ProductGrid";
import { Rail } from "@/components/Rail";
import { Rich } from "@/components/Rich";
import { SectionHead } from "@/components/SectionHead";
import { categories, discount, getCategory, getProduct, money, pages, products, productsFor, type Product } from "@/lib/data";
import { BRANDS, SITE } from "@/lib/site";

// Every URL is known at build time: products (/slug), listings (/a or /a/b) and CMS pages. Anything else → notFound().
export function generateStaticParams() {
  const urls = [...products.map((p) => `/${p.slug}`), ...categories.map((c) => c.url), ...Object.keys(pages).filter((s) => s !== "contact").map((s) => `/${s}`)];
  return [...new Set(urls)].map((u) => ({ slug: u.slice(1).split("/") }));
}

type Resolved =
  | { kind: "product"; p: Product }
  | { kind: "category"; url: string }
  | { kind: "page"; slug: string };

function resolve(slug: string[]): Resolved | null {
  const url = "/" + slug.join("/");
  if (slug.length === 1 && getProduct(slug[0])) return { kind: "product", p: getProduct(slug[0])! };
  if (getCategory(url)) return { kind: "category", url };
  if (slug.length === 1 && pages[slug[0]]) return { kind: "page", slug: slug[0] };
  return null;
}

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const r = resolve((await params).slug);
  if (!r) return {};
  if (r.kind === "product") return { title: r.p.name, description: r.p.shortDescription };
  if (r.kind === "category") {
    const c = getCategory(r.url)!;
    return { title: c.title, description: c.description.replace(/<[^>]+>/g, "").slice(0, 160) };
  }
  return { title: pages[r.slug].title };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const r = resolve((await params).slug);
  if (!r) notFound();
  if (r.kind === "product") return <ProductView p={r.p} />;
  if (r.kind === "category") return <CategoryView url={r.url} />;
  const pg = pages[r.slug];
  return (
    <>
      <Breadcrumbs trail={[{ label: pg.title }]} />
      <article className="container max-w-4xl pb-8">
        <h1 className="font-display mb-6 text-4xl uppercase md:text-5xl">{pg.title}</h1>
        <Rich html={pg.content} />
      </article>
    </>
  );
}

function CategoryView({ url }: { url: string }) {
  const c = getCategory(url)!;
  const items = productsFor(url);
  const parts = url.split("/").filter(Boolean);
  const parent = parts.length > 1 ? getCategory("/" + parts[0]) : undefined;
  const subs = categories.filter((x) => x.url.startsWith(url + "/"));
  return (
    <>
      <Breadcrumbs trail={[...(parent ? [{ label: parent.title, href: parent.url }] : []), { label: c.title }]} />
      <section className="container">
        <div className="rise mb-8 overflow-hidden rounded-2xl bg-ink p-8 text-white md:p-10">
          <h1 className="font-display text-4xl uppercase md:text-5xl">{c.title}</h1>
          <span className="mt-3 block h-1 w-16 bg-brand" />
          {c.description && <Rich html={c.description} className="mt-4 max-w-3xl text-zinc-300 [&_*]:text-zinc-300" />}
        </div>
        {url === "/shop-by-brand" && (
          <ul className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <Link href={b.href} className="flex h-full flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 text-center hover:border-brand">
                  <span className="relative block h-12 w-full"><Image src={b.logo} alt={`${b.name} logo`} fill sizes="160px" className="object-contain" /></span>
                  <b className="text-sm">{b.name}</b>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {subs.length > 0 && (
          <ul className="mb-8 flex flex-wrap gap-2">
            {subs.map((s) => (
              <li key={s.url}><Link href={s.url} className="block rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white active:scale-95">{s.title}</Link></li>
            ))}
          </ul>
        )}
        <p className="mb-4 text-sm text-zinc-500">{items.length} products</p>
        {items.length ? (
          <ProductGrid items={items} />
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500">New stock is on the way. <Link href="/" className="font-semibold text-brand">Keep shopping</Link></p>
        )}
      </section>
    </>
  );
}

function ProductView({ p }: { p: Product }) {
  const off = discount(p);
  const cat = categories.find((c) => p.categories.includes(c.url) && !c.url.startsWith("/shop-by-brand") && c.url !== "/deals");
  const related = products.filter((x) => x.slug !== p.slug && (x.brand === p.brand || (cat && x.categories.includes(cat.url)))).slice(0, 10);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    image: p.images,
    description: p.shortDescription,
    brand: { "@type": "Brand", name: p.brand },
    offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: `https://schema.org/${p.inStock ? "InStock" : "OutOfStock"}`, seller: { "@type": "Organization", name: SITE.name } },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Breadcrumbs trail={[...(cat ? [{ label: cat.title, href: cat.url }] : []), { label: p.name }]} />
      <section className="container grid gap-10 lg:grid-cols-2">
        <Gallery images={p.images} alt={p.name} />
        <div className="space-y-5">
          <div>
            <Link href={`/shop-by-brand/${p.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="text-sm font-bold uppercase tracking-widest text-brand hover:underline">{p.brand}</Link>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight md:text-3xl">{p.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-extrabold">{money(p.price)}</span>
            {off > 0 && (
              <>
                <s className="text-lg text-zinc-400">{money(p.regularPrice)}</s>
                <span className="badge bg-brand text-sm text-white">Save {off}%</span>
              </>
            )}
            <span className={`ml-auto text-sm font-semibold ${p.inStock ? "text-green-700" : "text-zinc-500"}`}>● {p.inStock ? "In Stock" : "Sold Out"}</span>
          </div>
          <p className="text-zinc-700">{p.shortDescription}</p>
          {p.specs.length > 0 && (
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {p.specs.map((s) => (
                <div key={s.label} className="rounded-lg bg-smoke p-3">
                  <dt className="text-xs text-zinc-500">{s.label}</dt>
                  <dd className="text-sm font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <BuyBox slug={p.slug} name={p.name} image={p.images[0] ?? "/logo.jpg"} price={p.price} inStock={p.inStock} options={p.options} />
          <div className="rounded-xl border-2 border-dashed border-brand/40 bg-brand/5 p-4">
            <p className="mb-2 font-display text-lg uppercase">Offers on this product</p>
            <ul className="space-y-1 text-sm">
              <li><b>Buy 2, Get 1 Free</b> — add 3 of this product in any flavor, pay for 2.</li>
              <li><b>Buy more, save up to 10%</b> — automatic volume discount at checkout.</li>
            </ul>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {SITE.perks.slice(0, 4).map((x) => (
              <li key={x.title} className="flex items-center gap-2"><span className="text-brand"><Icon name={x.icon} className="size-5" /></span><span><b>{x.title}</b> <span className="block text-xs text-zinc-500">{x.sub}</span></span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="font-display mb-4 border-b-4 border-brand pb-2 text-2xl uppercase">Description</h2>
          <Rich html={p.description || `<p>${p.shortDescription}</p>`} />
        </div>
        <div className="space-y-10">
          {p.attributes.length > 0 && (
            <div>
              <h2 className="font-display mb-4 border-b-4 border-brand pb-2 text-2xl uppercase">More Information</h2>
              <table className="w-full text-sm">
                <tbody>
                  {p.attributes.map((a) => (
                    <tr key={a.label} className="border-b border-zinc-200"><th className="py-2 pr-4 text-left font-semibold">{a.label}</th><td className="py-2 text-zinc-700">{a.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {p.faqs.length > 0 && (
            <div>
              <h2 className="font-display mb-4 border-b-4 border-brand pb-2 text-2xl uppercase">FAQs</h2>
              <div className="divide-y divide-zinc-200">
                {p.faqs.map((f) => (
                  <details key={f.q} className="smooth group py-3">
                    <summary className="flex cursor-pointer list-none justify-between gap-3 font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q} <span className="text-brand transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-sm text-zinc-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mt-14">
          <SectionHead title="You May Also Like" />
          <Rail items={related} />
        </section>
      )}
    </>
  );
}

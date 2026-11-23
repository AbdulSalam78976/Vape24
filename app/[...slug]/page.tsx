import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { Gallery } from "@/components/Gallery";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
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
      <PageHero title={pg.title} trail={[{ label: pg.title }]} />
      <article className="container max-w-4xl pb-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-10">
          <Rich html={pg.content} />
        </div>
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
      <PageHero title={c.title} eyebrow={`${items.length} products`} trail={[...(parent ? [{ label: parent.title, href: parent.url }] : []), { label: c.title }]}>
        {c.description && <Rich html={c.description} className="text-zinc-300 [&_*]:text-zinc-300" />}
      </PageHero>
      <section className="container">
        {url === "/shop-by-brand" && (
          <ul className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <Link href={b.href} className="soft-card flex h-full flex-col items-center gap-2 p-4 text-center">
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
        {items.length ? (
          <ProductGrid items={items} />
        ) : (
          <p className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500">New stock is on the way. <Link href="/" className="font-semibold text-brand">Keep shopping</Link></p>
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
      <section className="container grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start"><Gallery images={p.images} alt={p.name} /></div>
        <div className="min-w-0 space-y-5">
          <div>
            <Link href={`/shop-by-brand/${p.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand transition hover:bg-brand hover:text-white">{p.brand}</Link>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{p.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-extrabold sm:text-4xl">{money(p.price)}</span>
            {off > 0 && (
              <>
                <s className="text-lg text-zinc-400">{money(p.regularPrice)}</s>
                <span className="badge bg-brand text-sm text-white">Save {off}%</span>
              </>
            )}
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${p.inStock ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-500"}`}><span className={`size-1.5 rounded-full ${p.inStock ? "animate-pulse bg-green-600" : "bg-zinc-400"}`} />{p.inStock ? "In Stock" : "Sold Out"}</span>
          </div>
          <p className="text-zinc-700">{p.shortDescription}</p>
          {p.specs.length > 0 && (
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {p.specs.map((s) => (
                <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <dt className="text-xs text-zinc-500">{s.label}</dt>
                  <dd className="text-sm font-bold">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <BuyBox slug={p.slug} name={p.name} image={p.images[0] ?? "/logo.jpg"} price={p.price} inStock={p.inStock} options={p.options} />
          <div className="dark-panel rounded-2xl p-5">
            <p className="font-display text-lg uppercase text-white">Offers on this product</p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <li className="glass p-3"><b className="block text-white">Buy 2, Get 1 Free</b>Add 3 in any flavor, pay for 2.</li>
              <li className="glass p-3"><b className="block text-white">Save up to 10%</b>Automatic volume discount.</li>
            </ul>
          </div>
          <ul className="grid grid-cols-1 gap-3 text-sm min-[420px]:grid-cols-2">
            {SITE.perks.slice(0, 4).map((x) => (
              <li key={x.title} className="flex items-center gap-3 rounded-xl bg-smoke p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><Icon name={x.icon} className="size-4" /></span>
                <span><b>{x.title}</b> <span className="block text-xs text-zinc-500">{x.sub}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mt-14 grid gap-8 sm:mt-20 lg:grid-cols-[2fr_1fr] lg:gap-10">
        <div className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8">
          <h2 className="font-display mb-4 text-2xl uppercase">Description</h2>
          <span className="-mt-2 mb-5 block h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-dark" />
          <Rich html={p.description || `<p>${p.shortDescription}</p>`} />
        </div>
        <div className="min-w-0 space-y-6">
          {p.attributes.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
              <h2 className="font-display mb-4 text-2xl uppercase">More Information</h2>
              <table className="w-full text-sm">
                <tbody>
                  {p.attributes.map((a) => (
                    <tr key={a.label} className="border-b border-zinc-100 last:border-0"><th className="py-2 pr-4 text-left font-semibold">{a.label}</th><td className="py-2 text-zinc-700">{a.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {p.faqs.length > 0 && (
            <div className="dark-panel rounded-2xl p-5 sm:p-6">
              <h2 className="font-display mb-2 text-2xl uppercase text-white">FAQs</h2>
              <div className="divide-y divide-white/10">
                {p.faqs.map((f) => (
                  <details key={f.q} className="smooth group py-3">
                    <summary className="flex cursor-pointer list-none justify-between gap-3 font-semibold text-white [&::-webkit-details-marker]:hidden">
                      {f.q} <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand transition group-open:rotate-45 group-open:bg-brand group-open:text-white">+</span>
                    </summary>
                    <p className="mt-2 text-sm text-zinc-400">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mt-14 sm:mt-20">
          <SectionHead eyebrow="More to explore" title="You May Also Like" />
          <Rail items={related} />
        </section>
      )}
    </>
  );
}

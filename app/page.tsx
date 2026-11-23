import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { PerkCards } from "@/components/PerkCards";
import { Rail } from "@/components/Rail";
import { SectionHead } from "@/components/SectionHead";
import { fmtDate, posts, productsFor } from "@/lib/data";
import { BRANDS, SITE } from "@/lib/site";

const CATS = [
  { title: "Disposable Vapes", text: "Ready-to-use devices with high puff counts and bold flavors.", img: "disposable-vapes", href: "/disposable-vapes" },
  { title: "Vape Juices", text: "E-liquids in nicotine salt, freebase and zero-nic options.", img: "vape-juices", href: "/e-liquids" },
  { title: "Nicotine Pouches", text: "Smoke-free, spit-free, and discreet nicotine delivery.", img: "nicotine-pouches", href: "/nicotine-pouches" },
  { title: "Hemp & THC", text: "THCA vapes, THC-P disposables, prerolls & CBD products.", img: "hemp", href: "/hemp-thc" },
];

const RAILS = [
  { t: "Shop Disposable Vapes", s: "Pre-filled disposable vape devices with high puff counts.", u: "/disposable-vapes", c: "Shop All Disposables", e: "Disposables" },
  { t: "Shop Vape Juices", s: "E-liquids in nicotine salt, freebase and zero-nic options.", u: "/e-liquids", c: "Shop All E-Liquids", e: "E-Liquids" },
  { t: "Shop Nicotine Pouches", s: "Tobacco-free nicotine pouches from top brands.", u: "/nicotine-pouches", c: "Shop All Pouches", e: "Pouches" },
  { t: "Shop Hemp & THC Products", s: "THCA vapes, THC-P disposables, hemp gummies & more.", u: "/hemp-thc", c: "Shop All Hemp", e: "Hemp & THC" },
];

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Best Online Vape Store: Disposable Vapes, E-Liquids &amp; Nicotine Pouches</h1>
      <Hero />

     

      <section className="reveal container py-14 sm:py-20">
        <SectionHead eyebrow="Categories" title="Browse Our Vape Categories" sub="Find disposable vapes, e-liquids, nicotine pouches and more." />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CATS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="soft-card group flex h-full flex-col overflow-hidden">
                <span className="relative block aspect-square overflow-hidden bg-white">
                  <Image src={`/images/wysiwyg/category/${c.img}-category.jpg`} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-4" />
                </span>
                <span className="flex flex-1 flex-col p-3 sm:p-4">
                  <b className="font-display flex items-center justify-between gap-2 text-lg uppercase leading-tight sm:text-xl">
                    {c.title}
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-sm text-brand transition group-hover:translate-x-0.5 group-hover:bg-brand group-hover:text-white">→</span>
                  </b>
                  <span className="mt-1 hidden text-sm text-zinc-600 sm:block">{c.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal relative overflow-hidden bg-smoke py-14 sm:py-20">
        <p aria-hidden className="outline-text-dark pointer-events-none absolute -top-6 right-0 select-none font-display text-[30vw] uppercase leading-none lg:text-[14rem]">Brands</p>
        <div className="container relative">
          <SectionHead eyebrow="Top brands" title="Shop by Brand" sub="We carry the top brands you know and love" href="/shop-by-brand" cta="All brands" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <Link href={b.href} className="soft-card group flex h-full flex-col items-center gap-2 p-4 text-center">
                  <span className="relative block h-12 w-full sm:h-14"><Image src={b.logo} alt={`${b.name} logo`} fill sizes="160px" className="object-contain grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0" /></span>
                  <b className="text-sm">{b.name}</b>
                  <span className="text-xs text-zinc-500">{b.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="reveal container py-14 sm:py-20">
        <SectionHead eyebrow="Just landed" title="New Arrivals" sub="Our newest products, shipped same day." href="/new-arrivals" cta="View all" />
        <Rail items={productsFor("/new-arrivals")} badge="New" />
      </section>

      <section className="reveal container pb-14 sm:pb-20">
        <SectionHead eyebrow="Customer favorites" title="Best Sellers" sub="Most popular vapes and e-liquids chosen by our customers." href="/disposable-vapes/best-sellers" cta="View all" />
        <Rail items={productsFor("/disposable-vapes/best-sellers")} badge="🔥 Hot" />
      </section>

      {/* lifestyle — dark panel */}
      <section className="reveal dark-panel py-14 sm:py-20">
        <div className="container grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[3/4]">
            <Image src="/images/thrivexis/featured-section/cookies-lifestyle.webp" alt="Cookies lifestyle bags and accessories" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">30% off</p>
              <h2 className="font-display mt-1 text-3xl uppercase text-white sm:text-4xl">Cookies Lifestyle</h2>
              <p className="text-sm text-zinc-300">Bags, caps &amp; smoking accessories.</p>
              <Link href="/lifestyle" className="btn-primary mt-4 w-fit">Shop all</Link>
            </div>
          </div>
          <div className="min-w-0 [&_article]:text-ink">
            <Rail items={productsFor("/lifestyle").slice(0, 8)} />
          </div>
        </div>
      </section>

      <section className="reveal container grid gap-4 py-14 sm:py-20 md:grid-cols-2">
        {[
          { img: "foger-switch-pod-system", title: "Foger Switch Pro — Up to 30,000 Puffs", text: "Pod system with power bank & OLED display.", cta: "Shop Foger Switch Pro", href: "/foger-switch-pro-30k-vape" },
          { img: "adjust-vapes", title: "Entire Adjust Lineup", text: "Tune your cool. Tune your flavor. Only $11.99.", cta: "Shop Adjust Series", href: "/shop-by-brand/adjust" },
        ].map((b) => (
          <Link key={b.href} href={b.href} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink ring-1 ring-black/5 sm:aspect-[16/9]">
            <Image src={`/images/wysiwyg/banners/${b.img}.webp`} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 text-white sm:p-7">
              <b className="font-display text-2xl uppercase leading-tight md:text-3xl">{b.title}</b>
              <span className="mt-1 text-sm text-zinc-200">{b.text}</span>
              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur transition group-hover:bg-brand">{b.cta} →</span>
            </span>
          </Link>
        ))}
      </section>

      {RAILS.map((r) => (
        <section key={r.u} className="reveal container pb-14 sm:pb-20">
          <SectionHead eyebrow={r.e} title={r.t} sub={r.s} href={r.u} cta={r.c} />
          <Rail items={productsFor(r.u)} />
        </section>
      ))}

      {/* about — dark panel with outlined wordmark */}
      <section className="reveal dark-panel py-14 sm:py-20">
        <p aria-hidden className="outline-text pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] uppercase leading-none lg:text-[16rem]">Vape24</p>
        <div className="container relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">About us</p>
            <h2 className="font-display mt-2 text-3xl uppercase leading-none text-white sm:text-5xl">Your Trusted Online Vape Store</h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-brand to-brand-dark" />
          </div>
          <div className="glass space-y-4 p-6 text-sm leading-relaxed sm:p-8 sm:text-base">
            <p>
              {SITE.name} is an online vape shop where you can buy vapes with confidence. We stock a wide selection of{" "}
              <Link href="/disposable-vapes" className="font-semibold text-white hover:text-brand">disposable vapes</Link>,{" "}
              <Link href="/e-liquids" className="font-semibold text-white hover:text-brand">e-liquids</Link>,{" "}
              <Link href="/nicotine-pouches" className="font-semibold text-white hover:text-brand">nicotine pouches</Link> and{" "}
              <Link href="/hemp-thc" className="font-semibold text-white hover:text-brand">hemp &amp; THC products</Link>, and ship fast from within the United States.
            </p>
            <p>
              Disposable vapes start at $8.99 and nicotine pouches at $5.59. Looking for high-puff devices? Browse our{" "}
              <Link href="/disposable-vapes/50000-puffs" className="font-semibold text-white hover:text-brand">5,000 to 50,000+ puff disposables</Link> from Geek Bar, Lost Mary, RAZ and more.
            </p>
            <p className="text-xs text-zinc-500">All products are intended for adults of legal smoking age (21+) only. Every order is checked against federal and state regulations, including the PACT Act.</p>
          </div>
        </div>
      </section>

      <section className="reveal container py-14 sm:py-20">
        <SectionHead eyebrow="Blog" title="From Our Blog" sub="Expert guides, reviews, and the latest vaping news." href="/blog" cta="Read all posts" />
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {posts.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/post/${p.slug}`} className="soft-card group block h-full overflow-hidden">
                <span className="relative block aspect-video overflow-hidden bg-smoke">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
                </span>
                <span className="block space-y-2 p-4">
                  <time className="inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-brand">{fmtDate(p.date)}</time>
                  <b className="line-clamp-2 block leading-snug transition group-hover:text-brand">{p.title}</b>
                  <span className="line-clamp-3 block text-sm text-zinc-600">{p.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    
    </>
  );
}

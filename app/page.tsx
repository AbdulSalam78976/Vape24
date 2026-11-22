import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";
import { Newsletter } from "@/components/Newsletter";
import { Icon } from "@/components/Icon";
import { Rail } from "@/components/Rail";
import { SectionHead } from "@/components/SectionHead";
import { fmtDate, posts, productsFor } from "@/lib/data";
import { BRANDS, SITE } from "@/lib/site";

const SLIDES = [
  { d: "/images/wysiwyg/heroslider/vape-city-usa-deals-d.webp", m: "/images/wysiwyg/heroslider/vape-city-usa-deals-m.webp", eyebrow: "DEALS LIVE NOW", title: "Weekly", accent: "Vape Deals.", text: "Shop this week's offers on disposables, pods, pouches and hemp. New deals drop every weekend while supplies last.", cta: "Shop All Deals", href: "/deals" },
  { d: "/images/wysiwyg/heroslider/foger-switch-pro-new-pod-flavors-d.webp", m: "/images/wysiwyg/heroslider/foger-switch-pro-new-pod-flavors-m_1.webp", eyebrow: "NEW FLAVORS", title: "Every Flavor.", accent: "In Stock.", text: "The full Foger Switch Pro lineup is here.", cta: "Find Your Flavor", href: "/shop-by-brand/foger" },
];

const CATS = [
  { title: "Disposable Vapes", text: "Ready-to-use devices with high puff counts and bold flavors.", img: "disposable-vapes", href: "/disposable-vapes" },
  { title: "Vape Juices", text: "E-liquids in nicotine salt, freebase and zero-nic options.", img: "vape-juices", href: "/e-liquids" },
  { title: "Nicotine Pouches", text: "Smoke-free, spit-free, and discreet nicotine delivery.", img: "nicotine-pouches", href: "/nicotine-pouches" },
  { title: "Hemp & THC", text: "THCA vapes, THC-P disposables, prerolls & CBD products.", img: "hemp", href: "/hemp-thc" },
];

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Best Online Vape Store: Disposable Vapes, E-Liquids &amp; Nicotine Pouches</h1>
      <HeroSlider slides={SLIDES} />

      <section aria-label={`Why choose ${SITE.name}`} className="border-b border-zinc-200 bg-smoke">
        <ul className="container grid grid-cols-2 gap-4 py-6 md:grid-cols-5">
          {SITE.perks.map((p) => (
            <li key={p.title} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-brand"><Icon name={p.icon} /></span>
              <span><b className="block text-sm">{p.title}</b><span className="text-xs text-zinc-600">{p.sub}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal container py-14">
        <SectionHead title="Browse Our Vape Categories" sub="Find disposable vapes, e-liquids, nicotine pouches and more." />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-xl bg-ink text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgb(225_6_0/0.55)] hover:ring-2 hover:ring-brand">
                <span className="relative block aspect-square bg-gradient-to-b from-zinc-800 to-ink">
                  <Image src={`/images/wysiwyg/category/${c.img}-category.png`} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-4 transition group-hover:scale-105" />
                </span>
                <span className="p-4">
                  <b className="font-display block text-xl uppercase">{c.title} <span className="text-brand">→</span></b>
                  <span className="mt-1 block text-sm text-zinc-400">{c.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal bg-smoke py-14">
        <div className="container">
          <SectionHead title="Shop by Brand" sub="We carry the top brands you know and love" href="/shop-by-brand" cta="All brands" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <li key={b.name}>
                <Link href={b.href} className="group flex h-full flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg">
                  <span className="relative block h-14 w-full"><Image src={b.logo} alt={`${b.name} logo`} fill sizes="160px" className="object-contain grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0" /></span>
                  <b className="text-sm">{b.name}</b>
                  <span className="text-xs text-zinc-500">{b.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="reveal container py-14">
        <SectionHead title="New Arrivals: Latest Products" sub="Our newest products, shipped same day." href="/new-arrivals" cta="View All New Arrivals" />
        <Rail items={productsFor("/new-arrivals")} badge="New" />
      </section>

      <section className="reveal container pb-14">
        <SectionHead title="Best Selling Vapes & E-Liquids" sub="Most popular vapes and e-liquids chosen by our customers." href="/disposable-vapes/best-sellers" cta="View All Best Sellers" />
        <Rail items={productsFor("/disposable-vapes/best-sellers")} badge="🔥 Hot" />
      </section>

      <section className="reveal bg-ink py-14 text-white">
        <div className="container grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[3/4]">
            <Image src="/images/thrivexis/featured-section/cookies-lifestyle.webp" alt="Cookies lifestyle bags and accessories" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-6">
              <h2 className="font-display text-3xl uppercase">Cookies Lifestyle</h2>
              <p className="text-sm text-zinc-300">Bags, caps &amp; smoking accessories — 30% off.</p>
              <Link href="/lifestyle" className="btn-primary mt-4 w-fit">Shop all</Link>
            </div>
          </div>
          <div className="[&_article]:text-ink">
            <Rail items={productsFor("/lifestyle").slice(0, 8)} />
          </div>
        </div>
      </section>

      <section className="reveal container grid gap-4 py-14 md:grid-cols-2">
        {[
          { img: "foger-switch-pod-system", title: "Foger Switch Pro — Up to 30,000 Puffs", text: "Pod system with power bank & OLED display.", cta: "Shop Foger Switch Pro", href: "/foger-switch-pro-30k-vape" },
          { img: "adjust-vapes", title: "Entire Adjust Lineup", text: "Tune your cool. Tune your flavor. Only $11.99.", cta: "Shop Adjust Series", href: "/shop-by-brand/adjust" },
        ].map((b) => (
          <Link key={b.href} href={b.href} className="group relative block aspect-[16/9] overflow-hidden rounded-xl bg-ink">
            <Image src={`/images/wysiwyg/banners/${b.img}.webp`} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 text-white">
              <b className="font-display text-2xl uppercase md:text-3xl">{b.title}</b>
              <span className="text-sm text-zinc-200">{b.text}</span>
              <span className="mt-3 font-bold text-brand">{b.cta} →</span>
            </span>
          </Link>
        ))}
      </section>

      {[
        { t: "Shop Disposable Vapes", s: "Pre-filled disposable vape devices with high puff counts.", u: "/disposable-vapes", c: "Shop All Disposables" },
        { t: "Shop Vape Juices", s: "E-liquids in nicotine salt, freebase and zero-nic options.", u: "/e-liquids", c: "Shop All E-Liquids" },
        { t: "Shop Nicotine Pouches", s: "Tobacco-free nicotine pouches from top brands.", u: "/nicotine-pouches", c: "Shop All Pouches" },
        { t: "Shop Hemp & THC Products", s: "THCA vapes, THC-P disposables, hemp gummies & more.", u: "/hemp-thc", c: "Shop All Hemp" },
      ].map((r) => (
        <section key={r.u} className="reveal container pb-14">
          <SectionHead title={r.t} sub={r.s} href={r.u} cta={r.c} />
          <Rail items={productsFor(r.u)} />
        </section>
      ))}

      <section className="reveal bg-smoke py-14">
        <div className="container max-w-4xl space-y-4 text-zinc-700">
          <h2 className="font-display text-3xl uppercase text-ink">Your Trusted Online Vape Store</h2>
          <p>
            {SITE.name} is an online vape shop where you can buy vapes with confidence. We stock a wide selection of{" "}
            <Link href="/disposable-vapes" className="font-semibold text-brand">disposable vapes</Link>,{" "}
            <Link href="/e-liquids" className="font-semibold text-brand">e-liquids</Link>,{" "}
            <Link href="/nicotine-pouches" className="font-semibold text-brand">nicotine pouches</Link> and{" "}
            <Link href="/hemp-thc" className="font-semibold text-brand">hemp &amp; THC products</Link>, and ship fast from within the United States.
          </p>
          <p>
            How much does a vape cost? Disposable vapes start at $8.99 and nicotine pouches at $5.59. Looking for high-puff devices? Browse our{" "}
            <Link href="/disposable-vapes/50000-puffs" className="font-semibold text-brand">5,000 to 50,000+ puff disposable vapes</Link> from top brands like Geek Bar, Lost Mary, RAZ and more.
          </p>
          <p className="text-sm">All products on this site are intended for adults of legal smoking age (21+) only. {SITE.name} verifies every order against federal and state regulations, including the PACT Act.</p>
        </div>
      </section>

      <section className="reveal container py-14">
        <SectionHead title="From Our Blog" sub="Expert guides, reviews, and the latest vaping news." href="/blog" cta="Read All Posts" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/post/${p.slug}`} className="card-lift group block h-full overflow-hidden rounded-xl border border-zinc-200">
                <span className="relative block aspect-video bg-smoke">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
                </span>
                <span className="block space-y-2 p-4">
                  <time className="text-xs font-semibold uppercase text-brand">{fmtDate(p.date)}</time>
                  <b className="line-clamp-2 block group-hover:text-brand">{p.title}</b>
                  <span className="line-clamp-3 block text-sm text-zinc-600">{p.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal bg-brand">
        <div className="container flex flex-col items-center justify-between gap-5 py-10 md:flex-row">
          <div className="text-center text-white md:text-left">
            <h2 className="font-display text-3xl uppercase">Be the first to know</h2>
            <p>Get exclusive deals, new product alerts &amp; vape news.</p>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  );
}

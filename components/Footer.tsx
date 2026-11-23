import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { FOOTER, LEGAL, SITE } from "@/lib/site";

const PERKS = [
  { icon: "check", title: "Authentic Products", sub: "100% genuine brands" },
  { icon: "truck", title: "Fast Shipping", sub: `Free over $${SITE.freeShipping}` },
  { icon: "lock", title: "Secure Payment", sub: "SSL encrypted checkout" },
  { icon: "chat", title: "21+ Age Verified", sub: "Adult signature on delivery" },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-ink text-zinc-400">
      {/* soft red glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
      <div className="h-1 bg-gradient-to-r from-brand via-brand-dark to-brand" />

      {/* perks */}
      <div className="relative border-b border-white/10">
        <ul className="container grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {PERKS.map((p) => (
            <li key={p.title} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/60 hover:bg-white/[0.06]">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon name={p.icon} className="size-5" />
              </span>
              <span>
                <b className="block text-sm text-white">{p.title}</b>
                <span className="text-xs">{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* main */}
      <div className="container relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${SITE.name} home`} className="inline-block rounded-xl bg-white p-2 transition hover:scale-[1.03]"><Logo h={56} /></Link>
          <p className="max-w-xs text-sm leading-relaxed">Authentic disposables, e-liquids, nicotine pouches and hemp products, shipped fast within the USA. Adults 21+ only.</p>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand">
            <svg viewBox="0 0 24 24" className="size-4 text-brand" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></svg>
            {SITE.email}
          </a>
        </div>

        {FOOTER.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="mb-4 font-display text-lg uppercase tracking-wide text-white">{c.title}</p>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="group inline-flex items-center gap-1.5 transition hover:text-white">
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6">
          <p className="font-display text-2xl uppercase leading-tight text-white">Need help?</p>
          <p className="mt-2 text-sm">Questions about an order, product or return? Check our <Link href="/faqs" className="font-semibold text-white underline-offset-2 hover:text-brand hover:underline">FAQ</Link> or reach out.</p>
          <Link href="/contact" className="btn-primary mt-5 w-full">Contact Us</Link>
        </div>
      </div>

      {/* wordmark */}
      {/* wordmark: red liquid fills the letters (.liquid-text in globals.css), outline stacked on top */}
      <p aria-hidden className="pointer-events-none grid select-none justify-center font-display text-[22vw] uppercase leading-[0.8] lg:text-[16rem]">
        <span className="liquid-text col-start-1 row-start-1">Vape24</span>
        <span className="col-start-1 row-start-1 text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.18)]">
          Vape<span className="[-webkit-text-stroke:1px_rgb(225_6_0/0.6)]">24</span>
        </span>
      </p>

      {/* bottom bar */}
      <div className="relative border-t border-white/10 bg-black/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border-2 border-brand font-display text-sm text-white">21+</span>
            <small className="text-zinc-500">© {SITE.name}. All rights reserved. For adults of legal smoking age only.</small>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {LEGAL.map((x) => <Link key={x.href} href={x.href} className="transition hover:text-white">{x.label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}

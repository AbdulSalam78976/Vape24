import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER, LEGAL, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-zinc-300">
      <div className="bg-brand">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-3xl uppercase text-white">Need help? We&apos;re here for you</p>
            <p className="text-white/90">
              Check our <Link href="/faqs" className="font-semibold underline">FAQ</Link>, track your order or{" "}
              <Link href="/contact" className="font-semibold underline">contact us</Link>. We&apos;re happy to help!
            </p>
          </div>
          <Link href="/contact" className="rounded-md bg-ink px-6 py-3 font-bold text-white hover:bg-black">Contact Us</Link>
        </div>
      </div>
      <div className="container grid gap-10 py-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <div className="w-fit rounded-xl bg-white p-2"><Logo h={56} /></div>
          <p className="max-w-xs text-sm">Authentic disposables, e-liquids, nicotine pouches and hemp products, shipped fast within the USA. Adults 21+ only.</p>
        </div>
        {FOOTER.map((c) => (
          <div key={c.title}>
            <p className="mb-3 font-display text-lg uppercase tracking-wide text-white">{c.title}</p>
            <ul className="space-y-2 text-sm">
              {c.links.map((x) => <li key={x.href}><Link href={x.href} className="hover:text-brand">{x.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <ul className="container flex flex-wrap justify-center gap-x-10 gap-y-3 py-5 text-sm font-semibold text-white">
          {["Authentic Products", "Fast Shipping", "Secure Payment", "21+ Age Verified"].map((t) => (
            <li key={t} className="flex items-center gap-2"><span className="size-2 rounded-full bg-brand" />{t}</li>
          ))}
        </ul>
      </div>
      <div className="container flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-zinc-400 sm:flex-row">
        <small>© {SITE.name}. All rights reserved.</small>
        <nav className="flex flex-wrap justify-center gap-4">
          {LEGAL.map((x) => <Link key={x.href} href={x.href} className="hover:text-white">{x.label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}

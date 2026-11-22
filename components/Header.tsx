import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/CartButton";
import { Logo } from "@/components/Logo";
import { NAV, SITE } from "@/lib/site";

function TopBars() {
  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs text-white sm:text-sm">
        <strong className="text-brand">WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical.
      </div>
     
    </>
  );
}

function SearchForm({ id }: { id: string }) {
  return (
    <form action="/search" role="search" className="relative w-full">
      <label htmlFor={id} className="sr-only">Search</label>
      <input id={id} name="q" type="search" placeholder="Search vapes, flavors, brands…" className="w-full rounded-full border-2 border-ink/10 bg-smoke py-2.5 pl-5 pr-12 text-sm outline-none focus:border-brand focus:bg-white" />
      <button aria-label="Search" className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark active:scale-90">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
    </form>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm" style={{ viewTransitionName: "site-header" }}>
      <TopBars />
      <div className="container flex items-center gap-4 py-2">
        <details className="group lg:hidden">
          <summary aria-label="Menu" className="grid size-10 cursor-pointer list-none place-items-center rounded-full transition hover:bg-smoke active:scale-90 [&::-webkit-details-marker]:hidden">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path className="origin-center transition duration-300 group-open:translate-y-[5px] group-open:rotate-45" d="M4 7h16" />
              <path className="transition duration-300 group-open:opacity-0" d="M4 12h16" />
              <path className="origin-center transition duration-300 group-open:-translate-y-[5px] group-open:-rotate-45" d="M4 17h16" />
            </svg>
          </summary>
          <nav className="menu-drop absolute inset-x-0 top-full z-50 max-h-[75vh] overflow-y-auto border-t border-zinc-100 bg-white p-4 shadow-xl">
            <ul className="divide-y divide-zinc-100">
              {NAV.map((n) => (
                <li key={n.label}>
                  {n.columns ? (
                    <details className="smooth group/m">
                      <summary className="flex cursor-pointer list-none justify-between py-3 font-bold uppercase [&::-webkit-details-marker]:hidden">
                        {n.label} <span className="text-brand transition-transform duration-300 group-open/m:rotate-45">+</span>
                      </summary>
                      <div className="space-y-4 pb-4 pl-3">
                        <Link href={n.href} className="block font-semibold text-brand">See all {n.label}</Link>
                        {n.columns.map((c) => (
                          <div key={c.title}>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500">{c.title}</p>
                            {c.links.map((x) => <Link key={x.href + x.label} href={x.href} className="block py-1">{x.label}</Link>)}
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link href={n.href} className="block py-3 font-bold uppercase">{n.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </details>
        <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0"><Logo h={52} /></Link>
        <div className="mx-auto hidden w-full max-w-xl md:block"><SearchForm id="q-desktop" /></div>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link href="/contact" className="hidden rounded-full px-3 py-2 text-sm font-semibold hover:bg-smoke sm:block">Help</Link>
          <CartButton />
        </div>
      </div>
      <div className="container pb-3 md:hidden"><SearchForm id="q-mobile" /></div>
      <nav aria-label="Main" className="hidden border-t border-zinc-100 bg-white lg:block">
        <ul className="container flex">
          {NAV.map((n) => (
            <li key={n.label} className="group">
              <Link href={n.href} className={`relative block px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:text-brand ${n.label === "Deals" ? "text-brand" : ""}`}>
                {n.label}
                <span className="absolute inset-x-3 bottom-0 h-[3px] origin-center scale-x-0 rounded-full bg-brand transition-transform duration-300 ease-out group-focus-within:scale-x-100 group-hover:scale-x-100" />
              </Link>
              {n.columns && (
                <div className="mega invisible absolute inset-x-0 top-full -translate-y-2 border-t border-zinc-100 bg-white opacity-0 shadow-xl group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="container flex gap-10 py-8">
                    <div className="grid flex-1 grid-cols-4 gap-8">
                      {n.columns.map((c) => (
                        <div key={c.title}>
                          {c.href ? (
                            <Link href={c.href} className="mb-2 block font-display text-lg uppercase hover:text-brand">{c.title}</Link>
                          ) : (
                            <p className="mb-2 font-display text-lg uppercase">{c.title}</p>
                          )}
                          <ul className="space-y-1.5 text-sm">
                            {c.links.map((x) => (
                              <li key={x.href + x.label}><Link href={x.href} className="inline-block text-zinc-700 transition duration-200 hover:translate-x-1 hover:text-brand">{x.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {n.banner && (
                      <Link href={n.banner.href} className="group/b relative block aspect-[8/5] w-[360px] shrink-0 overflow-hidden rounded-xl">
                        <Image src={n.banner.src} alt={n.banner.alt} fill sizes="360px" className="object-cover transition-transform duration-700 ease-out group-hover/b:scale-105" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

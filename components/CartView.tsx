"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { EmptyCart } from "@/components/EmptyCart";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { TrustRow } from "@/components/TrustRow";
import { cart, cartCount, cartTotal, useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";

const usd = (n: number) => `$${n.toFixed(2)}`;

export function CartView() {
  const items = useCart();
  const total = cartTotal(items);
  const count = cartCount(items);
  if (!items.length) return <EmptyCart />;
  return (
    <>
      <CheckoutSteps current={0} />
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-600">{count} {count === 1 ? "item" : "items"}</p>
            <button onClick={() => confirm("Remove everything from your cart?") && cart.clear()} className="text-sm font-semibold text-zinc-500 transition hover:text-brand">
              Clear cart
            </button>
          </div>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.key} className="item-in group relative flex gap-4 rounded-2xl border border-zinc-200 bg-white p-3 transition hover:border-zinc-300 hover:shadow-md sm:p-4">
                <Link href={`/${i.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-smoke sm:size-28">
                  <Image src={i.image || "/logo.jpg"} alt="" fill sizes="112px" className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link href={`/${i.slug}`} className="line-clamp-2 pr-8 font-semibold leading-snug transition-colors hover:text-brand">{i.name}</Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    {i.option && <span className="rounded-full bg-smoke px-2.5 py-1 font-medium text-zinc-700">{i.option}</span>}
                    <span className="text-zinc-500">{usd(i.price)} each</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <div className="flex h-10 items-center rounded-full border border-zinc-300 bg-white">
                      <button
                        aria-label={i.qty === 1 ? "Remove item" : "Decrease quantity"}
                        className="grid size-10 place-items-center rounded-full text-lg transition hover:bg-smoke hover:text-brand active:scale-90"
                        onClick={() => cart.setQty(i.key, i.qty - 1)}
                      >
                        {i.qty === 1 ? (
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                        ) : (
                          "−"
                        )}
                      </button>
                      <span key={i.qty} className="pop-in w-8 text-center font-bold tabular-nums">{i.qty}</span>
                      <button aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full text-lg transition hover:bg-smoke hover:text-brand active:scale-90" onClick={() => cart.setQty(i.key, i.qty + 1)}>
                        +
                      </button>
                    </div>
                    <span key={i.qty} className="pop-in text-lg font-extrabold">{usd(i.price * i.qty)}</span>
                  </div>
                </div>
                <button
                  aria-label={`Remove ${i.name}`}
                  onClick={() => cart.setQty(i.key, 0)}
                  className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-zinc-400 transition hover:rotate-90 hover:bg-brand/10 hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </li>
            ))}
          </ul>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 font-semibold text-zinc-600 transition hover:gap-3 hover:text-brand">← Continue shopping</Link>
        </div>

        <aside className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgb(11_11_11/0.35)] lg:sticky lg:top-40">
          <h2 className="font-display text-2xl uppercase">Order Summary</h2>
          <FreeShippingBar total={total} />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-zinc-600">Subtotal ({count})</dt><dd className="font-semibold">{usd(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-zinc-600">Shipping</dt><dd className="font-semibold">{total >= SITE.freeShipping ? <span className="text-brand">Free</span> : "Calculated at checkout"}</dd></div>
            <div className="flex items-baseline justify-between border-t border-zinc-200 pt-3"><dt className="font-bold">Estimated total</dt><dd className="text-2xl font-extrabold">{usd(total)}</dd></div>
          </dl>
          <Link href="/checkout" className="btn-primary group w-full gap-2 py-3.5 text-base">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" /></svg>
            Secure Checkout
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <TrustRow />
          <p className="text-center text-xs text-zinc-500">Adult signature (21+) required on delivery.</p>
        </aside>
      </div>
    </>
  );
}

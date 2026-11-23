"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { OPEN_CART, cart, cartCount, cartTotal, useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";

const usd = (n: number) => `$${n.toFixed(2)}`;

/**
 * Slide-in cart drawer on a native <dialog> (focus trap, Esc to close, top layer for free).
 * Opened by openCart() from the header bag icon or the add-to-cart toast. Slide animation: .drawer in globals.css.
 */
export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const items = useCart();
  const count = cartCount(items);
  const total = cartTotal(items);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(OPEN_CART, open);
    return () => window.removeEventListener(OPEN_CART, open);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="drawer-title"
      onClick={(e) => e.target === e.currentTarget && close()} // click on the backdrop
      className="drawer fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-md bg-white p-0 shadow-2xl"
    >
      <div className="flex h-full flex-col">
        <header className="dark-panel flex items-center justify-between px-5 py-4">
          <h2 id="drawer-title" className="flex items-center gap-2 font-display text-2xl uppercase text-white">
            Your Bag
            <span className="grid min-w-6 place-items-center rounded-full bg-brand px-1.5 font-sans text-xs font-bold leading-6">{count}</span>
          </h2>
          <button onClick={close} aria-label="Close cart" className="grid size-9 place-items-center rounded-full text-zinc-300 transition hover:rotate-90 hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-smoke text-zinc-400">
              <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" /><path d="M9 10V7a3 3 0 0 1 6 0v3" /></svg>
            </span>
            <p className="font-display text-2xl uppercase">Your bag is empty</p>
            <p className="text-sm text-zinc-500">Find your next favorite flavor.</p>
            <Link href="/disposable-vapes" onClick={close} className="btn-primary px-6 py-3">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-zinc-100 p-4">
              <FreeShippingBar total={total} />
            </div>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((i) => (
                <li key={i.key} className="item-in relative flex gap-3 rounded-2xl border border-zinc-200 p-3 transition hover:border-zinc-300">
                  <Link href={`/${i.slug}`} onClick={close} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-smoke">
                    <Image src={i.image || "/logo.jpg"} alt="" fill sizes="80px" className="object-contain p-1.5" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/${i.slug}`} onClick={close} className="line-clamp-2 pr-7 text-sm font-semibold leading-snug transition hover:text-brand">{i.name}</Link>
                    {i.option && <span className="mt-0.5 truncate text-xs text-zinc-500">{i.option}</span>}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex h-8 items-center rounded-full border border-zinc-300">
                        <button aria-label={i.qty === 1 ? "Remove item" : "Decrease quantity"} onClick={() => cart.setQty(i.key, i.qty - 1)} className="grid size-8 place-items-center rounded-full transition hover:bg-smoke hover:text-brand active:scale-90">
                          {i.qty === 1 ? (
                            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                          ) : (
                            "−"
                          )}
                        </button>
                        <span key={i.qty} className="pop-in w-7 text-center text-sm font-bold tabular-nums">{i.qty}</span>
                        <button aria-label="Increase quantity" onClick={() => cart.setQty(i.key, i.qty + 1)} className="grid size-8 place-items-center rounded-full transition hover:bg-smoke hover:text-brand active:scale-90">+</button>
                      </div>
                      <span key={i.qty} className="pop-in font-extrabold">{usd(i.price * i.qty)}</span>
                    </div>
                  </div>
                  <button aria-label={`Remove ${i.name}`} onClick={() => cart.setQty(i.key, 0)} className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-zinc-400 transition hover:bg-brand/10 hover:text-brand">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                  </button>
                </li>
              ))}
            </ul>
            <footer className="space-y-3 border-t border-zinc-200 bg-white p-4 shadow-[0_-12px_30px_-20px_rgb(11_11_11/0.3)]">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-zinc-600">Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                <span className="text-2xl font-extrabold">{usd(total)}</span>
              </div>
              <p className="text-xs text-zinc-500">{total >= SITE.freeShipping ? "Free shipping included." : "Shipping calculated at checkout."}</p>
              <Link href="/checkout" onClick={close} className="btn-primary group w-full gap-2 py-3.5 text-base">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" /></svg>
                Checkout <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/cart" onClick={close} className="block rounded-md border-2 border-ink py-2.5 text-center text-sm font-bold transition hover:bg-ink hover:text-white">View full cart</Link>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

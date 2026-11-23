"use client";
import { cartCount, openCart, useCart } from "@/lib/cart";

/** Shopping-bag button in the header. Opens the cart drawer; the badge is the total quantity. */
export function CartButton() {
  const count = cartCount(useCart());
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      aria-haspopup="dialog"
      className="group relative grid size-10 place-items-center rounded-full transition hover:bg-smoke active:scale-90"
    >
      <svg key={`bag-${count}`} viewBox="0 0 24 24" className={`size-6 transition group-hover:text-brand ${count ? "cart-wiggle" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      </svg>
      {count > 0 && (
        <span key={`badge-${count}`} aria-hidden className="badge-pop absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold leading-5 text-white ring-2 ring-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

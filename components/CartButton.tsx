"use client";
import Link from "next/link";
import { cartCount, useCart } from "@/lib/cart";

export function CartButton() {
  const count = cartCount(useCart());
  return (
    <Link href="/cart" aria-label={`Shopping cart, ${count} items`} className="group relative grid size-10 place-items-center rounded-full transition hover:bg-smoke active:scale-90">
      <svg key={count} viewBox="0 0 24 24" className={`size-6 transition group-hover:text-brand ${count ? "cart-wiggle" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </svg>
      {count > 0 && (
        <span key={count} className="badge-pop absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold leading-5 text-white">{count}</span>
      )}
    </Link>
  );
}

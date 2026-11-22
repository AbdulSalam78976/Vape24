"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADDED, type CartItem } from "@/lib/cart";

type Added = Omit<CartItem, "key"> & { id: number };

/** Slide-in confirmation after any "Add to Cart". */
export function CartToast() {
  const [added, setAdded] = useState<Added | null>(null);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setAdded({ ...(e as CustomEvent<Omit<CartItem, "key">>).detail, id: Date.now() });
      clearTimeout(t);
      t = setTimeout(() => setAdded(null), 3200);
    };
    window.addEventListener(ADDED, on);
    return () => (window.removeEventListener(ADDED, on), clearTimeout(t));
  }, []);
  if (!added) return null;
  return (
    <div role="status" aria-live="polite" key={added.id} className="toast-in fixed bottom-4 right-4 z-[90] flex w-[min(92vw,360px)] items-center gap-3 rounded-xl bg-ink p-3 pr-4 text-white shadow-2xl ring-1 ring-white/10">
      <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image src={added.image || "/logo.jpg"} alt="" fill sizes="56px" className="object-contain p-1" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
          <svg viewBox="0 0 24 24" className="check-draw size-4" fill="none" stroke="currentColor" strokeWidth={3}><path pathLength={1} d="M5 13l4 4L19 7" /></svg>
          Added to cart
        </span>
        <span className="block truncate text-sm font-semibold">{added.qty > 1 ? `${added.qty} × ` : ""}{added.name}</span>
        {added.option && <span className="block truncate text-xs text-zinc-400">{added.option}</span>}
      </span>
      <Link href="/cart" className="shrink-0 rounded-md bg-brand px-3 py-2 text-xs font-bold transition hover:bg-brand-dark active:scale-95">View cart</Link>
      <span className="toast-timer absolute inset-x-3 bottom-0 h-0.5 origin-left rounded bg-brand" />
    </div>
  );
}

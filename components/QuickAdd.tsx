"use client";
import { useState } from "react";
import { cart } from "@/lib/cart";

export function QuickAdd({ slug, name, image, price, disabled }: { slug: string; name: string; image: string; price: number; disabled?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        cart.add({ slug, name, image, price });
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
      className={`btn-primary w-full text-sm disabled:cursor-not-allowed disabled:bg-zinc-300 ${done ? "bg-ink hover:bg-ink" : ""}`}
    >
      {disabled ? (
        "Sold Out"
      ) : done ? (
        <span className="pop-in flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="check-draw size-4" fill="none" stroke="currentColor" strokeWidth={3}><path pathLength={1} d="M5 13l4 4L19 7" /></svg>
          Added
        </span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}

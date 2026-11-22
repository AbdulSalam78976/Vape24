"use client";
import Link from "next/link";
import { useState } from "react";
import { cart } from "@/lib/cart";

type BuyProps = { slug: string; name: string; image: string; price: number; inStock: boolean; options: { code: string; label: string; values: string[] }[] };

export function BuyBox({ slug, name, image, price, inStock, options }: BuyProps) {
  const opt = options[0];
  const [choice, setChoice] = useState("");
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (opt && !choice) return setMsg(`Please choose a ${opt.label.toLowerCase()}.`);
        cart.add({ slug, name, image, price, option: opt ? `${opt.label}: ${choice}` : undefined }, qty);
        setMsg(`Added ${qty} to your cart.`);
      }}
    >
      {opt && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">
            {opt.label}: <span className="font-normal text-zinc-600">{choice || "Choose an option…"}</span>
          </legend>
          <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
            {opt.values.map((v) => (
              <label key={v} className="cursor-pointer">
                <input type="radio" name={opt.code} value={v} className="peer sr-only" checked={choice === v} onChange={() => (setChoice(v), setMsg(""))} />
                <span className="block rounded-md border border-zinc-300 px-3 py-1.5 text-sm transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand hover:border-ink">
                  {v}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-md border border-zinc-300">
          <button type="button" aria-label="Decrease quantity" className="px-3 py-2 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <input aria-label="Quantity" className="w-12 text-center font-semibold" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} />
          <button type="button" aria-label="Increase quantity" className="px-3 py-2 text-lg" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
        <button disabled={!inStock} className="btn-primary flex-1 text-base disabled:cursor-not-allowed disabled:bg-zinc-300">
          {inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm font-medium text-brand">
        {msg} {msg.startsWith("Added") && <Link href="/cart" className="underline">View cart</Link>}
      </p>
    </form>
  );
}

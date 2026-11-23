"use client";
import { useState } from "react";
import { cart, openCart } from "@/lib/cart";

type BuyProps = { slug: string; name: string; image: string; price: number; inStock: boolean; options: { code: string; label: string; values: string[] }[] };

const MAX_QTY = 50;
const usd = (n: number) => `$${n.toFixed(2)}`;

/**
 * Quantity + flavor picker. With a flavor option and qty > 1, the buyer picks one flavor per unit
 * (slots); units are added to the cart grouped by flavor.
 */
export function BuyBox({ slug, name, image, price, inStock, options }: BuyProps) {
  const opt = options[0];
  const [qty, setQtyRaw] = useState(1);
  const [picks, setPicks] = useState<string[]>([""]);
  const [slot, setSlot] = useState(0);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  const label = opt?.label.toLowerCase() ?? "option";
  const chosen = picks.filter(Boolean).length;
  const missing = qty - chosen;

  function setQty(n: number) {
    const q = Math.min(MAX_QTY, Math.max(1, n || 1));
    const next = Array.from({ length: q }, (_, i) => picks[i] ?? "");
    setQtyRaw(q);
    setPicks(next);
    const empty = next.indexOf("");
    setSlot(empty === -1 ? Math.min(slot, q - 1) : empty);
    setMsg("");
  }

  function pick(v: string) {
    const next = picks.map((p, i) => (i === slot ? v : p));
    setPicks(next);
    // jump to the next empty slot after the current one (wrapping), so tapping flavors fills them in order
    const order = [...next.keys()].map((k) => (slot + 1 + k) % next.length);
    const empty = order.find((i) => !next[i]);
    if (empty !== undefined) setSlot(empty);
    setMsg("");
    setErr(false);
  }

  const sameForAll = () => {
    const v = picks[slot] || picks.find(Boolean);
    if (!v) return;
    setPicks(picks.map(() => v));
    setMsg("");
    setErr(false);
  };

  const counts = picks.reduce<Record<string, number>>((m, p) => (p ? ((m[p] = (m[p] ?? 0) + 1), m) : m), {});

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (opt && missing > 0) {
          setErr(true);
          setSlot(picks.indexOf(""));
          return setMsg(qty === 1 ? `Please choose a ${label}.` : `Please choose ${missing} more ${missing === 1 ? label : `${label}s`} — one for each item.`);
        }
        if (opt) for (const [v, n] of Object.entries(counts)) cart.add({ slug, name, image, price, option: `${opt.label}: ${v}` }, n);
        else cart.add({ slug, name, image, price }, qty);
        setErr(false);
        setMsg(`Added ${qty} to your cart.`);
      }}
    >
      {/* quantity */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold">Quantity</span>
        <div className="flex h-11 items-center rounded-full border border-zinc-300 bg-white">
          <button type="button" aria-label="Decrease quantity" className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-smoke hover:text-brand active:scale-90" onClick={() => setQty(qty - 1)}>−</button>
          <input aria-label="Quantity" className="w-12 bg-transparent text-center font-bold tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" type="number" min={1} max={MAX_QTY} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          <button type="button" aria-label="Increase quantity" className="grid size-11 place-items-center rounded-full text-lg transition hover:bg-smoke hover:text-brand active:scale-90" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <span className="text-sm text-zinc-500">{usd(price * qty)}</span>
      </div>

      {/* flavor(s) */}
      {opt && (
        <fieldset className={`rounded-2xl border p-4 transition ${err ? "shake border-brand bg-brand/5" : "border-zinc-200"}`}>
          <legend className="px-1 text-sm font-semibold">
            {qty === 1 ? (
              <>
                {opt.label}: <span className="font-normal text-zinc-600">{picks[0] || "Choose an option…"}</span>
              </>
            ) : (
              <>
                Choose {qty} {label}s{" "}
                <span className={`font-normal ${missing ? "text-zinc-600" : "text-green-700"}`}>({chosen} of {qty} chosen)</span>
              </>
            )}
          </legend>

          {qty > 1 && (
            <>
              <p className="mb-3 text-xs text-zinc-500">One {label} per item. Select a slot, then tap a {label}.</p>
              <ol className="mb-3 flex flex-wrap gap-2">
                {picks.map((p, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setSlot(i)}
                      aria-pressed={slot === i}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        slot === i ? "border-brand ring-2 ring-brand/20" : p ? "border-zinc-300" : "border-dashed border-zinc-300 text-zinc-400"
                      } ${p ? "bg-white" : "bg-smoke"}`}
                    >
                      <span className={`grid size-5 place-items-center rounded-full text-[10px] ${p ? "bg-brand text-white" : "bg-zinc-300 text-white"}`}>{i + 1}</span>
                      {p || `Pick ${label}`}
                    </button>
                  </li>
                ))}
              </ol>
              <button type="button" onClick={sameForAll} disabled={!chosen} className="mb-3 text-xs font-semibold text-brand underline-offset-2 hover:underline disabled:text-zinc-400 disabled:no-underline">
                Same {label} for all {qty}
              </button>
            </>
          )}

          <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
            {opt.values.map((v) => {
              const n = counts[v] ?? 0;
              const on = picks[slot] === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => pick(v)}
                  aria-pressed={on}
                  className={`relative rounded-md border px-3 py-1.5 text-sm transition active:scale-95 ${
                    on ? "border-brand bg-brand text-white" : n ? "border-brand/60 bg-brand/5" : "border-zinc-300 hover:border-ink"
                  }`}
                >
                  {v}
                  {qty > 1 && n > 0 && <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold leading-5 text-white">×{n}</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <button disabled={!inStock} className="btn-primary h-12 w-full text-base disabled:cursor-not-allowed disabled:bg-zinc-300">
        {!inStock ? "Sold Out" : opt && missing > 0 && qty > 1 ? `Choose ${missing} more ${missing === 1 ? label : `${label}s`}` : `Add ${qty > 1 ? `${qty} ` : ""}to Cart · ${usd(price * qty)}`}
      </button>
      <p aria-live="polite" className={`min-h-5 text-sm font-medium ${err ? "text-brand" : "text-green-700"}`}>
        {msg} {msg.startsWith("Added") && <button type="button" onClick={openCart} className="font-semibold text-brand underline">View cart</button>}
      </p>
    </form>
  );
}

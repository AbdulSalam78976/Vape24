import Image from "next/image";
import Link from "next/link";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import type { CartItem } from "@/lib/cart";

const usd = (n: number) => `$${n.toFixed(2)}`;

export type PlacedOrder = { order: string; email: string; name: string; items: CartItem[]; total: number };

export function OrderSuccess({ order, email, name, items, total }: PlacedOrder) {
  return (
    <>
      <CheckoutSteps current={3} />
      <div className="pop-in mx-auto max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_30px_60px_-30px_rgb(11_11_11/0.4)]">
        <div className="bg-ink px-6 py-8 text-center text-white">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand shadow-[0_0_0_8px_rgb(225_6_0/0.2)]">
            <svg viewBox="0 0 24 24" className="check-draw size-8" fill="none" stroke="currentColor" strokeWidth={3}><path pathLength={1} d="M5 13l4 4L19 7" /></svg>
          </span>
          <h2 className="font-display mt-4 text-3xl uppercase">Thanks, {name.split(" ")[0]}!</h2>
          <p className="mt-1 text-zinc-300">Your order has been placed.</p>
        </div>
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3">
            <span className="text-sm text-zinc-500">Order number</span>
            <b className="font-mono text-lg tracking-wider">{order}</b>
          </div>
          <ul className="divide-y divide-zinc-100">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-smoke">
                  <Image src={i.image || "/logo.jpg"} alt="" fill sizes="48px" className="object-contain p-1" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 font-medium">{i.name}</span>
                  <span className="text-xs text-zinc-500">Qty {i.qty}{i.option ? ` · ${i.option}` : ""}</span>
                </span>
                <span className="font-semibold">{usd(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-baseline justify-between border-t border-zinc-200 pt-4">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-extrabold">{usd(total)}</span>
          </div>
          <p className="rounded-xl bg-smoke p-4 text-sm text-zinc-600">
            A confirmation has been sent to <b className="text-ink">{email}</b>. Our team will be in touch shortly to confirm your order.
          </p>
          <Link href="/" className="btn-primary w-full py-3.5">Continue Shopping</Link>
        </div>
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { EmptyCart } from "@/components/EmptyCart";
import { Field } from "@/components/Field";
import { FormSection } from "@/components/FormSection";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { OrderSuccess, type PlacedOrder } from "@/components/OrderSuccess";
import { cart, cartCount, cartTotal, useCart } from "@/lib/cart";
import { SITE, US_STATES } from "@/lib/site";

const usd = (n: number) => `$${n.toFixed(2)}`;
const newOrderId = () => `V24-${Date.now().toString(36).toUpperCase()}`;

function ageOn(dob: string) {
  const b = new Date(dob + "T00:00:00");
  const now = new Date();
  return now.getFullYear() - b.getFullYear() - (now < new Date(now.getFullYear(), b.getMonth(), b.getDate()) ? 1 : 0);
}

export function CheckoutForm() {
  const items = useCart();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const total = cartTotal(items);
  const count = cartCount(items);
  const freeShip = total >= SITE.freeShipping;

  if (placed) return <OrderSuccess {...placed} />;
  if (!items.length) return <EmptyCart />;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (ageOn(f.dob) < 21) return (setStatus("error"), setError("You must be 21 or older to place an order."));
    setStatus("sending");
    setError("");
    const order = newOrderId();
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.orderEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New order ${order} — ${usd(total)}`,
          _template: "table",
          _captcha: "false",
          _honey: f._honey,
          _autoresponse: `Thanks for your order at ${SITE.name}! Your order number is ${order} (${usd(total)}). We'll be in touch shortly to confirm it.`,
          "Order Number": order,
          "Customer Name": f.name,
          email: f.email,
          Phone: f.phone,
          "Shipping Address": [f.address, f.apt, `${f.city}, ${f.state} ${f.zip}`].filter(Boolean).join(", "),
          "Date of Birth": f.dob,
          Items: items.map((i) => `${i.qty} × ${i.name}${i.option ? ` (${i.option})` : ""} — ${usd(i.price * i.qty)}`).join("\n"),
          "Item Count": count,
          Subtotal: usd(total),
          Shipping: freeShip ? "Free" : "To be calculated",
          Notes: f.notes || "—",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "The order could not be sent.");
      setPlaced({ order, email: f.email, name: f.name, items, total });
      cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setError(`${err instanceof Error ? err.message : "Something went wrong."} Please try again or email ${SITE.email}.`);
    }
  }

  const sending = status === "sending";
  return (
    <>
      <CheckoutSteps current={1} />
      <form onSubmit={submit} className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        {/* mobile: compact order bar */}
        <Link href="/cart" className="flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm text-white lg:hidden">
          <span>{count} {count === 1 ? "item" : "items"} · <b>{usd(total)}</b></span>
          <span className="font-semibold text-brand">Edit cart</span>
        </Link>

        <fieldset disabled={sending} className="min-w-0 space-y-5 disabled:opacity-60">
          <FormSection n={1} title="Contact" sub="We'll send your order confirmation here.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" placeholder="Jane Doe" wide />
              <Field name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
              <Field name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" pattern="[\d\s()+\-]{7,}" />
            </div>
          </FormSection>

          <FormSection n={2} title="Shipping address" sub="We ship to states where vape products are legal.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="address" label="Street address" autoComplete="address-line1" placeholder="123 Main St" wide />
              <Field name="apt" label="Apartment, suite, etc." autoComplete="address-line2" required={false} wide />
              <Field name="city" label="City" autoComplete="address-level2" />
              <Field name="state" label="State" autoComplete="address-level1" options={US_STATES} />
              <Field name="zip" label="ZIP code" autoComplete="postal-code" inputMode="numeric" pattern="\d{5}(-\d{4})?" placeholder="12345" error="Enter a 5-digit ZIP code." />
            </div>
          </FormSection>

          <FormSection n={3} title="Age verification" sub="Federal law requires buyers to be 21 or older.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="dob" label="Date of birth" type="date" autoComplete="bday" hint="Must be 21+ to order." />
            </div>
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-4 text-sm transition has-[:checked]:border-brand has-[:checked]:bg-brand/5">
              <input type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand" />
              <span>
                I confirm I am <b>21 years of age or older</b> and agree to the{" "}
                <Link href="/terms-and-conditions" className="font-semibold text-brand hover:underline">Terms &amp; Conditions</Link>. An adult signature is required on delivery.
              </span>
            </label>
          </FormSection>

          <details className="smooth group rounded-2xl border border-zinc-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold [&::-webkit-details-marker]:hidden">
              Add order notes
              <span className="text-xl text-brand transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 pb-5">
              <label htmlFor="notes" className="sr-only">Order notes</label>
              <textarea id="notes" name="notes" rows={3} placeholder="Delivery instructions, gift note…" className="w-full rounded-lg border border-zinc-300 p-3.5 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" />
            </div>
          </details>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        </fieldset>

        <aside className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgb(11_11_11/0.35)] lg:sticky lg:top-40">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl uppercase">Your order</h2>
            <Link href="/cart" className="text-sm font-semibold text-zinc-500 transition hover:text-brand">Edit</Link>
          </div>
          <ul className="-mr-2 max-h-64 space-y-3 overflow-y-auto pr-2">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 text-sm">
                <span className="relative size-14 shrink-0 rounded-lg bg-smoke">
                  <span className="absolute inset-0 overflow-hidden rounded-lg">
                    <Image src={i.image || "/logo.jpg"} alt="" fill sizes="56px" className="object-contain p-1" />
                  </span>
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">{i.qty}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 font-medium leading-snug">{i.name}</span>
                  {i.option && <span className="block truncate text-xs text-zinc-500">{i.option}</span>}
                </span>
                <span className="font-semibold">{usd(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <FreeShippingBar total={total} />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-zinc-600">Subtotal</dt><dd className="font-semibold">{usd(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-zinc-600">Shipping</dt><dd className="font-semibold">{freeShip ? <span className="text-brand">Free</span> : "Calculated after order"}</dd></div>
            <div className="flex items-baseline justify-between border-t border-zinc-200 pt-3"><dt className="font-bold">Total</dt><dd className="text-2xl font-extrabold">{usd(total)}</dd></div>
          </dl>
          {status === "error" && (
            <p role="alert" className="shake flex gap-2 rounded-xl border border-brand/30 bg-brand/5 p-3 text-sm text-brand-dark">
              <span aria-hidden>⚠</span> {error}
            </p>
          )}
          <button disabled={sending} className="btn-primary group w-full gap-2 py-3.5 text-base disabled:cursor-wait disabled:opacity-80">
            {sending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Placing order…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" /></svg>
                Place Order · {usd(total)}
              </>
            )}
          </button>
        </aside>
      </form>
    </>
  );
}

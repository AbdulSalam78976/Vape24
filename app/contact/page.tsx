import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact Us" };

export default function Contact() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "Contact Us" }]} />
      <section className="container grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <h1 className="font-display text-4xl uppercase md:text-5xl">Contact Us</h1>
          <span className="block h-1 w-16 bg-brand" />
          <p className="text-zinc-700">Questions about an order, a product or a return? Our team is here to help.</p>
          <p>
            <span className="block text-sm font-semibold uppercase text-zinc-500">Email</span>
            <a href={`mailto:${SITE.email}`} className="text-lg font-bold text-brand hover:underline">{SITE.email}</a>
          </p>
          <p className="text-sm text-zinc-600">
            Check our <Link href="/faqs" className="font-semibold text-brand">FAQ</Link>,{" "}
            <Link href="/shipping-policy" className="font-semibold text-brand">shipping policy</Link> and{" "}
            <Link href="/return-policy" className="font-semibold text-brand">returns</Link> for quick answers.
          </p>
        </div>
        {/* ponytail: mailto form, no backend; swap for a server action + email provider when one exists */}
        <form action={`mailto:${SITE.email}`} method="post" encType="text/plain" className="space-y-4 rounded-2xl bg-smoke p-6">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "order", label: "Order number (optional)", type: "text" },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="mb-1 block text-sm font-semibold">{f.label}</label>
              <input id={f.id} name={f.id} type={f.type} required={f.id !== "order"} className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 focus:border-brand focus:outline-none" />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 focus:border-brand focus:outline-none" />
          </div>
          <button className="btn-primary w-full py-3">Send Message</button>
        </form>
      </section>
    </>
  );
}

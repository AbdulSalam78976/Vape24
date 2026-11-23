import Link from "next/link";
import { Field } from "@/components/Field";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact Us" };

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" eyebrow="We're here to help" trail={[{ label: "Contact Us" }]}>
        Questions about an order, a product or a return? Our team is here to help.
      </PageHero>
      <section className="container grid max-w-5xl gap-6 md:grid-cols-[1fr_1.4fr] md:gap-8">
        <div className="dark-panel space-y-5 rounded-2xl p-6 sm:p-8">
          <div className="glass flex items-center gap-3 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"><Icon name="chat" className="size-5" /></span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Email</span>
              <a href={`mailto:${SITE.email}`} className="block truncate font-bold text-white transition hover:text-brand">{SITE.email}</a>
            </span>
          </div>
          <p className="text-sm">Quick answers:</p>
          <ul className="space-y-2 text-sm">
            {[
              ["FAQ", "/faqs"],
              ["Shipping policy", "/shipping-policy"],
              ["Returns & exchanges", "/return-policy"],
            ].map(([t, h]) => (
              <li key={h}>
                <Link href={h} className="group flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 font-semibold text-white transition hover:border-brand/60 hover:bg-white/[0.06]">
                  {t} <span className="text-brand transition group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* ponytail: mailto form, no backend; swap for a server action + email provider when one exists */}
        <form action={`mailto:${SITE.email}`} method="post" encType="text/plain" className="soft-card space-y-4 p-6 hover:translate-y-0 hover:shadow-none sm:p-8">
          <h2 className="font-display text-2xl uppercase">Send a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" autoComplete="name" />
            <Field name="email" label="Email" type="email" autoComplete="email" />
            <Field name="order" label="Order number" required={false} wide />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border border-zinc-300 p-3.5 transition hover:border-zinc-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15" />
          </div>
          <button className="btn-primary w-full py-3.5">Send Message</button>
        </form>
      </section>
    </>
  );
}

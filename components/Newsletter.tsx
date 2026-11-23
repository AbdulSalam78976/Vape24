"use client";
import { useState } from "react";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  // ponytail: no ESP wired up yet; hook this onSubmit to Klaviyo/Mailchimp when chosen
  return sent ? (
    <p className="font-semibold text-white">Thanks! You&apos;re on the list.</p>
  ) : (
    <form onSubmit={(e) => (e.preventDefault(), setSent(true))} className="flex w-full max-w-md flex-col gap-2 min-[420px]:flex-row">
      <label htmlFor="nl-email" className="sr-only">Email Address</label>
      <input id="nl-email" type="email" required placeholder="Email Address" className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-white placeholder:text-zinc-400 transition focus:border-brand focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-brand/20" />
      <button className="btn-primary h-12 rounded-full px-6">Subscribe</button>
    </form>
  );
}

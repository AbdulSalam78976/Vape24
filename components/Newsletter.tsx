"use client";
import { useState } from "react";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  // ponytail: no ESP wired up yet; hook this onSubmit to Klaviyo/Mailchimp when chosen
  return sent ? (
    <p className="font-semibold text-white">Thanks! You&apos;re on the list.</p>
  ) : (
    <form onSubmit={(e) => (e.preventDefault(), setSent(true))} className="flex w-full max-w-md gap-2">
      <label htmlFor="nl-email" className="sr-only">Email Address</label>
      <input id="nl-email" type="email" required placeholder="Email Address" className="min-w-0 flex-1 rounded-md border-0 bg-white px-4 py-3 text-ink" />
      <button className="rounded-md bg-ink px-5 font-bold text-white hover:bg-black">Subscribe</button>
    </form>
  );
}

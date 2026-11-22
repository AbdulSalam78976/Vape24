import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <p className="font-display text-8xl text-brand">404</p>
      <h1 className="font-display mt-2 text-3xl uppercase">Page not found</h1>
      <p className="mt-2 text-zinc-600">That page went up in smoke.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn-primary px-6 py-3">Back to Home</Link>
        <Link href="/deals" className="rounded-md border-2 border-ink px-6 py-3 font-bold hover:bg-ink hover:text-white">See Deals</Link>
      </div>
    </section>
  );
}

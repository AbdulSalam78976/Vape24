import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="pop-in mx-auto max-w-md py-12 text-center">
      <span className="mx-auto grid size-24 place-items-center rounded-full bg-smoke text-zinc-400">
        <svg viewBox="0 0 24 24" className="size-11" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12l-1 13H7L6 7Z" />
          <path d="M9 7a3 3 0 0 1 6 0" />
        </svg>
      </span>
      <h2 className="font-display mt-5 text-3xl uppercase">Your cart is empty</h2>
      <p className="mt-2 text-zinc-600">Looks like you haven&apos;t added anything yet. Find your next favorite flavor.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/disposable-vapes" className="btn-primary px-6 py-3">Shop Disposables</Link>
        <Link href="/deals" className="rounded-md border-2 border-ink px-6 py-3 font-bold transition hover:bg-ink hover:text-white">See Deals</Link>
      </div>
    </div>
  );
}

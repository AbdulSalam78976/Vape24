const STEPS = ["Cart", "Details", "Done"];

/** Cart → Details → Done progress indicator. `current` is the 0-based active step. */
export function CheckoutSteps({ current }: { current: number }) {
  return (
    <ol className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider sm:text-sm" aria-label="Checkout progress">
      {STEPS.map((s, n) => {
        const done = n < current;
        const on = n === current;
        return (
          <li key={s} className="flex flex-1 items-center gap-2 last:flex-none" aria-current={on ? "step" : undefined}>
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full border-2 transition duration-500 ${
                done ? "border-brand bg-brand text-white" : on ? "border-brand bg-white text-brand ring-4 ring-brand/15" : "border-zinc-300 bg-white text-zinc-400"
              }`}
            >
              {done ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg>
              ) : (
                n + 1
              )}
            </span>
            <span className={on || done ? "text-ink" : "text-zinc-400"}>{s}</span>
            {n < STEPS.length - 1 && (
              <span className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded bg-zinc-200">
                <span className={`absolute inset-0 origin-left bg-brand transition-transform duration-700 ease-out ${done ? "scale-x-100" : "scale-x-0"}`} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

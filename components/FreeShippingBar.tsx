import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/site";

export function FreeShippingBar({ total }: { total: number }) {
  const left = SITE.freeShipping - total;
  const pct = Math.min(100, (total / SITE.freeShipping) * 100);
  return (
    <div className="rounded-xl bg-smoke p-4">
      <p className="mb-2 flex items-center gap-2 text-sm">
        <span className={`grid size-8 shrink-0 place-items-center rounded-full ${left > 0 ? "bg-ink text-white" : "bg-brand text-white"}`}>
          <Icon name="truck" className="size-4" />
        </span>
        {left > 0 ? (
          <span>
            You&apos;re <b className="text-brand">${left.toFixed(2)}</b> away from <b>free shipping</b>
          </span>
        ) : (
          <b className="text-brand">You&apos;ve unlocked free shipping!</b>
        )}
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-brand bg-[linear-gradient(45deg,rgb(255_255_255/0.25)_25%,transparent_25%,transparent_50%,rgb(255_255_255/0.25)_50%,rgb(255_255_255/0.25)_75%,transparent_75%)] bg-[length:16px_16px] transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

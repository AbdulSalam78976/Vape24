import { Icon } from "@/components/Icon";

type Perk = { icon: string; title: string; sub: string };

/** Glass perk cards (footer style). Use inside a .dark-panel. */
export function PerkCards({ items }: { items: readonly Perk[] }) {
  return (
    <ul className={`grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 ${items.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((p) => (
        <li key={p.title} className="glass group flex items-center gap-3 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand transition group-hover:bg-brand group-hover:text-white">
            <Icon name={p.icon} className="size-5" />
          </span>
          <span className="min-w-0">
            <b className="block text-sm text-white">{p.title}</b>
            <span className="text-xs text-zinc-400">{p.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

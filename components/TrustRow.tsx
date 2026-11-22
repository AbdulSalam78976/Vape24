import { Icon } from "@/components/Icon";

export function TrustRow({ dark = false }: { dark?: boolean }) {
  return (
    <ul className={`grid grid-cols-3 gap-2 text-center text-[11px] font-semibold ${dark ? "text-zinc-300" : "text-zinc-600"}`}>
      {[
        { icon: "lock", t: "Secure checkout" },
        { icon: "check", t: "100% authentic" },
        { icon: "truck", t: "Same-day dispatch" },
      ].map((x) => (
        <li key={x.t} className="flex flex-col items-center gap-1">
          <Icon name={x.icon} className="size-5 text-brand" />
          {x.t}
        </li>
      ))}
    </ul>
  );
}

import { Breadcrumbs } from "@/components/Breadcrumbs";

type Props = {
  title: string;
  trail: { label: string; href?: string }[];
  eyebrow?: string;
  children?: React.ReactNode;
};

/** Footer-style dark page header: red glow, outlined watermark of the title, breadcrumbs, heading. */
export function PageHero({ title, trail, eyebrow, children }: Props) {
  return (
    <section className="dark-panel mb-8 sm:mb-10">
      <p aria-hidden className="outline-text pointer-events-none absolute -bottom-4 right-0 select-none whitespace-nowrap font-display text-[28vw] uppercase leading-none sm:text-[18vw] lg:text-[12rem]">
        {title.split(" ")[0]}
      </p>
      <div className="container relative py-10 sm:py-14">
        <Breadcrumbs trail={trail} dark />
        {eyebrow && <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>}
        <h1 className={`rise font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl ${eyebrow ? "mt-2" : "mt-6"}`}>{title}</h1>
        <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-brand to-brand-dark" />
        {children && <div className="rise mt-5 max-w-3xl text-zinc-300 [animation-delay:120ms]">{children}</div>}
      </div>
    </section>
  );
}

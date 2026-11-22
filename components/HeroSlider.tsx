"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { d: string; m: string; eyebrow: string; title: string; accent?: string; text: string; cta: string; href: string };

const DURATION = 6000;

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, slides.length]);
  return (
    <section
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden bg-ink"
    >
      {slides.map((s, n) => {
        const on = n === i;
        return (
          <div key={s.title} aria-hidden={!on} className={`transition-opacity duration-1000 ease-out ${on ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}>
            <picture>
              <source media="(max-width: 767px)" srcSet={s.m} />
              <img src={s.d} alt="" className={`h-[440px] w-full object-cover object-right md:h-[480px] ${on ? "ken-burns" : ""}`} fetchPriority={n === 0 ? "high" : "auto"} />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div key={on ? `on-${i}` : "off"} className="container absolute inset-0 flex flex-col justify-end pb-14 md:justify-center md:pb-0">
              <p className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-widest text-white ${on ? "rise" : ""}`}>
                <span className="size-1.5 animate-pulse rounded-full bg-white" /> {s.eyebrow}
              </p>
              <h2 className={`font-display max-w-xl text-5xl uppercase leading-[0.95] text-white md:text-7xl ${on ? "rise [animation-delay:120ms]" : ""}`}>
                {s.title} {s.accent && <span className="text-brand">{s.accent}</span>}
              </h2>
              <p className={`mt-4 max-w-md text-zinc-200 ${on ? "rise [animation-delay:240ms]" : ""}`}>{s.text}</p>
              <Link href={s.href} tabIndex={on ? 0 : -1} className={`group btn-primary mt-6 w-fit px-7 py-3 ${on ? "rise [animation-delay:360ms]" : ""}`}>
                {s.cta} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-4 right-4 flex items-center gap-3 text-sm font-semibold text-white md:right-8">
        <span className="tabular-nums">{String(i + 1).padStart(2, "0")} <span className="text-zinc-400">/ {String(slides.length).padStart(2, "0")}</span></span>
        {slides.map((s, n) => (
          <button key={s.title} type="button" onClick={() => setI(n)} aria-label={`Go to slide ${n + 1}`} className={`relative h-1.5 overflow-hidden rounded-full bg-white/30 transition-all duration-500 ${n === i ? "w-12" : "w-5 hover:bg-white/60"}`}>
            {n === i && <span key={i} className="slide-progress absolute inset-0 origin-left bg-brand" style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }} />}
          </button>
        ))}
      </div>
    </section>
  );
}

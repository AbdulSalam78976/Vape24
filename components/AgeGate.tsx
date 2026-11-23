"use client";
import Image from "next/image";
import { useState } from "react";
import { AgeDoodles } from "@/components/AgeDoodles";

/**
 * 21+ check shown on every full page load (not remembered). Rendered on the server so it covers the
 * page from the first paint; the root layout persists across client navigation, so it won't re-open
 * when moving between pages.
 */
export function AgeGate() {
  const [ok, setOk] = useState(false);
  const [denied, setDenied] = useState(false);
  if (ok) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" aria-describedby="age-desc" className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm">
      <style>{"body{overflow:hidden}"}</style>
      <div className="pop-in relative w-full max-w-md overflow-hidden rounded-2xl bg-white text-center shadow-2xl">
        <AgeDoodles />
        <div className="relative h-1.5 bg-brand" />
        <div className="relative p-8">
          <Image src="/logo.jpg" alt="Vape24" width={140} height={140} priority className="mx-auto" />
          <h2 id="age-title" className="font-display mt-2 text-3xl uppercase">Are you 21 or older?</h2>
          <p id="age-desc" className="mt-2 text-sm text-zinc-600">This website sells age-restricted products. You must be of legal smoking age (21+) to enter.</p>
          {denied ? (
            <p role="alert" className="mt-6 font-semibold text-brand">Sorry, you must be 21 or older to visit this site.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button autoFocus className="btn-primary py-3" onClick={() => setOk(true)}>Yes, I&apos;m 21+</button>
              <button className="rounded-md border-2 border-ink py-3 font-bold transition hover:bg-ink hover:text-white" onClick={() => setDenied(true)}>No</button>
            </div>
          )}
          <p className="mt-6 text-[11px] leading-snug text-zinc-500">
            <b className="text-ink">WARNING:</b> This product contains nicotine. Nicotine is an addictive chemical.
          </p>
        </div>
      </div>
    </div>
  );
}

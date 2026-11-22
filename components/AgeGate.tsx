"use client";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const AGE_KEY = "vape24-age-ok";

const ageSub = (l: () => void) => (window.addEventListener("storage", l), () => window.removeEventListener("storage", l));

const ageGet = () => {
  try {
    return localStorage.getItem(AGE_KEY) === "1";
  } catch {
    return true;
  }
};

export function AgeGate() {
  const ok = useSyncExternalStore(ageSub, ageGet, () => true);
  const [, force] = useState(0);
  const [denied, setDenied] = useState(false);
  if (ok) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <Image src="/logo.jpg" alt="Vape24" width={140} height={140} className="mx-auto" />
        <h2 id="age-title" className="font-display mt-2 text-3xl uppercase">Are you 21 or older?</h2>
        <p className="mt-2 text-sm text-zinc-600">This website sells age-restricted products. You must be of legal smoking age (21+) to enter.</p>
        {denied ? (
          <p className="mt-6 font-semibold text-brand">Sorry, you must be 21 or older to visit this site.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="btn-primary py-3" onClick={() => { try { localStorage.setItem(AGE_KEY, "1"); } catch {} force((n) => n + 1); }}>Yes, I&apos;m 21+</button>
            <button className="rounded-md border-2 border-ink py-3 font-bold hover:bg-ink hover:text-white" onClick={() => setDenied(true)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
}

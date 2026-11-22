"use client";
import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : ["/logo.jpg"];
  return (
    <div className="space-y-3">
      <div className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <Image key={list[i]} src={list[i]} alt={alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="img-swap object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-110" />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.slice(0, 16).map((src, n) => (
            <button
              key={src}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show image ${n + 1}`}
              aria-pressed={n === i}
              className={`relative size-16 shrink-0 overflow-hidden rounded-md border-2 bg-white transition duration-200 hover:-translate-y-0.5 ${n === i ? "border-brand shadow-md" : "border-zinc-200 opacity-70 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

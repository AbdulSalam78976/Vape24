import Image from "next/image";
import { SITE } from "@/lib/site";

/** The logo art sits in the middle ~84%×62% of a square white JPG; crop to it. */
export function Logo({ h = 56 }: { h?: number }) {
  const box = h / 0.62;
  return (
    <span className="relative block overflow-hidden" style={{ height: h, width: box * 0.84 }}>
      <Image src="/logo.jpg" alt={SITE.name} width={box} height={box} priority className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" style={{ width: box, height: box }} />
    </span>
  );
}

import Image from "next/image";
import Link from "next/link";
import hero from "@/public/images/wysiwyg/heroslider/hero.jpg";

/** Single-image home hero, no text overlay. The whole banner links to deals. */
export function Hero() {
  return (
    <Link href="/deals" aria-label="Shop this week's vape deals" className="relative block aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/9] lg:aspect-[21/9]">
      {/* object position keeps the Vape24 sign (left third of the photo) in frame when cropped */}
      <Image src={hero} alt="Vape24 store interior" fill priority placeholder="blur" sizes="100vw" className="ken-burns object-cover object-[28%_45%]" />
    </Link>
  );
}

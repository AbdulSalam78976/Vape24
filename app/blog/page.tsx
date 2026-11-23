import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { fmtDate, posts } from "@/lib/data";

export const metadata = { title: "Blog", description: "Expert guides, reviews, and the latest vaping news." };

export default function Blog() {
  return (
    <>
      <PageHero title="Blog" eyebrow="Guides & reviews" trail={[{ label: "Blog" }]}>
        Expert guides, reviews, and the latest vaping news.
      </PageHero>
      <section className="container">
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="reveal">
              <Link href={`/blog/post/${p.slug}`} className="soft-card group block h-full overflow-hidden">
                <span className="relative block aspect-video overflow-hidden bg-smoke">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
                </span>
                <span className="block space-y-2 p-5">
                  <time className="inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-brand">{fmtDate(p.date)}</time>
                  <b className="block text-lg leading-snug transition group-hover:text-brand">{p.title}</b>
                  <span className="line-clamp-3 block text-sm text-zinc-600">{p.excerpt}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-brand transition-all group-hover:gap-2">Read more →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

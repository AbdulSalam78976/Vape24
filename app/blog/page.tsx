import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { fmtDate, posts } from "@/lib/data";

export const metadata = { title: "Blog", description: "Expert guides, reviews, and the latest vaping news." };

export default function Blog() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "Blog" }]} />
      <section className="container">
        <h1 className="font-display text-4xl uppercase md:text-5xl">Blog</h1>
        <p className="mb-8 mt-2 text-zinc-600">Expert guides, reviews, and the latest vaping news.</p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="reveal">
              <Link href={`/blog/post/${p.slug}`} className="card-lift group block h-full overflow-hidden rounded-xl border border-zinc-200">
                <span className="relative block aspect-video bg-smoke">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />}
                </span>
                <span className="block space-y-2 p-5">
                  <time className="text-xs font-semibold uppercase text-brand">{fmtDate(p.date)}</time>
                  <b className="block text-lg leading-snug group-hover:text-brand">{p.title}</b>
                  <span className="line-clamp-3 block text-sm text-zinc-600">{p.excerpt}</span>
                  <span className="block text-sm font-bold text-brand">Read more →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

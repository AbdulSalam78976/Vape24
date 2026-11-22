import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Rich } from "@/components/Rich";
import { fmtDate, posts } from "@/lib/data";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/blog/post/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function Post({ params }: PageProps<"/blog/post/[slug]">) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Breadcrumbs trail={[{ label: "Blog", href: "/blog" }, { label: p.title }]} />
      <article className="container max-w-3xl">
        <time className="text-sm font-semibold uppercase text-brand">{fmtDate(p.date)}</time>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl">{p.title}</h1>
        {p.image && (
          <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
            <Image src={p.image} alt="" fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
          </div>
        )}
        <Rich html={p.content} className="mt-8" />
        <Link href="/blog" className="mt-10 inline-block font-bold text-brand hover:underline">← Back to all posts</Link>
      </article>
    </>
  );
}

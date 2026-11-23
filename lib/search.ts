export type SearchItem = {
  slug: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  regularPrice: number;
  inStock: boolean;
  image: string;
  cats: string[];
  flavors: string[];
};

/** Lowercase, "50,000"/"50k" → "50000", "&" → "and", punctuation → spaces. */
export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/(\d),(\d{3})/g, "$1$2")
    .replace(/\b(\d+)k\b/g, "$1000")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Query → terms; trailing plural "s" dropped so "vapes" finds "vape". */
export const terms = (q: string) =>
  normalize(q)
    .split(" ")
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));

export type Hit = { item: SearchItem; score: number; flavor?: string };

/** Every term must match somewhere; name/brand matches outrank category, flavor and SKU matches. */
export function search(items: SearchItem[], q: string): Hit[] {
  const ts = terms(q);
  if (!ts.length) return [];
  const phrase = ts.join(" ");
  const hits: Hit[] = [];
  for (const item of items) {
    const name = normalize(item.name);
    const brand = normalize(item.brand);
    const cats = normalize(item.cats.join(" "));
    const sku = normalize(item.sku);
    const flavors = item.flavors.map((f) => [f, normalize(f)] as const);
    let score = 0;
    let flavor: string | undefined;
    let ok = true;
    for (const t of ts) {
      const s = name.includes(t) || brand.includes(t) ? 3 : cats.includes(t) ? 2 : sku.includes(t) ? 1 : 0;
      const f = s ? undefined : flavors.find(([, n]) => n.includes(t));
      if (!s && !f) {
        ok = false;
        break;
      }
      score += s || 1;
      if (f) flavor ??= f[0];
    }
    if (!ok) continue;
    if (name.includes(phrase)) score += 5;
    hits.push({ item, score, flavor });
  }
  return hits.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
}

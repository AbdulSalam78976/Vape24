"use client";
import { useSyncExternalStore } from "react";

export type CartItem = { key: string; slug: string; name: string; image: string; price: number; option?: string; qty: number };

const KEY = "vape24-cart";
/** window event fired by cart.add — the toast listens for it */
export const ADDED = "vape24:cart-added";
const EMPTY: CartItem[] = [];
let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (items) return items;
  try {
    items = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    items = [];
  }
  return items!;
}

function write(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => e.key === KEY && ((items = null), l());
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export const useCart = () => useSyncExternalStore(subscribe, read, () => EMPTY);

export const cart = {
  add(item: Omit<CartItem, "key" | "qty">, qty = 1) {
    const key = `${item.slug}|${item.option ?? ""}`;
    const cur = read();
    const hit = cur.find((i) => i.key === key);
    write(hit ? cur.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)) : [...cur, { ...item, key, qty }]);
    window.dispatchEvent(new CustomEvent(ADDED, { detail: { ...item, qty } }));
  },
  setQty(key: string, qty: number) {
    write(qty <= 0 ? read().filter((i) => i.key !== key) : read().map((i) => (i.key === key ? { ...i, qty } : i)));
  },
  clear: () => write([]),
};

export const cartCount = (c: CartItem[]) => c.reduce((n, i) => n + i.qty, 0);
export const cartTotal = (c: CartItem[]) => c.reduce((n, i) => n + i.qty * i.price, 0);

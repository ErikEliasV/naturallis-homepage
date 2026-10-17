import { type CartItem } from "./types";

/**
 * Browser-only cart persisted in localStorage. Exposed as an external store for
 * `useSyncExternalStore`; the server snapshot is always an empty cart.
 */

const STORAGE_KEY = "naturallis:cart";
const EMPTY: readonly CartItem[] = [];

let items: readonly CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.slug === "string" &&
    typeof item.capsules === "number" &&
    typeof item.quantity === "number"
  );
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    items = Array.isArray(parsed) ? parsed.filter(isCartItem) : EMPTY;
  } catch {
    items = EMPTY;
  }
}

function commit(next: readonly CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be unavailable (private mode); the cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): readonly CartItem[] {
  load();
  return items;
}

export function getServerSnapshot(): readonly CartItem[] {
  return EMPTY;
}

const sameLine = (a: CartItem, slug: string, capsules: number) =>
  a.slug === slug && a.capsules === capsules;

export function addItem(slug: string, capsules: number, quantity = 1) {
  load();
  const existing = items.find((item) => sameLine(item, slug, capsules));
  commit(
    existing
      ? items.map((item) =>
          sameLine(item, slug, capsules) ? { ...item, quantity: item.quantity + quantity } : item,
        )
      : [...items, { slug, capsules, quantity }],
  );
}

export function setQuantity(slug: string, capsules: number, quantity: number) {
  load();
  commit(
    quantity <= 0
      ? items.filter((item) => !sameLine(item, slug, capsules))
      : items.map((item) => (sameLine(item, slug, capsules) ? { ...item, quantity } : item)),
  );
}

export function removeItem(slug: string, capsules: number) {
  setQuantity(slug, capsules, 0);
}

export function clearCart() {
  commit(EMPTY);
}

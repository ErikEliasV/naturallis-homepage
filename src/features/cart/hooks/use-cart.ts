"use client";

import { useMemo, useSyncExternalStore } from "react";

import { PRODUCTS } from "@/constants/products";

import { getServerSnapshot, getSnapshot, subscribe } from "../store";
import { type CartLine } from "../types";

/** Cart lines joined with catalog data, plus item count and subtotal. */
export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = PRODUCTS.find((entry) => entry.slug === item.slug);
      return product ? [{ ...item, product, lineTotal: product.price * item.quantity }] : [];
    });
    return {
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.lineTotal, 0),
    };
  }, [items]);
}

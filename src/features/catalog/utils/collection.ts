import { type CategorySlug } from "@/constants/categories";

import { type Product } from "../types";

export type SortOption = "best-selling" | "alpha-asc" | "alpha-desc" | "price-asc" | "price-desc";

export const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: "best-selling", label: "Mais vendidos" },
  { value: "alpha-asc", label: "Ordem alfabética, A-Z" },
  { value: "alpha-desc", label: "Ordem alfabética, Z-A" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
];

export type Availability = "in-stock" | "out-of-stock";

export type CollectionFilters = {
  availability: readonly Availability[];
  kinds: readonly string[];
  capsules: readonly number[];
  categories: readonly CategorySlug[];
  minPrice: number;
  maxPrice: number;
};

export function emptyFilters(maxPrice: number): CollectionFilters {
  return { availability: [], kinds: [], capsules: [], categories: [], minPrice: 0, maxPrice };
}

export function priceCeiling(products: readonly Product[]): number {
  return Math.ceil(Math.max(0, ...products.map((product) => product.price)));
}

function matches(product: Product, filters: CollectionFilters): boolean {
  const availability: Availability = product.inStock ? "in-stock" : "out-of-stock";
  return (
    (filters.availability.length === 0 || filters.availability.includes(availability)) &&
    (filters.kinds.length === 0 || filters.kinds.includes(product.kind)) &&
    (filters.capsules.length === 0 ||
      product.sizes.some((size) => filters.capsules.includes(size.capsules))) &&
    (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
    product.price >= filters.minPrice &&
    product.price <= filters.maxPrice
  );
}

export function filterProducts(products: readonly Product[], filters: CollectionFilters) {
  return products.filter((product) => matches(product, filters));
}

const collator = new Intl.Collator("pt-BR");

export function sortProducts(products: readonly Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "best-selling":
      return sorted.sort((a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)));
    case "alpha-asc":
      return sorted.sort((a, b) => collator.compare(a.name, b.name));
    case "alpha-desc":
      return sorted.sort((a, b) => collator.compare(b.name, a.name));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
  }
}

export function countBy<T>(items: readonly T[], key: (item: T) => readonly string[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const value of key(item)) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

export function activeFilterCount(filters: CollectionFilters, ceiling: number): number {
  return (
    filters.availability.length +
    filters.kinds.length +
    filters.capsules.length +
    filters.categories.length +
    (filters.minPrice > 0 || filters.maxPrice < ceiling ? 1 : 0)
  );
}

export function toggle<T>(list: readonly T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

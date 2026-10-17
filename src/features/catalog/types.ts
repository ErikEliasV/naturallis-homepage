import { type CategorySlug } from "@/constants/categories";

export type ProductBadge = "promo" | "bestseller";

export type ProductSize = {
  label: string;
  capsules: number;
};

export type Product = {
  slug: string;
  name: string;
  /** Short type shown above the name, e.g. "Suplemento". */
  kind: string;
  category: CategorySlug;
  /** Lines printed on the bottle label. */
  label: readonly [string] | readonly [string, string];
  capsules: number;
  price: number;
  compareAtPrice?: number;
  badge?: ProductBadge;
  bestseller?: boolean;
  isNew?: boolean;
  description: string;
  details: readonly string[];
  ingredients: string;
  howToUse: string;
  sizes: readonly ProductSize[];
  inStock: boolean;
};

import { type Product } from "@/features/catalog/types";

export type CartItem = {
  slug: string;
  /** Selected size, identified by its capsule count. */
  capsules: number;
  quantity: number;
};

export type CartLine = CartItem & {
  product: Product;
  lineTotal: number;
};

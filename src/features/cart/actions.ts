import { addItem } from "./store";

/** Dispatched on `window` after an item is added, so the toast can confirm it. */
export const CART_ADDED_EVENT = "naturallis:cart-added";

export type CartAddedDetail = {
  name: string;
  quantity: number;
};

export function addToCart(product: { slug: string; name: string }, capsules: number, quantity = 1) {
  addItem(product.slug, capsules, quantity);
  window.dispatchEvent(
    new CustomEvent<CartAddedDetail>(CART_ADDED_EVENT, {
      detail: { name: product.name, quantity },
    }),
  );
}

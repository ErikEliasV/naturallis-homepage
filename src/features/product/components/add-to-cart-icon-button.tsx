"use client";

import { LayeredIcon } from "@/components/ui/layered-icon";
import { ICON_CART_WHITE } from "@/constants/icons";
import { addToCart } from "@/features/cart/actions";
import { type Product } from "@/features/catalog/types";
import { Magnetic } from "@/features/cursor/components/magnetic";

/** Black round "add to cart" control used in product rows (Figma "Button - Choose options"). */
export function AddToCartIconButton({ product }: { product: Product }) {
  const size = product.sizes[0];
  return (
    <Magnetic>
      <button
        type="button"
        aria-label={`Adicionar ${product.name} ao carrinho`}
        disabled={!product.inStock || !size}
        onClick={() => size && addToCart(product, size.capsules)}
        className="flex size-11 items-center justify-center rounded-pill border border-black bg-black transition-colors duration-300 ease-power3-out hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:opacity-40"
      >
        <LayeredIcon layers={ICON_CART_WHITE} className="size-4" />
      </button>
    </Magnetic>
  );
}

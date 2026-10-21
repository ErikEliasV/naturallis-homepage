"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChoicePill } from "@/components/ui/choice-pill";
import { LayeredIcon } from "@/components/ui/layered-icon";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ICON_STOCK } from "@/constants/icons";
import { ACCOUNT_LINKS } from "@/constants/navigation";
import { addToCart } from "@/features/cart/actions";
import { type Product } from "@/features/catalog/types";
import { cn } from "@/utils/cn";

/** Size picker, stock status, quantity and purchase buttons (Figma "VariantPicker" block). */
export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const groupId = useId();
  const [capsules, setCapsules] = useState(product.sizes[0]?.capsules ?? product.capsules);
  const [quantity, setQuantity] = useState(1);
  const selected = product.sizes.find((size) => size.capsules === capsules);

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="flex items-baseline gap-1">
          <span className="font-display text-heading-sm">Tamanho:</span>
          <span>{selected?.label}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <ChoicePill
              key={size.capsules}
              name={groupId}
              value={size.capsules}
              checked={size.capsules === capsules}
              onChange={() => setCapsules(size.capsules)}
            >
              {size.label}
            </ChoicePill>
          ))}
        </div>
      </fieldset>

      <p className={cn("flex items-center gap-2", product.inStock ? "text-stock" : "text-promo")}>
        <LayeredIcon layers={ICON_STOCK} className="size-4" />
        {product.inStock ? "Em estoque e pronto para envio" : "Esgotado no momento"}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
          <Button
            variant="mist"
            size="shop"
            magnetic={false}
            disabled={!product.inStock}
            onClick={() => addToCart(product, capsules, quantity)}
            className="flex-1"
          >
            Adicionar ao carrinho
          </Button>
        </div>
        <Button
          variant="lime"
          size="shop"
          magnetic={false}
          disabled={!product.inStock}
          onClick={() => {
            addToCart(product, capsules, quantity);
            router.push(ACCOUNT_LINKS.cart.href);
          }}
          className="w-full"
        >
          Comprar agora
        </Button>
      </div>
    </div>
  );
}

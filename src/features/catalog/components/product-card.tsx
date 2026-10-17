import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { productHref } from "@/constants/products";
import { HoverLift } from "@/features/cursor/components/hover-lift";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/format-price";

import { type Product, type ProductBadge } from "../types";
import { ProductBottle } from "./product-bottle";

const BADGES: Record<ProductBadge, { label: string; tone: "promo" | "sage" }> = {
  promo: { label: "Promoção", tone: "promo" },
  bestseller: { label: "Mais Vendidos", tone: "sage" },
};

type ProductCardProps = {
  product: Product;
  /** Heading level inside the surrounding section. */
  headingLevel?: "h3" | "h4";
  className?: string;
};

/**
 * Product card from the Figma carousels and grids. Everything inside scales with the
 * card width (container units, 427px base), so it matches both the Home carousel and
 * the 82.7% scale used in the shop grid.
 */
export function ProductCard({ product, headingLevel = "h3", className }: ProductCardProps) {
  const Heading = headingLevel;
  const href = productHref(product);
  const badge = product.badge ? BADGES[product.badge] : undefined;
  const onSale = product.compareAtPrice !== undefined;

  return (
    <div className={cn("@container h-full", className)}>
      <article
        data-hover-root
        data-cursor-label="Ver"
        className="relative flex h-full flex-col gap-card-stack rounded-card bg-surface px-card-pad-x py-card-pad-y"
      >
        <div>
          {badge ? (
            <Badge tone={badge.tone} size="card">
              {badge.label}
            </Badge>
          ) : (
            <Badge size="card" className="invisible" aria-hidden>
              {BADGES.promo.label}
            </Badge>
          )}
        </div>

        <HoverLift className="mx-auto w-[39.2%]">
          <ProductBottle product={product} sizes="(min-width: 64rem) 9vw, 30vw" />
        </HoverLift>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-card-info">
            <p className="text-card-kind text-muted">{product.kind}</p>
            <Heading className="text-card-name font-medium text-ink-soft">
              <Link
                href={href}
                className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-forest"
              >
                {product.name}
              </Link>
            </Heading>
            <p className="flex flex-wrap items-center gap-x-card-price text-card-name font-medium">
              <span className={onSale ? "text-promo" : "text-ink"}>
                {onSale ? <span className="sr-only">Preço promocional: </span> : null}
                {formatPrice(product.price)}
              </span>
              {onSale ? (
                <s className="text-faint">
                  <span className="sr-only">Preço anterior: </span>
                  {formatPrice(product.compareAtPrice ?? 0)}
                </s>
              ) : null}
            </p>
          </div>
          <IconButton
            href={href}
            tone="ink"
            size="card"
            label={`Comprar ${product.name}`}
            className="relative z-10"
          >
            <Image src="/icons/cart-small.svg" alt="" width={31} height={30} className="w-[55%]" />
          </IconButton>
        </div>
      </article>
    </div>
  );
}

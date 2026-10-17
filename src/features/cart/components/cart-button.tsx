"use client";

import Image from "next/image";

import { IconButton } from "@/components/ui/icon-button";
import { ACCOUNT_LINKS } from "@/constants/navigation";

import { useCart } from "../hooks/use-cart";

/** Header cart shortcut with the number of items. */
export function CartButton() {
  const { count } = useCart();
  const label =
    count > 0
      ? `${ACCOUNT_LINKS.cart.label}, ${count} ${count === 1 ? "item" : "itens"}`
      : ACCOUNT_LINKS.cart.label;

  return (
    <span className="relative inline-flex">
      <IconButton href={ACCOUNT_LINKS.cart.href} label={label}>
        <Image src="/icons/cart.svg" alt="" width={34} height={32} className="w-[60%]" />
      </IconButton>
      {count > 0 ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-pill bg-lime px-1 font-geist text-caption font-medium text-ink"
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </span>
  );
}

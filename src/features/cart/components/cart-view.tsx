"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { productHref } from "@/constants/products";
import { ProductBottle } from "@/features/catalog/components/product-bottle";
import { Reveal } from "@/features/motion/components/reveal";
import { formatPrice } from "@/utils/format-price";
import { whatsappLink } from "@/utils/whatsapp";

import { useCart } from "../hooks/use-cart";
import { clearCart, removeItem, setQuantity } from "../store";
import { type CartLine } from "../types";

function whatsappCheckoutHref(lines: readonly CartLine[], subtotal: number) {
  const items = lines
    .map((line) => `• ${line.quantity}× ${line.product.name} (${line.capsules} cápsulas)`)
    .join("\n");
  const message = `Olá! Gostaria de finalizar este pedido:\n${items}\nSubtotal: ${formatPrice(subtotal)}`;
  return whatsappLink(message);
}

/** Cart lines, quantities and summary. Checkout continues with the pharmacy on WhatsApp. */
export function CartView() {
  const { lines, count, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <Reveal className="flex flex-col items-start gap-6 rounded-tile bg-surface p-8 md:p-12">
        <p className="font-serif text-heading-lg">Seu carrinho está vazio.</p>
        <p className="max-w-[40ch] text-black/70">
          Conheça nossos produtos ou fale com a nossa equipe para manipular uma fórmula só sua.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/produtos" variant="ink" size="shop">
            Conheça nossos produtos
          </Button>
          <Button href="/formulas#pedido" variant="lime" size="shop">
            Peça sua fórmula
          </Button>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <ul aria-label="Itens do carrinho" className="flex flex-col gap-2.5">
        {lines.map((line) => (
          <li
            key={`${line.slug}-${line.capsules}`}
            className="flex flex-wrap items-center gap-4 rounded-sm bg-surface p-3 sm:flex-nowrap"
          >
            <Link
              href={productHref(line.product)}
              aria-label={line.product.name}
              className="flex size-32.5 shrink-0 items-center justify-center rounded-sm bg-white"
            >
              <ProductBottle product={line.product} sizes="4rem" className="w-[38%]" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Link href={productHref(line.product)} className="font-medium hover:underline">
                {line.product.name}
              </Link>
              <p className="text-black/70">{line.capsules} cápsulas</p>
              <p>{formatPrice(line.product.price)}</p>
            </div>
            <div className="flex items-center gap-4">
              <QuantityStepper
                value={line.quantity}
                label={line.product.name}
                onChange={(value) => setQuantity(line.slug, line.capsules, value)}
              />
              <p className="w-24 text-right font-medium">{formatPrice(line.lineTotal)}</p>
              <button
                type="button"
                onClick={() => removeItem(line.slug, line.capsules)}
                className="rounded-pill px-3 py-2 text-black/70 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-forest"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside
        aria-label="Resumo do pedido"
        className="flex flex-col gap-5 rounded-tile bg-surface p-6 lg:sticky lg:top-[calc(var(--spacing-header-space)-2rem)]"
      >
        <p className="font-serif text-heading-lg">Resumo</p>
        <dl className="flex flex-col gap-2 border-b border-black/10 pb-5">
          <div className="flex justify-between">
            <dt className="text-black/70">Itens</dt>
            <dd>{count}</dd>
          </div>
          <div className="flex justify-between text-heading-sm">
            <dt>Subtotal</dt>
            <dd className="font-medium">{formatPrice(subtotal)}</dd>
          </div>
        </dl>
        <p className="text-body-sm text-black/70">
          Frete, prazo e forma de pagamento são combinados com a nossa equipe no atendimento.
        </p>
        <Button
          href={whatsappCheckoutHref(lines, subtotal)}
          variant="lime"
          size="shop"
          magnetic={false}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          Finalizar pelo WhatsApp
        </Button>
        <div className="flex justify-between">
          <Link href="/produtos" className="underline-offset-4 hover:underline">
            Continuar comprando
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="text-black/70 underline-offset-4 hover:underline"
          >
            Esvaziar carrinho
          </button>
        </div>
      </aside>
    </div>
  );
}

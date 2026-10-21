import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { CartView } from "@/features/cart/components/cart-view";
import { RevealText } from "@/features/motion/components/reveal-text";

export const metadata: Metadata = {
  title: "Carrinho",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <main className="flex flex-col pt-header-space pb-section text-body">
      <Container width="shop">
        <Breadcrumbs
          items={[{ label: "Início", href: "/" }, { label: "Carrinho" }]}
          className="py-4"
        />
        <RevealText as="h1" trigger="mount" className="pt-6 pb-10 font-display text-heading-xl">
          Seu carrinho
        </RevealText>
        <CartView />
      </Container>
    </main>
  );
}

import Image from "next/image";

import { Container } from "@/components/layout/container";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { SITE } from "@/constants/site";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center bg-forest py-section text-white">
      <Container className="flex flex-col gap-section-sm">
        <RevealText as="h1" trigger="mount" className="max-w-[16ch] font-display text-display-lg">
          {SITE.tagline}
        </RevealText>
        <RevealText
          as="p"
          split="words"
          trigger="mount"
          delay={0.3}
          className="max-w-[48ch] text-lead"
        >
          {SITE.description}
        </RevealText>
        <Reveal stagger trigger="mount" delay={0.6} className="flex flex-wrap items-center gap-4">
          <Button href="/produtos">Conheça nossos produtos</Button>
          <Button href="/formulas" variant="light">
            Solicite sua fórmula
          </Button>
          <IconButton href="/carrinho" label="Carrinho">
            <Image src="/icons/cart.svg" alt="" width={34} height={32} className="w-[60%]" />
          </IconButton>
          <ArrowButton direction="prev" label="Anterior" />
          <ArrowButton direction="next" label="Próximo" />
          <Badge>Promoção</Badge>
          <Badge tone="sage">Mais Vendidos</Badge>
        </Reveal>
      </Container>
    </main>
  );
}

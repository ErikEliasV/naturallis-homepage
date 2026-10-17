import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center pt-header-space pb-section">
      <Container className="flex flex-col gap-8">
        <RevealText
          as="p"
          split="chars"
          trigger="mount"
          className="font-display text-display-2xl text-forest"
        >
          404
        </RevealText>
        <RevealText as="h1" trigger="mount" delay={0.2} className="font-display text-display-md">
          Não encontramos esta página.
        </RevealText>
        <RevealText
          as="p"
          trigger="mount"
          delay={0.3}
          className="max-w-[40ch] text-lead text-slate"
        >
          O endereço pode ter mudado ou o produto não está mais disponível. Que tal recomeçar por
          aqui?
        </RevealText>
        <Reveal stagger trigger="mount" delay={0.4} className="flex flex-wrap gap-4">
          <div>
            <Button href="/">Voltar ao início</Button>
          </div>
          <div>
            <Button href="/produtos" variant="light">
              Ver produtos
            </Button>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}

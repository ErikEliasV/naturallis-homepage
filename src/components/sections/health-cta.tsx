import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/features/motion/components/parallax";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** Full-bleed photo call to action that opens the site footer (Figma "Frame 62"). */
export function HealthCta() {
  return (
    <section
      data-header-theme="dark"
      className="relative isolate flex min-h-cta-height flex-col justify-end overflow-hidden pt-header-space pb-cta-bottom text-white"
    >
      <Parallax speed={0.08} className="absolute inset-0 -z-10" innerClassName="absolute inset-0">
        <div className="absolute top-[-37.7%] left-[-1.76%] h-[148.48%] w-[130.67%]">
          <Image
            src="/images/cta-saude.png"
            alt="Mulher com toalha nos cabelos olhando as montanhas da varanda"
            fill
            sizes="131vw"
            className="object-cover"
          />
        </div>
      </Parallax>

      <Container className="flex flex-col items-start gap-section-sm lg:flex-row lg:items-end lg:justify-between">
        <RevealText as="h2" className="max-w-[5.7em] font-display text-display-2xl">
          Sua saúde em primeiro lugar!
        </RevealText>
        <Reveal stagger className="flex flex-col items-start gap-4 lg:items-end">
          <div>
            <Button href="/contato">Agende gratuitamente</Button>
          </div>
          <div>
            <Button href="/produtos" variant="light">
              Encontre o produto ideal
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

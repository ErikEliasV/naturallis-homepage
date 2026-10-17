import Image from "next/image";

import { Container } from "@/components/layout/container";
import { CARE_PILLARS } from "@/constants/home";
import { Carousel } from "@/features/carousel/components/carousel";
import { CarouselArrows } from "@/features/carousel/components/carousel-arrows";
import { CarouselTrack } from "@/features/carousel/components/carousel-track";
import { HoverLift } from "@/features/cursor/components/hover-lift";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";

/** "Cuidado pensado para você" (Figma "Frame 40"): five care pillars as photo cards. */
export function HomeCare() {
  return (
    <section aria-labelledby="home-care-title" className="pb-section">
      <Container>
        <Carousel label="Nossos pilares de cuidado">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex max-w-intro flex-col gap-3.5">
              <RevealText as="h2" id="home-care-title" className="font-display text-display-md">
                Cuidado pensado para você
              </RevealText>
              <RevealText as="p" delay={0.1} className="text-body-lg text-slate">
                Cada rotina é diferente. Por isso, valorizamos a qualidade dos ingredientes, a
                atenção em cada etapa e a orientação adequada para que você faça escolhas mais
                conscientes para sua saúde.
              </RevealText>
            </div>
            <CarouselArrows />
          </div>

          <Reveal className="mt-card-gap">
            <CarouselTrack className="-mr-gutter gap-4 pr-gutter" slideClassName="w-feature-card">
              {CARE_PILLARS.map((pillar) => (
                <article
                  key={pillar.title}
                  data-hover-root
                  className="relative isolate flex aspect-[383/606] flex-col justify-end overflow-hidden rounded-feature p-feature-pad text-white"
                >
                  <HoverLift y={0} scale={1.06} className="absolute inset-0 -z-10">
                    <Image
                      src="/images/cuidado-farmaceutica.png"
                      alt=""
                      fill
                      sizes="(min-width: 64rem) 20vw, 70vw"
                      className="object-cover"
                    />
                  </HoverLift>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 -z-10 h-[33.7%] bg-linear-to-b from-forest/0 to-forest backdrop-blur-glass"
                  />
                  <h3 className="text-title font-medium">{pillar.title}</h3>
                  <p className="mt-2.5 text-body-lg">{pillar.description}</p>
                </article>
              ))}
            </CarouselTrack>
          </Reveal>
        </Carousel>
      </Container>
    </section>
  );
}

"use client";

import { useId, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { DURATION, EASE, MEDIA_QUERY, STAGGER } from "@/constants/motion";
import { BESTSELLERS, NEW_ARRIVALS } from "@/constants/products";
import { Carousel } from "@/features/carousel/components/carousel";
import { CarouselArrows } from "@/features/carousel/components/carousel-arrows";
import { CarouselProgress } from "@/features/carousel/components/carousel-progress";
import { CarouselTrack } from "@/features/carousel/components/carousel-track";
import { ProductCard } from "@/features/catalog/components/product-card";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { gsap, useGSAP } from "@/lib/gsap";

const TABS = [
  { id: "bestsellers", label: "Mais Vendidos", products: BESTSELLERS },
  { id: "new", label: "Novidades", products: NEW_ARRIVALS },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** "Produtos que acompanham sua rotina": tabbed product carousel (Figma "Frame 20"). */
export function HomeProducts() {
  const [activeId, setActiveId] = useState<TabId>("bestsellers");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const baseId = useId();
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const panel = panelRef.current;
      const track = panel?.querySelector<HTMLElement>("[aria-roledescription='carrossel'] > div");
      if (!panel || !track) return;
      track.scrollLeft = 0;
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        gsap.from(track.children, {
          autoAlpha: 0,
          y: 30,
          duration: DURATION.enterShort,
          ease: EASE.out,
          stagger: STAGGER.items * 0.6,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [activeId], scope: panelRef },
  );

  return (
    <section aria-labelledby={`${baseId}-title`} className="py-section-sm">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <RevealText as="h2" id={`${baseId}-title`} className="font-display text-display-md">
            Produtos que acompanham sua rotina
          </RevealText>
          <div role="tablist" aria-label="Filtrar produtos" className="flex items-center gap-2">
            {TABS.map((tab) => {
              const selected = tab.id === activeId;
              return (
                <Button
                  key={tab.id}
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  variant={selected ? "mist" : "ghost"}
                  size="sm"
                  onClick={() => setActiveId(tab.id)}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-section-sm">
          <div
            ref={panelRef}
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${active.id}`}
          >
            <Carousel label={active.label}>
              <CarouselTrack className="-mr-gutter gap-4 pr-gutter" slideClassName="w-product-card">
                {active.products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </CarouselTrack>
              <div className="mt-section-sm flex items-center justify-between gap-6">
                <CarouselProgress />
                <CarouselArrows />
              </div>
            </Carousel>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

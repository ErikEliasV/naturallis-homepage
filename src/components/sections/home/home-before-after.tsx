"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { TRANSFORMATION_HIGHLIGHTS } from "@/constants/home";
import { PRODUCTS, productHref } from "@/constants/products";
import { BeforeAfterSlider } from "@/features/before-after/components/before-after-slider";
import { ProductBottle } from "@/features/catalog/components/product-bottle";
import { type Product } from "@/features/catalog/types";
import { Magnetic } from "@/features/cursor/components/magnetic";
import { RollLabel } from "@/features/cursor/components/roll-label";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { cn } from "@/utils/cn";

type Highlight = { product: Product; benefits: readonly [string, string] };

const HIGHLIGHTS: readonly Highlight[] = TRANSFORMATION_HIGHLIGHTS.flatMap((highlight) => {
  const product = PRODUCTS.find((item) => item.slug === highlight.productSlug);
  return product ? [{ product, benefits: highlight.benefits }] : [];
});

/** "Antes e depois" comparison with a product selector (Figma "ComparisonGallery"). */
export function HomeBeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = HIGHLIGHTS[activeIndex];
  if (!active) return null;

  return (
    <section aria-labelledby="home-before-after-title" className="py-section">
      <Container className="grid items-center gap-y-12 lg:grid-cols-[1014fr_462fr] lg:gap-x-[4%] lg:px-[10.7%]">
        <Reveal y={60}>
          <BeforeAfterSlider
            before={{
              src: "/images/antes.jpg",
              alt: "Pele antes do tratamento",
              label: "Antes",
            }}
            after={{
              src: "/images/depois.jpg",
              alt: "Pele após três meses de uso",
              label: "3 meses",
            }}
          />
        </Reveal>

        <div className="flex flex-col">
          <Reveal as="p" className="pb-5 text-body font-medium tracking-eyebrow uppercase">
            Antes e depois
          </Reveal>
          <RevealText
            as="h2"
            id="home-before-after-title"
            className="pb-6 font-display text-display-sm"
          >
            Transformação que você percebe
          </RevealText>

          <Reveal
            as="ul"
            stagger
            aria-label="Escolha um produto"
            className="flex gap-6 border-b border-black/10 pb-5"
          >
            {HIGHLIGHTS.map(({ product }, index) => (
              <li key={product.slug}>
                <button
                  type="button"
                  aria-pressed={index === activeIndex}
                  aria-label={product.name}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex size-17 items-center justify-center overflow-hidden rounded-pill border p-0.75 transition-colors duration-300 ease-power3-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
                    index === activeIndex
                      ? "border-black"
                      : "border-black/10 hover:border-black/40",
                  )}
                >
                  <span className="flex size-full items-center justify-center rounded-pill bg-surface">
                    <ProductBottle product={product} sizes="4rem" className="w-[38%]" />
                  </span>
                </button>
              </li>
            ))}
          </Reveal>

          <div aria-live="polite" className="pt-5">
            <h3 className="font-display text-heading-2xl">{active.product.name}</h3>
            <ul className="flex flex-col gap-3 pt-5">
              {active.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-body">
                  <span className="flex size-6.5 shrink-0 items-center justify-center rounded-pill bg-mist">
                    <Image src="/icons/check.svg" alt="" width={10} height={7} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <Magnetic className="mt-8">
              <Link
                href={productHref(active.product)}
                className="inline-flex h-control-shop items-center gap-3 rounded-pill bg-ink pr-3 pl-6 text-body font-medium text-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <RollLabel>Comprar agora</RollLabel>
                <span className="flex size-7.5 items-center justify-center">
                  <Image src="/icons/arrow-right-lime.svg" alt="" width={5} height={9} />
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}

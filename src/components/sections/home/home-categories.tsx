"use client";

import Image from "next/image";
import { useDeferredValue, useId, useMemo, useRef, useState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CATEGORIES, type CategorySlug } from "@/constants/categories";
import { HOME_CATEGORY_FILTERS } from "@/constants/home";
import { DURATION, EASE, MEDIA_QUERY, STAGGER } from "@/constants/motion";
import { FORMULA_CTA } from "@/constants/navigation";
import { PRODUCTS } from "@/constants/products";
import { Carousel } from "@/features/carousel/components/carousel";
import { CarouselArrows, CarouselProgress } from "@/features/carousel/components/carousel-controls";
import { CarouselTrack } from "@/features/carousel/components/carousel-track";
import { ProductCard } from "@/features/catalog/components/product-card";
import { type Product } from "@/features/catalog/types";
import { Reveal } from "@/features/motion/components/reveal";
import { RevealText } from "@/features/motion/components/reveal-text";
import { gsap, useGSAP } from "@/lib/gsap";

const CATEGORY_NAMES = new Map(CATEGORIES.map((category) => [category.slug, category.name]));

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function pairs(products: readonly Product[]): Product[][] {
  const columns: Product[][] = [];
  for (let index = 0; index < products.length; index += 2) {
    columns.push(products.slice(index, index + 2));
  }
  return columns;
}

/** "Encontre o que faz sentido para sua rotina" (Figma "Frame 59" on "Rectangle 13"). */
export function HomeCategories() {
  const [category, setCategory] = useState<CategorySlug | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const resultsRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const searchId = useId();

  const products = useMemo(() => {
    const term = normalize(deferredQuery.trim());
    return PRODUCTS.filter(
      (product) =>
        (!category || product.category === category) &&
        (!term || normalize(`${product.name} ${product.kind}`).includes(term)),
    );
  }, [category, deferredQuery]);

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const track = resultsRef.current?.querySelector<HTMLElement>(
        "[aria-roledescription='carrossel'] > div",
      );
      if (!track) return;
      track.scrollLeft = 0;
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        gsap.from(track.children, {
          autoAlpha: 0,
          y: 24,
          duration: DURATION.enterShort,
          ease: EASE.out,
          stagger: STAGGER.items * 0.6,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [category, deferredQuery], scope: resultsRef },
  );

  return (
    <section
      data-header-theme="dark"
      aria-labelledby="home-categories-title"
      className="relative isolate py-panel-y text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10 rounded-panel bg-forest" />
      <Container>
        <div className="flex flex-col gap-panel-gap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex max-w-[30.9em] flex-col gap-3 text-label">
              <RevealText
                as="h2"
                id="home-categories-title"
                className="font-display text-display-md text-white"
              >
                Encontre o que faz sentido para sua rotina
              </RevealText>
              <RevealText as="p" delay={0.1} className="text-fog">
                Conheça nossas categorias e descubra produtos de acordo com seus interesses e
                necessidades de cuidado.
              </RevealText>
            </div>

            <Reveal stagger className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
              <form
                role="search"
                onSubmit={(event) => event.preventDefault()}
                className="flex h-control-lg w-full items-center gap-6 rounded-pill bg-white px-pad-lg text-button-lg font-medium text-black focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime sm:w-auto"
              >
                <label htmlFor={searchId} className="sr-only">
                  Buscar produtos
                </label>
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Procure o que melhor te atende"
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-black sm:w-[14.6em] sm:flex-none"
                />
                <Image
                  src="/icons/search.svg"
                  alt=""
                  width={45}
                  height={46}
                  className="size-[1.55em]"
                />
              </form>
              <div>
                <Button href={FORMULA_CTA.href} variant="light" className="border border-white">
                  Manipule sua fórmula
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal
            as="ul"
            stagger
            aria-label="Filtrar por categoria"
            className="-mx-gutter flex [scrollbar-width:none] gap-5 overflow-x-auto px-gutter py-2 drop-shadow-chip lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {HOME_CATEGORY_FILTERS.map((filter) => {
              const pressed = category === filter.slug;
              return (
                <li key={filter.slug} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setCategory(pressed ? null : filter.slug)}
                    className="flex h-chip items-center gap-chip-gap rounded-pill bg-pearl p-chip-inset pr-[1.2em] text-chip whitespace-nowrap text-ink transition-colors duration-300 ease-power3-out hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime aria-pressed:bg-lime"
                  >
                    <span className="flex size-chip-icon items-center justify-center rounded-pill bg-white">
                      <Image src={filter.icon} alt="" width={32} height={31} className="w-1/2" />
                    </span>
                    {CATEGORY_NAMES.get(filter.slug)}
                  </button>
                </li>
              );
            })}
          </Reveal>
        </div>

        <div ref={resultsRef} aria-live="polite" className="mt-stack">
          {products.length > 0 ? (
            <Carousel label="Produtos encontrados">
              <CarouselTrack className="-mr-gutter gap-4 pr-gutter" slideClassName="w-product-card">
                {pairs(products).map((column) => (
                  <div key={column[0]?.slug} className="flex flex-col gap-5.5">
                    {column.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                ))}
              </CarouselTrack>
              <div className="mt-section-sm flex items-center justify-between gap-6">
                <CarouselProgress />
                <CarouselArrows />
              </div>
            </Carousel>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-feature bg-white/5 p-feature-pad">
              <p className="text-lead">Nenhum produto encontrado para essa busca.</p>
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory(null);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

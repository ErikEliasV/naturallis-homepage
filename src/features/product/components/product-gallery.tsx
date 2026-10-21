"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ArrowButton } from "@/components/ui/arrow-button";
import { LayeredIcon } from "@/components/ui/layered-icon";
import { ICON_ZOOM } from "@/constants/icons";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { type Product } from "@/features/catalog/types";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

import { type GalleryImage } from "../types";
import { GallerySlide } from "./gallery-slide";

type ProductGalleryProps = {
  product: Product;
  images: readonly GalleryImage[];
};

/** Thumbnails + stacked images (Figma "CarouselSlider"), with a lightbox. */
export function ProductGallery({ product, images }: ProductGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.desktop, () => {
        gsap.utils.toArray<HTMLElement>("[data-gallery-slide]").forEach((slide, index) => {
          ScrollTrigger.create({
            trigger: slide,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const goTo = useCallback(
    (index: number) => {
      const slide = rootRef.current?.querySelectorAll<HTMLElement>("[data-gallery-slide]")[index];
      if (!slide) return;
      setActive(index);
      if (lenis) lenis.scrollTo(slide, { offset: -120 });
      else slide.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );

  useEffect(() => {
    if (zoomed === null) return;
    lenis?.stop();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomed(null);
      if (event.key === "ArrowRight") setZoomed((index) => ((index ?? 0) + 1) % images.length);
      if (event.key === "ArrowLeft")
        setZoomed((index) => ((index ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [zoomed, lenis, images.length]);

  useGSAP(
    () => {
      const lightbox = lightboxRef.current;
      if (!lightbox || zoomed === null) return;
      const reduced = window.matchMedia(MEDIA_QUERY.reducedMotion).matches;
      gsap.fromTo(
        lightbox,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduced ? 0 : DURATION.interactionLong, ease: EASE.out },
      );
      gsap.fromTo(
        "[data-lightbox-frame]",
        { scale: reduced ? 1 : 0.96 },
        { scale: 1, duration: reduced ? 0 : DURATION.enterShort, ease: EASE.expo },
      );
      lightbox.querySelector<HTMLButtonElement>("[data-lightbox-close]")?.focus();
    },
    { dependencies: [zoomed === null], scope: lightboxRef },
  );

  const zoomedImage = zoomed === null ? undefined : images[zoomed];

  return (
    <div ref={rootRef} className="lg:grid lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-2.5">
      <ul
        aria-label="Miniaturas"
        className="hidden flex-col gap-3 self-start lg:sticky lg:top-[calc(var(--spacing-header-space)-2.5rem)] lg:flex"
      >
        {images.map((image, index) => (
          <li key={index}>
            <button
              type="button"
              aria-label={`Ver imagem ${index + 1} de ${images.length}`}
              aria-current={active === index}
              onClick={() => goTo(index)}
              className={cn(
                "relative block size-29.5 overflow-hidden rounded-sm border p-1.5 transition-colors duration-300 ease-power3-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
                active === index ? "border-black" : "border-transparent hover:border-black/20",
              )}
            >
              <span className="relative block size-full overflow-hidden rounded-xs">
                <GallerySlide
                  image={image}
                  product={product}
                  sizes="7.5rem"
                  bottleWidth="w-[26%]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ul
        aria-label={`Imagens de ${product.name}`}
        className="-mx-gutter flex snap-x snap-mandatory [scrollbar-width:none] gap-2.5 overflow-x-auto px-gutter lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <li
            key={index}
            data-gallery-slide
            className="relative aspect-square w-[85%] shrink-0 snap-start overflow-hidden rounded-tile lg:w-full"
          >
            <button
              type="button"
              data-cursor-label="Ampliar"
              aria-label={`Ampliar imagem ${index + 1}`}
              onClick={() => setZoomed(index)}
              className="relative block size-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-forest"
            >
              <GallerySlide
                image={image}
                product={product}
                sizes="(min-width: 64rem) 45vw, 85vw"
                bottleWidth="w-[24%]"
              />
            </button>
            {index === 0 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-5 right-5 flex size-11 items-center justify-center rounded-pill border border-white bg-white"
              >
                <LayeredIcon layers={ICON_ZOOM} className="size-4.5" />
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      {zoomedImage ? (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ${(zoomed ?? 0) + 1} de ${images.length}`}
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/85 p-gutter"
          onClick={(event) => {
            if (event.target === event.currentTarget) setZoomed(null);
          }}
        >
          <div
            data-lightbox-frame
            className="relative aspect-square w-[min(90vw,85dvh)] overflow-hidden rounded-tile"
          >
            <GallerySlide
              image={zoomedImage}
              product={product}
              sizes="90vw"
              bottleWidth="w-[26%]"
            />
          </div>
          <button
            type="button"
            data-lightbox-close
            onClick={() => setZoomed(null)}
            className="absolute top-6 right-6 rounded-pill bg-white px-5 py-2.5 text-body font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Fechar
          </button>
          <div className="absolute inset-x-6 bottom-6 flex justify-between">
            <ArrowButton
              direction="prev"
              label="Imagem anterior"
              onClick={() => setZoomed(((zoomed ?? 0) - 1 + images.length) % images.length)}
            />
            <ArrowButton
              direction="next"
              label="Próxima imagem"
              onClick={() => setZoomed(((zoomed ?? 0) + 1) % images.length)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

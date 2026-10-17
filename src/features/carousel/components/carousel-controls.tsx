"use client";

import { ArrowButton } from "@/components/ui/arrow-button";
import { cn } from "@/utils/cn";

import { useCarousel } from "./carousel";

export function CarouselArrows({ className }: { className?: string }) {
  const { label, canPrev, canNext, step } = useCarousel();
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ArrowButton
        direction="prev"
        label={`${label}: anterior`}
        disabled={!canPrev}
        onClick={() => step(-1)}
      />
      <ArrowButton
        direction="next"
        label={`${label}: próximo`}
        disabled={!canNext}
        onClick={() => step(1)}
      />
    </div>
  );
}

/** Scroll position indicator (Figma: 343 × 5 track with a dark thumb). */
export function CarouselProgress({ className }: { className?: string }) {
  const { thumbRef } = useCarousel();
  return (
    <div
      aria-hidden
      className={cn("relative h-[5px] w-carousel-progress rounded-pill bg-line", className)}
    >
      <div ref={thumbRef} className="absolute inset-y-0 left-0 w-1/2 rounded-pill bg-ink" />
    </div>
  );
}

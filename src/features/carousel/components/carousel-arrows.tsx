"use client";

import { ArrowButton } from "@/components/ui/arrow-button";
import { cn } from "@/utils/cn";

import { useCarousel } from "../hooks/use-carousel";

/** Previous / next buttons bound to the nearest carousel. */
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

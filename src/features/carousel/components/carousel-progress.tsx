"use client";

import { cn } from "@/utils/cn";

import { useCarousel } from "../hooks/use-carousel";

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

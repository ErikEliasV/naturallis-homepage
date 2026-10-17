"use client";

import { createContext, type RefObject, useContext } from "react";

export type CarouselContextValue = {
  label: string;
  trackRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
  canPrev: boolean;
  canNext: boolean;
  setEdges: (canPrev: boolean, canNext: boolean) => void;
  scrollToIndex: (index: number) => void;
  step: (direction: 1 | -1) => void;
};

export const CarouselContext = createContext<CarouselContextValue | null>(null);

/** Shared state of the nearest <Carousel>. */
export function useCarousel(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used inside <Carousel>");
  return context;
}

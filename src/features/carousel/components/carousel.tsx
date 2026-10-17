"use client";

import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";

import { CarouselContext } from "../hooks/use-carousel";
import { slideOffsets, tweenScroll } from "../utils/scroll";

type CarouselProps = {
  /** Accessible name of the carousel region. */
  label: string;
  className?: string;
  children: ReactNode;
};

/** Headless carousel state shared by the track, arrows and progress bar. */
export function Carousel({ label, className, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [edges, setEdgesState] = useState({ canPrev: false, canNext: true });

  const setEdges = useCallback((canPrev: boolean, canNext: boolean) => {
    setEdgesState((current) =>
      current.canPrev === canPrev && current.canNext === canNext ? current : { canPrev, canNext },
    );
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const offsets = slideOffsets(track);
    tweenScroll(track, offsets[Math.max(0, Math.min(index, offsets.length - 1))] ?? 0);
  }, []);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const offsets = slideOffsets(track);
    const current = track.scrollLeft;
    const target =
      direction === 1
        ? offsets.find((offset) => offset > current + 4)
        : [...offsets].reverse().find((offset) => offset < current - 4);
    tweenScroll(track, target ?? (direction === 1 ? track.scrollWidth : 0));
  }, []);

  const value = useMemo(
    () => ({ label, trackRef, thumbRef, ...edges, setEdges, scrollToIndex, step }),
    [label, edges, setEdges, scrollToIndex, step],
  );

  return (
    <CarouselContext.Provider value={value}>
      <div role="region" aria-roledescription="carrossel" aria-label={label} className={className}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

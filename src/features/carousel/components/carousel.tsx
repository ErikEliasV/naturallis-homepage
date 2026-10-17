"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { DURATION, EASE } from "@/constants/motion";
import { gsap } from "@/lib/gsap";

type CarouselContextValue = {
  label: string;
  trackRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
  canPrev: boolean;
  canNext: boolean;
  setEdges: (canPrev: boolean, canNext: boolean) => void;
  scrollToIndex: (index: number) => void;
  step: (direction: 1 | -1) => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used inside <Carousel>");
  return context;
}

/** Offsets of each slide relative to the start of the track. */
export function slideOffsets(track: HTMLElement): number[] {
  const first = track.firstElementChild;
  if (!(first instanceof HTMLElement)) return [];
  return Array.from(track.children).map((child) =>
    child instanceof HTMLElement ? child.offsetLeft - first.offsetLeft : 0,
  );
}

/** Tweens the track to `left` with snapping paused so the tween is not fought by CSS snap. */
export function tweenScroll(track: HTMLElement, left: number) {
  const max = track.scrollWidth - track.clientWidth;
  track.style.scrollSnapType = "none";
  gsap.to(track, {
    scrollLeft: Math.max(0, Math.min(left, max)),
    duration: DURATION.enterShort,
    ease: EASE.out,
    overwrite: true,
    onComplete: () => {
      track.style.scrollSnapType = "";
    },
  });
}

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

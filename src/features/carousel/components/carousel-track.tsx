"use client";

import { Children, type ReactNode, useEffect } from "react";

import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

import { slideOffsets, tweenScroll, useCarousel } from "./carousel";

/** Pixels the pointer must travel before a press becomes a drag (and clicks are cancelled). */
const DRAG_THRESHOLD = 6;
/** How far (ms of velocity) a fling carries before snapping. */
const FLING_MS = 180;

type CarouselTrackProps = {
  className?: string;
  /** Classes for each slide wrapper (width, snap alignment). */
  slideClassName?: string;
  children: ReactNode;
};

/**
 * Scrollable row of slides. Native scroll + CSS snap on touch;
 * mouse drag with fling and GSAP snapping on desktop.
 */
export function CarouselTrack({ className, slideClassName, children }: CarouselTrackProps) {
  const { trackRef, thumbRef, setEdges } = useCarousel();
  const slides = Children.toArray(children);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const progress = max > 0 ? track.scrollLeft / max : 0;
      const visible = track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1;
      const thumb = thumbRef.current;
      if (thumb) {
        const ratio = Math.min(1, Math.max(visible, 0.15));
        gsap.set(thumb, { width: `${ratio * 100}%`, xPercent: progress * (1 / ratio - 1) * 100 });
      }
      setEdges(track.scrollLeft > 2, track.scrollLeft < max - 2);
    };

    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let dragging = false;
    let moved = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      gsap.killTweensOf(track);
      dragging = true;
      moved = false;
      startX = lastX = event.clientX;
      startScroll = track.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      if (!moved && Math.abs(dx) < DRAG_THRESHOLD) return;
      if (!moved) {
        moved = true;
        track.setPointerCapture(event.pointerId);
        track.style.scrollSnapType = "none";
      }
      const now = performance.now();
      velocity = (event.clientX - lastX) / Math.max(now - lastTime, 1);
      lastX = event.clientX;
      lastTime = now;
      track.scrollLeft = startScroll - dx;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      const projected = track.scrollLeft - velocity * FLING_MS;
      const offsets = slideOffsets(track);
      const nearest = offsets.reduce(
        (best, offset) =>
          Math.abs(offset - projected) < Math.abs(best - projected) ? offset : best,
        offsets[0] ?? 0,
      );
      tweenScroll(track, nearest);
    };

    // A drag must not trigger the link/button it started on.
    const onClickCapture = (event: MouseEvent) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    };

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("click", onClickCapture, { capture: true });

    return () => {
      resizeObserver.disconnect();
      gsap.killTweensOf(track);
      track.removeEventListener("scroll", update);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("click", onClickCapture, { capture: true });
    };
  }, [trackRef, thumbRef, setEdges]);

  return (
    <div
      ref={trackRef}
      tabIndex={0}
      className={cn(
        "flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} de ${slides.length}`}
          className={cn("shrink-0 snap-start", slideClassName)}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

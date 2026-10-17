import { DURATION, EASE } from "@/constants/motion";
import { gsap } from "@/lib/gsap";

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

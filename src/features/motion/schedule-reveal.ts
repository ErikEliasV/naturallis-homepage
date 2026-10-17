import { REVEAL_START } from "@/constants/motion";
import { whenPageReady } from "@/features/transitions/page-ready";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { type RevealTrigger } from "./types";

/**
 * Calls `play` once the page is uncovered (preloader or route transition) and, for
 * `scroll`, once the element enters the viewport. Returns a cleanup function.
 */
export function scheduleReveal(
  element: Element,
  trigger: RevealTrigger,
  delay: number,
  play: () => void,
): () => void {
  let cancelReady = () => {};
  let delayed: gsap.core.Tween | undefined;

  const start = () => {
    cancelReady = whenPageReady(() => {
      delayed = gsap.delayedCall(delay, play);
    });
  };

  const scrollTrigger =
    trigger === "scroll"
      ? ScrollTrigger.create({ trigger: element, start: REVEAL_START, once: true, onEnter: start })
      : undefined;
  if (!scrollTrigger) start();

  return () => {
    cancelReady();
    delayed?.kill();
    scrollTrigger?.kill();
  };
}

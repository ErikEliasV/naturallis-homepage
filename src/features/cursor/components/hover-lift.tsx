"use client";

import { type ReactNode, useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";

type HoverLiftProps = {
  /** Vertical offset (px) while hovered. */
  y?: number;
  scale?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Lifts its content while the closest `[data-hover-root]` ancestor (or itself) is hovered.
 * Desktop pointers only.
 */
export function HoverLift({ y = -10, scale = 1.04, className, children }: HoverLiftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const root = element.closest("[data-hover-root]") ?? element;

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.pointerMotion, () => {
        const vars = { duration: DURATION.interactionLong, ease: EASE.out, overwrite: true };
        const enter = () => gsap.to(element, { y, scale, ...vars });
        const leave = () => gsap.to(element, { y: 0, scale: 1, ...vars });
        root.addEventListener("pointerenter", enter);
        root.addEventListener("pointerleave", leave);
        return () => {
          root.removeEventListener("pointerenter", enter);
          root.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [y, scale] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

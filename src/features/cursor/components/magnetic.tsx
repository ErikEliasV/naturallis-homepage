"use client";

import { type ReactNode, useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type MagneticProps = {
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Pulls its child toward the pointer and rolls any `[data-roll]` labels on hover.
 * Desktop pointers only; inert with reduced motion.
 */
export function Magnetic({ strength = 0.3, className, children }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.pointerMotion, () => {
        const vars = { duration: DURATION.interactionLong, ease: EASE.out };
        const moveX = gsap.quickTo(element, "x", vars);
        const moveY = gsap.quickTo(element, "y", vars);
        const rolls = element.querySelectorAll("[data-roll]");

        const onMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
          moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const onEnter = () => {
          gsap.to(rolls, { yPercent: -100, ...vars, overwrite: true });
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
          gsap.to(rolls, { yPercent: 0, ...vars, overwrite: true });
        };

        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerenter", onEnter);
        element.addEventListener("pointerleave", onLeave);
        return () => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerenter", onEnter);
          element.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}

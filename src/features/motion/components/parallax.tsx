"use client";

import { type ReactNode, useRef } from "react";

import { EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

type ParallaxProps = {
  /** Fraction of the element height travelled while it crosses the viewport. */
  speed?: number;
  className?: string;
  /** Classes for the moving layer. For images, oversize it (e.g. `h-[120%]`) to hide the edges. */
  innerClassName?: string;
  children: ReactNode;
};

/**
 * Scroll-linked vertical parallax. The outer box clips; the inner layer moves.
 * Positioning of the outer box (relative/absolute) is left to the caller.
 */
export function Parallax({ speed = 0.1, className, innerClassName, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !innerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        gsap.fromTo(
          innerRef.current,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: EASE.scrub,
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className={cn("will-change-transform", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

"use client";

import { type ReactNode, useCallback, useRef } from "react";

import {
  DURATION,
  EASE,
  ENTER_OFFSET_Y,
  MEDIA_QUERY,
  REVEAL_START,
  STAGGER,
} from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";

import { type RevealTag } from "../types";

type RevealProps = {
  as?: RevealTag;
  /** When true, direct children enter one after another instead of as a block. */
  stagger?: boolean;
  trigger?: "scroll" | "mount";
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
};

/** Fade + vertical slide entrance, optionally staggered across direct children. */
export function Reveal({
  as = "div",
  stagger = false,
  trigger = "scroll",
  delay = 0,
  y = ENTER_OFFSET_Y,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        gsap.from(stagger ? element.children : element, {
          autoAlpha: 0,
          y,
          duration: DURATION.enter,
          ease: EASE.out,
          stagger: stagger ? STAGGER.items : 0,
          delay,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: element, start: REVEAL_START, once: true }
              : undefined,
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger, trigger, delay, y] },
  );

  const Tag = as;
  return (
    <Tag ref={setRef} className={className}>
      {children}
    </Tag>
  );
}

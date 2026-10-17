"use client";

import { type ReactNode, useCallback, useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY, REVEAL_START, STAGGER } from "@/constants/motion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

import { type RevealTag } from "../types";

type RevealTextProps = {
  as?: RevealTag;
  /** Unit that slides up from behind its line mask. */
  split?: "lines" | "words" | "chars";
  /** `scroll` waits for the element to enter the viewport; `mount` plays right away. */
  trigger?: "scroll" | "mount";
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Masked text reveal (lines, words or chars) built on SplitText. */
export function RevealText({
  as = "div",
  split = "lines",
  trigger = "scroll",
  delay = 0,
  className,
  children,
}: RevealTextProps) {
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
        SplitText.create(element, {
          type: split === "lines" ? "lines" : `lines,${split}`,
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self[split], {
              yPercent: 110,
              duration: DURATION.enterLong,
              ease: EASE.expo,
              stagger: STAGGER[split],
              delay,
              scrollTrigger:
                trigger === "scroll"
                  ? { trigger: element, start: REVEAL_START, once: true }
                  : undefined,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [split, trigger, delay] },
  );

  const Tag = as;
  return (
    <Tag ref={setRef} className={className}>
      {children}
    </Tag>
  );
}

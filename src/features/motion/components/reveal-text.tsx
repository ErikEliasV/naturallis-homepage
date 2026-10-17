"use client";

import { type ReactNode, useCallback, useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY, STAGGER } from "@/constants/motion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

import { scheduleReveal } from "../schedule-reveal";
import { type RevealTag, type RevealTrigger } from "../types";

type RevealTextProps = {
  as?: RevealTag;
  id?: string;
  /** Unit that slides up from behind its line mask. */
  split?: "lines" | "words" | "chars";
  trigger?: RevealTrigger;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** Masked text reveal (lines, words or chars) built on SplitText. */
export function RevealText({
  as = "div",
  id,
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
        let played = false;
        let tween: gsap.core.Tween | undefined;

        SplitText.create(element, {
          type: split === "lines" ? "lines" : `lines,${split}`,
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            tween = gsap.from(self[split], {
              yPercent: 110,
              duration: DURATION.enterLong,
              ease: EASE.expo,
              stagger: STAGGER[split],
              paused: !played,
            });
            return tween;
          },
        });

        return scheduleReveal(element, trigger, delay, () => {
          played = true;
          tween?.play();
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [split, trigger, delay] },
  );

  const Tag = as;
  return (
    <Tag ref={setRef} id={id} className={className}>
      {children}
    </Tag>
  );
}

"use client";

import { useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, useGSAP } from "@/lib/gsap";

import { scheduleReveal } from "../schedule-reveal";
import { type RevealTrigger } from "../types";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  trigger?: RevealTrigger;
  delay?: number;
  className?: string;
};

function format(value: number, decimals: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Number that counts up from zero when revealed. Server output is the final value. */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  trigger = "scroll",
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        const counter = { value: 0 };
        const write = () => {
          element.textContent = `${prefix}${format(counter.value, decimals)}${suffix}`;
        };
        write();
        const tween = gsap.to(counter, {
          value,
          duration: DURATION.enterLong,
          ease: EASE.expo,
          paused: true,
          onUpdate: write,
        });
        const cancel = scheduleReveal(element, trigger, delay, () => tween.play());
        return () => {
          cancel();
          counter.value = value;
          write();
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [value, decimals, prefix, suffix, trigger, delay] },
  );

  return (
    <span ref={ref} className={className}>
      {`${prefix}${format(value, decimals)}${suffix}`}
    </span>
  );
}

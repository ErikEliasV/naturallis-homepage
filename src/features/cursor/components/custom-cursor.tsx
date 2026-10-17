"use client";

import { useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, useGSAP } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";
const TEXT_FIELD = "input:not([type='checkbox']):not([type='radio']), textarea, select";
/** Hides the native cursor on every element while the custom one is active. */
const HIDE_NATIVE_CURSOR = "**:cursor-none";

type CursorState = "default" | "hover" | "label" | "text";

const RING_STATE: Record<CursorState, gsap.TweenVars> = {
  default: { scale: 1, backgroundColor: "rgb(255 255 255 / 0)", borderRadius: "50%" },
  hover: { scale: 1.6, backgroundColor: "rgb(255 255 255 / 0)", borderRadius: "50%" },
  label: { scale: 2.6, backgroundColor: "rgb(255 255 255 / 1)", borderRadius: "50%" },
  text: { scale: 0.6, backgroundColor: "rgb(255 255 255 / 1)", borderRadius: "2px" },
};

/** Dot + ring cursor for desktop pointers. Elements can set `data-cursor-label` for a text badge. */
export function CustomCursor() {
  const enabled = useMediaQuery(MEDIA_QUERY.pointerMotion);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!enabled || !root) return;

      const ring = root.querySelector<HTMLElement>("[data-cursor-ring]");
      const dot = root.querySelector<HTMLElement>("[data-cursor-dot]");
      const label = root.querySelector<HTMLElement>("[data-cursor-label-text]");
      if (!ring || !dot || !label) return;

      const html = document.documentElement;
      html.classList.add(HIDE_NATIVE_CURSOR);

      const fast = { duration: DURATION.interactionShort, ease: EASE.out };
      const slow = { duration: DURATION.interactionLong, ease: EASE.out };
      const dotX = gsap.quickTo(dot, "x", fast);
      const dotY = gsap.quickTo(dot, "y", fast);
      const ringX = gsap.quickTo([ring, label], "x", slow);
      const ringY = gsap.quickTo([ring, label], "y", slow);

      let state: CursorState = "default";
      let visible = false;

      const setState = (next: CursorState, text = "") => {
        if (next === state && label.textContent === text) return;
        state = next;
        label.textContent = text;
        gsap.to(ring, { ...RING_STATE[next], ...slow, overwrite: "auto" });
        gsap.to(dot, { autoAlpha: next === "default" ? 1 : 0, ...fast, overwrite: "auto" });
        gsap.to(label, { autoAlpha: next === "label" ? 1 : 0, ...fast, overwrite: "auto" });
      };

      const onMove = (event: PointerEvent) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        if (!visible) {
          visible = true;
          gsap.to(root, { autoAlpha: 1, ...fast });
        }
      };

      const onOver = (event: PointerEvent) => {
        if (!(event.target instanceof Element)) return;
        const labelled = event.target.closest<HTMLElement>("[data-cursor-label]");
        if (labelled) return setState("label", labelled.dataset.cursorLabel ?? "");
        if (event.target.closest(TEXT_FIELD)) return setState("text");
        if (event.target.closest(INTERACTIVE)) return setState("hover");
        setState("default");
      };

      const onLeave = () => {
        visible = false;
        gsap.to(root, { autoAlpha: 0, ...fast });
      };

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      html.addEventListener("pointerleave", onLeave);

      return () => {
        html.classList.remove(HIDE_NATIVE_CURSOR);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        html.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled], scope: rootRef },
  );

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none invisible fixed inset-0 z-110 mix-blend-difference"
    >
      <div
        data-cursor-ring
        className="absolute -top-5 -left-5 size-10 rounded-pill border border-white"
      />
      <div data-cursor-dot className="absolute -top-1 -left-1 size-2 rounded-pill bg-white" />
      <span
        data-cursor-label-text
        className="invisible absolute top-0 left-0 -translate-1/2 text-badge font-medium whitespace-nowrap text-black"
      />
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

import { type Ingredient } from "@/constants/ingredients";
import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

import { IngredientCard } from "./ingredient-card";

/** Seconds each position is held before advancing. */
const HOLD = 2.8;
/** Opacity of cards outside the central (1440px) window, as in the Figma slider. */
const DIMMED = 0.4;

type IngredientSliderProps = {
  ingredients: readonly Ingredient[];
  className?: string;
};

/**
 * Endless row of ingredient cards that advances one card at a time.
 * Cards outside the centered content window are dimmed. Pauses on hover, focus,
 * when off screen or via the pause button; static with reduced motion.
 * The moving row is decorative for assistive tech; an sr-only list carries the content.
 */
export function IngredientSlider({ ingredients, className }: IngredientSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const loop = [...ingredients, ...ingredients];

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = root?.querySelector<HTMLElement>("[data-slider-track]");
      const frame = root?.querySelector<HTMLElement>("[data-slider-window]");
      if (!root || !track || !frame) return;

      const step = () => {
        const first = track.children[0];
        const second = track.children[1];
        return first instanceof HTMLElement && second instanceof HTMLElement
          ? second.offsetLeft - first.offsetLeft
          : 0;
      };

      // Align a card with the left edge of the content window, keeping the row centered.
      const center = () => {
        const distance = step();
        if (!distance) return;
        const offset = frame.getBoundingClientRect().left - root.getBoundingClientRect().left;
        const gap = distance - (track.firstElementChild?.clientWidth ?? distance);
        const visibleCount = Math.max(1, Math.floor((frame.clientWidth + gap) / distance));
        const first = Math.max(0, Math.floor((track.children.length - visibleCount) / 2));
        gsap.set(track, { x: offset - first * distance });
      };

      const updateDimming = (animate: boolean) => {
        const bounds = frame.getBoundingClientRect();
        for (const card of Array.from(track.children)) {
          if (!(card instanceof HTMLElement)) continue;
          const rect = card.getBoundingClientRect();
          const middle = rect.left + rect.width / 2;
          const inside = middle >= bounds.left && middle <= bounds.right;
          gsap.to(card, {
            opacity: inside ? 1 : DIMMED,
            duration: animate ? DURATION.interactionLong : 0,
            ease: EASE.out,
            overwrite: "auto",
          });
        }
      };

      center();
      updateDimming(false);

      const onResize = () => {
        center();
        updateDimming(false);
      };
      window.addEventListener("resize", onResize);

      let hovering = false;
      let visible = false;
      let next: gsap.core.Tween | undefined;

      const schedule = () => {
        next?.kill();
        next = gsap.delayedCall(HOLD, advance);
      };

      const advance = () => {
        if (hovering || !visible || pausedRef.current) return schedule();
        const distance = step();
        gsap.to(track, {
          x: `-=${distance}`,
          duration: DURATION.enter,
          ease: EASE.inOut,
          onUpdate: () => updateDimming(true),
          onComplete: () => {
            const first = track.firstElementChild;
            if (first) track.appendChild(first);
            gsap.set(track, { x: `+=${distance}` });
            updateDimming(false);
            schedule();
          },
        });
      };

      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        const enter = () => (hovering = true);
        const leave = () => (hovering = false);
        root.addEventListener("pointerenter", enter);
        root.addEventListener("pointerleave", leave);
        root.addEventListener("focusin", enter);
        root.addEventListener("focusout", leave);
        const visibility = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (visible = self.isActive),
        });
        visible = visibility.isActive;
        schedule();

        return () => {
          next?.kill();
          visibility.kill();
          root.removeEventListener("pointerenter", enter);
          root.removeEventListener("pointerleave", leave);
          root.removeEventListener("focusin", enter);
          root.removeEventListener("focusout", leave);
        };
      });

      return () => {
        mm.revert();
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden", className)}>
      <div
        data-slider-window
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(var(--container-shop),calc(100%-2*var(--spacing-gutter)))] -translate-x-1/2"
      />
      <ul className="sr-only">
        {ingredients.map((ingredient) => (
          <li key={ingredient.slug}>
            <strong>{ingredient.name}</strong>: {ingredient.description}
          </li>
        ))}
      </ul>
      <div data-slider-track aria-hidden className="flex w-max gap-2.5">
        {loop.map((ingredient, index) => (
          <div key={`${ingredient.slug}-${index}`} className="w-70 shrink-0">
            <IngredientCard ingredient={ingredient} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          pausedRef.current = !pausedRef.current;
          setPaused(pausedRef.current);
        }}
        className="sr-only rounded-pill bg-ink px-4 py-2 text-body text-white focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-1/2 focus-visible:-translate-x-1/2"
      >
        {paused ? "Retomar animação dos ingredientes" : "Pausar animação dos ingredientes"}
      </button>
    </div>
  );
}

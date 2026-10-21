"use client";

import Image from "next/image";
import { useId, useRef } from "react";

import { DURATION, EASE, MEDIA_QUERY } from "@/constants/motion";
import { FROSTED_GLASS } from "@/constants/surfaces";
import { whenPageReady } from "@/features/transitions/page-ready";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils/cn";

/** Divider position (%) shown in the Figma frame. */
const INITIAL_POSITION = 50;

type BeforeAfterSliderProps = {
  before: { src: string; alt: string; label: string };
  after: { src: string; alt: string; label: string };
  className?: string;
};

/**
 * Image comparison: the "after" photo is revealed to the right of a draggable divider.
 * A native range input drives it, so pointer, touch and keyboard all work.
 */
export function BeforeAfterSlider({ before, after, className }: BeforeAfterSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useGSAP(
    () => {
      const root = rootRef.current;
      const input = root?.querySelector<HTMLInputElement>("input[type='range']");
      if (!root || !input) return;

      const state = { position: INITIAL_POSITION };
      const render = () => root.style.setProperty("--position", `${state.position}%`);
      const follow = gsap.quickTo(state, "position", {
        duration: DURATION.interaction,
        ease: EASE.out,
        onUpdate: render,
      });
      render();

      const onInput = () => follow(Number(input.value));
      input.addEventListener("input", onInput);

      // A short sweep hints that the divider can be dragged.
      const mm = gsap.matchMedia();
      mm.add(MEDIA_QUERY.motionOk, () => {
        const hint = gsap
          .timeline({ paused: true, onUpdate: render })
          .to(state, { position: 32, duration: DURATION.enter, ease: EASE.inOut })
          .to(state, { position: INITIAL_POSITION, duration: DURATION.enter, ease: EASE.inOut });
        let cancel = () => {};
        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top 70%",
          once: true,
          onEnter: () => {
            cancel = whenPageReady(() => hint.play());
          },
        });
        return () => {
          cancel();
          trigger.kill();
        };
      });

      return () => {
        mm.revert();
        input.removeEventListener("input", onInput);
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-cursor-label="Arraste"
      className={cn(
        "relative isolate aspect-[1014/671] overflow-hidden rounded-tile bg-forest [--position:50%] has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-forest",
        className,
      )}
    >
      <Image
        src={before.src}
        alt={before.alt}
        fill
        sizes="(min-width: 64rem) 53vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 [clip-path:inset(0_0_0_var(--position))]">
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(min-width: 64rem) 53vw, 100vw"
          className="object-cover"
        />
      </div>

      <span
        className={cn(
          FROSTED_GLASS,
          "absolute bottom-5 left-5 rounded-pill px-2.5 py-0.5 text-caption font-medium text-white capitalize",
        )}
      >
        {before.label}
      </span>
      <span
        className={cn(
          FROSTED_GLASS,
          "absolute right-5 bottom-5 rounded-pill px-2.5 py-0.5 text-caption font-medium text-white capitalize",
        )}
      >
        {after.label}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-(--position) w-px -translate-x-1/2 bg-white shadow-divider"
      />
      <div
        aria-hidden
        className={cn(
          FROSTED_GLASS,
          "pointer-events-none absolute top-1/2 left-(--position) flex h-11.5 w-15.5 -translate-1/2 items-center justify-center gap-1.5 rounded-pill shadow-handle",
        )}
      >
        <Image src="/icons/chevron-left-white.svg" alt="" width={7} height={12} />
        <Image src="/icons/chevron-right-white.svg" alt="" width={7} height={12} />
      </div>

      <label htmlFor={inputId} className="sr-only">
        Comparar antes e depois
      </label>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        defaultValue={INITIAL_POSITION}
        className="absolute inset-0 size-full cursor-ew-resize appearance-none opacity-0"
      />
    </div>
  );
}

/** Shared motion vocabulary: every animation in the site picks from these values. */

export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
} as const;

/** Durations in seconds. Entrances: 0.6–1.2s. Short interactions: 0.2–0.4s. */
export const DURATION = {
  enterShort: 0.6,
  enter: 0.9,
  enterLong: 1.2,
  interactionShort: 0.2,
  interaction: 0.3,
  interactionLong: 0.4,
} as const;

export const STAGGER = {
  chars: 0.02,
  words: 0.04,
  lines: 0.08,
  items: 0.1,
} as const;

/** Default y offset (px) for fade + slide entrances. */
export const ENTER_OFFSET_Y = 40;

export const MEDIA_QUERY = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 64rem)",
} as const;

"use client";

import { MEDIA_QUERY } from "@/constants/motion";

import { useMediaQuery } from "./use-media-query";

/** True when the user asked the OS to reduce motion. Assumes reduced motion on the server. */
export function useReducedMotion(): boolean {
  return useMediaQuery(MEDIA_QUERY.reducedMotion, true);
}

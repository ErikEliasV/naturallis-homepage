import type { ImageLoaderProps } from "next/image";

import { withBasePath } from "@/utils/base-path";

/**
 * Static hosting (GitHub Pages) has no image optimizer: serve the original file and
 * prefix the base path, which next/image does not add on its own.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith("/")) return src;
  return `${withBasePath(src)}?w=${width}`;
}

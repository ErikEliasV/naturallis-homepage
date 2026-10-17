import Image from "next/image";

import { cn } from "@/utils/cn";

export type IconLayer = {
  src: string;
  /** Box of the vector inside the icon frame (Figma constraints as Tailwind insets). */
  box: string;
  /** Stroke bleed around the box, as exported by Figma. */
  bleed?: string;
};

type LayeredIconProps = {
  layers: readonly IconLayer[];
  /** Size of the icon frame, e.g. `size-8`. */
  className?: string;
};

/** Multi-vector Figma icon rebuilt from its exported layers, positioned as in the file. */
export function LayeredIcon({ layers, className }: LayeredIconProps) {
  return (
    <span aria-hidden className={cn("relative block shrink-0", className)}>
      {layers.map((layer) => (
        <span key={layer.src} className={cn("absolute", layer.box)}>
          <span className={cn("absolute", layer.bleed ?? "inset-0")}>
            <Image src={layer.src} alt="" fill sizes="2rem" />
          </span>
        </span>
      ))}
    </span>
  );
}

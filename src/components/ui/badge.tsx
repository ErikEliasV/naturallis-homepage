import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

export type BadgeTone = "promo" | "sage";
export type BadgeSize = "md" | "sm";

const TONES: Record<BadgeTone, string> = {
  promo: "bg-promo",
  sage: "bg-sage",
};

const SIZES: Record<BadgeSize, string> = {
  md: "rounded-badge px-pad-sm py-[0.5em] text-badge",
  sm: "rounded-pill px-2.5 py-1 font-geist text-caption",
};

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: BadgeTone;
  size?: BadgeSize;
};

export function Badge({ tone = "promo", size = "md", className, children, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap text-white",
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

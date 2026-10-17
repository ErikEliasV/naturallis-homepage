import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

/** Square checkbox from the Figma filters (20px, black border, inset dot when checked). */
export function Checkbox({ className, ...props }: Omit<ComponentPropsWithoutRef<"input">, "type">) {
  return (
    <input
      type="checkbox"
      {...props}
      className={cn(
        "size-5 shrink-0 cursor-pointer appearance-none rounded-[2px] border border-black bg-white checked:bg-black checked:shadow-[inset_0_0_0_3px_white] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed aria-invalid:border-promo",
        className,
      )}
    />
  );
}

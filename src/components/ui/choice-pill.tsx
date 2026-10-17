import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/utils/cn";

type ChoicePillProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "className"> & {
  children: ReactNode;
};

/** Radio option drawn as an outlined pill, filled when selected (Figma variant picker). */
export function ChoicePill({ checked, children, ...inputProps }: ChoicePillProps) {
  return (
    <label
      className={cn(
        "flex h-10 cursor-pointer items-center rounded-pill border border-black px-5 font-geist text-body-sm transition-colors duration-300 ease-power3-out has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest",
        checked ? "bg-black text-white" : "bg-white text-black hover:bg-black/5",
      )}
    >
      <input type="radio" checked={checked} {...inputProps} className="sr-only" />
      {children}
    </label>
  );
}
